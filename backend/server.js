import express from 'express'
import multer from 'multer'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'
import { uploadToStorage } from './supabaseStorageClient.js'
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import projectsRouter from './routes/projects.js'
import projectCategoriesRouter from './routes/projectCategories.js'
import resumeTemplatesRouter from './routes/resumeTemplates.js'
import leaderboardRouter from './routes/leaderboard.js'
import ratingsRouter from './routes/ratings.js'
import memoryWallRouter from './routes/memoryWall.js'
import visitorArtsRouter from './routes/visitorArts.js'
import blogRouter from './routes/blog.js'
import musicLabRouter from './routes/musicLab.js'
import inquiriesRouter from './routes/inquiries.js'
import requireAuth from './middleware/requireAuth.js'
import { initSchema } from './db.js'
import { backupDatabase } from './dbBackup.js'

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../dist')

const MAX_PHOTO_BYTES = 10 * 1024 * 1024 // 10MB — a product photo, not video/audio media

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PHOTO_BYTES },
  fileFilter: (req, file, cb) => {
    cb(null, file.mimetype.startsWith('image/'))
  },
})

const app = express()
// Render sits behind a reverse proxy — without this, req.ip returns the proxy's own
// address for every request, breaking per-IP rate limiting (used by the inquiries route).
app.set('trust proxy', 1)
// Default body-parser limit (100kb) is too small for a base64 PNG canvas export
// (Visitor Arts saves) — raised for every route rather than just one, since it's
// still a modest, sanity-preserving cap, not a real DoS surface.
app.use(express.json({ limit: '6mb' }))
app.use('/api', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/project-categories', projectCategoriesRouter)
app.use('/api/resume-templates', resumeTemplatesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/ratings', ratingsRouter)
app.use('/api/memory-wall', memoryWallRouter)
app.use('/api/visitor-arts', visitorArtsRouter)
app.use('/api/blog', blogRouter)
app.use('/api/music-lab', musicLabRouter)
app.use('/api/inquiries', inquiriesRouter)

app.post(
  '/api/uploads',
  requireAuth,
  upload.array('photos', 10),
  async (req, res) => {
    try {
      const urls = await Promise.all(
        (req.files ?? []).map((file) =>
          uploadToStorage(
            file.buffer,
            `uploads/${randomUUID()}${extname(file.originalname)}`,
            file.mimetype,
          ),
        ),
      )
      res.status(201).json({ urls })
    } catch (err) {
      console.error('Error uploading photos to storage:', err)
      res.status(500).json({ error: 'Upload failed' })
    }
  },
)

// Multer throws (e.g. a file over its `limits.fileSize`) via `next(err)`, which
// skips straight past every normal route handler to here — without this, a
// too-large upload would surface as an unhandled 500 instead of a clean 400.
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer upload error:', err)
    return res.status(400).json({ error: 'Upload failed' })
  }
  next(err)
})

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
