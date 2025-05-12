// src/routes.js
import { lazy } from "react";
import Icon from "@mui/material/Icon";

const Presentation = lazy(() => import("pages/Presentation"));
const SignIn = lazy(() => import("pages/LandingPages/SignIn"));
const RecursIni = lazy(() => import("layouts/sections/recursos"));
const RecursInfo = lazy(() => import("layouts/sections/recursos/info"));
const RecursMulti = lazy(() => import("layouts/sections/recursos/multimedia"));
const RecursCentre = lazy(() => import("layouts/sections/recursos/centre"));
const Denuncia = lazy(() => import("layouts/sections/denuncia"));

const Dashboard = lazy(() => import("admin/layouts/dashboard"));
const Tables = lazy(() => import("admin/layouts/tables"));
const Notifications = lazy(() => import("admin/layouts/notifications"));
const Profile = lazy(() => import("admin/layouts/profile"));
const DenunciaPage = lazy(() => import("admin/layouts/denuncias/denunciasPage"));
const CreateNoticia = lazy(() => import("admin/components/MDNoticias/crearNoticiasPage"));

const routes = [
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
    icon: <Icon>menu_book</Icon>,
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
    icon: <Icon>report</Icon>,
    route: "/sections/denuncia/",
    component: <Denuncia />,
  },

  {
    name: "SignInPage",
    key: "login-page",
    route: "/pages/authentication/sign-in",
    component: <SignIn />,
  },

  /* ---------- DASHBOARD (centro) ---------- */
  {
    type: "collapse",
    name: "Dashboard",
    key: "admin-dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/admin/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "admin-tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/admin/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "admin-notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/admin/notifications",
    component: <Notifications />,
  },
  { route: "/admin/denuncias/:id_denuncia", component: <DenunciaPage /> },
  {
    type: "collapse",
    name: "Crear Noticia",
    key: "admin-noticias",
    icon: <Icon fontSize="small">dataset</Icon>,
    route: "/admin/noticias",
    component: <CreateNoticia />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "admin-profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/admin/profile",
    component: <Profile />,
  },
];

export default routes;

/* ---------- ARRAY “LIGERO” SOLO PARA MENÚ PUBLICO ---------- */
const strip = (item) => {
  // eslint-disable-next-line no-unused-vars
  const { component, ...lite } = item;
  if (lite.collapse) lite.collapse = lite.collapse.map(strip);
  return lite;
};

export const menuRoutes = routes.filter((r) => !r.route?.startsWith("/admin")).map(strip);
