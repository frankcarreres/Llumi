import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MKBox from "../../../../../components/MKBox";
import TarjetaNoticia from "./TarjetaNoticia";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import bgDefault from "../../../../../assets/images/bg-not-img.jpeg";

function CarruselNoticias({ destacadas }) {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch("http://13.216.39.33:3001/recursos/noticias");
        const data = await response.json();

        if (destacadas) {
          setNoticias(data.filter((noticia) => noticia.destacada === 1));
        } else {
          setNoticias(data);
        }
      } catch (error) {
        console.error("Error al cargar las noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchNoticias();
  }, [destacadas]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: destacadas ? 3 : 4,
    slidesToScroll: destacadas ? 3 : 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000, // 10s
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <MKBox
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
        }}
      >
        <CircularProgress />
      </MKBox>
    );
  }

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
      <MKBox sx={{ width: "100%" }}>
        <Slider ref={sliderRef} {...settings}>
          {noticias.map((noticia, index) => (
            <MKBox key={index} mx={0.4} sx={{ height: "100%" }}>
              <TarjetaNoticia
                titulo={noticia.titulo}
                descripcion={noticia.contenido}
                imagen={noticia.img || bgDefault} // Cargar imagen default
                url={noticia.url}
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

CarruselNoticias.propTypes = {
  destacadas: PropTypes.bool,
};

CarruselNoticias.defaultProps = {
  destacadas: false,
};

export default CarruselNoticias;
