const pool = require('../models/db');
require('dotenv').config();

exports.syncNoticias = async (req, res) => {
    const API_KEY = process.env.MEDIASTACK_API_KEY;
    const ID_USUARIO_ADMIN = 1;

    try {
        const url = new URL("http://api.mediastack.com/v1/news");
        url.searchParams.append("access_key", API_KEY);
        url.searchParams.append("keywords", "acoso escolar");
        url.searchParams.append("languages", "es");
        url.searchParams.append("countries", "ES");
        url.searchParams.append("sort", "published_desc");

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`MediaStack error: ${response.status}`);
        }

        const data = await response.json();
        const noticias = data.data;

        const connection = await pool.getConnection();

        let guardadas = 0;
        for (const noticia of noticias) {
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
        const [rows] = await connection.query("SELECT * FROM recursos WHERE tipo = 'artículo'");
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener noticias de tipo 'artículo':", error);
        res.status(500).json({ error: "Error al obtener noticias de tipo 'artículo'" });
    }
};

exports.syncMultimedia = async (req, res) => {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const ID_USUARIO_ADMIN = 1;

    try {
        const query = "acoso escolar";
        const maxResults = 20;

        const url = new URL("https://www.googleapis.com/youtube/v3/search");
        url.searchParams.append("part", "snippet");
        url.searchParams.append("q", query);
        url.searchParams.append("type", "video");
        url.searchParams.append("maxResults", maxResults);
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("regionCode", "ES");
        url.searchParams.append("relevanceLanguage", "es");

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();
        const videos = data.items;

        const connection = await pool.getConnection();
        let guardados = 0;

        for (const video of videos) {
            const videoId = video.id.videoId;
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            const [existe] = await connection.query(
                "SELECT id_recurso FROM recursos WHERE url = ?",
                [embedUrl]
            );

            if (existe.length === 0) {
                await connection.query(
                    `INSERT INTO recursos
                         (titulo, tipo, contenido, fecha_publicacion, id_usuario, url, img)
                     VALUES (?, 'video', ?, ?, ?, ?, ?)`,
                    [
                        video.snippet.title,
                        video.snippet.description || "Sin descripción",
                        new Date(video.snippet.publishedAt),
                        ID_USUARIO_ADMIN,
                        embedUrl,
                        video.snippet.thumbnails?.medium?.url || null,
                    ]
                );
                guardados++;
            }
        }

        connection.release();

        res.json({
            message: `Se han sincronizado ${guardados} videos de YouTube correctamente.`,
        });
    } catch (error) {
        console.error("Error al sincronizar videos de YouTube:", error);
        res.status(500).json({ error: "Error al sincronizar videos de YouTube" });
    }
};

exports.getMultimedia = async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [videos] = await connection.query(
            "SELECT * FROM recursos WHERE tipo = 'video'"
        );

        connection.release();

        res.json(videos);
    } catch (error) {
        console.error("Error al obtener los recursos multimedia:", error);
        res.status(500).json({ error: "Error al obtener los recursos multimedia" });
    }
};

