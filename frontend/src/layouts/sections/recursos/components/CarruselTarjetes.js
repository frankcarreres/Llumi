import Slider from "react-slick";
import MKBox from "../../../../components/MKBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cardImage2 from "../../../../assets/images/ojo.png";
import cardImage3 from "../../../../assets/images/bg2.jpg";
import TarjetaRecurs from "./Tarjeta";
import React, { useRef } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const tarjetas = [
  {
    titulo: "Recursos informatius",
    descripcion: "Informa't de les ultimes notícies sobre l'assetjament escolar...",
    imagen:
      "https://imagenes.elpais.com/resizer/v2/LA6RA2T3PNAQZLVJM3BHHXBPOQ.JPG?auth=de95b1678277a2928808ece5714ecfdef498c9a78bec4745cff177cec933001e&width=1200",
    ruta: "/sections/recursos/info",
  },
  {
    titulo: "Recursos multimèdia",
    descripcion:
      "Descobrix recursos multimedia i audiovisual per a sensibilitzar i actuar contra l'assetjament.",
    imagen: cardImage2,
    ruta: "/sections/recursos/multimedia",
  },
  {
    titulo: "Recursos centre",
    descripcion: "",
    imagen: cardImage3,
    ruta: "/sections/recursos/centre",
  },
];

function CarruselTarjetas() {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
      {" "}
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
      <MKBox sx={{ width: "101%" }}>
        <Slider ref={sliderRef} {...settings}>
          {tarjetas.map((tarjeta, index) => (
            <MKBox key={index} mx={1} sx={{ height: "100%" }}>
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
