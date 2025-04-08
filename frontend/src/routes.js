// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import SignIn from "layouts/pages/authentication/sign-in";
import PageHeaders from "./layouts/sections/page-sections/recursos";

const routes = [
  {
    name: "Recursos",
    //icon: <Icon>article</Icon>,
    collapse: [
      {
        name: "Recursos informatius",
        route: "/sections/page-sections/recursos",
        component: <PageHeaders />,
      },
      {
        name: "Recursos visuals",
        route: "/sections/page-sections/recursos",
        component: <SignIn />,
      },
      {
        name: "Recursos audiovisuals",
        route: "/sections/page-sections/recursos",
        component: <SignIn />,
      },
    ],
  },
  {
    name: "Denuncia",
    //icon: <Icon>warning</Icon>,
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
