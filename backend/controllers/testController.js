// controllers/testController.js
const pool = require('../models/db');
const { fetchDenunciaById } = require("../services/denunciasService");

exports.guardarTest = async (req, res) => {
  const id_usuario = req.user?.id_usuario;
  const { respuestas, resultado } = req.body;

  if (!id_usuario || !respuestas || !resultado) {
    return res.status(400).json({ error: "Faltan datos." });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO test_autoevaluacion (id_usuario, respuestas, resultado)
       VALUES (?, ?, ?)`,
      [id_usuario, JSON.stringify(respuestas), resultado]
    );
    const id_test = result.insertId;

    return res.status(201).json({
      mensaje: "Test guardado correctamente.",
      id_test
    });
  } catch (err) {
    console.error("Error al guardar el test:", err);
    res.status(500).json({ error: "Error en el servidor al guardar el test." });
  }
};

exports.vincularDenuncia = async (req, res) => {
  const id_test     = req.params.id_test;
  const { id_denuncia } = req.body;

  if (!id_test || !id_denuncia) {
    return res.status(400).json({ error: "Faltan id_test o id_denuncia." });
  }

  try {
    const [result] = await pool.query(
      `UPDATE test_autoevaluacion
         SET Denuncia = ?
       WHERE id_test = ?`,
      [ id_denuncia, id_test ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Test no encontrado." });
    }

    return res.status(200).json({ mensaje: "Test actualizado correctamente." });
  } catch (err) {
    console.error("Error al vincular denuncia:", err);
    return res.status(500).json({ error: "Error en el servidor al vincular la denuncia." });
  }
};

exports.getTestPorIdUsuario = async (req, res, next) => {
  const { id_usuario }  = req.user;

  try{
    const [rows] = await pool.query(
      'SELECT id_test,resultado,fecha_realizacion,Denuncia FROM test_autoevaluacion WHERE id_usuario = ?',
      [id_usuario]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "No se han encontrado test de este usuario." });
    }
    return res.json(rows);
  }catch (error){
    return next (error);
  }
};