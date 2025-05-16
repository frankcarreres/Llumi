// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "/admin/assets/images/logo-ct-dark.png";

export default {
  brand: {
    name: "Llumí",
    image: logoCT,
    route: "/",
  },
  menus: [
    {
      name: "Mi cuenta",
      items: [{ name: "Perfil", route: "/pages/authentication/profile" }],
    },
    {
      name: "Recursos",
      route: "/sections/recursos/inici",
      items: [
        { name: "Informatius", route: "/sections/recursos/info" },
        { name: "Audiovisuals", route: "/sections/recursos/multimedia" },
        { name: "Centre", route: "/sections/recursos/centre" },
      ],
    },
    {
      name: "Denúncia",
      items: [
        { name: "Test de autoavaluació", route: "/sections/denuncia/components/wizardTest" },
        { name: "Denúncia", route: "/sections/denuncia/components/wizardDenuncia" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "termes i condicions" },
        { name: "política de privacitat" },
        { name: "llicencies (EULA)" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      Tots els drets reservats. Copyright &copy; {new Date().getFullYear()} Llumí
    </MKTypography>
  ),
};
