// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "admin/assets/images/logo-ct-dark.png";

export default {
  brand: {
    name: "Llumí",
    image: logoCT,
    route: "/",
  },
  menus: [
    {
      name: "Mi cuenta",
      items: [{ name: "Perfil", route: "/pages/LandingPages/Profile" }],
    },
    {
      name: "Recursos",
      route: "/sections/recursos/inici",
      items: [
        { name: "Informativos", route: "/sections/recursos/info" },
        { name: "Multimedia", route: "/sections/recursos/multimedia" },
        { name: "Centro", route: "/sections/recursos/centre" },
      ],
    },
    {
      name: "Denuncia",
      items: [
        { name: "Test de autoevaluación", route: "/sections/denuncia/components/wizardTest" },
        { name: "Denuncia", route: "/sections/denuncia/components/wizardDenuncia" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terminos y condiciones" },
        { name: "política de privacidad" },
        { name: "licencias (EULA)" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      Todos los derechos reservados. Copyright &copy; {new Date().getFullYear()} Llumí
    </MKTypography>
  ),
};
