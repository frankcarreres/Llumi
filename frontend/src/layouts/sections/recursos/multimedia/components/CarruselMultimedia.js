import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MKBox from "../../../../../components/MKBox";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function CarruselMultimedia({ destacados, tipo }) {
  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const endpoint =
          tipo === "podcast"
            ? "http://13.216.39.33:3001/recursos/podcast"
            : "http://13.216.39.33:3001/recursos/multimedia";

        const response = await fetch(endpoint);
        const data = await response.json();

        if (destacados) {
          setRecursos(data.filter((item) => item.destacada === 1));
        } else {
          setRecursos(data);
        }
      } catch (error) {
        console.error("Error al cargar los recursos:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchRecursos();
  }, [destacados, tipo]);

  // Cantidad de slides visibles (ajústala en función de tus necesidades/responsive)
  const slidesVisible = 3;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesVisible,
    slidesToScroll: slidesVisible,
    arrows: false,
    autoplay: false,
    afterChange: (current) => setCurrentSlide(current),
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
          {recursos.map((item, index) => {
            // Verifica si el slide está visible
            const isActive = index >= currentSlide && index < currentSlide + slidesVisible;
            return (
              <MKBox
                key={index}
                mx={1}
                sx={{ height: "100%", display: "flex", justifyContent: "center" }}
              >
                <iframe
                  width="98%"
                  height="300"
                  // Se carga el src solo si el slide es activo
                  src={isActive ? item.url : ""}
                  title={item.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ borderRadius: "16px" }}
                ></iframe>
              </MKBox>
            );
          })}
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

CarruselMultimedia.propTypes = {
  destacados: PropTypes.bool,
  tipo: PropTypes.oneOf(["video", "podcast"]),
};

CarruselMultimedia.defaultProps = {
  destacados: false,
  tipo: "video",
};

export default CarruselMultimedia;
