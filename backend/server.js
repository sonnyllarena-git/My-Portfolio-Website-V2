import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import app from './app.js'
import { initSchema } from './db.js'
import { backupDatabase } from './dbBackup.js'

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../dist')

// On Vercel, the "backend" service's own rewrites never route non-/api traffic here —
// the "frontend" service serves the built app directly. This static-serving fallback
// only actually gets hit locally (`npm run server`/`npm start` against a built `dist/`).
app.use(express.static(distDir))
app.get('/*splat', (req, res) => {
  res.sendFile(join(distDir, 'index.html'))
})

const port = process.env.PORT || 4000

async function start() {
  try {
    await initSchema()
  } catch (err) {
    console.error('Failed to initialize database:', err)
    process.exit(1)
  }

  // Snapshots every content table to backend/data/db-backup.json on every successful
  // start, so a wiped/reset local database is never more than one `npm run restore-db`
  // away from its last-known-good state — see LESSONS.md (Data & Persistence,
  // 2026-09-09). A convenience feature, not a critical one — its failure (e.g. a
  // read-only or unexpected filesystem on a hosting platform) must never take the
  // whole service down with it, so it's isolated from the startup that does.
  try {
    await backupDatabase()
  } catch (err) {
    console.error('Skipping local DB backup (non-fatal):', err)
  }

  app.listen(port, () => {
    console.log(`Admin portal API listening on port ${port}`)
  })
}

start()
