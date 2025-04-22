import { useEffect, useState } from "react";

export default function useDenunciasTable({ filterEstado, withEdit = false }) {
  const [rowsData, setRowsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jZW50cm8iOjEsIm5vbWJyZSI6IklFUyBHYWxpbGVvIiwiaWF0IjoxNzQ0Nzk2OTE4LCJleHAiOjE3NDU0MDE3MTh9.TZQcEFWb-wm56mhxP6IuNTwX6gtnO-mSHGolFsC5a90"; // reemplaza por lógica con localStorage si quieres

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
      const data = await res.json();
      setRowsData(data.denuncias);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  return { rowsData, setRowsData, updateData, loading };
}
