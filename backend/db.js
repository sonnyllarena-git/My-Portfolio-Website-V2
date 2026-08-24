import Database from 'better-sqlite3'
import { existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const dataDir = join(dirname(fileURLToPath(import.meta.url)), 'data')
if (!existsSync(dataDir)) mkdirSync(dataDir)

const db = new Database(join(dataDir, 'catalog.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    name TEXT NOT NULL,
    title TEXT,
    description TEXT,
    gender TEXT,
    material TEXT,
    sleeveType TEXT,
    style TEXT,
    price REAL,
    careInstructions TEXT,
    neckStyle TEXT,
    styleName TEXT,
    fitType TEXT,
    pattern TEXT,
    theme TEXT,
    seasons TEXT,
    hemlineForm TEXT,
    occasion TEXT,
    sweaterForm TEXT,
    ageRangeDescription TEXT,
    modelName TEXT,
    itemTypeName TEXT,
    colors TEXT,
    sizes TEXT,
    images TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )
`)

export default db
