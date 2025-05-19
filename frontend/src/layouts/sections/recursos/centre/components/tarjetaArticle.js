import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

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
