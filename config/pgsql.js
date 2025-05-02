const { Pool } = require('pg');

// Bikin koneksi pool
const pool = new Pool({
  port: 5432,              // port default PostgreSQL
  database: 'inventory-api-express',  // nama database
  host: '127.0.0.1',       // host database
  user: 'postgres',       // username Postgres kamu
  password: 'root',  // password postgres kamu
});

// Export supaya bisa dipakai di file lain
module.exports = pool;
