// layouts/dashboard/data/reportsBarChartData.js

// 1) Agrupa por año
export const agruparPorFecha = (denuncias) =>
  denuncias.reduce((acum, denuncia) => {
    const year = new Date(denuncia.fecha_denuncia).getFullYear();
    if (!acum[year]) acum[year] = [];
    acum[year].push(denuncia);
    return acum;
  }, {});

export default function generarChartData(denuncias) {
  const grouped = agruparPorFecha(denuncias);
  const labels = Object.keys(grouped).sort(); // ["2024","2025",…]
  const data = labels.map((y) => grouped[y].length); // [35,65,…]

  return {
    labels,
    datasets: {
      data: data,
    },
  };
}
