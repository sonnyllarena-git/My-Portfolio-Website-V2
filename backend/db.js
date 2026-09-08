import pg from 'pg'
import { gameRatingSeeds } from './gameRatingSeeds.js'
import {
  mockPlayCounts,
  mockLeaderboardSeeds,
  mockRatingSeedsV2,
} from './mockArcadeData.js'
import { memoryWallSeeds } from './memoryWallSeeds.js'

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

    console.log('Database schema initialized')
  } finally {
    client.release()
  }
}

export { pool, initSchema }
