import express from 'express'
import multer from 'multer'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import projectsRouter from './routes/projects.js'
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

const uploadsDir = join(dirname(fileURLToPath(import.meta.url)), 'uploads')
const distDir = join(dirname(fileURLToPath(import.meta.url)), '../dist')
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir)

const MAX_PHOTO_BYTES = 10 * 1024 * 1024 // 10MB — a product photo, not video/audio media

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
      cb(
        null,
        `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`,
      )
    },
  }),
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
app.use('/uploads', express.static(uploadsDir))
app.use('/api', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/projects', projectsRouter)
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
  (req, res) => {
    res.status(201).json({
      urls: (req.files ?? []).map((file) => `/uploads/${file.filename}`),
    })
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
    app.listen(port, () => {
      console.log(`Admin portal API listening on port ${port}`)
    })
  } catch (err) {
    console.error('Failed to initialize database:', err)
    process.exit(1)
  }
}

start()
