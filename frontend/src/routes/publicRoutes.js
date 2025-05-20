import { lazy } from "react";
import Icon from "@mui/material/Icon";
const SignIn = lazy(() => import("layouts/pages/authentication/sign-in"));
const RecursIni = lazy(() => import("layouts/sections/recursos"));
const RecursInfo = lazy(() => import("layouts/sections/recursos/info"));
const RecursMulti = lazy(() => import("layouts/sections/recursos/multimedia"));
const RecursCentre = lazy(() => import("layouts/sections/recursos/centre"));
const Denuncia = lazy(() => import("layouts/sections/denuncia"));
const Perfil = lazy(() => import("pages/LandingPages/Profile"));
const ArticleDetail = lazy(() =>
  import("layouts/sections/recursos/centre/components/article_detaill")
);
const ResetPassword = lazy(() => import("layouts/pages/authentication/reset-password/index"));

export default [
  {
    key: "rec-detalle",
    route: "/sections/recursos/centre/:id_recurso",
    component: <ArticleDetail />,
    meta: { hidden: true },
  },
  {
    key: "reset-password",
    route: "/pages/authentication/reset-password",
    component: <ResetPassword />,
  },
  {
    name: "Recursos",
    key: "recursos",
    collapse: [
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
      {
        name: "Tots els recursos",
        key: "rec-inici",
        route: "/sections/recursos/inici",
        component: <RecursIni />,
      },
    ],
  },
  {
    name: "Denúncia",
    key: "denuncia",
    collapse: [
      {
        name: "Test de autoavaluació",
        key: "test-wizard",
        route: "/sections/denuncia/components/wizardTest",
        component: <Denuncia />,
      },
      {
        name: "Denúncia",
        key: "denuncia-wizard",
        route: "/sections/denuncia/components/wizardDenuncia",
        component: <Denuncia />,
      },
    ],
  },
  {
    name: "Mi cuenta",
    key: "cuenta",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Iniciar sessió",
        key: "login",
        route: "/pages/authentication/sign-in",
        component: <SignIn />,
      },
      {
        name: "Perfil",
        key: "perfil",
        route: "pages/LandingPages/Profile",
        component: <Perfil />,
      },
    ],
  },
];
