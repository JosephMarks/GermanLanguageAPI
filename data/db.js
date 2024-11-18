const { Pool } = require('pg');
const dbConfig = require('../config/dbConfig');

const pool = new Pool(dbConfig);

const getAllWords = async () => {
    try {
        const result = await pool.query('SELECT * FROM words');
        return result.rows;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};

const addWord = async (word, meaning) => {
    try {
        const query = 'INSERT INTO words (word, meaning) VALUES ($1, $2) RETURNING *';
        const result = await pool.query(query, [word, meaning]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to add word: ' + error.message);
    }
};

module.exports = {
    getAllWords,
    addWord,
};
