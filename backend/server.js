import express from 'express'
import multer from 'multer'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import requireAuth from './middleware/requireAuth.js'

const uploadsDir = join(dirname(fileURLToPath(import.meta.url)), 'uploads')
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir)

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
})

const app = express()
app.use(express.json())
app.use('/uploads', express.static(uploadsDir))
app.use('/api', authRouter)
app.use('/api/products', productsRouter)

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

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Admin portal API listening on port ${port}`)
})
