import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Contexto del Dashboard (para que siga funcionando el sidenav y demás)
import { MaterialUIControllerProvider } from "admin/context";

const container = document.getElementById("root"); // asegúrate de que sea "root" en public/index.html
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
