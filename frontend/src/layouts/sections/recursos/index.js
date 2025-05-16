import MKBox from "components/MKBox";
import BaseLayout from "../components/BaseLayout";
import CarruselTarjetes from "./components/CarruselTarjetes";

function RecursIni() {
  return (
    <MKBox mt={4}>
      {" "}
      {/* Espacio arriba (mt = margin-top) */}
      <BaseLayout
        title="Recursos"
        breadcrumb={[{ label: "Inici", route: "/pages/presentation" }, { label: "Recursos" }]}
      >
        <CarruselTarjetes />
      </BaseLayout>
    </MKBox>
  );
}

export default RecursIni;
