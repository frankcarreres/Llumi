import html2pdf from "html2pdf.js";

/**
 * Export HTML content to a PDF file using html2pdf.js.
 * @param {string} content - The HTML string to include in the PDF body.
 * @param {string} [title="Documento"] - The title to display at the top and use as filename.
 * @param {{
 *   margin?: number,
 *   filename?: string,
 *   image?: { type: string; quality: number },
 *   html2canvas?: { scale: number },
 *   jsPDF?: { unit: string; format: string | [number, number]; orientation: string }
 * }} [options]
 */
export function exportToPDF(content, title = "Documento", options = {}) {
  // Remove HTML tags to check for empty content
  const plain = content
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  if (!plain) {
    console.warn("exportToPDF: No content to export");
    return;
  }

  // Create a wrapper div with title and content
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `<h1 style="margin-bottom: 1em;">${title}</h1>${content}`;

  // Default html2pdf settings
  const defaultSettings = {
    margin: 10,
    filename: `${title}.pdf`,
    image: { type: "jpeg", quality: 0.95 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Merge user options with defaults
  const config = {
    ...defaultSettings,
    ...options,
    image: { ...defaultSettings.image, ...(options.image || {}) },
    html2canvas: { ...defaultSettings.html2canvas, ...(options.html2canvas || {}) },
    jsPDF: { ...defaultSettings.jsPDF, ...(options.jsPDF || {}) },
  };

  html2pdf().set(config).from(wrapper).save();
}

// Ejemplo de uso:
// import { exportToPDF } from "./exportToPDF";
// exportToPDF("<p>Hola mundo</p>", "Mi Documento");
