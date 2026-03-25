import { getClient, MODELS } from "./client"
import { getContentPrompt } from "./prompts"
import { renderProposal, type ProposalContent } from "../template-engine"
import type { AnalysisResult } from "./analyze"

export async function generateProposalContent(
  analysis: AnalysisResult,
  planName: string,
  formActionUrl: string
): Promise<{ html: string; content: ProposalContent }> {
  const systemPrompt = getContentPrompt(planName)

  const userPrompt = `Gere o conteudo JSON da proposta comercial para:

- Empresa: ${analysis.prospect.companyName}
- Contato: ${analysis.prospect.contactName}
- Setor: ${analysis.prospect.sector}
- Faturamento: ${analysis.prospect.estimatedRevenue}
- Local: ${analysis.prospect.city}/${analysis.prospect.state}

DIAGNOSTICO: ${analysis.analysis.diagnosis}
VERDADE INCONVENIENTE: ${analysis.analysis.inconvenientTruth}
PLANO: ${planName} - R$ ${analysis.analysis.planPrice}/mes + Setup R$ ${analysis.analysis.setupPrice}

GPCT:
- Goals: ${analysis.analysis.gpct.goals}
- Plans: ${analysis.analysis.gpct.plans}
- Challenges: ${analysis.analysis.gpct.challenges}
- Timeline: ${analysis.analysis.gpct.timeline}

OBJECOES: ${analysis.analysis.keyObjections.join("; ")}
GATILHOS: ${analysis.analysis.emotionalTriggers.join(", ")}
PERSONA: ${analysis.analysis.personaMatch} (${analysis.analysis.personaAdherence}%)`

  const response = await getClient().messages.create({
    model: MODELS.analysis, // Sonnet - rapido e barato
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  })

  const text =
    response.content[0].type === "text" ? response.content[0].text : ""

  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim()

  const content = JSON.parse(cleaned) as ProposalContent

  // Render template with content
  let html = renderProposal(content)
  html = html.replace(/\{\{FORM_ACTION_URL\}\}/g, formActionUrl)

  return { html, content }
}
