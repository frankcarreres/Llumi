// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import RecursIni from "./layouts/sections/recursos";
import SignIn from "./pages/LandingPages/SignIn";
import RecursInfo from "./layouts/sections/recursos/info";
import RecursVisuals from "./layouts/sections/recursos/visuals";
import RecursAudio from "./layouts/sections/recursos/audio";

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
        name: "Recursos visuals",
        route: "/sections/recursos/visuals",
        component: <RecursVisuals />,
      },
      {
        name: "Recursos audiovisuals",
        route: "/sections/recursos/audio",
        component: <RecursAudio />,
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
    ],
  },
];
export default routes;
