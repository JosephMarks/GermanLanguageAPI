require('dotenv').config(); // Load environment variables from .env file

const dbConfig = {
    user: process.env.PGUSER || 'default_user',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'default_database',
    password: process.env.PGPASSWORD || 'default_password',
    port: process.env.PGPORT || 5432,
};

module.exports = dbConfig;
