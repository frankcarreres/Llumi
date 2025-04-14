import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MKBox from "../../../../../components/MKBox";
import TarjetaNoticia from "./TarjetaNoticia";

function CarruselNoticias({ destacadas }) {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recursos/noticias");
        const data = response.data;
        if (destacadas) {
          // Filtra solo las noticias destacadas
          setNoticias(data.filter((noticia) => noticia.destacada === 1));
        } else {
          // Todas las noticias disponibles
          setNoticias(data);
        }
      } catch (error) {
        console.error("Error al cargar las noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, [destacadas]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
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
    return <div>Cargando noticias...</div>;
  }

  return (
    <MKBox sx={{ width: "100%", mx: "auto", mt: 4, height: "500px" }}>
      <Slider {...settings}>
        {noticias.map((noticia, index) => (
          <MKBox key={index} mx={1} sx={{ height: "100%" }}>
            <TarjetaNoticia
              titulo={noticia.titulo}
              descripcion={noticia.contenido}
              imagen={noticia.img}
              url={noticia.url}
            />
          </MKBox>
        ))}
      </Slider>
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
