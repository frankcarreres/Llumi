// hooks/useCrearNoticia.js
import { useState } from "react";

export default function useCrearNoticia() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jZW50cm8iOjEsIm5vbWJyZSI6IklFUyBHYWxpbGVvIiwiaWF0IjoxNzQ2NDMwMzg1LCJleHAiOjE3NDcwMzUxODV9.bgvxhCxNUSBAHjrDW42FKx9US-koIfVzlqO93CHmxOY";

  // ⚡ función que llama al endpoint
  const createNoticia = async ({ titulo, contenido, url, img, destacada = 0 }) => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("tipo", "artículo");
    formData.append("contenido", contenido);
    formData.append("id_usuario", 1);
    if (img) formData.append("img", img);
    if (url) formData.append("url", url);
    if (destacada) formData.append("destacada", destacada);
    for (const [key, value] of formData.entries()) {
      console.log(`Clave: ${key} - Valor: ${value}`);
    }

    try {
      const res = await fetch("http://localhost:3001/recursos/addNoticia", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        // leer mensaje del backend si existe
        const { error: msg } = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(msg || `Error ${res.status}`);
      }

      const json = await res.json();
      setData(json);
      return json;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createNoticia, loading, error, data };
}
