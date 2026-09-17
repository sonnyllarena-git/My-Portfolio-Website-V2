import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import app from './app.js'
import { initSchema } from './db.js'
import { backupDatabase } from './dbBackup.js'

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../dist')

// Local/non-Vercel entry point only — Vercel serves the built frontend directly from
// its own static hosting and never runs this file, so this combined static+API serving
// (and the local JSON backup below) only ever applies when running `npm run server`.
app.use(express.static(distDir))
app.get('/*splat', (req, res) => {
  res.sendFile(join(distDir, 'index.html'))
})

const port = process.env.PORT || 4000

async function start() {
  try {
    await initSchema()
    // Snapshots every content table to backend/data/db-backup.json on every successful start,
    // so a wiped/reset local database is never more than one `npm run restore-db` away from
    // its last-known-good state — see LESSONS.md (Data & Persistence, 2026-09-09).
    await backupDatabase()
    app.listen(port, () => {
      console.log(`Admin portal API listening on port ${port}`)
    })
  } catch (err) {
    console.error('Failed to initialize database:', err)
    process.exit(1)
  }
}

start()
