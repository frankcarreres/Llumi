const BASE_URL = "https://typebot.io/api/v1";
const FLOW_ID = "chat-gpt-personas-6uxgbb9"; // ID del bot público

export const startConversation = async () => {
  const res = await fetch(`${BASE_URL}/typebots/${FLOW_ID}/startChat`, {
    method: "POST",
  });

  if (!res.ok) {
    console.error("❌ Error al iniciar conversación:", res.status);
    return null;
  }

  const data = await res.json();
  console.log("🎯 Session iniciada:", data);
  return data;
};

export const sendMessageToBot = async (sessionId, message) => {
  if (!sessionId) {
    console.error("❌ sessionId es null o undefined");
    return { messages: [] };
  }

  const res = await fetch(`${BASE_URL}/sessions/${sessionId}/continueChat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    console.error("❌ Error al enviar mensaje:", res.status);
    return { messages: [] };
  }

  const data = await res.json();
  console.log("📥 Respuesta completa:", data);
  return data; // ✅ devuelve messages + input
};
