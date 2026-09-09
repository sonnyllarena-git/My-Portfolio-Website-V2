import pg from 'pg'
import { gameRatingSeeds } from './gameRatingSeeds.js'
import {
  mockPlayCounts,
  mockLeaderboardSeeds,
  mockRatingSeedsV2,
} from './mockArcadeData.js'
import { memoryWallSeeds } from './memoryWallSeeds.js'
import { memoryWallMockPosts } from './memoryWallMockPosts.js'
import { galleryArtworkSeeds } from './galleryArtworkSeeds.js'
import { buildBlogMockData } from './blogMockData.js'
import { loadLegacyProjectSeeds } from './legacyProjectSeeds.js'
import { generateProjectCode } from './projectCode.js'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

async function initSchema() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
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
        published INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS resumeTemplates (
        id SERIAL PRIMARY KEY,
        code TEXT UNIQUE,
        templateKey TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        thumbnailUrl TEXT,
        accentHex TEXT,
        published INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS leaderboardScores (
        id SERIAL PRIMARY KEY,
        gameId TEXT NOT NULL,
        name TEXT NOT NULL,
        score INTEGER NOT NULL,
        label TEXT,
        createdAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_leaderboard_game_score
      ON leaderboardScores (gameId, score)
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS gameRatings (
        id SERIAL PRIMARY KEY,
        gameId TEXT NOT NULL,
        name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        createdAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_ratings_game
      ON gameRatings (gameId)
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS gameStats (
        gameId TEXT PRIMARY KEY,
        totalPlays INTEGER NOT NULL DEFAULT 0
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS memoryWallNotes (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        rating INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_memorywallnotes_created
      ON memoryWallNotes (createdAt DESC)
    `)

    const memoryWallCount = await client.query(
      'SELECT COUNT(*) FROM memoryWallNotes',
    )
    if (Number(memoryWallCount.rows[0].count) === 0) {
      for (const seed of memoryWallSeeds) {
        await client.query(
          'INSERT INTO memoryWallNotes (name, message, rating, createdAt) VALUES ($1, $2, $3, $4)',
          [seed.name, seed.message, seed.rating, seed.timestamp],
        )
      }
    }

    await client.query(`
      CREATE TABLE IF NOT EXISTS visitorArtworks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        imageData TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_visitorartworks_created
      ON visitorArtworks (createdAt DESC)
    `)

    const visitorArtworksCount = await client.query(
      'SELECT COUNT(*) FROM visitorArtworks',
    )
    if (Number(visitorArtworksCount.rows[0].count) === 0) {
      for (const seed of galleryArtworkSeeds) {
        await client.query(
          'INSERT INTO visitorArtworks (title, author, imageData, createdAt) VALUES ($1, $2, $3, $4)',
          [seed.title, seed.author, seed.imageData, seed.timestamp],
        )
      }
    }

    await client.query(`
      CREATE TABLE IF NOT EXISTS blogLikes (
        id SERIAL PRIMARY KEY,
        postId TEXT NOT NULL,
        name TEXT NOT NULL,
        avatarColor TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        UNIQUE(postId, name)
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_bloglikes_post
      ON blogLikes (postId)
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS blogComments (
        id SERIAL PRIMARY KEY,
        postId TEXT NOT NULL,
        name TEXT NOT NULL,
        avatarColor TEXT NOT NULL,
        text TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_blogcomments_post
      ON blogComments (postId)
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS blogActivity (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        avatarColor TEXT NOT NULL,
        postId TEXT,
        createdAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_blogactivity_created
      ON blogActivity (createdAt DESC)
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS musicLabItems (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        artist TEXT,
        album TEXT,
        duration REAL NOT NULL DEFAULT 0,
        mediaUrl TEXT NOT NULL,
        thumbnailUrl TEXT,
        createdAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_musiclabitems_created
      ON musicLabItems (createdAt DESC)
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS contactInquiries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        read BOOLEAN NOT NULL DEFAULT false,
        createdAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_contactinquiries_created
      ON contactInquiries (createdAt DESC)
    `)

    const ratingsCount = await client.query('SELECT COUNT(*) FROM gameRatings')
    if (Number(ratingsCount.rows[0].count) === 0) {
      for (const [gameId, seeds] of Object.entries(gameRatingSeeds)) {
        for (const seed of seeds) {
          await client.query(
            'INSERT INTO gameRatings (gameId, name, rating, comment, createdAt) VALUES ($1, $2, $3, $4, $5)',
            [gameId, seed.name, seed.rating, seed.comment, seed.timestamp],
          )
        }
      }
    }

    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        code TEXT UNIQUE,
        title TEXT NOT NULL,
        description TEXT,
        techStack TEXT,
        category TEXT,
        projectLink TEXT,
        tags TEXT,
        photoUrl TEXT,
        published INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS projectCategories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        createdAt TEXT NOT NULL
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS adminCredentials (
        id INTEGER PRIMARY KEY DEFAULT 1,
        passwordHash TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        CHECK (id = 1)
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_version (
        id SERIAL PRIMARY KEY,
        version INT NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    const versionCheck = await client.query(
      'SELECT version FROM schema_version WHERE version = 1',
    )

    if (versionCheck.rows.length === 0) {
      await client.query(
        'ALTER TABLE products ADD COLUMN IF NOT EXISTS published INTEGER NOT NULL DEFAULT 0',
      )
      await client.query('INSERT INTO schema_version (version) VALUES (1)')
    }

    const versionCheck2 = await client.query(
      'SELECT version FROM schema_version WHERE version = 2',
    )

    if (versionCheck2.rows.length === 0) {
      for (const [gameId, totalPlays] of Object.entries(mockPlayCounts)) {
        await client.query(
          `INSERT INTO gameStats (gameId, totalPlays) VALUES ($1, $2)
           ON CONFLICT (gameId) DO NOTHING`,
          [gameId, totalPlays],
        )
      }

      for (const [gameId, rows] of Object.entries(mockLeaderboardSeeds)) {
        for (const row of rows) {
          await client.query(
            'INSERT INTO leaderboardScores (gameId, name, score, label, createdAt) VALUES ($1, $2, $3, $4, $5)',
            [gameId, row.name, row.score, null, row.createdAt],
          )
        }
      }

      for (const [gameId, ratings] of Object.entries(mockRatingSeedsV2)) {
        for (const rating of ratings) {
          await client.query(
            'INSERT INTO gameRatings (gameId, name, rating, comment, createdAt) VALUES ($1, $2, $3, $4, $5)',
            [
              gameId,
              rating.name,
              rating.rating,
              rating.comment,
              rating.timestamp,
            ],
          )
        }
      }

      await client.query('INSERT INTO schema_version (version) VALUES (2)')
    }

    const versionCheck3 = await client.query(
      'SELECT version FROM schema_version WHERE version = 3',
    )

    if (versionCheck3.rows.length === 0) {
      for (const post of memoryWallMockPosts) {
        await client.query(
          'INSERT INTO memoryWallNotes (name, message, rating, createdAt) VALUES ($1, $2, $3, $4)',
          [post.name, post.message, post.rating, post.timestamp],
        )
      }

      await client.query('INSERT INTO schema_version (version) VALUES (3)')
    }

    const versionCheck4 = await client.query(
      'SELECT version FROM schema_version WHERE version = 4',
    )

    if (versionCheck4.rows.length === 0) {
      const { interactionsByPost, activity } = buildBlogMockData()
      const seedTimestamp = new Date().toISOString()

      for (const [postId, data] of Object.entries(interactionsByPost)) {
        for (const like of data.likes) {
          await client.query(
            `INSERT INTO blogLikes (postId, name, avatarColor, createdAt)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (postId, name) DO NOTHING`,
            [postId, like.name, like.avatarColor, seedTimestamp],
          )
        }
        for (const comment of data.comments) {
          await client.query(
            'INSERT INTO blogComments (postId, name, avatarColor, text, createdAt) VALUES ($1, $2, $3, $4, $5)',
            [
              postId,
              comment.name,
              comment.avatarColor,
              comment.text,
              comment.timestamp,
            ],
          )
        }
      }

      for (const entry of activity) {
        await client.query(
          'INSERT INTO blogActivity (type, name, avatarColor, postId, createdAt) VALUES ($1, $2, $3, $4, $5)',
          [
            entry.type,
            entry.name,
            entry.avatarColor,
            entry.postId,
            entry.timestamp,
          ],
        )
      }

      await client.query('INSERT INTO schema_version (version) VALUES (4)')
    }

    const versionCheck5 = await client.query(
      'SELECT version FROM schema_version WHERE version = 5',
    )

    if (versionCheck5.rows.length === 0) {
      await client.query(
        'ALTER TABLE musicLabItems ADD COLUMN IF NOT EXISTS artist TEXT',
      )
      await client.query('INSERT INTO schema_version (version) VALUES (5)')
    }

    const versionCheck6 = await client.query(
      'SELECT version FROM schema_version WHERE version = 6',
    )

    if (versionCheck6.rows.length === 0) {
      const now = new Date().toISOString()
      for (const seed of loadLegacyProjectSeeds()) {
        const insertResult = await client.query(
          `INSERT INTO projects
             (title, description, techStack, category, projectLink, tags, photoUrl, published, createdAt, updatedAt)
           VALUES ($1, $2, $3, $4, $5, $6, $7, 1, $8, $8)
           RETURNING id`,
          [
            seed.title,
            seed.description,
            seed.techStack,
            seed.category,
            seed.projectLink,
            JSON.stringify(seed.tags),
            seed.photoUrl,
            now,
          ],
        )
        await client.query('UPDATE projects SET code = $1 WHERE id = $2', [
          generateProjectCode(insertResult.rows[0].id),
          insertResult.rows[0].id,
        ])
      }
      await client.query('INSERT INTO schema_version (version) VALUES (6)')
    }

    const versionCheck7 = await client.query(
      'SELECT version FROM schema_version WHERE version = 7',
    )

    if (versionCheck7.rows.length === 0) {
      const now = new Date().toISOString()
      const legacyCategories = [
        'Software Dev',
        'Mobile Apps',
        'AI & Smart System',
        'Website and Portal',
        'Atlassian & Workplace System',
        'Workflow Automation',
        'IT & Systems Administration',
      ]
      for (const name of legacyCategories) {
        await client.query(
          `INSERT INTO projectCategories (name, createdAt) VALUES ($1, $2)
           ON CONFLICT (name) DO NOTHING`,
          [name, now],
        )
      }
      await client.query('INSERT INTO schema_version (version) VALUES (7)')
    }

    console.log('Database schema initialized')
  } finally {
    client.release()
  }
}

export { pool, initSchema }
