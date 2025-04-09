// Sections components
import BaseLayout from "../../components/BaseLayout";

// PageHeaders page components code
function RecursVisuals() {
  return (
    <BaseLayout
      title="Recursos visuals"
      breadcrumb={[
        { label: "Inici", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos visuals" },
      ]}
    ></BaseLayout>
  );
}

export default RecursVisuals;
