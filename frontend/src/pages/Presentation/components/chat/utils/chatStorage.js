// src/utils/chatStorage.js

const SESSION_KEY = "chat_sessionId";
const HISTORY_KEY = "chat_history";

export function getSessionId() {
  return localStorage.getItem(SESSION_KEY);
}

export function saveSessionId(sessionId) {
  localStorage.setItem(SESSION_KEY, sessionId);
}

export function getHistory() {
  const json = localStorage.getItem(HISTORY_KEY);
  if (!json) return [];
  try {
    const raw = JSON.parse(json);
    // Descodificamos sólo los mensajes de autor 'user'
    return raw.map((m) => {
      if (m.autor === "user" && typeof m.texto === "string") {
        return { ...m, texto: decodeURIComponent(m.texto) };
      }
      return m;
    });
  } catch {
    return [];
  }
}

export function saveHistory(history) {
  // Codificamos sólo los mensajes de autor 'user'
  const toStore = history.map((m) => {
    if (m.autor === "user" && typeof m.texto === "string") {
      return { ...m, texto: encodeURIComponent(m.texto) };
    }
    return m;
  });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(toStore));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(SESSION_KEY);
}
