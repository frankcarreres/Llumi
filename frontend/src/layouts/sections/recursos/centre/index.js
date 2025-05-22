import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import MKBox from "components/MKBox";
import TarjetaArticle from "./components/tarjetaArticle";

function RecursCentre() {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch("http://13.216.39.33:3001/recursos/articulos");
        const data = await response.json();

        // Ordenar por fecha_publicacion descendente (más reciente primero)
        const articulosOrdenados = data.articulos.sort(
          (a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)
        );

        setArticulos(articulosOrdenados);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      }
    };

    void fetchArticulos();
  }, []);

  return (
    <BaseLayout
      breadcrumb={[
        { label: "Inicio", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos centro" },
      ]}
    >
      <MKBox mt={2} />

      <div>
        {articulos.map(({ id_recurso, titulo, fecha_publicacion, contenido }) => (
          <TarjetaArticle
            key={id_recurso}
            id={id_recurso}
            titulo={titulo}
            fecha_publicacion={fecha_publicacion}
            contenido={contenido}
          />
        ))}
      </div>
    </BaseLayout>
  );
}

export default RecursCentre;
