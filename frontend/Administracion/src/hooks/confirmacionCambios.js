// hooks/confirmacionCambios.js
import { useEffect, useContext } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

export default function hayCambiosSinGuardar(shouldWarn) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!shouldWarn) return;

    /* ▶ aviso al recargar o cerrar pestaña */
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    /* ▶ bloqueo de navegación interna (solo si existe .block) */
    let unblock;
    if (navigator && typeof navigator.block === "function") {
      unblock = navigator.block((tx) => {
        const ok = window.confirm("Tienes cambios sin guardar. ¿Salir de todos modos?");
        if (ok) {
          unblock();
          tx.retry();
        }
      });
    }

    /* ▶ limpieza */
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (unblock) unblock();
    };
  }, [shouldWarn, navigator]);
}
