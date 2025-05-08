import DenunciaCell from "../../../../../components/MDDenuncia/DenunciaCell";
import TipoCell from "../../../../../components/MDDenuncia/TipoCell";
import EstadoCell from "../../../../../components/MDDenuncia/EstadoCell";
import EditDropdown from "../../../../../components/MDDenuncia/EditDropdown";
import denunciasPeticiones from "../../../../../hooks/denunciasPeticiones";

export default function Data({ filters = { tipo: "", estado: "", fecha: "" } }) {
  const { rowsData, setRowsData, updateData, loading } = denunciasPeticiones({
    withEdit: true,
  });

  // Prints para verificar los filtros y los datos originales
  console.log("Filters recibidos:", filters);
  console.log("rowsData original:", rowsData);

  const normalizedRows = rowsData.map((r) => ({
    ...r,
    id_denuncia: r.id_denuncia ? Number(r.id_denuncia) : 0,
  }));

  const filteredData = loading
    ? []
    : normalizedRows.filter(
        (row) =>
          (!filters.tipo || row.tipo_acoso === filters.tipo) &&
          (!filters.estado || row.estado === filters.estado) &&
          (!filters.fecha || row.fecha_denuncia.startsWith(filters.fecha))
      );
  console.log("Datos filtrados:", filteredData);

  let rows = [];
  try {
    rows = filteredData.map((row) => ({
      casos: <DenunciaCell {...row} />,
      tipos: <TipoCell title={row.tipo_acoso} />,
      estado: <EstadoCell estado={row.estado} />,
      fecha: new Date(row.fecha_denuncia).toLocaleDateString("es-ES"),
      action: <EditDropdown row={row} setRowsData={setRowsData} updateData={updateData} />,
    }));
  } catch (e) {
    console.log(e);
  }

  return {
    columns: [
      { Header: "Denuncia", accessor: "casos", align: "left" },
      { Header: "Tipo de acoso", accessor: "tipos", align: "left" },
      { Header: "Estado", accessor: "estado", align: "center" },
      { Header: "Fecha de incidencia", accessor: "fecha", align: "center" },
      { Header: "Acciones", accessor: "action", align: "center" },
    ],
    rows,
  };
}
