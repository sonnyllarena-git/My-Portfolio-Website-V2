import { Router } from 'express'
import { pool } from '../db.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()

function deserializeCategory(row) {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.createdat,
  }
}

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projectCategories ORDER BY name',
    )
    res.json(result.rows.map(deserializeCategory))
  } catch (err) {
    console.error('Error fetching project categories:', err)
    res.status(500).json({ error: 'Failed to fetch project categories' })
  }
})

router.post('/', requireAuth, async (req, res) => {
  try {
    const name = (req.body?.name ?? '').trim()
    if (!name) return res.status(400).json({ error: 'Name is required' })

    const existing = await pool.query(
      'SELECT id FROM projectCategories WHERE name = $1',
      [name],
    )
    if (existing.rows.length > 0)
      return res.status(409).json({ error: 'Category already exists' })

    const now = new Date().toISOString()
    const result = await pool.query(
      'INSERT INTO projectCategories (name, createdAt) VALUES ($1, $2) RETURNING *',
      [name, now],
    )
    res.status(201).json(deserializeCategory(result.rows[0]))
  } catch (err) {
    console.error('Error creating project category:', err)
    res.status(500).json({ error: 'Failed to create project category' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM projectCategories WHERE id = $1',
      [req.params.id],
    )
    if (result.rowCount === 0)
      return res.status(404).json({ error: 'Category not found' })
    res.status(204).end()
  } catch (err) {
    console.error('Error deleting project category:', err)
    res.status(500).json({ error: 'Failed to delete project category' })
  }
})

export default router
