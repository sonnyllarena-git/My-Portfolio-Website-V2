import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

// The pre-admin-portal source of truth for the Projects app: one folder per project under
// src/assets/developer-lab/projects/<slug>/, each holding a notes.txt (parsed below) and an
// optional photo.*. This loader only runs once, from the schema_version 6 migration in db.js,
// to carry that content into the new `projects` table so the cutover doesn't lose anything.
const PROJECTS_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '../src/assets/developer-lab/projects',
)

const FIELD_LABELS = [
  'title',
  'description',
  'tech stack',
  'category',
  'project link',
  'tags',
]

const PHOTO_MIME_BY_EXT = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.jfif': 'image/jpeg',
  '.webp': 'image/webp',
}

function parseNotes(raw) {
  const fields = {}
  let currentKey = null
  raw.split(/\r\n|\r|\n/).forEach((line) => {
    const match = line.match(/^([^:]+):\s*(.*)$/)
    const label = match?.[1]?.trim().toLowerCase()
    if (match && FIELD_LABELS.includes(label)) {
      currentKey = label
      fields[currentKey] = match[2]
    } else if (currentKey !== null) {
      fields[currentKey] += `\n${line}`
    }
  })
  Object.keys(fields).forEach((key) => {
    fields[key] = fields[key].trim()
  })
  return fields
}

function parseTags(text) {
  if (!text) return []
  return text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function readPhotoDataUri(projectDir) {
  for (const [ext, mime] of Object.entries(PHOTO_MIME_BY_EXT)) {
    const path = join(projectDir, `photo${ext}`)
    if (existsSync(path)) {
      return `data:${mime};base64,${readFileSync(path).toString('base64')}`
    }
  }
  return null
}

export function loadLegacyProjectSeeds() {
  if (!existsSync(PROJECTS_DIR)) return []
  return readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .map((slug) => {
      const projectDir = join(PROJECTS_DIR, slug)
      const notesPath = join(projectDir, 'notes.txt')
      if (!existsSync(notesPath)) return null
      const notes = parseNotes(readFileSync(notesPath, 'utf-8'))
      return {
        title: notes.title ?? slug,
        description: notes.description ?? '',
        techStack: notes['tech stack'] ?? '',
        category: notes.category ?? '',
        projectLink: notes['project link'] ?? '',
        tags: parseTags(notes.tags),
        photoUrl: readPhotoDataUri(projectDir),
      }
    })
    .filter(Boolean)
}
