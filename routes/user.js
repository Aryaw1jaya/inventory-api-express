const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register
router.post('/register', userController.registerUser);

// Login
router.post('/login', userController.loginUser);

// Get all users
router.get('/', userController.getAllUsers);

module.exports = router;
