// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const barangRoutes = require('./routes/barang');
const userRoutes = require('./routes/user');
const cabangRoutes = require('./routes/cabang');

// Middleware untuk parsing JSON
app.use(express.json());

// Routing Barang
app.use('/api/barang', barangRoutes);

// Routing User
// app.use('/api/users', userRoutes);

// Routing Cabang
app.use('/api/cabang', cabangRoutes);

// Middleware untuk error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Middleware untuk halaman tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ message: 'Halaman tidak ditemukan' });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});