// Sections components
import BaseLayout from "../../components/BaseLayout";

// PageHeaders page components code
function RecursInfo() {
  return (
    <BaseLayout
      title="Recursos informatius"
      breadcrumb={[
        { label: "Inici", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos informatius" },
      ]}
    ></BaseLayout>
  );
}

export default RecursInfo;
