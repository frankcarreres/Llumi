import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { exportToPDF } from "../../utils/exportToPDF";
import "./index.css";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Opcional: si vienes de la lista con state
  const { state } = useLocation();

  // Si no pasas state, aquí harías fetch(`/api/articulos/${id}`)
  const [article, setArticle] = useState(state || null);

  useEffect(() => {
    if (!article) {
      fetch(`/api/articulos/${id}`)
        .then((res) => res.json())
        .then(setArticle)
        .catch(console.error);
    }
  }, [id, article]);

  if (!article) return <p>Cargando artículo…</p>;

  const { titulo, fecha_publicacion, contenido } = article;
  const fechaFormateada = new Date(fecha_publicacion).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="hoja">
      <div style={{ padding: 24, maxWidth: 800, margin: "auto" }}>
        <Button onClick={() => navigate(-1)} className="boton-volver">
          ← Volver
        </Button>
        <h1>{titulo}</h1>
        <small>Fecha: {fechaFormateada}</small>
        <Button
          startIcon={<Icon className="boton-descargar">download</Icon>}
          onClick={() => exportToPDF(contenido, titulo)}
          className="boton-descargar"
        >
          Descargar PDF
        </Button>
        <div
          style={{ marginTop: 24, lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: contenido }}
        />
      </div>
    </div>
  );
}
