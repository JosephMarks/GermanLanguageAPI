const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL connection setup
const pool = new Pool({
    user: 'your_postgres_user',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_password',
    port: 5432,
});

app.use(express.json());

// Simple route to test API
app.get('/', (req, res) => {
    res.send('Hello, API is working!');
});

// Example route to get data from the database
app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM your_table');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
