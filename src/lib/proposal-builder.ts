import { readFileSync } from "fs"
import { join } from "path"

const TEMPLATES_DIR = join(process.cwd(), "content", "templates")

/**
 * Monta o HTML final da proposta combinando:
 * - Head com CSS fixo (do template Like Odonto)
 * - Body com HTML gerado pelo Claude (personalizado)
 * - Script fixo (animacoes, carrossel, contadores)
 */
export function buildProposalHTML(
  companyName: string,
  bodyHTML: string,
  formActionUrl: string
): string {
  const cssBlock = readFileSync(join(TEMPLATES_DIR, "base-css.html"), "utf-8")
  const jsBlock = readFileSync(join(TEMPLATES_DIR, "base-js.html"), "utf-8")

  // Replace form action in the generated body
  const bodyWithForm = bodyHTML.replace(/\{\{FORM_ACTION_URL\}\}/g, formActionUrl)

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Proposta Comercial · ${companyName} · Atacama Digital</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Cormorant+Unicase:wght@500;600;700&display=swap" rel="stylesheet">
${cssBlock}
</head>
<body>
${bodyWithForm}
${jsBlock}
</body>
</html>`
}
