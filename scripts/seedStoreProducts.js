import { existsSync, mkdirSync, copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'
import db from '../backend/db.js'
import { generateProductCode } from '../backend/productCode.js'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const uploadsDir = join(rootDir, 'backend', 'uploads')
const assetsDir = join(rootDir, 'src', 'components', 'store', 'product')

if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true })

const PRODUCTS = [
  {
    folder: 'VIBE CODER',
    files: [
      'Vibe Coder Front.png',
      'Vibe Coder Back.png',
      'Vibe Coder Side.png',
    ],
    name: 'VIBE CODER',
    title: 'Vibe Coder Pullover Hoodie',
    description:
      'This unisex heavyweight fleece pullover hoodie features a modern streetwear style with a relaxed fit and dropped shoulders, designed with a bold white "VIBE CODER" block typography centered across the chest while keeping the back and sleeves completely plain for a clean, minimalist aesthetic.',
    gender: 'Unisex',
    material: 'Cotton',
    price: 1750,
    colors: ['Charcoal Grey', 'Navy Blue', 'Black', 'White', 'Heather Grey'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    style: 'Hoodie',
    careInstructions: 'Machine Wash',
    neckStyle: 'Hooded Neck',
    styleName: 'Casual',
    fitType: 'Regular',
    pattern: 'Solid',
    theme: 'Sport',
    seasons: 'Fall, Winter, Spring',
    sleeveType: 'Long Sleeve',
    hemlineForm: 'Ribbed',
    occasion: 'Daily Wear',
    sweaterForm: 'Sweater Pullover',
    ageRangeDescription: 'Adult',
    modelName: 'Ztj009559',
    itemTypeName: 'Hooded Sweatshirt',
  },
  {
    folder: 'Claudey',
    files: ['Claudey front.png', 'Claude back.png', 'Claudey side.png'],
    name: 'Claudey',
    title: 'Claudey Pixel Bot Tee',
    description:
      'This unisex crew-neck cotton T-shirt features a retro pixel-art robot mascot printed in warm terracotta ink across the chest, with a matching mini icon on the back yoke and the "CLAUDE CODE" wordmark in a blocky 8-bit typeface underneath — a playful nod to coding culture on a clean, everyday black tee.',
    gender: 'Unisex',
    material: 'Cotton',
    price: 850,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    style: 'T-Shirt',
    careInstructions: 'Machine Wash',
    neckStyle: 'Crew Neck',
    styleName: 'Graphic Tee',
    fitType: 'Regular',
    pattern: 'Solid',
    theme: 'Graphic',
    seasons: 'All Season',
    sleeveType: 'Short Sleeve',
    hemlineForm: 'Straight Hem',
    occasion: 'Casual',
    sweaterForm: null,
    ageRangeDescription: 'Adult',
    modelName: null,
    itemTypeName: 'T-Shirt',
  },
  {
    folder: 'Claude Code',
    files: [
      'Claude Code Front.png',
      'Claude Code Back.png',
      'Claude Code Side.png',
    ],
    name: 'Claude Code',
    title: 'Claude Code Pullover Hoodie',
    description:
      'This unisex heavyweight fleece pullover hoodie pairs a relaxed fit with dropped shoulders and a drawstring hood, featuring a minimal teal code-bracket icon and the "Claude Code" wordmark centered on the chest while the back and sleeves stay completely plain for a clean, everyday look.',
    gender: 'Unisex',
    material: 'Cotton',
    price: 1750,
    colors: ['Heather Grey', 'Black', 'Navy Blue', 'Charcoal Grey'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    style: 'Hoodie',
    careInstructions: 'Machine Wash',
    neckStyle: 'Hooded Neck',
    styleName: 'Casual',
    fitType: 'Regular',
    pattern: 'Solid',
    theme: 'Graphic',
    seasons: 'Fall, Winter, Spring',
    sleeveType: 'Long Sleeve',
    hemlineForm: 'Ribbed',
    occasion: 'Daily Wear',
    sweaterForm: 'Sweater Pullover',
    ageRangeDescription: 'Adult',
    modelName: null,
    itemTypeName: 'Hooded Sweatshirt',
  },
  {
    folder: 'Just an Ordinary IT Guy',
    files: [
      'Just an Ordinary IT Guy front.png',
      'Just an Ordinary IT Guy back.png',
      'Just an Ordinary IT Guy side.png',
    ],
    name: 'Just an Ordinary IT Guy',
    title: 'Just an Ordinary IT Guy Tee',
    description:
      'This unisex crew-neck cotton T-shirt keeps it simple and funny with bold, stacked white block typography reading "JUST AN ORDINARY IT GUY" across the chest — a plain back and sleeves let the joke do all the talking. Perfect for the dev who fixes everyone\'s Wi-Fi and gets zero credit for it.',
    gender: 'Unisex',
    material: 'Cotton',
    price: 850,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    style: 'T-Shirt',
    careInstructions: 'Machine Wash',
    neckStyle: 'Crew Neck',
    styleName: 'Graphic Tee',
    fitType: 'Regular',
    pattern: 'Solid',
    theme: 'Novelty',
    seasons: 'All Season',
    sleeveType: 'Short Sleeve',
    hemlineForm: 'Straight Hem',
    occasion: 'Casual',
    sweaterForm: null,
    ageRangeDescription: 'Adult',
    modelName: null,
    itemTypeName: 'T-Shirt',
  },
]

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

function copyToUploads(sourcePath) {
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(sourcePath)}`
  copyFileSync(sourcePath, join(uploadsDir, filename))
  return `/uploads/${filename}`
}

for (const product of PRODUCTS) {
  const exists = db
    .prepare('SELECT id FROM products WHERE name = ?')
    .get(product.name)
  if (exists) {
    console.log(`Skipping "${product.name}" — already in catalog.`)
    continue
  }

  const images = product.files.map((file) =>
    copyToUploads(join(assetsDir, product.folder, file)),
  )

  const now = new Date().toISOString()
  const columns = [
    ...PRODUCT_FIELDS,
    'colors',
    'sizes',
    'images',
    'published',
    'createdAt',
    'updatedAt',
  ]
  const values = {
    ...product,
    colors: JSON.stringify(product.colors),
    sizes: JSON.stringify(product.sizes),
    images: JSON.stringify(images),
    published: 1,
    createdAt: now,
    updatedAt: now,
  }

  const insert = db.prepare(
    `INSERT INTO products (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
  )
  const info = insert.run(...columns.map((column) => values[column]))

  db.prepare('UPDATE products SET code = ? WHERE id = ?').run(
    generateProductCode(info.lastInsertRowid),
    info.lastInsertRowid,
  )

  console.log(`Added "${product.name}" as a published product.`)
}
