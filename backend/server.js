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

// Vercel's Node runtime for this service imports this file as a module and calls its
// default export per request — it never executes `node server.js` as a standalone
// process, so app.listen() below never runs there. Cache the schema-init promise so a
// warm invocation doesn't re-run it on every request, only a genuine cold start does.
let ready = null
function ensureReady() {
  if (!ready) {
    ready = initSchema().catch((err) => {
      ready = null
      throw err
    })
  }
  return ready
}

const isDirectlyExecuted = process.argv[1] === fileURLToPath(import.meta.url)

if (isDirectlyExecuted) {
  ensureReady()
    .then(async () => {
      // Snapshots every content table to backend/data/db-backup.json on every successful
      // start, so a wiped/reset local database is never more than one `npm run restore-db`
      // away from its last-known-good state — see LESSONS.md (Data & Persistence,
      // 2026-09-09). Local-only convenience, not run when Vercel imports this module.
      try {
        await backupDatabase()
      } catch (err) {
        console.error('Skipping local DB backup (non-fatal):', err)
      }
      app.listen(port, () => {
        console.log(`Admin portal API listening on port ${port}`)
      })
    })
    .catch((err) => {
      console.error('Failed to initialize database:', err)
      process.exit(1)
    })
}

export default async function handler(req, res) {
  await ensureReady()
  app(req, res)
}
