import { lazy } from "react";
const Presentation = lazy(() => import("pages/Presentation"));
const SignIn = lazy(() => import("pages/LandingPages/SignIn"));
const RecursIni = lazy(() => import("layouts/sections/recursos"));
const RecursInfo = lazy(() => import("layouts/sections/recursos/info"));
const RecursMulti = lazy(() => import("layouts/sections/recursos/multimedia"));
const RecursCentre = lazy(() => import("layouts/sections/recursos/centre"));
const Denuncia = lazy(() => import("layouts/sections/denuncia"));

export default [
  /* ---------- LANDING ---------- */
  {
    name: "Home",
    key: "home",
    route: "/",
    component: <Presentation />,
  },
  {
    name: "Recursos",
    key: "recursos",
    collapse: [
      {
        name: "Inici",
        key: "rec-inici",
        route: "/sections/recursos/inici",
        component: <RecursIni />,
      },
      {
        name: "Informatius",
        key: "rec-info",
        route: "/sections/recursos/info",
        component: <RecursInfo />,
      },
      {
        name: "Multimèdia",
        key: "rec-multi",
        route: "/sections/recursos/multimedia",
        component: <RecursMulti />,
      },
      {
        name: "Centre",
        key: "rec-centre",
        route: "/sections/recursos/centre",
        component: <RecursCentre />,
      },
    ],
  },
  {
    name: "Denúncia",
    key: "denuncia",
    route: "/sections/denuncia/",
    component: <Denuncia />,
  },

  {
    name: "SignInPage",
    key: "login-page",
    route: "/pages/authentication/sign-in",
    component: <SignIn />,
  },
];
