export function sanitizeInput(input: any): string {
  if (typeof input !== "string") return input;

  return input
    .replace(/<[^>]*>?/gm, "")       // quita etiquetas HTML
    .replace(/['"]/g, "")            // quita comillas
    .replace(/[$;]/g, "")            // quita símbolos que rompen consultas
    .trim();
}
