// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import RecursIni from "./layouts/sections/recursos";
import SignIn from "./pages/LandingPages/SignIn";
import RecursInfo from "./layouts/sections/recursos/info";
import RecursMultimedia from "./layouts/sections/recursos/multimedia";
import RecursCentre from "./layouts/sections/recursos/centre";
import Denuncia from "./layouts/sections/denuncia";

const routes = [
  {
    name: "Recursos",
    route: "/sections/recursos/inici",
    component: <RecursIni />,
    collapse: [
      {
        name: "Recursos informatius",
        route: "/sections/recursos/info",
        component: <RecursInfo />,
      },
      {
        name: "Recursos multimèdia",
        route: "/sections/recursos/multimedia",
        component: <RecursMultimedia />,
      },
      {
        name: "Recursos centre",
        route: "/sections/recursos/centre",
        component: <RecursCentre />,
      },
      {
        name: " ",
        route: "/sections/recursos/inici",
        component: <RecursIni />,
      },
    ],
  },
  {
    name: "Denuncia",
    route: "/sections/denuncia",
    component: <Denuncia />,
  },
  {
    name: "Mi cuenta",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Iniciar sessió",
        route: "/pages/authentication/sign-in",
        component: <SignIn />,
      },
      {
        name: "Cerrar sesión",
        route: "/logout",
      },
    ],
  },
];
export default routes;
