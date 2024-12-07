// data/db.js
const { Pool } = require('pg');
const dbConfig = require('../config/dbConfig');
const pool = new Pool(dbConfig);

async function addWord(german, english, type, level = null, article = null) {
  // Validate required fields
  if (!german || !english || !type) {
    throw new Error('Missing required fields: german, english, and type are required.');
  }
  
  // Trim and ensure they are not empty strings
  const trimmedGerman = german.trim();
  const trimmedEnglish = english.trim();
  const trimmedType = type.trim();

  if (trimmedGerman.length === 0 || trimmedEnglish.length === 0 || trimmedType.length === 0) {
    throw new Error('german, english, and type cannot be empty strings.');
  }

  const query = `
    INSERT INTO words (german, english, type, level, article)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  
  const values = [trimmedGerman, trimmedEnglish, trimmedType, level, article];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error(`Database error inserting word: ${err.message}`);
    // Rethrow with a custom message if you’d like
    throw new Error('Failed to insert word into the database.');
  }
}

async function getAllWords() {
    try {
        const result = await pool.query('SELECT * FROM words');
        return result.rows;
    } catch (error) {
        console.error(error);
        throw new Error('Database query failed');
    }
}
  
module.exports = {
  addWord,
  getAllWords,
};
