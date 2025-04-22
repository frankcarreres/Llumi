/**
 * Devuelve un string indicando el nivel de riesgo basado en la puntuación del test.
 * @param {number} score - La puntuación total del test.
 * @returns {string} Nivel de riesgo: 'riesgo_critico', 'riesgo_alto', etc.
 */
export function calcularNivelRiesgo(score) {
  if (score <= 7 && score >= 0) return "Sin riesgo ";
  if (score <= 14 && score >= 8) return "Riesgo medio";
  if (score <= 22 && score >= 15) return "Riesgo alto";
  if (score <= 30 && score >= 23) return "Riesgo muy alto";
  if (score >= 31) return "Riesgo crítico";
  return "sin_indicios";
}
