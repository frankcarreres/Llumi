import Slider from "react-slick";
import MKBox from "../../../../components/MKBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cardImage2 from "../../../../assets/images/ojo.png";
import cardImage3 from "../../../../assets/images/bg2.jpg";
import TarjetaRecurs from "./Tarjeta";

const tarjetas = [
  {
    titulo: "Recursos informatius",
    descripcion: "Informa't de les ultimes notícies sobre l'assetjament escolar...",
    imagen:
      "https://imagenes.elpais.com/resizer/v2/LA6RA2T3PNAQZLVJM3BHHXBPOQ.JPG?auth=de95b1678277a2928808ece5714ecfdef498c9a78bec4745cff177cec933001e&width=1200",
    ruta: "/sections/recursos/info",
  },
  {
    titulo: "Recursos visuals",
    descripcion: "Descobrix recursos visuals per a sensibilitzar i actuar contra l'assetjament.",
    imagen: cardImage2,
    ruta: "/sections/recursos/visuals",
  },
  {
    titulo: "Recursos audiovisuals",
    descripcion:
      "Accedix a contingut audiovisual per a informar, sensibilitzar i combatre l'assetjament",
    imagen: cardImage3,
    ruta: "/sections/recursos/audio",
  },
];

function CarruselTarjetas() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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
    <MKBox sx={{ width: "100%", mx: "auto", mt: 4, height: "500px" }}>
      <Slider {...settings}>
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
  );
}

export default CarruselTarjetas;
