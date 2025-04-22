import { startConversation } from "../services/typebotAPI";

const esperar = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Inicia el flujo conversacional tras el login.
 * Agrega los primeros mensajes, opciones, y guarda sessionId y resultId.
 */
export async function iniciarFlujo({
  usuario,
  setMensajes,
  setSessionId,
  setResultId,
  setIsMultipleChoice,
  setOpcionesActivas,
}) {
  setMensajes((prev) => [...prev, { autor: "bot", texto: `¡Hola, ${usuario?.nombre}!` }]);
  await esperar(1000);

  const res = await startConversation();
  if (!res?.sessionId) return;

  setSessionId(res.sessionId);
  setResultId(res.resultId);

  // Añadir los mensajes de texto del bot
  const nuevos = res.messages
    .filter((msg) => msg.type === "text")
    .map((msg) => ({
      autor: "bot",
      texto: msg.content.richText.map((p) => p.children.map((c) => c.text).join("")).join("\n"),
    }));
  setMensajes((prev) => [...prev, ...nuevos]);

  // Añadir opciones si hay input
  if (res.input?.items) {
    const multiple = res.input?.options?.isMultipleChoice || false;
    setIsMultipleChoice(multiple);
    setOpcionesActivas([]);

    const opciones = res.input.items.map((item) => ({
      autor: "bot",
      tipo: "opcion",
      texto: item.content,
    }));
    setMensajes((prev) => prev.filter((m) => m.tipo !== "opcion").concat(opciones));
  }
}
