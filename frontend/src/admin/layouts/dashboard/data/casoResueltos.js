import { agruparPorMesEnYear } from "../../../hooks/filtroPorTiempo";

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

export default function casosResueltos(denuncias) {
  const denunciasResueltas = denuncias.filter((denuncia) => denuncia.estado === "resuelta");

  const grouped = agruparPorMesEnYear(denunciasResueltas);

  const data = monthLabels.map((_, index) => {
    const mes = index + 1;
    return grouped[mes] ? grouped[mes].length : 0;
  });
  return {
    labels: monthLabels,
    datasets: {
      label: "Casos Resueltos",
      data: data,
    },
  };
}
