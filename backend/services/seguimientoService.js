const pool = require('../models/db');

async function insertarSeguimiento({ id_denuncia, comentario }) {
  const [result] = await pool.query(
    `INSERT INTO seguimiento_denuncia 
      (id_denuncia, comentario, fecha) 
     VALUES (?,  ?, NOW())`,
    [id_denuncia, comentario]
  );

  // Recuperar el seguimiento recién insertado
  const [rows] = await pool.query(
    `SELECT id_seguimiento, id_denuncia, comentario, fecha
       FROM seguimiento_denuncia
      WHERE id_seguimiento = ?`,
    [result.insertId]
  );

  return rows[0];
}

async function fetchSeguimientosByDenuncia(id_denuncia) {
  const [rows] = await pool.query(
    `SELECT s.id_seguimiento, s.id_denuncia, s.comentario, s.fecha
     FROM seguimiento_denuncia s
     WHERE s.id_denuncia = ?
     ORDER BY s.id_seguimiento DESC `,
    [id_denuncia]
  );

  return rows;
}

module.exports = {
  insertarSeguimiento,
  fetchSeguimientosByDenuncia
};
