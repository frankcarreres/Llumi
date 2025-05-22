export const agruparPorFecha = (denuncias) =>
  denuncias.reduce((acum, denuncia) => {
    const year = new Date(denuncia.fecha_denuncia).getFullYear();
    if (!acum[year]) acum[year] = [];
    acum[year].push(denuncia);
    return acum;
  }, {});

export const agruparPorMesEnYear = (denuncias) =>
  denuncias.reduce((acum, denuncia) => {
    let year;
    const currentYear = new Date().getFullYear();
    year = year || currentYear;
    const fecha = new Date(denuncia.fecha_denuncia);
    if (fecha.getFullYear() === year) {
      const mes = fecha.getMonth() + 1;
      if (!acum[mes]) {
        acum[mes] = [];
      }
      acum[mes].push(denuncia);
    }
    return acum;
  }, {});
