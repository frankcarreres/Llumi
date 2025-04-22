const pool = require('../models/db');

exports.getDenuncias =  async (req, res) => {
  try {
    // Espera el id del centro del token
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

exports.updateEstado = async (req, res) => {
  try {
    const { id_centro } = req.user; // Se obtiene el id_centro del token
    // Se espera que venga el id de la denuncia por parámetros y el nuevo estado en el body
    const { id_denuncia } = req.params;
    const { estado } = req.body;

    if (!id_denuncia || !estado) {
      return res.status(400).json({ error: 'El id de la denuncia y el nuevo estado son requeridos.' });
    }

    // Verifica que la denuncia exista y que pertenezca al centro autenticado
    const [denunciaExistente] = await pool.query(
        'SELECT * FROM denuncias WHERE id_denuncia = ? AND id_centro = ?',
        [id_denuncia, id_centro]
    );

    if (denunciaExistente.length === 0) {
      return res.status(404).json({ error: 'Denuncia no encontrada o no pertenece al centro.' });
    }

    // Se actualiza la denuncia con el nuevo estado
    const [result] = await pool.query(
        'UPDATE denuncias SET estado = ? WHERE id_denuncia = ? AND id_centro = ?',
        [estado, id_denuncia, id_centro]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: 'No se pudo actualizar el estado.' });
    }

    res.json({ message: 'Estado actualizado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};