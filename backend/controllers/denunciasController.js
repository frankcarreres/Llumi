// controllers/denunciasController.js
const pool = require('../models/db');
const {
  fetchDenunciasPorCentro,
  fetchDenunciaById,
  updateEstadoDenuncia,
} = require('../services/denunciasService');

exports.guardarDenuncia = async (req, res) => {
  const { id_usuario, id_centro, datosDenuncia } = req.body;

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
