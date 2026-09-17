import app from '../backend/app.js'
import { initSchema } from '../backend/db.js'

// Vercel reuses a warm serverless instance across requests, so this only actually
// runs schema init on a real cold start — cache the promise rather than re-running
// (and re-racing) the migration checks on every invocation.
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

export default async function handler(req, res) {
  await ensureReady()
  app(req, res)
}
