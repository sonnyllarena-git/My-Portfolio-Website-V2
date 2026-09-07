import pg from 'pg'

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

    console.log('Database schema initialized')
  } finally {
    client.release()
  }
}

export { pool, initSchema }
