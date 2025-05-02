const cabangModel = require('../models/cabangModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Lihat semua cabang
exports.getAllCabang = async (req, res) => {
    try {
        const rows = await cabangModel.getAllCabang();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// register cabang
exports.registerCabang = async (req, res) => {
    try {
        const { nama, alamat, kota, provinsi, email, password } = req.body;

        const cabang = await cabangModel.findCabangByEmail(email);
        if (cabang) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await cabangModel.createCabang(nama, alamat, kota, provinsi, email, hashedPassword);

        res.status(201).json({ message: 'Cabang berhasil didaftarkan' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update cabang
exports.updateCabang = async (req, res) => {
    try {
        const { id, nama, alamat, kota, provinsi, email} = req.body;
        await cabangModel.updateCabang(id, nama, alamat, kota, provinsi, email);
        res.status(201).json({ message: 'Cabang berhasil diperbarui' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update password
exports.updatePassword = async (req, res) => {
    try {
        const { id, password } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await cabangModel.updatePassword(id, hashedPassword);
        res.status(201).json({ message: 'Password berhasil diperbarui' });
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};

// delete cabang
exports.deleteCabang = async (req, res) => {
    try {
        const { id } = req.body;
        await cabangModel.deleteCabang(id);
        res.status(201).json({ message: 'Cabang berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// login Cabang
exports.loginCabang = async (req, res) => {
    try {
        const { email, password } = req.body;
        const cabang = await cabangModel.findCabangByEmail(email);
        if (!cabang) {
            return res.status(400).json({ message: 'Email tidak ditemukan' });
        }
        const isMatch = await bcrypt.compare(password, cabang.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password salah' });
        }
        const token = jwt.sign({ id: cabang.id, email: cabang.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({
            message: 'Login berhasil',
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};