import { agruparPorFecha } from "hooks/filtroPorTiempo";

export default function casosPorTiempo(denuncias) {
  const grouped = agruparPorFecha(denuncias);
  const labels = Object.keys(grouped).sort(); // ["2024","2025",…]
  const data = labels.map((y) => grouped[y].length); // [35,65,…]

  return {
    labels,
    datasets: {
      label: "Denuncias",
      data: data,
    },
  };
}
