// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import PageHeaders from "./layouts/sections/page-sections/recursos";
import ContactUs from "./pages/LandingPages/ContactUs";
import SignIn from "./pages/LandingPages/SignIn";
import AboutUs from "./pages/LandingPages/AboutUs";

const routes = [
  {
    name: "Recursos",
    route: "/sections/page-sections/recursos",
    component: <PageHeaders />,
    //icon: <Icon>article</Icon>,
    collapse: [
      {
        name: "Recursos informatius",
        route: "/sections/page-sections/info",
        component: <ContactUs />,
      },
      {
        name: "Recursos visuals",
        route: "/sections/page-sections/visuals",
        component: <AboutUs />,
      },
      {
        name: "Recursos audiovisuals",
        route: "/sections/page-sections/recursos",
        component: <PageHeaders />,
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
