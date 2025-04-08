import Slider from "react-slick";
import MKBox from "components/MKBox";
import TarjetaRecurs from "./Tarjeta";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const tarjetas = [
  {
    titulo: "Recursos informatius",
    descripcion: "Informate de las ultimas noticias sobre el bullyng y el acoso escolar...",
    imagen: "/assets/images/recursos-visuales.jpg",
  },
  {
    titulo: "Recursos visuals",
    descripcion: "Descubre recursos visuales para sensibilizar y actuar contra el bullying.",
    imagen: "/assets/images/recursos-visuales.jpg", // Otra imagen local
  },
  {
    titulo: "Recursos audiovisuals",
    descripcion:
      "Accede a contenido audiovisual para informar, sensibilizar y combatir el bullying.",
    imagen: "/assets/images/recursos-audiovisuales.jpg", // Otra imagen local
  },
];

function CarruselTarjetas() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Mostrar solo 1 tarjeta a la vez
    slidesToScroll: 1,
    arrows: true, // Habilitar las flechas
    autoplay: true, // Habilitar autoplay
    autoplaySpeed: 20000, // Cambiar de tarjeta cada 20 segundos
    responsive: [
      {
        breakpoint: 960, // tablets
        settings: {
          slidesToShow: 1, // Mostrar solo 1 tarjeta en tablets también
        },
      },
      {
        breakpoint: 600, // móviles
        settings: {
          slidesToShow: 1, // Mostrar solo 1 tarjeta en móviles
        },
      },
    ],
  };

  return (
    <MKBox sx={{ width: "100%", mx: "auto", mt: 4, height: "500px" }}>
      <Slider {...settings}>
        {tarjetas.map((tarjeta, index) => (
          <MKBox
            key={index}
            mx={1}
            sx={{
              height: "100%", // Asegura que cada tarjeta ocupe el 100% de la altura disponible del carrusel
            }}
          >
            {/* Aquí se usa el componente TarjetaRecurs y se pasan las props necesarias */}
            <TarjetaRecurs
              titulo={tarjeta.titulo}
              descripcion={tarjeta.descripcion}
              imagen={tarjeta.imagen} // Pasar la ruta de la imagen desde `tarjetas`
            />
          </MKBox>
        ))}
      </Slider>
    </MKBox>
  );
}

export default CarruselTarjetas;
