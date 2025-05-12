import { useEffect, useState } from "react";

export default function denunciasPeticiones({ idDenuncia, filterEstado }) {
  const [rowsData, setRowsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jZW50cm8iOjEsIm5vbWJyZSI6IklFUyBHYWxpbGVvIiwiaWF0IjoxNzQ2NDMwMzg1LCJleHAiOjE3NDcwMzUxODV9.bgvxhCxNUSBAHjrDW42FKx9US-koIfVzlqO93CHmxOY";

  // Parse CSV a array de objetos
  const parseCSV = (csvText) => {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      return headers.reduce((obj, header, idx) => {
        obj[header] = values[idx];
        return obj;
      }, {});
    });
  };

  // Carga el CSV local y setea rowsData
  const fetchLocalCSV = async () => {
    try {
      const res = await fetch("/llumi_denuncias_100.csv");
      const text = await res.text();
      const dataCSV = parseCSV(text);
      setRowsData(dataCSV);
    } catch (csvError) {
      console.error("Error al cargar CSV local:", csvError);
    }
  };

  const buildRequest = () => {
    const base = "http://localhost:3001/denuncias/denuncias";
    let url = idDenuncia ? `${base}/${idDenuncia}` : base;
    if (!idDenuncia && filterEstado) url += `?estado=${encodeURIComponent(filterEstado)}`;

    return {
      url,
      options: {
        method: "POST", // tu API usa POST tanto para lista como para detalle
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // no se usa, pero muchos fetch piden algo
      },
    };
  };

  // Intenta la API; si falla, usa el CSV local
  const fetchData = async () => {
    const { url, options } = buildRequest();
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`API responded ${res.status}`);
      const json = await res.json();

      // El backend devuelve { denuncia } o { denuncias }
      const data = json.denuncia ? [json.denuncia] : json.denuncias;
      setRowsData(data);
    } catch (err) {
      console.warn("Fallo API, cargo CSV local…", err);
      await fetchLocalCSV();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idDenuncia, filterEstado]);

  const updateData = async (id, estado) => {
    try {
      await fetch(`http://localhost:3001/denuncias/updateEstado/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
      });
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return { rowsData, setRowsData, updateData, loading };
}
