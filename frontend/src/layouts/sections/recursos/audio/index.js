// Sections components
import BaseLayout from "../../components/BaseLayout";

// PageHeaders page components code
function RecursAudio() {
  return (
    <BaseLayout
      title="Recursos audiovisuals"
      breadcrumb={[
        { label: "Inici", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos audiovisuals" },
      ]}
    ></BaseLayout>
  );
}

export default RecursAudio;
