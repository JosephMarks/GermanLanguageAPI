// config/dbSetup.js
require('dotenv').config(); // Make sure to load environment variables before requiring dbConfig
const dbConfig = require('./dbConfig'); // Corrected path
const { Pool } = require('pg');

const pool = new Pool(dbConfig);

console.log('Setting up the database...');

console.log('Environment Variables:', {
    PGUSER: process.env.PGUSER,
    PGHOST: process.env.PGHOST,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT,
  });

async function setupDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS words (
        id SERIAL PRIMARY KEY,
        german TEXT NOT NULL,
        english TEXT NOT NULL,
        type TEXT NOT NULL,
        level TEXT,
        article TEXT,
        count INTEGER DEFAULT 0,
        incorrect INTEGER DEFAULT 0,
        last_viewed TIMESTAMP WITH TIME ZONE,
        correct INTEGER DEFAULT 0,
        skip_count INTEGER DEFAULT 0,
        favorite BOOLEAN DEFAULT FALSE
      );
    `);
    console.log('Table "words" created or already exists.');
  } catch (error) {
    console.error('Error setting up the database:', error);
  } finally {
    pool.end();
  }
}

setupDb();
