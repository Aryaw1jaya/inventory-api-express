// routes/barang.js
const express = require('express');
const router = express.Router();
const pool = require('../config/mysql');

// Get semua barang
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM barang');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get barang by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM barang WHERE id_barang = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Barang tidak ditemukan' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tambah barang baru
router.post('/', async (req, res) => {
  const { nama, harga, stok, id_cabang, status } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO barang (nama, harga, stok, id_cabang, status) VALUES (?, ?, ?, ?, ?)', [nama, harga, stok, id_cabang, status]);
    res.status(201).json({ message: 'Barang ditambahkan', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update barang
router.put('/:id', async (req, res) => {
  const { nama, harga, stok, status } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE barang SET nama = ?, harga = ?, stok = ?, status = ? WHERE id_barang = ?',
      [nama, harga, stok, status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Barang tidak ditemukan' });
    res.json({ message: 'Barang diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Hapus barang
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM barang WHERE id_barang = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Barang tidak ditemukan' });
    res.json({ message: 'Barang dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
