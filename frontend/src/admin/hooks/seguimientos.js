import { useEffect, useState, useCallback } from "react";
import { getSession } from "admin/utils/session";

export function useSeguimientos(idDenuncia) {
  const [seguimientos, setSeguimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = getSession() || {};

  const fetchSeguimientos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://13.216.39.33:3001/denuncias/denuncias/${idDenuncia}/seguimiento`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      if (res.ok) {
        const json = await res.json();
        setSeguimientos(json.seguimientos);
      } else if (res.status === 404) {
        setSeguimientos([]); // Sin seguimientos aún
      } else {
        console.error(`Error al cargar seguimientos: ${res.status}`);
      }
    } catch (err) {
      console.warn("No se ha podido conectar a la API:", err);
      setSeguimientos([]);
    } finally {
      setLoading(false);
    }
  }, [idDenuncia, token]);

  const crearSeguimiento = useCallback(
    async (comentario) => {
      try {
        const res = await fetch(
          `http://13.216.39.33:3001/denuncias/denuncias/${idDenuncia}/seguimiento`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ comentario }),
          }
        );
        if (res.ok) {
          const json = await res.json();
          // Añadimos el nuevo seguimiento al estado
          setSeguimientos((prev) => [...prev, json.seguimiento]);
          return { ok: true };
        } else {
          const err = await res.json();
          return { ok: false, error: err };
        }
      } catch (err) {
        console.error("Error al crear seguimiento:", err);
        return { ok: false, error: err };
      }
    },
    [idDenuncia, token]
  );

  useEffect(() => {
    if (idDenuncia) {
      void fetchSeguimientos();
    }
  }, [fetchSeguimientos, idDenuncia]);

  return { seguimientos, loading, fetchSeguimientos, crearSeguimiento };
}
