# Music Lab Database Setup

How the Music Lab admin (video/audio uploads) gets its database. This project uses **one**
shared PostgreSQL instance for everything (products, resume templates, leaderboard, memory wall,
blog, and Music Lab) — there is no separate database to provision for Music Lab specifically.
Uploaded media files themselves live in Supabase Storage, not Postgres (see part 2 below).

## Part 1 — Postgres (item metadata)

### 1. Get a Postgres connection string

Any Postgres instance works — a local install, or a free hosted one (Render, Neon, Supabase,
etc.). You need a connection string in this format:

```
postgres://user:password@host:port/database
```

### 2. Create `backend/.env`

The backend reads its env vars from `backend/.env` (see `npm run server` in
[package.json](package.json), which runs `node --env-file=backend/.env backend/server.js`). This
file is gitignored — create it yourself, using [.env.example](.env.example) as the template.

### 3. Start the backend — schema creates itself

Nothing to run by hand. [backend/server.js](backend/server.js) calls `initSchema()`
([backend/db.js](backend/db.js)) on startup, which runs `CREATE TABLE IF NOT EXISTS` for every
table the app needs, including `musicLabItems`:

```sql
CREATE TABLE IF NOT EXISTS musicLabItems (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,           -- 'video' or 'track'
  title TEXT NOT NULL,
  album TEXT,
  duration REAL NOT NULL DEFAULT 0,
  mediaUrl TEXT NOT NULL,        -- Supabase Storage public URL for the video/audio file
  thumbnailUrl TEXT,             -- Supabase Storage public URL for the optional thumbnail
  createdAt TEXT NOT NULL
)
```

Start it with:

```bash
npm run server
```

or, to run backend + frontend together:

```bash
npm run dev:all
```

Confirm it worked — the terminal should log `Database schema initialized`. Re-running the
server is always safe; `CREATE TABLE IF NOT EXISTS` is idempotent and won't touch existing data.

## Part 2 — Supabase Storage (the media files)

Postgres only stores the item's metadata and the resulting file URL — the actual video/audio
files live in a Supabase Storage bucket, uploaded through its S3-compatible API
([backend/supabaseStorageClient.js](backend/supabaseStorageClient.js)).

### 1. Create a Supabase project

Sign up at [supabase.com](https://supabase.com) (free tier, no card required) and create a new
project.

### 2. Create the storage bucket

1. In the project dashboard, go to **Storage**.
2. Click **New bucket**, name it (e.g. `music-lab`).
3. Toggle it **Public** — the app stores plain public URLs in Postgres, so the bucket must serve
   files without a signed URL.

### 3. Enable the S3 connection and get credentials

1. From inside the bucket's **Storage** page, click **S3** under **CONFIGURATION** in the left
   sidebar (not Project Settings — S3 Connection lives inside Storage itself).
2. Copy the **Endpoint** and **Region** shown there. The endpoint uses a different subdomain
   (`*.storage.supabase.co`) than your project URL (`*.supabase.co`) — copy it exactly, don't
   derive it.
3. Under **Access keys**, click **New access key** to generate an S3-compatible **Access Key ID**
   and **Secret Access Key**. Copy both now — the secret is only shown once.
4. Go to **Project Settings > Data API** and copy the **Project URL**
   (`https://your-project-ref.supabase.co`) — this is separate from the S3 endpoint and is used
   for building the public file URLs stored in Postgres.

### 4. Fill in `backend/.env`

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_S3_ENDPOINT=https://your-project-ref.storage.supabase.co/storage/v1/s3
SUPABASE_S3_REGION=your-project-region
SUPABASE_S3_ACCESS_KEY_ID=your-supabase-s3-access-key-id
SUPABASE_S3_SECRET_ACCESS_KEY=your-supabase-s3-secret-access-key
SUPABASE_BUCKET_NAME=music-lab
```

## Verify

1. Go to `localhost:5173/admin` (or the hidden `/admin` Terminal command on the desktop) and log
   in.
2. Open the **Music Lab** section in the admin nav.
3. Upload a test video or track. A successful upload confirms both the `musicLabItems` table and
   the Supabase credentials are wired up correctly — the row lands in Postgres, the file lands in
   the Supabase bucket.

Rows are served back at `GET /api/music-lab` ([backend/routes/musicLab.js](backend/routes/musicLab.js))
and consumed by the public [MusicLabApp](src/components/MusicLabApp.jsx).
