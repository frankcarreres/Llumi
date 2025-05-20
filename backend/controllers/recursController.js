const pool = require("../models/db");
require("dotenv").config();

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
      // Verifica por URL o por título
      const [existe] = await connection.query(
          `SELECT id_recurso FROM recursos WHERE url = ? OR titulo = ?`,
          [noticia.url, noticia.title]
      );

      if (existe.length === 0) {
        await connection.query(
            `INSERT INTO recursos
               (titulo, tipo, contenido, fecha_publicacion, id_usuario, url, img)
             VALUES (?, 'noticia', ?, ?, ?, ?, ?)`,
            [
              noticia.title,
              noticia.description || "Sin descripción",
              new Date(noticia.published_at || Date.now()),
              ID_USUARIO_ADMIN,
              noticia.url,
              noticia.image || null
            ]
        );
        guardadas++;
      }
    }

    connection.release();

    res.json({
      message: `Se han sincronizado ${guardadas} noticias correctamente.`
    });
  } catch (error) {
    console.error("Error al sincronizar noticias:", error);
    res.status(500).json({ error: "Error al sincronizar noticias" });
  }
};

exports.getNoticias = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM recursos WHERE tipo = 'noticia'");
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
    const maxResults = 10;

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
            video.snippet.thumbnails?.medium?.url || null
          ]
        );
        guardados++;
      }
    }

    connection.release();

    res.json({
      message: `Se han sincronizado ${guardados} videos de YouTube correctamente.`
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

exports.syncPodcasts = async (req, res) => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const ID_USUARIO_ADMIN = 1;

  try {
    const query = "podcast bullying";
    const maxResults = 10;

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
    const podcasts = data.items;

    const connection = await pool.getConnection();
    let guardados = 0;

    for (const podcast of podcasts) {
      const videoId = podcast.id.videoId;
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      const [existe] = await connection.query(
        "SELECT id_recurso FROM recursos WHERE url = ?",
        [embedUrl]
      );

      if (existe.length === 0) {
        await connection.query(
          `INSERT INTO recursos
               (titulo, tipo, contenido, fecha_publicacion, id_usuario, url, img)
           VALUES (?, 'podcast', ?, ?, ?, ?, ?)`,
          [
            podcast.snippet.title,
            podcast.snippet.description || "Sin descripción",
            new Date(podcast.snippet.publishedAt),
            ID_USUARIO_ADMIN,
            embedUrl,
            podcast.snippet.thumbnails?.medium?.url || null
          ]
        );
        guardados++;
      }
    }

    connection.release();

    res.json({
      message: `Se han sincronizado ${guardados} podcasts correctamente.`
    });
  } catch (error) {
    console.error("Error al sincronizar podcasts:", error);
    res.status(500).json({ error: "Error al sincronizar podcasts" });
  }
};

exports.getPodcasts = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM recursos WHERE tipo = 'podcast'"
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los recursos podcast:", error);
    res.status(500).json({ error: "Error al obtener los recursos podcast" });
  }
};


exports.postNoticias = async (req, res) => {
  // Imprime el contenido de la request para depuración
  console.log("Contenido de req.body:", req.body);
  console.log("Contenido de req.user:", req.user);

  try {
    const {
      titulo,
      tipo,
      contenido,
      fecha_publicacion,
      id_usuario,
      url,
      destacada,
    } = req.body;
    const { id_centro } = req.user;
    const img = req.file ? req.file.filename : undefined;

    if (!tipo || !id_usuario) {
      return res.status(400).json({
        error: "Campos requeridos: 'tipo' e 'id_usuario'",
      });
    }

    const cols = [];
    const marks = [];
    const values = [];

    const push = (col, val) => {
      if (val !== undefined) {
        cols.push(col);
        marks.push("?");
        values.push(val);
      }
    };

    push("titulo", titulo);
    push("tipo", tipo);
    push("contenido", contenido);
    push("fecha_publicacion", fecha_publicacion);
    push("id_usuario", id_usuario);
    push("url", url);
    push("img", img);
    push("destacada", destacada);
    push("id_centro", id_centro);

    // Imprime para verificar las columnas y valores antes de la inserción
    console.log("Columnas a insertar:", cols);
    console.log("Valores a insertar:", values);

    const sql = `INSERT INTO recursos (${cols.join(",")})
                 VALUES (${marks.join(",")})`;

    const [result] = await pool.execute(sql, values);

    console.log("Resultado de la inserción:", result);

    res.status(201).json({
      message: "Recurso creado con éxito",
      id_recurso: result.insertId,
    });
  } catch (err) {
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(404).json({ error: "El usuario no existe" });
    }
    console.error("Error creando recurso:", err);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.getArticulos = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM recursos WHERE tipo = 'artículo'");
    connection.release();
    res.json({ articulos: rows });
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    res.status(500).json({ error: "Error al obtener artículos" });
  }
};
