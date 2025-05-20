import BaseLayout from "../components/BaseLayout";
import CarruselTarjetes from "./components/CarruselTarjetes";

function RecursIni() {
  return (
    <BaseLayout
      breadcrumb={[{ label: "Inici", route: "/pages/presentation" }, { label: "Recursos" }]}
    >
      <CarruselTarjetes />
    </BaseLayout>
  );
}

export default RecursIni;
