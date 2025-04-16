// Sections components
import BaseLayout from "../../components/BaseLayout";

// PageHeaders page components code
function RecursCentre() {
  return (
    <BaseLayout
      title="Recursos centre"
      breadcrumb={[
        { label: "Inici", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos centre" },
      ]}
    ></BaseLayout>
  );
}

export default RecursCentre;
