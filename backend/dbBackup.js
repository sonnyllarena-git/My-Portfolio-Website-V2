import {
  writeFileSync,
  renameSync,
  readFileSync,
  existsSync,
  mkdirSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from './db.js'

// Every content table in the schema (backend/db.js) — kept as one flat list so a wipe of
// *any* of them (not just projects) can be recovered, since they all live in the same
// database and a reset takes all of them out together.
const BACKUP_TABLES = [
  'schema_version',
  'products',
  'resumeTemplates',
  'leaderboardScores',
  'gameRatings',
  'gameStats',
  'memoryWallNotes',
  'visitorArtworks',
  'blogLikes',
  'blogComments',
  'blogActivity',
  'musicLabItems',
  'contactInquiries',
  'projects',
  'projectCategories',
  'adminCredentials',
]

const backupDir = join(dirname(fileURLToPath(import.meta.url)), 'data')
const backupPath = join(backupDir, 'db-backup.json')

async function backupDatabase() {
  const snapshot = {}
  for (const table of BACKUP_TABLES) {
    const result = await pool.query(`SELECT * FROM ${table}`)
    snapshot[table] = result.rows
  }

  if (!existsSync(backupDir)) mkdirSync(backupDir, { recursive: true })
  // Write-then-rename so a crash mid-write can't leave a half-written, unparseable backup —
  // the rename is the only step that can't partially fail.
  const tempPath = `${backupPath}.tmp`
  writeFileSync(tempPath, JSON.stringify(snapshot))
  renameSync(tempPath, backupPath)
}

async function restoreDatabase() {
  if (!existsSync(backupPath)) {
    throw new Error(`No backup found at ${backupPath} — nothing to restore.`)
  }
  const snapshot = JSON.parse(readFileSync(backupPath, 'utf8'))

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    for (const table of BACKUP_TABLES) {
      const rows = snapshot[table] ?? []
      await client.query(`DELETE FROM ${table}`)
      for (const row of rows) {
        const columns = Object.keys(row)
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ')
        await client.query(
          `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
          columns.map((column) => row[column]),
        )
      }
      // Restored rows carry their original explicit ids, so each SERIAL column's sequence
      // needs bumping past the highest restored id — otherwise the next real INSERT collides.
      // Not every table has an `id` column (e.g. gameStats is keyed by gameId), and
      // pg_get_serial_sequence throws rather than returning null for a column that doesn't
      // exist, so check first.
      const idColumn = await client.query(
        `SELECT 1 FROM information_schema.columns WHERE table_name = $1 AND column_name = 'id'`,
        [table],
      )
      const sequence = idColumn.rows.length
        ? await client.query(
            `SELECT pg_get_serial_sequence($1, 'id') AS sequence`,
            [table],
          )
        : null
      if (sequence?.rows[0].sequence) {
        await client.query(
          `SELECT setval($1, COALESCE((SELECT MAX(id) FROM ${table}), 1), (SELECT MAX(id) FROM ${table}) IS NOT NULL)`,
          [sequence.rows[0].sequence],
        )
      }
    }
    await client.query('COMMIT')
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

export { backupDatabase, restoreDatabase, backupPath }
