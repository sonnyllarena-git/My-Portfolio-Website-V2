import { Router } from 'express'
import db from '../db.js'
import requireAuth from '../middleware/requireAuth.js'
import { generateTemplateCode } from '../resumeTemplateCode.js'
import { stripImmutableFields } from '../utils/stripImmutableFields.js'

const router = Router()

const TEMPLATE_FIELDS = [
  'templateKey',
  'name',
  'description',
  'thumbnailUrl',
  'accentHex',
]

function deserializeTemplate(row) {
  return {
    ...row,
    published: Boolean(row.published),
  }
}

function serializeInput(body) {
  const values = {}
  for (const field of TEMPLATE_FIELDS) values[field] = body[field] ?? null
  return values
}

router.get('/', (req, res) => {
  const rows =
    req.query.published === 'true'
      ? db
          .prepare(
            'SELECT * FROM resumeTemplates WHERE published = 1 ORDER BY id',
          )
          .all()
      : db.prepare('SELECT * FROM resumeTemplates ORDER BY id').all()
  res.json(rows.map(deserializeTemplate))
})

router.get('/:code', (req, res) => {
  const row = db
    .prepare('SELECT * FROM resumeTemplates WHERE code = ?')
    .get(req.params.code)
  if (!row) return res.status(404).json({ error: 'Resume template not found' })
  res.json(deserializeTemplate(row))
})

router.post('/', requireAuth, (req, res) => {
  const values = serializeInput(stripImmutableFields(req.body ?? {}))
  const now = new Date().toISOString()
  const columns = [...TEMPLATE_FIELDS, 'createdAt', 'updatedAt']

  const insert = db.prepare(
    `INSERT INTO resumeTemplates (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
  )
  const info = insert.run(
    ...columns.map((column) =>
      column === 'createdAt' || column === 'updatedAt' ? now : values[column],
    ),
  )

  db.prepare('UPDATE resumeTemplates SET code = ? WHERE id = ?').run(
    generateTemplateCode(info.lastInsertRowid),
    info.lastInsertRowid,
  )

  const row = db
    .prepare('SELECT * FROM resumeTemplates WHERE id = ?')
    .get(info.lastInsertRowid)
  res.status(201).json(deserializeTemplate(row))
})

router.put('/:code', requireAuth, (req, res) => {
  const existing = db
    .prepare('SELECT * FROM resumeTemplates WHERE code = ?')
    .get(req.params.code)
  if (!existing)
    return res.status(404).json({ error: 'Resume template not found' })

  const values = serializeInput(stripImmutableFields(req.body ?? {}))
  const now = new Date().toISOString()

  db.prepare(
    `UPDATE resumeTemplates SET ${TEMPLATE_FIELDS.map((column) => `${column} = ?`).join(', ')}, updatedAt = ? WHERE code = ?`,
  ).run(
    ...TEMPLATE_FIELDS.map((column) => values[column]),
    now,
    req.params.code,
  )

  const row = db
    .prepare('SELECT * FROM resumeTemplates WHERE code = ?')
    .get(req.params.code)
  res.json(deserializeTemplate(row))
})

router.patch('/:code/publish', requireAuth, (req, res) => {
  const existing = db
    .prepare('SELECT * FROM resumeTemplates WHERE code = ?')
    .get(req.params.code)
  if (!existing)
    return res.status(404).json({ error: 'Resume template not found' })

  db.prepare(
    'UPDATE resumeTemplates SET published = 1, updatedAt = ? WHERE code = ?',
  ).run(new Date().toISOString(), req.params.code)

  const row = db
    .prepare('SELECT * FROM resumeTemplates WHERE code = ?')
    .get(req.params.code)
  res.json(deserializeTemplate(row))
})

router.delete('/:code', requireAuth, (req, res) => {
  const info = db
    .prepare('DELETE FROM resumeTemplates WHERE code = ?')
    .run(req.params.code)
  if (info.changes === 0)
    return res.status(404).json({ error: 'Resume template not found' })
  res.status(204).end()
})

export default router
