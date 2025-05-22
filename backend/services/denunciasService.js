// services/denunciasService.js

const pool = require('../models/db');

/**
 * Devuelve todas las denuncias de un centro (y opcionalmente filtradas por estado).
 */
async function fetchDenunciasPorCentro(idCentro, estado) {
    const sql   = estado
        ? 'SELECT * FROM denuncias WHERE id_centro = ? AND estado = ?'
        : 'SELECT * FROM denuncias WHERE id_centro = ?';
    const params = estado ? [idCentro, estado] : [idCentro];
    const [rows] = await pool.query(sql, params);
    return rows;
}

/**
 * Devuelve una denuncia concreta si existe y pertenece al centro.
 */
async function fetchDenunciaById(idDenuncia, idCentro) {
    const [rows] = await pool.query(
        'SELECT * FROM denuncias WHERE id_denuncia = ? AND id_centro = ?',
        [idDenuncia, idCentro]
    );
    return rows[0] || null;
}

/**
 * Actualiza el estado de una denuncia, devolviendo true si lo hizo o false si no encontró nada.
 */
async function updateEstadoDenuncia(idDenuncia, idCentro, nuevoEstado) {
    const [result] = await pool.query(
        'UPDATE denuncias SET estado = ? WHERE id_denuncia = ? AND id_centro = ?',
        [nuevoEstado, idDenuncia, idCentro]
    );
    return result.affectedRows > 0;
}

async function fetchDenunciasPorId(id_usuario) {
    const [rows] = await pool.query(
        `SELECT id_denuncia,estado FROM denuncias WHERE id_usuario = ? ORDER BY id_denuncia DESC`,
        [id_usuario]
    );

    return rows;
}

module.exports = {
    fetchDenunciasPorCentro,
    fetchDenunciaById,
    updateEstadoDenuncia,
    fetchDenunciasPorId
};



