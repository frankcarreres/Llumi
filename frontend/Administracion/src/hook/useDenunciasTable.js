import { useEffect, useState } from "react";

export default function useDenunciasTable({ filterEstado, withEdit = false }) {
  const [rowsData, setRowsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jZW50cm8iOjEsIm5vbWJyZSI6IklFUyBHYWxpbGVvIiwiaWF0IjoxNzQ1NDA3ODAwLCJleHAiOjE3NDYwMTI2MDB9.IvkhLHB2gyEre8mGk-76XG-apSHPeSJR0f9HJK5xSg8";

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

  // Intenta la API; si falla, usa el CSV local
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/denuncias/denuncias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error(`API responded ${res.status}`);
      const json = await res.json();
      setRowsData(json.denuncias);
    } catch (apiError) {
      console.warn("Fallo API, cargando CSV local …", apiError);
      await fetchLocalCSV();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
