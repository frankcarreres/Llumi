/**
 * Devuelve un string indicando el nivel de riesgo basado en la puntuación del test.
 * @param {number} score - La puntuación total del test.
 * @returns {string} Nivel de riesgo: 'riesgo_critico', 'riesgo_alto', etc.
 */
export function calcularNivelRiesgo(score) {
  if (score <= 11 && score >= 0) return "Sin riesgo ";
  if (score <= 19 && score >= 12) return "Riesgo medio";
  if (score <= 26 && score >= 20) return "Riesgo alto";
  if (score <= 33 && score >= 27) return "Riesgo muy alto";
  if (score >= 34) return "Riesgo crítico";
  return "sin_indicios";
}
