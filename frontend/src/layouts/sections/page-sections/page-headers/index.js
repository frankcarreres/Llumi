// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// PageHeaders page components
import TarjetaRecurs from "layouts/sections/page-sections/page-headers/components/TarjetaRecurs";

// PageHeaders page components code

function PageHeaders() {
  return (
    <BaseLayout
      title="Recursos informatius"
      breadcrumb={[
        { label: "Recursos", route: "/sections/page-sections/featuers" },
        { label: "Recursos informatius" },
      ]}
    >
      <View height="40rem">
        <TarjetaRecurs />
      </View>
    </BaseLayout>
  );
}

export default PageHeaders;
