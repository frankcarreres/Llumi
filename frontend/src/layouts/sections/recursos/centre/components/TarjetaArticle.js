import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
    transform: translateY(-4px);
  }
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
`;

const Subtitle = styled.small`
  color: #555;
`;

const TarjetaArticle = ({ titulo, profesor, url }) => {
  const handleClick = () => {
    // Abrir la url en una pestaña nueva
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card onClick={handleClick}>
      <Title>{titulo}</Title>
      <Subtitle>Escrito por: {profesor}</Subtitle>
    </Card>
  );
};

TarjetaArticle.propTypes = {
  titulo: PropTypes.string.isRequired,
  profesor: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired, // URL ahora es requerida
};

export default TarjetaArticle;
