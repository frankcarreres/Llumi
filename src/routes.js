// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import SignIn from "layouts/pages/authentication/sign-in";

const routes = [
  {
    name: "Recursos",
    //icon: <Icon>article</Icon>,
    collapse: [
      {
        name: "Recursos informatius",
        route: "/pages/authentication/sign-in",
        component: <SignIn />,
      },
      {
        name: "Recursos visuals",
        route: "/pages/authentication/sign-in",
        component: <SignIn />,
      },
      {
        name: "Recursos audiovisuals",
        route: "/pages/authentication/sign-in",
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
