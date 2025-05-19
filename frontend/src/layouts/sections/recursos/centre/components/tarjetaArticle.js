import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { exportToPDF } from "admin/utils/exportToPDF";
import Icon from "@mui/material/Icon";
import "./index.css";
import Button from "@mui/material/Button";

const TarjetaArticle = ({ id, titulo, fecha_publicacion, contenido }) => {
  const navigate = useNavigate();

  const fechaFormateada = new Date(fecha_publicacion).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Al pinchar, navegamos a la ruta detalle pasando el contenido por state
  const openDetail = () => {
    navigate(`/sections/recursos/centre/${id}`, {
      state: { titulo, fecha_publicacion, contenido },
    });
  };

  return (
    <div className="card" onClick={openDetail}>
      <div className="card-header">
        <h3 className="title">{titulo}</h3>
        <small className="subtitle">Fecha: {fechaFormateada}</small>
        <Button
          className="download-btn"
          onClick={(e) => {
            e.stopPropagation();
            exportToPDF(contenido, titulo);
          }}
          title="Descargar PDF"
        >
          <Icon>sim_card_download</Icon>
        </Button>
      </div>
    </div>
  );
};

TarjetaArticle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  titulo: PropTypes.string.isRequired,
  fecha_publicacion: PropTypes.string.isRequired,
  contenido: PropTypes.string.isRequired,
};

export default TarjetaArticle;
