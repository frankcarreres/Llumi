// controllers/authController.js
const pool = require("../models/db");
const bcrypt = require("bcryptjs");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getUsuarioPorId = async (req, res, next) => {
  const { id_usuario }  = req.user;

  try{
    const [rows] = await pool.query(
      'SELECT u.nombre, apellido, email, curso, c.nombre AS centro FROM usuarios u  JOIN centros c ON u.id_centro = c.id_centro WHERE id_usuario = ? ',
      [id_usuario]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "No se ha encontrado ningun usuario." });
    }
    return res.json(rows);
  }catch (error){
    return next (error);
  }
};