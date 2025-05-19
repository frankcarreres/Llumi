import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { exportToPDF } from "admin/utils/exportToPDF";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;

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

const DownloadButton = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #000;
  }
`;

const HiddenContent = styled.div`
  display: none;
`;

const TarjetaArticle = ({ titulo, fecha_publicacion, contenido }) => {
  const pdfRef = useRef();

  const fechaFormateada = new Date(fecha_publicacion).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleCardClick = () => {
    const htmlContent = `
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${titulo}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px;
            background-color: #f9f9f9;
            color: #333;
            line-height: 1.6;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-width: 800px;
            margin: auto;
          }
          h1 {
            color: #222;
            font-size: 28px;
            margin-bottom: 20px;
            text-transform: uppercase;
          }
          p {
            font-size: 18px;
          }
          .fecha {
            margin-top: 40px;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${titulo}</h1>
          <p>${contenido}</p>
          <p class="fecha"><strong>Fecha de publicación:</strong> ${fechaFormateada}</p>
        </div>
      </body>
    </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Card onClick={handleCardClick}>
        <Title>{titulo}</Title>
        <Subtitle>Fecha de publicación: {fechaFormateada}</Subtitle>
        <DownloadButton onClick={() => exportToPDF(contenido, titulo)} title="Descargar PDF">
          <FileDownloadOutlinedIcon fontSize="medium" />
        </DownloadButton>
      </Card>

      <HiddenContent>
        <div ref={pdfRef}>
          <style>
            {`
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #333;
              }
              .container {
                padding: 30px;
                border-radius: 10px;
                max-width: 800px;
                margin: auto;
              }
              h1 {
                color: #222;
                font-size: 28px;
                margin-bottom: 20px;
                text-align: center;
                text-transform: uppercase;
              }
              p {
                font-size: 18px;
              }
              .fecha {
                margin-top: 40px;
                font-size: 14px;
                color: #666;
              }
            `}
          </style>
          <div className="container">
            <h1>{titulo}</h1>
            <p>{contenido}</p>
            <p className="fecha">
              <strong>Fecha de publicación:</strong> {fechaFormateada}
            </p>
          </div>
        </div>
      </HiddenContent>
    </>
  );
};

TarjetaArticle.propTypes = {
  titulo: PropTypes.string.isRequired,
  fecha_publicacion: PropTypes.string.isRequired,
  contenido: PropTypes.string.isRequired,
};

export default TarjetaArticle;
