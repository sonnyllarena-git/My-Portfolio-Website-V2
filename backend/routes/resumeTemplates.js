import { Router } from 'express'
import { pool } from '../db.js'
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

router.get('/', async (req, res) => {
  try {
    const query =
      req.query.published === 'true'
        ? 'SELECT * FROM resumeTemplates WHERE published = 1 ORDER BY id'
        : 'SELECT * FROM resumeTemplates ORDER BY id'
    const result = await pool.query(query)
    res.json(result.rows.map(deserializeTemplate))
  } catch (err) {
    console.error('Error fetching resume templates:', err)
    res.status(500).json({ error: 'Failed to fetch resume templates' })
  }
})

router.get('/:code', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM resumeTemplates WHERE code = $1',
      [req.params.code],
    )
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Resume template not found' })
    res.json(deserializeTemplate(result.rows[0]))
  } catch (err) {
    console.error('Error fetching resume template:', err)
    res.status(500).json({ error: 'Failed to fetch resume template' })
  }
})

router.post('/', requireAuth, async (req, res) => {
  try {
    const values = serializeInput(stripImmutableFields(req.body ?? {}))
    const now = new Date().toISOString()
    const columns = [...TEMPLATE_FIELDS, 'createdAt', 'updatedAt']

    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ')
    const columnsList = columns.join(', ')

    const insertResult = await pool.query(
      `INSERT INTO resumeTemplates (${columnsList}) VALUES (${placeholders}) RETURNING id`,
      columns.map((column) =>
        column === 'createdAt' || column === 'updatedAt' ? now : values[column],
      ),
    )

    const insertId = insertResult.rows[0].id

    await pool.query('UPDATE resumeTemplates SET code = $1 WHERE id = $2', [
      generateTemplateCode(insertId),
      insertId,
    ])

    const row = await pool.query(
      'SELECT * FROM resumeTemplates WHERE id = $1',
      [insertId],
    )
    res.status(201).json(deserializeTemplate(row.rows[0]))
  } catch (err) {
    console.error('Error creating resume template:', err)
    res.status(500).json({ error: 'Failed to create resume template' })
  }
})

router.put('/:code', requireAuth, async (req, res) => {
  try {
    const existing = await pool.query(
      'SELECT * FROM resumeTemplates WHERE code = $1',
      [req.params.code],
    )
    if (existing.rows.length === 0)
      return res.status(404).json({ error: 'Resume template not found' })

    const values = serializeInput(stripImmutableFields(req.body ?? {}))
    const now = new Date().toISOString()

    const setClause = TEMPLATE_FIELDS.map(
      (col, i) => `${col} = $${i + 1}`,
    ).join(', ')
    const updateValues = TEMPLATE_FIELDS.map((column) => values[column])

    await pool.query(
      `UPDATE resumeTemplates SET ${setClause}, updatedAt = $${TEMPLATE_FIELDS.length + 1} WHERE code = $${TEMPLATE_FIELDS.length + 2}`,
      [...updateValues, now, req.params.code],
    )

    const row = await pool.query(
      'SELECT * FROM resumeTemplates WHERE code = $1',
      [req.params.code],
    )
    res.json(deserializeTemplate(row.rows[0]))
  } catch (err) {
    console.error('Error updating resume template:', err)
    res.status(500).json({ error: 'Failed to update resume template' })
  }
})

router.patch('/:code/publish', requireAuth, async (req, res) => {
  try {
    const existing = await pool.query(
      'SELECT * FROM resumeTemplates WHERE code = $1',
      [req.params.code],
    )
    if (existing.rows.length === 0)
      return res.status(404).json({ error: 'Resume template not found' })

    await pool.query(
      'UPDATE resumeTemplates SET published = 1, updatedAt = $1 WHERE code = $2',
      [new Date().toISOString(), req.params.code],
    )

    const row = await pool.query(
      'SELECT * FROM resumeTemplates WHERE code = $1',
      [req.params.code],
    )
    res.json(deserializeTemplate(row.rows[0]))
  } catch (err) {
    console.error('Error publishing resume template:', err)
    res.status(500).json({ error: 'Failed to publish resume template' })
  }
})

router.delete('/:code', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM resumeTemplates WHERE code = $1',
      [req.params.code],
    )
    if (result.rowCount === 0)
      return res.status(404).json({ error: 'Resume template not found' })
    res.status(204).end()
  } catch (err) {
    console.error('Error deleting resume template:', err)
    res.status(500).json({ error: 'Failed to delete resume template' })
  }
})

export default router
