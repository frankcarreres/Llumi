const express = require('express');
const pool = require('../models/db'); // Asegúrate de tener configurada la conexión a la base de datos

// Importa tu middleware existente
exports.getDenuncias =  async (req, res) => {
  try {
    // Se espera que al generar el token incluyas id_centro en el payload.
    const { id_centro } = req.user;

    // Consulta a la base de datos para obtener las denuncias asociadas a ese id_centro
    const [denuncias] = await pool.query(
      'SELECT * FROM denuncias WHERE id_centro = ?',
      [id_centro]
    );

    if (denuncias.length === 0) {
      return res.status(404).json({ error: 'No se encontraron denuncias para este centro' });
    }

    res.json({ denuncias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}