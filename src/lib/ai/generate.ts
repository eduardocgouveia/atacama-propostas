import { getClient, MODELS } from "./client"
import { getContentPrompt } from "./prompts"
import { renderProposal, type ProposalContent } from "../template-engine"
import type { AnalysisResult } from "./analyze"
import type { EditedProposalData } from "../types"

export async function generateProposalContent(
  editedData: EditedProposalData,
  analysis: AnalysisResult,
  formActionUrl: string
): Promise<{ html: string; content: ProposalContent }> {
  const mainPlan = editedData.selectedPlans[0]
  const systemPrompt = getContentPrompt(mainPlan.name)

  // Usar dados EDITADOS pelo usuario, nao os da analise crua
  const plansInfo = editedData.selectedPlans
    .map((p) => `${p.name}: R$ ${p.price}/mes + Setup R$ ${p.setup} (${p.description})`)
    .join("\n")

  const userPrompt = `Gere o conteudo JSON da proposta comercial para:

EMPRESA: ${editedData.companyName}
CONTATO: ${editedData.contactName}
SETOR: ${editedData.sector}
FATURAMENTO: ${editedData.revenue}
LOCAL: ${editedData.location}

OBJETIVOS DO CLIENTE: ${editedData.goals}
PLANOS ATUAIS: ${editedData.plans}
URGENCIA: ${editedData.timeline}

DIAGNOSTICO: ${editedData.diagnosis}
VERDADE INCONVENIENTE: ${editedData.inconvenientTruth}
DESAFIOS: ${editedData.challenges}

DORES SELECIONADAS:
${editedData.selectedPains.map((p, i) => `${i + 1}. ${p}`).join("\n")}

PLANO(S) SELECIONADO(S):
${plansInfo}

TIPO DE PROPOSTA: ${editedData.proposalType === "multiple" ? "MULTIPLOS PLANOS (apresentar opcoes)" : "PLANO UNICO"}

PERSONA: ${analysis.analysis.personaMatch} (${analysis.analysis.personaAdherence}%)
GATILHOS EMOCIONAIS: ${analysis.analysis.emotionalTriggers.join(", ")}`

  const response = await getClient().messages.create({
    model: MODELS.analysis,
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

  // Override com dados editados para garantir que nomes/precos estao corretos
  if (content.hero) {
    content.hero.companyName = editedData.companyName
    content.hero.contactName = editedData.contactName
    content.hero.location = editedData.location
  }
  if (content.investment) {
    content.investment.planName = mainPlan.name
    content.investment.planPrice = `R$ ${mainPlan.price.toLocaleString("pt-BR")}`
    content.investment.planPeriod = mainPlan.type === "one-shot" ? " (unico)" : "/mes"
  }

  // Render template
  let html = renderProposal(content)
  html = html.replace(/\{\{FORM_ACTION_URL\}\}/g, formActionUrl)

  return { html, content }
}
