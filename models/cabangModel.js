const pool = require('../config/mysql');

exports.getAllCabang = async () => {
    const [rows] = await pool.query('SELECT * FROM cabang');
    return rows;
};

exports.findCabangById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM cabang WHERE id_cabang = ?', [id]);
    return rows[0];
};

exports.findCabangByName = async (nama) => {
    const [rows] = await pool.query('SELECT * FROM cabang WHERE nama = ?', [nama]);
    return rows[0];
};

exports.findCabangByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM cabang WHERE email = ?', [email]);
    return rows[0];
};

exports.createCabang = async (nama, alamat, kota, provinsi, email, password) => {
    await pool.query('INSERT INTO cabang (nama, alamat, kota, provinsi, email, password) VALUES (?, ?, ?, ?, ?, ?)', [nama, alamat, kota, provinsi, email, password]);
};

exports.updateCabang = async (id, nama, alamat, kota, provinsi, email, password) => {
    await pool.query('UPDATE cabang SET nama = ?, alamat = ?, kota = ?, provinsi = ?, email = ?, password = ? WHERE id_cabang = ?', [id, nama, alamat, kota, provinsi, email, password]);
};

exports.deleteCabang = async (id) => {
    await pool.query('DELETE FROM cabang WHERE id_cabang = ?', [id]);
};

