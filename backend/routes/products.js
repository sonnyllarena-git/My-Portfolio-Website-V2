import { Router } from 'express'
import db from '../db.js'
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

router.get('/', (req, res) => {
  const rows =
    req.query.published === 'true'
      ? db
          .prepare('SELECT * FROM products WHERE published = 1 ORDER BY id')
          .all()
      : db.prepare('SELECT * FROM products ORDER BY id').all()
  res.json(rows.map(deserializeProduct))
})

router.get('/:code', (req, res) => {
  const row = db
    .prepare('SELECT * FROM products WHERE code = ?')
    .get(req.params.code)
  if (!row) return res.status(404).json({ error: 'Product not found' })
  res.json(deserializeProduct(row))
})

router.post('/', requireAuth, (req, res) => {
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

  const insert = db.prepare(
    `INSERT INTO products (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
  )
  const info = insert.run(
    ...columns.map((column) =>
      column === 'createdAt' || column === 'updatedAt' ? now : values[column],
    ),
  )

  db.prepare('UPDATE products SET code = ? WHERE id = ?').run(
    generateProductCode(info.lastInsertRowid),
    info.lastInsertRowid,
  )

  const row = db
    .prepare('SELECT * FROM products WHERE id = ?')
    .get(info.lastInsertRowid)
  res.status(201).json(deserializeProduct(row))
})

router.put('/:code', requireAuth, (req, res) => {
  const existing = db
    .prepare('SELECT * FROM products WHERE code = ?')
    .get(req.params.code)
  if (!existing) return res.status(404).json({ error: 'Product not found' })

  const values = serializeInput(stripImmutableFields(req.body ?? {}))
  const now = new Date().toISOString()
  const setColumns = [...PRODUCT_FIELDS, 'colors', 'sizes', 'images']

  db.prepare(
    `UPDATE products SET ${setColumns.map((column) => `${column} = ?`).join(', ')}, updatedAt = ? WHERE code = ?`,
  ).run(...setColumns.map((column) => values[column]), now, req.params.code)

  const row = db
    .prepare('SELECT * FROM products WHERE code = ?')
    .get(req.params.code)
  res.json(deserializeProduct(row))
})

router.patch('/:code/publish', requireAuth, (req, res) => {
  const existing = db
    .prepare('SELECT * FROM products WHERE code = ?')
    .get(req.params.code)
  if (!existing) return res.status(404).json({ error: 'Product not found' })

  db.prepare(
    'UPDATE products SET published = 1, updatedAt = ? WHERE code = ?',
  ).run(new Date().toISOString(), req.params.code)

  const row = db
    .prepare('SELECT * FROM products WHERE code = ?')
    .get(req.params.code)
  res.json(deserializeProduct(row))
})

router.delete('/:code', requireAuth, (req, res) => {
  const info = db
    .prepare('DELETE FROM products WHERE code = ?')
    .run(req.params.code)
  if (info.changes === 0)
    return res.status(404).json({ error: 'Product not found' })
  res.status(204).end()
})

export default router
