// controllers/denunciasController.js
const pool = require('../models/db');

exports.guardarDenuncia = async (req, res) => {
  const { id_usuario, id_centro, datosDenuncia } = req.body;

  console.log("🟡 BODY recibido:", req.body);
  console.log("🟡 DATOS de denuncia:", datosDenuncia);

  if (!id_usuario || !id_centro || !datosDenuncia) {
    return res.status(400).json({ error: "Faltan datos obligatorios." });
  }

  const {
    tipo_acoso,
    descripcion,
    evidencias,
    es_testigo,
    nombre_victima,
    relacion_victima,
    nombre_acosador,
    testigos,
    nombre_testigo_extra,
    intervencion_docente,
    nombre_docente
  } = datosDenuncia;

  try {
    console.log("📥 Intentando insertar en la BBDD...");
    await pool.query(
      `INSERT INTO denuncias (
          id_usuario, id_centro, tipo_acoso, descripcion, evidencias,
          es_testigo, nombre_victima, relacion_victima, nombre_acosador,
          testigos, nombre_testigo_extra, intervencion_docente, nombre_docente, estado
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pendiente')`,
      [
        id_usuario, id_centro, tipo_acoso, descripcion, evidencias,
        es_testigo, nombre_victima, relacion_victima, nombre_acosador,
        testigos, nombre_testigo_extra, intervencion_docente, nombre_docente
      ]
    );

    res.status(201).json({ mensaje: "Denuncia guardada correctamente." });
  } catch (err) {
    console.error("❌ Error al guardar la denuncia:", err.message);
    console.error("❌ Datos que fallaron:", [
      id_usuario, id_centro, tipo_acoso, descripcion, evidencias,
      es_testigo, nombre_victima, relacion_victima, nombre_acosador,
      testigos, nombre_testigo_extra, intervencion_docente, nombre_docente
    ]);
    res.status(500).json({ error: "Error en el servidor al guardar la denuncia", detalle: err.message });
  }
};
