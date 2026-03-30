import { getClient, MODELS } from "./client"
import { getContentPrompt } from "./prompts"
import { renderProposal, type TemplateType } from "../template-engine"
import type { AnalysisResult } from "./analyze"
import type { EditedProposalData } from "../types"

/**
 * Convert structured AI JSON into flat placeholder map for the template.
 */
function buildPlaceholders(
  ai: Record<string, unknown>,
  editedData: EditedProposalData,
  formActionUrl: string,
  templateType: TemplateType
): Record<string, string> {
  const hero = (ai.hero || {}) as Record<string, string>
  const truth = (ai.truth || {}) as Record<string, unknown>
  const solution = (ai.solution || {}) as Record<string, unknown>
  const cosmos = (ai.cosmos || {}) as Record<string, unknown>
  const investment = (ai.investment || {}) as Record<string, unknown>
  const roadmap = (ai.roadmap || {}) as Record<string, unknown>

  const truthCards = (truth.cards || []) as Array<Record<string, string>>
  const solCards = (solution.cards || []) as Array<Record<string, string>>
  const cosmosCards = (cosmos.cards || []) as Array<Record<string, string>>
  const teamBadges = (solution.teamBadges || []) as string[]
  const roadmapItems = (roadmap.items || []) as Array<Record<string, unknown>>
  const features = (investment.features || []) as string[]

  const values: Record<string, string> = {
    // Hero
    MONTH_YEAR: hero.monthYear || new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }).toUpperCase(),
    COMPANY_NAME: editedData.companyName,
    HERO_TAGLINE: hero.tagline || editedData.diagnosis,
    EXPIRY_DATE: hero.expiryDate || "",
    CONTACT_NAME: editedData.contactName,
    LOCATION: editedData.location,

    // Truth
    TRUTH_HEADLINE: (truth.headline as string) || editedData.inconvenientTruth,
    TRUTH_QUOTE: (truth.quote as string) || "",
    TRUTH_DESCRIPTION: (truth.description as string) || "",
    TRUTH_QUOTE_ATTRIBUTION: (truth.attribution as string) || "",
  }

  // Pain point cards (tipo-b uses PAIN_POINT_N, tipo-a uses CARD_N)
  truthCards.forEach((card, i) => {
    const n = i + 1
    values[`PAIN_POINT_${n}_STAT`] = card.eyebrow || card.stat || `PROBLEMA #${n}`
    values[`PAIN_POINT_${n}_TITLE`] = card.title || editedData.selectedPains[i] || ""
    values[`PAIN_POINT_${n}_DESCRIPTION`] = card.description || ""
  })

  // Solution
  values.SOLUTION_HEADLINE = (solution.headline as string) || ""
  values.SOLUTION_DESCRIPTION = (solution.description as string) || ""
  solCards.forEach((card, i) => {
    const n = i + 1
    values[`SOLUTION_${n}_TITLE`] = card.title || ""
    values[`SOLUTION_${n}_DESCRIPTION`] = card.description || ""
  })

  // Team badges
  teamBadges.forEach((b, i) => {
    values[`TEAM_BADGE_${i + 1}`] = b
  })

  // COSMOS
  cosmosCards.forEach((card, i) => {
    const n = i + 1
    values[`COSMOS_CARD_${n}_TITLE`] = card.title || ""
    values[`COSMOS_CARD_${n}_DESCRIPTION`] = card.description || ""
    // Deliverables can be string or array
    const del = card.deliverable || card.deliverables
    if (typeof del === "string") {
      values[`COSMOS_DELIVERABLE_${n}_1`] = del
      values[`COSMOS_DELIVERABLE_${n}_2`] = ""
    } else if (Array.isArray(del)) {
      (del as string[]).forEach((d, j) => {
        values[`COSMOS_DELIVERABLE_${n}_${j + 1}`] = d
      })
    }
  })

  // Credibility
  const credNums = ((ai.credibility as Record<string, unknown>)?.numbers || []) as Array<Record<string, string>>
  credNums.forEach((n, i) => {
    values[`CRED_STAT_${i + 1}_NUMBER`] = n.value || ""
    values[`CRED_STAT_${i + 1}_LABEL`] = n.label || ""
  })
  values.CREDIBILITY_INTRO = ((ai.credibility as Record<string, unknown>)?.intro as string) || ""
  values.CREDIBILITY_DESCRIPTION = ((ai.credibility as Record<string, unknown>)?.description as string) || ""

  // Testimonials
  const testimonials = ((ai.credibility as Record<string, unknown>)?.testimonials || []) as Array<Record<string, string>>
  testimonials.forEach((t, i) => {
    const n = i + 1
    values[`TESTIMONIAL_${n}_QUOTE`] = t.quote || ""
    values[`TESTIMONIAL_${n}_NAME`] = t.name || ""
    values[`TESTIMONIAL_${n}_ROLE`] = t.role || ""
  })

  // Also set old-style TESTIMONIAL_ for tipo-a compat
  values.TESTIMONIAL_QUOTE = testimonials[0]?.quote || ""
  values.TESTIMONIAL_NAME = testimonials[0]?.name || ""
  values.TESTIMONIAL_ROLE = testimonials[0]?.role || ""

  // Investment - depends on template type
  values.INVESTMENT_HEADLINE = (investment.headline as string) || "O investimento."
  values.INVESTMENT_DESCRIPTION = (investment.description as string) || ""

  if (templateType === "tipo-b" && editedData.selectedPlans.length >= 3) {
    // 3 plans
    editedData.selectedPlans.forEach((plan, i) => {
      const letter = String.fromCharCode(65 + i) // A, B, C
      values[`PLAN_${letter}_BADGE`] = plan.name
      values[`PLAN_${letter}_MONTHLY_PRICE`] = `R$ ${plan.price.toLocaleString("pt-BR")}/mês`
      values[`PLAN_${letter}_SETUP_PRICE`] = `Setup: R$ ${plan.setup.toLocaleString("pt-BR")}`

      // Features from AI or plan description
      const planFeatures = (investment[`plan${letter}Features`] as string[]) || features
      planFeatures.forEach((f, j) => {
        values[`PLAN_${letter}_ITEM_${j + 1}`] = f
      })
    })
    // Recommended plan discount
    values.PLAN_B_SETUP_DISCOUNT = (investment.planBSetupDiscount as string) || ""
  } else {
    // Single plan (tipo-a)
    const plan = editedData.selectedPlans[0]
    values.PLAN_NAME = plan.name
    values.PLAN_PRICE = `R$ ${plan.price.toLocaleString("pt-BR")}`
    values.PLAN_PERIOD = plan.type === "one-shot" ? " (único)" : "/mês"
    values.PLAN_BASE = plan.name
    values.PLAN_ORIGINAL_PRICE = (investment.anchorTotal as string) || ""
    values.PLAN_ECONOMY = (investment.savingsText as string) || ""
    values.PLAN_UNIT_PRICE = `R$ ${plan.price.toLocaleString("pt-BR")}`
    values.PLAN_DISCOUNT_LABEL = (investment.discountLabel as string) || ""
    values.SAVINGS_VS_MARKET = (investment.savingsText as string) || ""
    values.ANCHOR_TOTAL = (investment.anchorTotal as string) || ""
    values.SETUP_ORIGINAL = (investment.setupOriginal as string) || `R$ ${Math.round(plan.setup * 1.5).toLocaleString("pt-BR")}`
    values.SETUP_PRICE = `R$ ${plan.setup.toLocaleString("pt-BR")}`
    values.SETUP_DISCOUNT_LABEL = (investment.setupDiscountLabel as string) || ""
    values.SETUP_INSTALLMENT = (investment.setupInstallments as string) || ""
  }

  values.SCARCITY_TEXT = (investment.scarcityText as string) || "Capacidade limitada. Vagas abertas para novos clientes até o final do mês."
  values.SCARCITY_DEADLINE = (investment.scarcityDeadline as string) || ""

  // Setup section (tipo-b)
  values.SETUP_DESCRIPTION = (investment.setupDescription as string) || ""
  values.SETUP_ORIGINAL_PRICE = (investment.setupOriginal as string) || ""
  values.SETUP_DISCOUNTED_PRICE = (investment.setupDiscount as string) || ""
  values.SETUP_DISCOUNT_PERCENT = (investment.setupDiscountPercent as string) || ""

  // Roadmap
  values.ROADMAP_HEADLINE = (roadmap.headline as string) || "Próximos Passos"
  roadmapItems.forEach((item, i) => {
    const n = i + 1
    values[`ROADMAP_STEP_${n}_TIMEFRAME`] = (item.marker as string) || ""
    values[`ROADMAP_STEP_${n}_TITLE`] = (item.title as string) || ""
    values[`ROADMAP_STEP_${n}_DESCRIPTION`] = (item.description as string) || ""
    const deliverables = (item.deliverables || []) as string[]
    deliverables.forEach((d, j) => {
      values[`ROADMAP_STEP_${n}_DELIVERABLE_${j + 1}`] = d
    })
  })

  // CTA / Form
  const cta = (ai.cta || {}) as Record<string, string>
  values.CTA_FINAL_HEADLINE = cta.headline || "Vamos começar?"
  values.CTA_FINAL_EXPIRY = values.EXPIRY_DATE
  values.CTA_FINAL_BUTTON_TEXT = "Quero Contratar"
  values.CTA_FINAL_LINK = formActionUrl
  values.CTA_LINK_ACEITE = formActionUrl
  values.CTA_HEADLINE = values.CTA_FINAL_HEADLINE
  values.CTA_EXPIRY = values.EXPIRY_DATE
  values.CTA_LINK = formActionUrl
  values.FORM_ACTION_URL = formActionUrl

  // Coordinates (Recife default)
  values.LOCATION_LAT = "8°02'36.6\" S"
  values.LOCATION_LONG = "34°53'53.5\" W"

  return values
}

export async function generateProposalContent(
  editedData: EditedProposalData,
  analysis: AnalysisResult,
  formActionUrl: string
): Promise<{ html: string }> {
  const templateType: TemplateType =
    editedData.selectedPlans.length >= 3 ? "tipo-b" : "tipo-a"

  const mainPlan = editedData.selectedPlans[0]
  const systemPrompt = getContentPrompt(mainPlan.name)

  const plansInfo = editedData.selectedPlans
    .map(
      (p) =>
        `- ${p.name}: R$ ${p.price.toLocaleString("pt-BR")}${p.type === "one-shot" ? " (unico)" : "/mes"} + Setup R$ ${p.setup.toLocaleString("pt-BR")} | ${p.description}`
    )
    .join("\n")

  const userPrompt = `Gere o JSON de conteudo para a proposta:

EMPRESA: ${editedData.companyName}
CONTATO: ${editedData.contactName}
SETOR: ${editedData.sector}
LOCAL: ${editedData.location}
FATURAMENTO: ${editedData.revenue}

OBJETIVOS: ${editedData.goals}
PLANOS ATUAIS: ${editedData.plans}
URGENCIA: ${editedData.timeline}

DIAGNOSTICO: ${editedData.diagnosis}
VERDADE INCONVENIENTE: ${editedData.inconvenientTruth}
DESAFIOS: ${editedData.challenges}

DORES:
${editedData.selectedPains.map((p, i) => `${i + 1}. ${p}`).join("\n")}

PLANO(S) SELECIONADOS:
${plansInfo}

TEMPLATE: ${templateType === "tipo-b" ? "3 PLANOS (tipo-b)" : "1 PLANO (tipo-a)"}

PERSONA: ${analysis.analysis.personaMatch} (${analysis.analysis.personaAdherence}%)
GATILHOS: ${analysis.analysis.emotionalTriggers?.join(", ") || ""}`

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

  const aiContent = JSON.parse(cleaned)

  const values = buildPlaceholders(aiContent, editedData, formActionUrl, templateType)
  const html = renderProposal(templateType, values)

  return { html }
}
