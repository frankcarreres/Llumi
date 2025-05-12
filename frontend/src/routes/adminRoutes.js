import { lazy } from "react";
import Icon from "@mui/material/Icon";
import RequireCentro from "auth/requiereCentro";

const Dashboard = lazy(() => import("admin/layouts/dashboard"));
const Tables = lazy(() => import("admin/layouts/tables"));
const Notifications = lazy(() => import("admin/layouts/notifications"));
const Profile = lazy(() => import("admin/layouts/profile"));
const DenunciaPage = lazy(() => import("admin/layouts/denuncias/denunciasPage"));
const CreateNoticia = lazy(() => import("admin/components/MDNoticias/crearNoticiasPage"));

export default [
  /* ---------- DASHBOARD (centro) ---------- */
  {
    type: "collapse",
    name: "Dashboard",
    key: "admin-dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/admin/dashboard",
    component: (
      <RequireCentro>
        <Dashboard />
      </RequireCentro>
    ),
  },
  {
    type: "collapse",
    name: "Tables",
    key: "admin-tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/admin/tables",
    component: (
      <RequireCentro>
        <Tables />
      </RequireCentro>
    ),
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "admin-notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/admin/notifications",
    component: (
      <RequireCentro>
        <Notifications />
      </RequireCentro>
    ),
  },
  {
    route: "/admin/denuncias/:id_denuncia",
    component: (
      <RequireCentro>
        <DenunciaPage />
      </RequireCentro>
    ),
  },
  {
    type: "collapse",
    name: "Crear Noticia",
    key: "admin-noticias",
    icon: <Icon fontSize="small">dataset</Icon>,
    route: "/admin/noticias",
    component: (
      <RequireCentro>
        <CreateNoticia />
      </RequireCentro>
    ),
  },
  {
    type: "collapse",
    name: "Profile",
    key: "admin-profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/admin/profile",
    component: (
      <RequireCentro>
        <Profile />
      </RequireCentro>
    ),
  },
];
