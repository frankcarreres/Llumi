// controllers/authController.js
const pool = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  try {
    const [usuarios] = await pool.query(
      `SELECT u.*, c.nombre AS centro FROM usuarios u
                                               JOIN centros c ON u.id_centro = c.id_centro
       WHERE u.email = ?`,
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'El usuario no existe.' });
    }

    const usuario = usuarios[0];
    const match = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!match) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos.' });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        rol: usuario.rol,
        nombre: usuario.nombre,
        curso: usuario.curso,
        centro: usuario.centro,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.verificarEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email requerido" });

  try {
    const [usuarios] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);

    if (usuarios.length === 0) {
      return res.status(404).json({ error: "Correo no registrado" });
    }

    res.status(200).json({ existe: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};