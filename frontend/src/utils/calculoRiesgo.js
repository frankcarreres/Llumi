/**
 * Devuelve un string indicando el nivel de riesgo basado en la puntuación del test.
 * @param {number} score - La puntuación total del test.
 * @returns {string} Nivel de riesgo: 'riesgo_critico', 'riesgo_alto', etc.
 */
export function calcularNivelRiesgo(score) {
  if (score <= 10 && score >= 0) return "Sin riesgo ";
  if (score <= 13 && score >= 11) return "Riesgo medio";
  if (score <= 16 && score >= 14) return "Riesgo alto";
  if (score <= 19 && score >= 17) return "Riesgo muy alto";
  if (score >= 20) return "Riesgo crítico";
  return "sin_indicios";
}
