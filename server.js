// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const barangRoutes = require('./routes/barang');
const userRoutes = require('./routes/user');

// Middleware untuk parsing JSON
app.use(express.json());

// Routing Barang
app.use('/api/barang', barangRoutes);

// Routing User
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});