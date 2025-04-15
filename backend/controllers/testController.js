// controllers/testController.js
const pool = require('../models/db');

exports.guardarTest = async (req, res) => {
  const id_usuario = req.user?.id_usuario;
  const { respuestas, resultado } = req.body;

  if (!id_usuario || !respuestas || !resultado) {
    return res.status(400).json({ error: "Faltan datos." });
  }

  try {
    await pool.query(
      `INSERT INTO test_autoevaluacion (id_usuario, respuestas, resultado)
       VALUES (?, ?, ?)`,
      [id_usuario, JSON.stringify(respuestas), resultado]
    );

    res.status(201).json({ mensaje: "Test guardado correctamente." });
  } catch (err) {
    console.error("Error al guardar el test:", err);
    res.status(500).json({ error: "Error en el servidor al guardar el test." });
  }
};
