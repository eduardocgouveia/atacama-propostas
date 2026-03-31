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
  const delivery = (ai.delivery || ai.cosmos || {}) as Record<string, unknown>
  const investment = (ai.investment || {}) as Record<string, unknown>
  const roadmap = (ai.roadmap || {}) as Record<string, unknown>
  const cta = (ai.cta || {}) as Record<string, string>
  const credibility = (ai.credibility || {}) as Record<string, unknown>

  const diagCards = (truth.cards || truth.diagnostics || []) as Array<Record<string, string>>
  const serviceCards = (solution.services || solution.cards || []) as Array<Record<string, string>>
  const deliveryCards = (delivery.cards || delivery.items || []) as Array<Record<string, string>>
  const teamBadges = (solution.teamBadges || solution.badges || []) as string[]
  const roadmapItems = (roadmap.items || []) as Array<Record<string, unknown>>
  const anchors = (investment.anchors || []) as Array<Record<string, string>>
  const inclusos = (investment.inclusos || investment.features || []) as string[]

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
  }

  // Diagnosis cards (3 cards: DIAG_1_EYEBROW, DIAG_1_TITLE, DIAG_1_DESC)
  diagCards.forEach((card, i) => {
    const n = i + 1
    values[`DIAG_${n}_EYEBROW`] = card.eyebrow || card.stat || `PROBLEMA #${n}`
    values[`DIAG_${n}_TITLE`] = card.title || editedData.selectedPains[i] || ""
    values[`DIAG_${n}_DESC`] = card.description || card.desc || ""
  })

  // Solution
  values.SOLUTION_HEADLINE = (solution.headline as string) || ""
  values.SOLUTION_DESCRIPTION = (solution.description as string) || ""

  // Service cards (SERVICE_1_TITLE, SERVICE_1_DESC ... SERVICE_5_*)
  serviceCards.forEach((card, i) => {
    const n = i + 1
    values[`SERVICE_${n}_TITLE`] = card.title || ""
    values[`SERVICE_${n}_DESC`] = card.description || card.desc || ""
  })

  // Team badges (BADGE_1 ... BADGE_8)
  teamBadges.forEach((b, i) => {
    values[`BADGE_${i + 1}`] = b
  })

  // Delivery cards (DELIVERY_1_TAG, DELIVERY_1_TITLE, DELIVERY_1_DESC ... DELIVERY_8_*)
  deliveryCards.forEach((card, i) => {
    const n = i + 1
    values[`DELIVERY_${n}_TAG`] = card.tag || card.eyebrow || ""
    values[`DELIVERY_${n}_TITLE`] = card.title || ""
    values[`DELIVERY_${n}_DESC`] = card.description || card.desc || ""
  })

  // Credibility (not in new templates but keep for compat)
  const credNums = (credibility.numbers || []) as Array<Record<string, string>>
  credNums.forEach((n, i) => {
    values[`CRED_STAT_${i + 1}_NUMBER`] = n.value || ""
    values[`CRED_STAT_${i + 1}_LABEL`] = n.label || ""
  })
  values.CREDIBILITY_INTRO = (credibility.intro as string) || ""
  values.CREDIBILITY_DESCRIPTION = (credibility.description as string) || ""

  // Investment - depends on template type
  values.INVESTMENT_HEADLINE = (investment.headline as string) || "O investimento."
  values.INVESTMENT_DESCRIPTION = (investment.description as string) || ""

  if (templateType === "tipo-b" && editedData.selectedPlans.length >= 3) {
    // 3 plans (PLAN_A_*, PLAN_B_*, PLAN_C_*)
    editedData.selectedPlans.forEach((plan, i) => {
      const letter = String.fromCharCode(65 + i) // A, B, C
      values[`PLAN_${letter}_NAME`] = plan.name
      values[`PLAN_${letter}_PRICE`] = `R$ ${plan.price.toLocaleString("pt-BR")}`
      values[`PLAN_${letter}_PERIOD`] = plan.type === "one-shot" ? " (único)" : "/mês"
      values[`PLAN_${letter}_SETUP`] = `R$ ${plan.setup.toLocaleString("pt-BR")}`
      values[`PLAN_${letter}_ORIGINAL_PRICE`] = (investment[`plan${letter}OriginalPrice`] as string) || `R$ ${Math.round(plan.price * 1.6).toLocaleString("pt-BR")}`
      values[`PLAN_${letter}_CTA_URL`] = formActionUrl

      // Features from AI, falling back to plan description split into items
      const planFeatures = (investment[`plan${letter}Features`] as string[]) || []
      if (planFeatures.length > 0) {
        planFeatures.forEach((f, j) => {
          values[`PLAN_${letter}_FEAT_${j + 1}`] = f
        })
      } else {
        // Fallback: split plan description into feature items
        const descParts = plan.description.split(/[.,;]+/).map(s => s.trim()).filter(Boolean)
        descParts.forEach((part, j) => {
          values[`PLAN_${letter}_FEAT_${j + 1}`] = part
        })
      }
    })

    // Recommended plan B discount
    values.PLAN_B_SETUP_DISCOUNT = (investment.planBSetupDiscount as string) || ""

    // Compare table (COMPARE_1_LABEL, COMPARE_1_A, COMPARE_1_B, COMPARE_1_C)
    const compareRows = (investment.compareRows || []) as Array<Record<string, string>>
    compareRows.forEach((row, i) => {
      const n = i + 1
      values[`COMPARE_${n}_LABEL`] = row.label || ""
      values[`COMPARE_${n}_A`] = row.a || ""
      values[`COMPARE_${n}_B`] = row.b || ""
      values[`COMPARE_${n}_C`] = row.c || ""
    })

    // Selected plan info for form
    values.SELECTED_PLAN = editedData.selectedPlans[1]?.name || editedData.selectedPlans[0].name
    values.SELECTED_PLAN_PRICE = `R$ ${(editedData.selectedPlans[1] || editedData.selectedPlans[0]).price.toLocaleString("pt-BR")}`
    values.SELECTED_PLAN_ORIGINAL_PRICE = (investment.selectedPlanOriginalPrice as string) || ""
    values.SELECTED_PLAN_DISCOUNT = (investment.selectedPlanDiscount as string) || ""
    values.SELECTED_PLAN_ECONOMY = (investment.selectedPlanEconomy as string) || ""
    values.SELECTED_PLAN_UNIT_PRICE = (investment.selectedPlanUnitPrice as string) || ""
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
  }

  // Anchoring table (tipo-a: ANCHOR_1_SERVICE, ANCHOR_1_PRICE ... ANCHOR_8_*)
  anchors.forEach((a, i) => {
    const n = i + 1
    values[`ANCHOR_${n}_SERVICE`] = a.service || ""
    values[`ANCHOR_${n}_PRICE`] = a.price || ""
  })
  values.ANCHOR_TOTAL = (investment.anchorTotal as string) || ""

  // Inclusos (INCLUSO_1 ... INCLUSO_8)
  inclusos.forEach((item, i) => {
    values[`INCLUSO_${i + 1}`] = item
  })

  // Setup
  values.SETUP_ORIGINAL = (investment.setupOriginal as string) || `R$ ${Math.round(editedData.selectedPlans[0].setup * 1.5).toLocaleString("pt-BR")}`
  values.SETUP_DISCOUNTED = (investment.setupDiscounted as string) || `R$ ${editedData.selectedPlans[0].setup.toLocaleString("pt-BR")}`
  values.SETUP_DISCOUNT_BADGE = (investment.setupDiscountBadge as string) || ""
  values.SETUP_INSTALLMENT = (investment.setupInstallments as string) || ""
  values.SETUP_DESCRIPTION = (investment.setupDescription as string) || ""

  // Scarcity
  values.SCARCITY_TEXT = (investment.scarcityText as string) || "Capacidade limitada. Vagas abertas para novos clientes até o final do mês."
  values.SCARCITY_TEXT_CTA = (investment.scarcityTextCta as string) || values.SCARCITY_TEXT

  // Roadmap (STEP_1_TIME, STEP_1_TITLE, STEP_1_DESC, STEP_1_DELIVERABLES)
  values.ROADMAP_HEADLINE = (roadmap.headline as string) || "Próximos Passos"
  roadmapItems.forEach((item, i) => {
    const n = i + 1
    values[`STEP_${n}_TIME`] = (item.marker as string) || (item.timeframe as string) || ""
    values[`STEP_${n}_TITLE`] = (item.title as string) || ""
    values[`STEP_${n}_DESC`] = (item.description as string) || ""
    const deliverables = (item.deliverables || []) as string[]
    values[`STEP_${n}_DELIVERABLES`] = deliverables.join(" · ")
  })

  // CTA / Form
  values.CTA_HEADLINE = cta.headline || "Vamos começar?"
  values.CTA_SUBTITLE = cta.subtitle || ""
  values.EXPIRY_TEXT = cta.expiryText || `Condições válidas até ${values.EXPIRY_DATE}`
  values.FORM_ACTION_URL = formActionUrl
  values.PROPOSAL_URL = formActionUrl

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
