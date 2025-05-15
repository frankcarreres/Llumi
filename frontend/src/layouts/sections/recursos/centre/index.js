import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import MKBox from "components/MKBox";
import TarjetaArticle from "./components/TarjetaArticle";

function RecursCentre() {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch("http://localhost:3001/recursos/articulos"); // cambia al host real si es necesario
        const data = await response.json();
        setArticulos(data.articulos); // porque el backend devuelve { articulos: [...] }
      } catch (error) {
        console.error("Error al obtener artículos:", error);
      }
    };

    fetchArticulos();
  }, []);

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
          <TarjetaArticle key={id} titulo={titulo} profesor={profesor} url={url} />
        ))}
      </div>
    </BaseLayout>
  );
}

export default RecursCentre;
