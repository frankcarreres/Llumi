import React from "react";
import BaseLayout from "../../components/BaseLayout";
import MKBox from "components/MKBox";
import TarjetaArticle from "./components/TarjetaArticle";

function RecursCentre() {
  const articulos = [
    {
      id: 1,
      titulo: "La historia de la ciencia",
      profesor: "Juan Perpiña",
      url: "https://ejemplo.com/art1",
    },
    {
      id: 2,
      titulo: "Matemáticas para todos",
      profesor: "Ana Gómez",
      url: "https://ejemplo.com/art2",
    },
    {
      id: 3,
      titulo: "Literatura contemporánea",
      profesor: "Luis Martínez",
      url: "https://ejemplo.com/art3",
    },
  ];

  return (
    <BaseLayout
      title="Recursos centre"
      breadcrumb={[
        { label: "Inici", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos centre" },
      ]}
    >
      <MKBox mt={2} />

      <div>
        {articulos.map(({ id, titulo, profesor, url }) => (
          <TarjetaArticle
            key={id} // <--- aquí pones la key para React
            titulo={titulo} // usa las variables desestructuradas directamente
            profesor={profesor}
            url={url} // url si la necesitas para abrir la pestaña nueva
          />
        ))}
      </div>
    </BaseLayout>
  );
}

export default RecursCentre;
