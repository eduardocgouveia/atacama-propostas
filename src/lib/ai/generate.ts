import { anthropic, MODELS } from "./client"
import { getGenerationSystemPrompt } from "./prompts"
import type { AnalysisResult } from "./analyze"

export async function generateProposal(
  analysis: AnalysisResult,
  planName: string,
  formActionUrl: string
): Promise<string> {
  const systemPrompt = getGenerationSystemPrompt(planName)

  const userPrompt = `Gere a proposta comercial HTML completa para o seguinte prospect:

# DADOS DO PROSPECT
- Empresa: ${analysis.prospect.companyName}
- Contato: ${analysis.prospect.contactName}
- Setor: ${analysis.prospect.sector}
- Faturamento estimado: ${analysis.prospect.estimatedRevenue}
- Cidade/Estado: ${analysis.prospect.city}/${analysis.prospect.state}

# DIAGNOSTICO
${analysis.analysis.diagnosis}

# VERDADE INCONVENIENTE
${analysis.analysis.inconvenientTruth}

# PLANO RECOMENDADO
${planName} - R$ ${analysis.analysis.planPrice}/mes + Setup R$ ${analysis.analysis.setupPrice}

# GPCT
- Goals: ${analysis.analysis.gpct.goals}
- Plans: ${analysis.analysis.gpct.plans}
- Challenges: ${analysis.analysis.gpct.challenges}
- Timeline: ${analysis.analysis.gpct.timeline}

# OBJECOES MAPEADAS
${analysis.analysis.keyObjections.map((o, i) => `${i + 1}. ${o}`).join("\n")}

# GATILHOS EMOCIONAIS
${analysis.analysis.emotionalTriggers.join(", ")}

# PERSONA MATCH
${analysis.analysis.personaMatch} (${analysis.analysis.personaAdherence}% aderencia)

Gere o HTML completo da proposta. Use {{FORM_ACTION_URL}} como placeholder para o action do formulario.`

  const stream = anthropic.messages.stream({
    model: MODELS.generation,
    max_tokens: 16384,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  })

  const response = await stream.finalMessage()

  let html =
    response.content[0].type === "text" ? response.content[0].text : ""

  // Clean up markdown fences if present
  html = html
    .replace(/```html\n?/g, "")
    .replace(/```\n?/g, "")
    .trim()

  // Replace form action placeholder
  html = html.replace(/\{\{FORM_ACTION_URL\}\}/g, formActionUrl)

  return html
}
