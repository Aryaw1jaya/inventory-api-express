const pool = require('../config/mysql');

// Lihat semua user
exports.getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
};

// Cari user berdasarkan email
exports.findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

// Buat user baru
exports.createUser = async (name, email, password) => {
  await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
};
