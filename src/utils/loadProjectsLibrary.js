const projectNotes = import.meta.glob(
  '../assets/developer-lab/projects/*/notes.txt',
  { eager: true, query: '?raw', import: 'default' },
)
const projectPhotos = import.meta.glob(
  '../assets/developer-lab/projects/*/photo.*',
  { eager: true, query: '?url', import: 'default' },
)

function slugFromPath(path) {
  return path.match(/\/projects\/([^/]+)\//)?.[1]
}

const FIELD_LABELS = [
  'title',
  'description',
  'tech stack',
  'category',
  'project link',
  'tags',
]

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

function findBySlug(files, slug) {
  const path = Object.keys(files).find((p) => slugFromPath(p) === slug)
  return path ? files[path] : null
}

export const projects = Object.keys(projectNotes)
  .map(slugFromPath)
  .sort()
  .map((slug) => {
    const notes = parseNotes(findBySlug(projectNotes, slug))
    return {
      id: slug,
      title: notes.title ?? slug,
      description: notes.description ?? '',
      techStack: notes['tech stack'] ?? '',
      category: notes.category ?? '',
      projectLink: notes['project link'] ?? '',
      tags: parseTags(notes.tags),
      photoSrc: findBySlug(projectPhotos, slug),
    }
  })
