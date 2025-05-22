// hooks/useCrearNoticia.js
import { useState } from "react";
import { getSession } from "utils/session";

export default function useCrearNoticia() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const token = getSession("token");
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
      const res = await fetch("http://13.216.39.33:3001/recursos/addNoticia", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.token}`,
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
