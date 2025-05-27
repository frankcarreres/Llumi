import Slider from "react-slick";
import MKBox from "../MKBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import cardImage1 from "assets/images/bg-recurs-info.png";
import cardImage2 from "assets/images/bg-recurs-multi.png";
import cardImage3 from "assets/images/bg-recurs-centre.jpg";

import TarjetaRecurs from "./Tarjeta";

import React, { useRef } from "react";

import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Definición del arreglo de tarjetas, cada objeto contiene la información para renderizar una tarjeta
const tarjetas = [
  {
    titulo: "Recursos informativos",
    descripcion: "Infórmate de las ultimas noticias sobre el acoso escolar...",
    imagen: cardImage1,
    ruta: "/sections/recursos/info",
  },
  {
    titulo: "Recursos multimedia",
    descripcion:
      "Descubre recursos multimedia y audiovisual para sensibilizar y actuar contra el acoso.",
    imagen: cardImage2,
    ruta: "/sections/recursos/multimedia",
  },
  {
    titulo: "Recursos centro",
    descripcion:
      "Accede a materiales, protocolos y apoyos del centro para prevenir y actuar frente al acoso escolar.",
    imagen: cardImage3,
    ruta: "/sections/recursos/centre",
  },
];

function CarruselTarjetas() {
  const sliderRef = useRef(null);

  // Configuración del carrusel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: "3px",
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <MKBox
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <IconButton
        onClick={() => sliderRef.current?.slickPrev()}
        sx={{
          backgroundColor: "white",
          "&:hover": { backgroundColor: "#ddd" },
          mr: 1,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <MKBox sx={{ width: "100%" }}>
        <Slider ref={sliderRef} {...settings}>
          {/* Se mapean los elementos del arreglo 'tarjetas' para renderizar cada tarjeta en el carrusel */}
          {tarjetas.map((tarjeta, index) => (
            <MKBox key={index} px={1}>
              <TarjetaRecurs
                titulo={tarjeta.titulo}
                descripcion={tarjeta.descripcion}
                imagen={tarjeta.imagen}
                ruta={tarjeta.ruta}
              />
            </MKBox>
          ))}
        </Slider>
      </MKBox>

      <IconButton
        onClick={() => sliderRef.current?.slickNext()}
        sx={{
          backgroundColor: "white",
          "&:hover": { backgroundColor: "#ddd" },
          ml: 1,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </MKBox>
  );
}

export default CarruselTarjetas;
