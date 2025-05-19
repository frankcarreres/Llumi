import MKBox from "components/MKBox";
import BaseLayout from "../components/BaseLayout";
import CarruselTarjetes from "./components/CarruselTarjetes";

function RecursIni() {
  return (
    <MKBox mt={2}>
      <BaseLayout
        breadcrumb={[{ label: "Inici", route: "/pages/presentation" }, { label: "Recursos" }]}
        title="Recursos"
      >
        <CarruselTarjetes />
      </BaseLayout>
    </MKBox>
  );
}

export default RecursIni;
