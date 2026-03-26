import { getClient, MODELS } from "./client"
import { getBodyPrompt } from "./prompts"
import { buildProposalHTML } from "../proposal-builder"
import type { AnalysisResult } from "./analyze"
import type { EditedProposalData } from "../types"

export async function generateProposalContent(
  editedData: EditedProposalData,
  analysis: AnalysisResult,
  formActionUrl: string
): Promise<{ html: string }> {
  const mainPlan = editedData.selectedPlans[0]
  const systemPrompt = getBodyPrompt()

  const plansInfo = editedData.selectedPlans
    .map((p) => `- ${p.name}: R$ ${p.price.toLocaleString("pt-BR")}${p.type === "one-shot" ? " (unico)" : "/mes"} + Setup R$ ${p.setup.toLocaleString("pt-BR")} | ${p.description} | Faixa: ${p.target}`)
    .join("\n")

  const userPrompt = `Gere o HTML do <body> da proposta comercial (SEM <html>, <head>, <style>, <script>). Use EXATAMENTE as classes CSS do template Atacama.

EMPRESA: ${editedData.companyName}
CONTATO: ${editedData.contactName}
SETOR: ${editedData.sector}
FATURAMENTO: ${editedData.revenue}
LOCAL: ${editedData.location}

OBJETIVOS: ${editedData.goals}
PLANOS ATUAIS: ${editedData.plans}
URGENCIA: ${editedData.timeline}

DIAGNOSTICO: ${editedData.diagnosis}
VERDADE INCONVENIENTE: ${editedData.inconvenientTruth}
DESAFIOS: ${editedData.challenges}

DORES SELECIONADAS:
${editedData.selectedPains.map((p, i) => `${i + 1}. ${p}`).join("\n")}

PLANO(S):
${plansInfo}

TIPO: ${editedData.proposalType === "multiple" ? "MULTIPLOS PLANOS - secao investimento com ABAS para cada plano" : "PLANO UNICO"}

PERSONA: ${analysis.analysis.personaMatch} (${analysis.analysis.personaAdherence}%)
GATILHOS: ${analysis.analysis.emotionalTriggers?.join(", ") || "nao identificados"}`

  const response = await getClient().messages.create({
    model: MODELS.analysis,
    max_tokens: 12000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  })

  let bodyHTML =
    response.content[0].type === "text" ? response.content[0].text : ""

  // Clean markdown fences
  bodyHTML = bodyHTML
    .replace(/```html\n?/g, "")
    .replace(/```\n?/g, "")
    .trim()

  // Remove any <html>, <head>, <body> tags the model might add
  bodyHTML = bodyHTML
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<head>[\s\S]*?<\/head>/gi, "")
    .replace(/<\/?body[^>]*>/gi, "")
    .replace(/<\/?!DOCTYPE[^>]*>/gi, "")
    .trim()

  // Build final HTML with fixed CSS + generated body + fixed JS
  const html = buildProposalHTML(editedData.companyName, bodyHTML, formActionUrl)

  return { html }
}
