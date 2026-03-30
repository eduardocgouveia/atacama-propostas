import { readFileSync } from "fs"
import { join } from "path"

const TEMPLATES_DIR = join(process.cwd(), "content", "templates")

export type TemplateType = "tipo-a" | "tipo-b"

/**
 * Renders a proposal by replacing all {{PLACEHOLDER}} values in the template.
 * Works with any template - just pass the right placeholders.
 */
export function renderProposal(
  templateType: TemplateType,
  values: Record<string, string>
): string {
  const filename =
    templateType === "tipo-a" ? "TEMPLATE-TIPO-A.html" : "TEMPLATE-TIPO-B.html"

  let html = readFileSync(join(TEMPLATES_DIR, filename), "utf-8")

  // Replace all placeholders
  for (const [key, value] of Object.entries(values)) {
    const placeholder = key.startsWith("{{") ? key : `{{${key}}}`
    html = html.split(placeholder).join(value ?? "")
  }

  // Clean up any remaining unreplaced placeholders (optional fields)
  html = html.replace(/\{\{[A-Z0-9_]+\}\}/g, "")

  return html
}
