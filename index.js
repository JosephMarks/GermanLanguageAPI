require('dotenv').config(); // Load environment variables
const express = require('express');
const router = require('./routes/api'); // Your router that has /words routes
const dbConfig = require('./config/dbConfig');
const { Pool } = require('pg');

const pool = new Pool(dbConfig);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Simple route to test API
app.get('/', (req, res) => {
    res.send('Hello, API is working!');
});

// Mount your router that handles /words, etc.
app.use('/api', router);

// If you want a direct database route (for testing), you could do:
app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM words');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
