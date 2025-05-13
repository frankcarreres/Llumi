// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Suspense } from "react";

import landingTheme from "assets/theme";
import Presentation from "pages/Presentation";

import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";

import AdminLayout from "admin/AdminLayout";

const makeRoutes = (list, prefix = "") =>
  list.flatMap((r, i) =>
    r.collapse
      ? makeRoutes(r.collapse, `${prefix}${i}-`)
      : r.route
      ? [<Route key={`${prefix}${r.route}`} path={r.route} element={r.component} />]
      : []
  );

const Loader = () => <div style={{ padding: 40, textAlign: "center" }}>Cargando…</div>;

function PublicShell() {
  return (
    <ThemeProvider theme={landingTheme}>
      <CssBaseline />
      <Routes>
        <Route index element={<Presentation />} />
        {makeRoutes(publicRoutes)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />}>
          {makeRoutes(
            adminRoutes.map((r) => ({
              ...r,
              route: r.route.replace("/admin/", ""),
            }))
          )}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        <Route path="/*" element={<PublicShell />} />
      </Routes>
    </Suspense>
  );
}
