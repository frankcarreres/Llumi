// controllers/authController.js
const pool = require("../models/db");
const bcrypt = require("bcryptjs");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  try {
    const [usuarios] = await pool.query(
      `SELECT u.*, c.nombre AS centro
       FROM usuarios u
                JOIN centros c ON u.id_centro = c.id_centro
       WHERE u.email = ?`,
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ error: "El usuario no existe." });
    }

    const usuario = usuarios[0];
    let match = false;

    if (usuario.contrasena.startsWith("$2")) {
      match = await bcrypt.compare(contrasena, usuario.contrasena);
    } else {
      if (md5(contrasena) === usuario.contrasena) {
        match = true;
      }
    }
    if (!match) {
      return res.status(401).json({ error: "ID de usuario o contraseña incorrectos." });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        id_centro: usuario.id_centro,
        rol: usuario.rol,
        nombre: usuario.nombre,
        curso: usuario.curso,
        centro: usuario.centro
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
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

exports.loginCentro = async (req, res) => {
  const { id_centro, contrasena } = req.body;

  if (!id_centro || !contrasena) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  try {
    const [centros] = await pool.query(
      `SELECT *
       FROM centros
       WHERE id_centro = ?`,
      [id_centro]
    );

    if (centros.length === 0) {
      return res.status(401).json({ error: "El centro no existe." });
    }

    const centro = centros[0];
    let match = false;

    if (centro.contrasena.startsWith("$2")) {
      match = await bcrypt.compare(contrasena, centro.contrasena);
    } else {
      if (md5(contrasena) === centro.contrasena) {
        match = true;
      }
    }
    if (!match) {
      return res.status(401).json({ error: "ID de centro o contraseña incorrectos." });
    }

    const token = jwt.sign(
      {
        id_centro: centro.id_centro,
        nombre: centro.nombre
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      centro: {
        id_centro: centro.id_centro,
        nombre: centro.nombre,
        direccion: centro.direccion,
        telefono: centro.telefono,
        email: centro.email,
        localidad: centro.localidad,
        regimen: centro.regimen,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};