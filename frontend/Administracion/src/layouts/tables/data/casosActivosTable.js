import useDenunciasTable from "hook/useDenunciasTable";
import TipoCell from "../../../components/MDDenuncia/TipoCell";
import EstadoCell from "../../../components/MDDenuncia/EstadoCell";
import EditDropdown from "../../../components/MDDenuncia/EditDropdown";
import DenunciaCell from "../../../components/MDDenuncia/DenunciaCell";

export default function Data() {
  const { rowsData, setRowsData, updateData, loading } = useDenunciasTable({
    filterEstado: "en_progreso",
    withEdit: true,
  });

  const rows = !loading
    ? rowsData
        .filter((row) => row.estado.toLowerCase() === "en_progreso")
        .map((row) => ({
          casos: <DenunciaCell {...row} />,
          tipos: <TipoCell title={row.tipo_acoso} />,
          estado: <EstadoCell estado={row.estado} />,
          fecha: new Date(row.fecha_denuncia).toLocaleDateString(),
          action: <EditDropdown row={row} setRowsData={setRowsData} updateData={updateData} />,
        }))
    : [];

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
