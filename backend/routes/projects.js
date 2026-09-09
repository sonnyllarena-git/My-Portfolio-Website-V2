import { Router } from 'express'
import { pool } from '../db.js'
import requireAuth from '../middleware/requireAuth.js'
import { generateProjectCode } from '../projectCode.js'
import { stripImmutableFields } from '../utils/stripImmutableFields.js'

const router = Router()

const PROJECT_FIELDS = [
  'title',
  'description',
  'techStack',
  'category',
  'projectLink',
  'photoUrl',
]

// Postgres folds unquoted DDL identifiers to lowercase, so a row back from `SELECT *`
// carries techstack/projectlink/photourl/createdat/updatedat — not the camelCase the
// rest of the app expects. Map them back explicitly instead of spreading the raw row.
function deserializeProject(row) {
  return {
    id: row.id,
    code: row.code,
    title: row.title,
    description: row.description,
    techStack: row.techstack,
    category: row.category,
    projectLink: row.projectlink,
    tags: JSON.parse(row.tags || '[]'),
    photoUrl: row.photourl,
    published: Boolean(row.published),
    createdAt: row.createdat,
    updatedAt: row.updatedat,
  }
}

function serializeInput(body) {
  const values = {}
  for (const field of PROJECT_FIELDS) values[field] = body[field] ?? null
  values.tags = JSON.stringify(body.tags ?? [])
  return values
}

router.get('/', async (req, res) => {
  try {
    const query =
      req.query.published === 'true'
        ? 'SELECT * FROM projects WHERE published = 1 ORDER BY id'
        : 'SELECT * FROM projects ORDER BY id'
    const result = await pool.query(query)
    res.json(result.rows.map(deserializeProject))
  } catch (err) {
    console.error('Error fetching projects:', err)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

router.get('/:code', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE code = $1', [
      req.params.code,
    ])
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Project not found' })
    res.json(deserializeProject(result.rows[0]))
  } catch (err) {
    console.error('Error fetching project:', err)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

router.post('/', requireAuth, async (req, res) => {
  try {
    const values = serializeInput(stripImmutableFields(req.body ?? {}))
    const now = new Date().toISOString()
    const columns = [...PROJECT_FIELDS, 'tags', 'createdAt', 'updatedAt']

    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ')
    const columnsList = columns.join(', ')

    const insertResult = await pool.query(
      `INSERT INTO projects (${columnsList}) VALUES (${placeholders}) RETURNING id`,
      columns.map((column) =>
        column === 'createdAt' || column === 'updatedAt' ? now : values[column],
      ),
    )

    const insertId = insertResult.rows[0].id

    await pool.query('UPDATE projects SET code = $1 WHERE id = $2', [
      generateProjectCode(insertId),
      insertId,
    ])

    const row = await pool.query('SELECT * FROM projects WHERE id = $1', [
      insertId,
    ])
    res.status(201).json(deserializeProject(row.rows[0]))
  } catch (err) {
    console.error('Error creating project:', err)
    res.status(500).json({ error: 'Failed to create project' })
  }
})

router.put('/:code', requireAuth, async (req, res) => {
  try {
    const existing = await pool.query(
      'SELECT * FROM projects WHERE code = $1',
      [req.params.code],
    )
    if (existing.rows.length === 0)
      return res.status(404).json({ error: 'Project not found' })

    const values = serializeInput(stripImmutableFields(req.body ?? {}))
    const now = new Date().toISOString()
    const setColumns = [...PROJECT_FIELDS, 'tags']

    const setClause = setColumns
      .map((col, i) => `${col} = $${i + 1}`)
      .join(', ')
    const updateValues = setColumns.map((column) => values[column])

    await pool.query(
      `UPDATE projects SET ${setClause}, updatedAt = $${setColumns.length + 1} WHERE code = $${setColumns.length + 2}`,
      [...updateValues, now, req.params.code],
    )

    const row = await pool.query('SELECT * FROM projects WHERE code = $1', [
      req.params.code,
    ])
    res.json(deserializeProject(row.rows[0]))
  } catch (err) {
    console.error('Error updating project:', err)
    res.status(500).json({ error: 'Failed to update project' })
  }
})

router.patch('/:code/publish', requireAuth, async (req, res) => {
  try {
    const existing = await pool.query(
      'SELECT * FROM projects WHERE code = $1',
      [req.params.code],
    )
    if (existing.rows.length === 0)
      return res.status(404).json({ error: 'Project not found' })

    await pool.query(
      'UPDATE projects SET published = 1, updatedAt = $1 WHERE code = $2',
      [new Date().toISOString(), req.params.code],
    )

    const row = await pool.query('SELECT * FROM projects WHERE code = $1', [
      req.params.code,
    ])
    res.json(deserializeProject(row.rows[0]))
  } catch (err) {
    console.error('Error publishing project:', err)
    res.status(500).json({ error: 'Failed to publish project' })
  }
})

router.delete('/:code', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM projects WHERE code = $1', [
      req.params.code,
    ])
    if (result.rowCount === 0)
      return res.status(404).json({ error: 'Project not found' })
    res.status(204).end()
  } catch (err) {
    console.error('Error deleting project:', err)
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

export default router
