import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import adminTheme from "admin/assets/theme";
import { MaterialUIControllerProvider } from "./context";
import Dashboard from "./layouts/dashboard"; // ← 1. shell original

export default function ProtectedDashboard() {
  // aquí validas token / rol si quieres

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <MaterialUIControllerProvider>
        <Dashboard />
      </MaterialUIControllerProvider>
    </ThemeProvider>
  );
}
