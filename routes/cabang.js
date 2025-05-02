const express = require('express');
const router = express.Router();
const pool = require('../config/mysql');
const controller = require('../controllers/cabangController');

// Get all cabang
router.get('/', controller.getAllCabang);

// Register cabang
router.post('/register', controller.registerCabang);

// Login cabang
router.post('/login', controller.loginCabang);

// Delete cabang
router.delete('/delete', controller.deleteCabang);

// Update cabang
router.put('/update', controller.updateCabang);

module.exports = router;