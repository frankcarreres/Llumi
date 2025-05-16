import denunciasPeticiones from "admin/hooks/denunciasPeticiones";
import DenunciaCell from "admin/components/MDDenuncia/DenunciaCell";
import TipoCell from "admin/components/MDDenuncia/TipoCell";
import EstadoCell from "admin/components/MDDenuncia/EstadoCell";
import EditDropdown from "admin/components/MDDenuncia/EditDropdown";

export default function Data() {
  const { rowsData, setRowsData, updateData, loading } = denunciasPeticiones({
    filterEstado: "en_progreso",
    withEdit: true,
  });
  let rows = [];
  try {
    rows = !loading
      ? rowsData
          .filter((row) => row.estado.toLowerCase() === "en_progreso")
          .map((row) => ({
            casos: <DenunciaCell {...row} />,
            tipos: <TipoCell title={row.tipo_acoso} />,
            estado: <EstadoCell estado={row.estado} />,
            fecha: new Date(row.fecha_denuncia).toLocaleDateString("es-ES", {}),
            action: <EditDropdown row={row} setRowsData={setRowsData} updateData={updateData} />,
          }))
      : [];
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
