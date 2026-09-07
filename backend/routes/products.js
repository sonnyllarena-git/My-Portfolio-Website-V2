import { Router } from 'express'
import { pool } from '../db.js'
import requireAuth from '../middleware/requireAuth.js'
import { generateProductCode } from '../productCode.js'
import { stripImmutableFields } from '../utils/stripImmutableFields.js'

const router = Router()

const PRODUCT_FIELDS = [
  'name',
  'title',
  'description',
  'gender',
  'material',
  'sleeveType',
  'style',
  'price',
  'careInstructions',
  'neckStyle',
  'styleName',
  'fitType',
  'pattern',
  'theme',
  'seasons',
  'hemlineForm',
  'occasion',
  'sweaterForm',
  'ageRangeDescription',
  'modelName',
  'itemTypeName',
]

function deserializeProduct(row) {
  return {
    ...row,
    colors: JSON.parse(row.colors || '[]'),
    sizes: JSON.parse(row.sizes || '[]'),
    images: JSON.parse(row.images || '[]'),
    published: Boolean(row.published),
  }
}

function serializeInput(body) {
  const values = {}
  for (const field of PRODUCT_FIELDS) values[field] = body[field] ?? null
  values.colors = JSON.stringify(body.colors ?? [])
  values.sizes = JSON.stringify(body.sizes ?? [])
  values.images = JSON.stringify(body.images ?? [])
  return values
}

router.get('/', async (req, res) => {
  try {
    const query =
      req.query.published === 'true'
        ? 'SELECT * FROM products WHERE published = 1 ORDER BY id'
        : 'SELECT * FROM products ORDER BY id'
    const result = await pool.query(query)
    res.json(result.rows.map(deserializeProduct))
  } catch (err) {
    console.error('Error fetching products:', err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.get('/:code', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE code = $1', [
      req.params.code,
    ])
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Product not found' })
    res.json(deserializeProduct(result.rows[0]))
  } catch (err) {
    console.error('Error fetching product:', err)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

router.post('/', requireAuth, async (req, res) => {
  try {
    const values = serializeInput(stripImmutableFields(req.body ?? {}))
    const now = new Date().toISOString()
    const columns = [
      ...PRODUCT_FIELDS,
      'colors',
      'sizes',
      'images',
      'createdAt',
      'updatedAt',
    ]

    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ')
    const columnsList = columns.join(', ')

    const insertResult = await pool.query(
      `INSERT INTO products (${columnsList}) VALUES (${placeholders}) RETURNING id`,
      columns.map((column) =>
        column === 'createdAt' || column === 'updatedAt' ? now : values[column],
      ),
    )

    const insertId = insertResult.rows[0].id

    await pool.query('UPDATE products SET code = $1 WHERE id = $2', [
      generateProductCode(insertId),
      insertId,
    ])

    const row = await pool.query('SELECT * FROM products WHERE id = $1', [
      insertId,
    ])
    res.status(201).json(deserializeProduct(row.rows[0]))
  } catch (err) {
    console.error('Error creating product:', err)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

router.put('/:code', requireAuth, async (req, res) => {
  try {
    const existing = await pool.query(
      'SELECT * FROM products WHERE code = $1',
      [req.params.code],
    )
    if (existing.rows.length === 0)
      return res.status(404).json({ error: 'Product not found' })

    const values = serializeInput(stripImmutableFields(req.body ?? {}))
    const now = new Date().toISOString()
    const setColumns = [...PRODUCT_FIELDS, 'colors', 'sizes', 'images']

    const setClause = setColumns
      .map((col, i) => `${col} = $${i + 1}`)
      .join(', ')
    const updateValues = setColumns.map((column) => values[column])

    await pool.query(
      `UPDATE products SET ${setClause}, updatedAt = $${setColumns.length + 1} WHERE code = $${setColumns.length + 2}`,
      [...updateValues, now, req.params.code],
    )

    const row = await pool.query('SELECT * FROM products WHERE code = $1', [
      req.params.code,
    ])
    res.json(deserializeProduct(row.rows[0]))
  } catch (err) {
    console.error('Error updating product:', err)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

router.patch('/:code/publish', requireAuth, async (req, res) => {
  try {
    const existing = await pool.query(
      'SELECT * FROM products WHERE code = $1',
      [req.params.code],
    )
    if (existing.rows.length === 0)
      return res.status(404).json({ error: 'Product not found' })

    await pool.query(
      'UPDATE products SET published = 1, updatedAt = $1 WHERE code = $2',
      [new Date().toISOString(), req.params.code],
    )

    const row = await pool.query('SELECT * FROM products WHERE code = $1', [
      req.params.code,
    ])
    res.json(deserializeProduct(row.rows[0]))
  } catch (err) {
    console.error('Error publishing product:', err)
    res.status(500).json({ error: 'Failed to publish product' })
  }
})

router.delete('/:code', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM products WHERE code = $1', [
      req.params.code,
    ])
    if (result.rowCount === 0)
      return res.status(404).json({ error: 'Product not found' })
    res.status(204).end()
  } catch (err) {
    console.error('Error deleting product:', err)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

export default router
