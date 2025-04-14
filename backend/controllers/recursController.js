const pool = require('../models/db');
const axios = require('axios');
require('dotenv').config();

exports.syncNoticias = async (req, res) => {
    const API_KEY = process.env.MEDIASTACK_API_KEY;
    const ID_USUARIO_ADMIN = 1;

    try {
        const response = await axios.get("http://api.mediastack.com/v1/news", {
            params: {
                access_key: API_KEY,
                keywords: "acoso escolar",
                languages: "es",
                countries: "ES",
                sort: "published_desc",
            },
        });

        const noticias = response.data.data;
        const connection = await pool.getConnection();

        let guardadas = 0;
        for (const noticia of noticias) {
            // Comprobamos si ya existe por la URL
            const [existe] = await connection.query(
                "SELECT id_recurso FROM recursos WHERE url = ?",
                [noticia.url]
            );

            if (existe.length === 0) {
                await connection.query(
                    `INSERT INTO recursos 
            (titulo, tipo, contenido, fecha_publicacion, id_usuario, url, img)
           VALUES (?, 'artículo', ?, ?, ?, ?, ?)`,
                    [
                        noticia.title,
                        noticia.description || "Sin descripción",
                        new Date(noticia.published_at || Date.now()),
                        ID_USUARIO_ADMIN,
                        noticia.url,
                        noticia.image || null,
                    ]
                );
                guardadas++;
            }
        }

        connection.release();

        res.json({
            message: `Se han sincronizado ${guardadas} noticias correctamente.`,
        });
    } catch (error) {
        console.error("Error al sincronizar noticias:", error);
        res.status(500).json({ error: "Error al sincronizar noticias" });
    }
};

exports.getNoticias = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        // Consulta a la base de datos para obtener las noticias de tipo 'artículo'
        const [rows] = await connection.query("SELECT * FROM recursos WHERE tipo = 'artículo'");
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener noticias de tipo 'artículo':", error);
        res.status(500).json({ error: "Error al obtener noticias de tipo 'artículo'" });
    }
};

