// hooks/useCrearNoticia.js
import { useState } from "react";

export default function useCrearNoticia() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); // respuesta del servidor

  // ⚡ función que llama al endpoint
  const createNoticia = async ({
    titulo,
    contenido,
    url, // opcional
    img, // opcional
    destacada = 0,
    id_centro, // opcional (tu token quizá ya lo lleva)
  }) => {
    setLoading(true);
    setError(null);

    try {
      // Token JWT guardado en localStorage o contexto
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3001/recursos/addNoticia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          tipo: "artículo", // ← porque tu enum lo pide
          contenido,
          url,
          img,
          destacada,
          id_centro,
          id_usuario: localStorage.getItem("id_usuario"), // o sácalo del token
        }),
      });

      if (!res.ok) {
        // leer mensaje del backend si existe
        const { error: msg } = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(msg || `Error ${res.status}`);
      }

      const json = await res.json(); // { message, id_recurso }
      setData(json);
      return json; // devuelve la noticia creada
    } catch (err) {
      setError(err.message);
      throw err; // re-lanza por si el caller quiere catch
    } finally {
      setLoading(false);
    }
  };

  return { createNoticia, loading, error, data };
}
