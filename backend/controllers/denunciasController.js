// controllers/denunciasController.js
const pool = require('../models/db');
const {
  fetchDenunciasPorCentro,
  fetchDenunciaById,
  updateEstadoDenuncia,
  fetchDenunciasPorId,
} = require('../services/denunciasService');

exports.guardarDenuncia = async (req, res) => {
  console.log(req.user)
  const { id_centro, datosDenuncia } = req.body;
  const { id_usuario} = req.user;

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

  console.log(datosDenuncia);

  try {
    const [result] = await pool.query(
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

    const id_denuncia = result.insertId;

    return res.status(201).json({
      mensaje: "Denuncia guardada correctamente.",
      id_denuncia
    });
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor al guardar la denuncia", detalle: err.message });
  }
};

exports.getDenuncias = async (req, res) => {
  const { id_centro } = req.user;
  // opcional: si quieres filtrar por estado en query string
  const { estado }    = req.query;

  try {
    const denuncias = await fetchDenunciasPorCentro(id_centro, estado);

    if (denuncias.length === 0) {
      return res
          .status(404)
          .json({ error: 'No se encontraron denuncias para este centro.' });
    }

    return res.json({ denuncias });
  } catch (error) {
    console.error('getDenuncias:', error);
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
};

exports.getDenunciasPorId = async (req, res) => {
  const { id_centro }  = req.user;
  const id_denunciaRaw = req.params.id_denuncia;
  const id_denuncia    = parseInt(id_denunciaRaw, 10);

  if (isNaN(id_denuncia)) {
    return res.status(400).json({ error: 'ID de denuncia inválido.' });
  }

  try {
    const denuncia = await fetchDenunciaById(id_denuncia, id_centro);
    if (!denuncia) {
      return res
          .status(404)
          .json({ error: 'Denuncia no encontrada o no autorizada.' });
    }
    return res.json({ denuncia });
  } catch (error) {
    console.error('getDenunciasPorId:', error);
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
};

exports.updateEstado = async (req, res) => {
  const { id_centro }  = req.user;
  const id_denunciaRaw = req.params.id_denuncia;
  const { estado }     = req.body;
  const id_denuncia    = parseInt(id_denunciaRaw, 10);

  if (isNaN(id_denuncia) || !estado) {
    return res
        .status(400)
        .json({ error: 'ID de denuncia y nuevo estado son obligatorios.' });
  }

  try {
    // No necesitamos SELECT previo, hacemos el UPDATE directo
    const ok = await updateEstadoDenuncia(id_denuncia, id_centro, estado);
    if (!ok) {
      return res
          .status(404)
          .json({ error: 'Denuncia no encontrada o no autorizada.' });
    }
    return res.json({ message: 'Estado actualizado correctamente.' });
  } catch (error) {
    console.error('updateEstado:', error);
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
};

exports.getResultadoTestAutoevaluacion = async (req, res) => {
  const { id_usuario } = req.user; // Obtenemos el id_usuario de los parámetros de la URL

  if (!id_usuario) {
    return res.status(400).json({ error: "El ID de usuario es obligatorio." });
  }

  try {
    // Realizamos la consulta para obtener el resultado del test de autoevaluación
    const [rows] = await pool.query(
        "SELECT resultado FROM test_autoevaluacion WHERE id_usuario = ? LIMIT 1",
        [id_usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "No se encontró el resultado para este usuario." });
    }

    // Devolver solo el valor de 'resultado', no un objeto JSON
    return res.json({ resultado: rows[0].resultado });
  } catch (err) {
    console.error("Error al obtener el resultado del test de autoevaluación:", err);
    return res.status(500).json({ error: "Error en el servidor." });
  }
};

exports.getDenunciasPorId = async (req, res) => {
  const { id_usuario } = req.user;

  try {
    const denuncias = await fetchDenunciasPorId(id_usuario);

    if (denuncias.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron denuncias para este usuario.' });
    }

    return res.json({ denuncias });
  } catch (error) {
    console.error('getDenunciasPorId:', error);
    return res.status(500).json({ error: 'Error al obtener las denuncias del usuario.' });
  }
};


