// App.js
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import landingTheme from "assets/theme";
import Presentation from "pages/Presentation";
import routes from "routes";
import { Suspense } from "react";
import AdminShell from "./admin/AdminShell"; // la tabla única

// ----- 1. generador de <Route> con claves únicas -----
const makeRoutes = (list, prefix = "") =>
  list.flatMap((r, i) => {
    if (r.collapse) return makeRoutes(r.collapse, `${prefix}${i}-`);
    return r.route ? (
      <Route
        key={`${prefix}${r.route}`} // <-- clave única
        path={r.route}
        element={r.component}
      />
    ) : (
      []
    );
  });
const Loader = () => <div style={{ padding: 40, textAlign: "center" }}>Cargando…</div>;
// ---------- 2. shells (solo funciones locales) ----------
function PublicShell() {
  return (
    <ThemeProvider theme={landingTheme}>
      <CssBaseline />
      <Routes>
        <Route index element={<Presentation />} />
        {makeRoutes(routes.filter((r) => !r.route?.startsWith("/admin")))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

// ---------- 3. router raíz ----------
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/admin/*" element={<AdminShell />}>
          {makeRoutes(
            routes
              .filter((r) => r.route?.startsWith("/admin"))
              .map((r) => ({
                // creamos una copia con el path relativo
                ...r,
                route: r.route.replace("/admin/", ""),
              })),
            ""
          )}
          {/* fallback si mete cualquier cosa distinta */}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>{" "}
        <Route path="/*" element={<PublicShell />} />
      </Routes>
    </Suspense>
  );
}
