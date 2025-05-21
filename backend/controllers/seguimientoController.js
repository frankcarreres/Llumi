const {
  insertarSeguimiento,
  fetchSeguimientosByDenuncia
} = require('../services/seguimientoService');

exports.guardarSeguimiento = async (req, res) => {
  const { id_denuncia } = req.params;
  const idDenunciaNum = parseInt(id_denuncia, 10);

  const { comentario } = req.body;

  if (!comentario) {
    return res.status(400).json({ error: "El comentario es obligatorio." });
  }

  try {
    const nuevo = await insertarSeguimiento({
      id_denuncia: idDenunciaNum,
      comentario
    });

    return res.status(201).json({
      mensaje: "Seguimiento guardado correctamente",
      seguimiento: nuevo
    });
  } catch (error) {
    console.error('guardarSeguimiento:', error);
    return res.status(500).json({ error: 'Error al guardar el seguimiento.' });
  }
};

exports.getSeguimientosPorDenuncia = async (req, res) => {
  const { id_denuncia } = req.params;
  const idDenunciaNum = parseInt(id_denuncia, 10);

  if (isNaN(parseInt(id_denuncia, 10))) {
    return res.status(400).json({ error: "ID de denuncia inválido." });
  }

  try {
    const seguimientos = await fetchSeguimientosByDenuncia(idDenunciaNum);

    if (seguimientos.length === 0) {
      return res.status(404).json({ error: "No hay seguimientos para esta denuncia." });
    }

    return res.json({ seguimientos });
  } catch (error) {
    console.error('getSeguimientosPorDenuncia:', error);
    return res.status(500).json({ error: 'Error al obtener los seguimientos.' });
  }
};
