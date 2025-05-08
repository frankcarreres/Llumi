import { agruparPorMesEnYear } from "../../../hooks/filtroPorTiempo";

// Se define un arreglo con los nombres de los meses para las etiquetas
const monthLabels = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export default function casosActivosPorMes(denuncias) {
  const grouped = agruparPorMesEnYear(denuncias);

  // Se arma un arreglo con la cantidad de casos por cada mes (si no existen casos en el mes, se asigna 0)
  const data = monthLabels.map((_, index) => {
    const mes = index + 1;
    return grouped[mes] ? grouped[mes].length : 0;
  });

  return {
    labels: monthLabels,
    datasets: {
      label: "Casos Activos",
      data: data,
    },
  };
}
