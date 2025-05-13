import { useEffect, useState } from "react";
import { getSession } from "admin/utils/session";

export default function denunciasPeticiones({ idDenuncia, filterEstado }) {
  const [rowsData, setRowsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = getSession() || {};

  const buildRequest = () => {
    const base = "http://13.216.39.33:3001/denuncias/denuncias";
    let url = idDenuncia ? `${base}/${idDenuncia}` : base;
    if (!idDenuncia && filterEstado) url += `?estado=${encodeURIComponent(filterEstado)}`;

    return {
      url,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({}),
      },
    };
  };

  const fetchData = async () => {
    setLoading(true);
    const { url, options } = buildRequest();
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        const json = await res.json();
        const data = json.denuncia ? [json.denuncia] : json.denuncias;
        setRowsData(data);
      } else {
        console.error(`API responded ${res.status}`);
      }
    } catch (err) {
      console.warn("No se ha podido conectar a la API:", err);
      setRowsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, [idDenuncia, filterEstado]);

  const updateData = async (id, estado) => {
    try {
      await fetch(`http://13.216.39.33:3001/denuncias/updateEstado/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ estado }),
      });
    } catch (e) {
      console.error("Error updating:", e);
    }
  };

  return { rowsData, setRowsData, updateData, loading };
}
