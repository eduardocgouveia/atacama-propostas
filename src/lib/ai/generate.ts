import { getClient, MODELS } from "./client"
import { getContentPrompt } from "./prompts"
import { renderProposal, type ProposalContent } from "../template-engine"
import type { AnalysisResult } from "./analyze"
import type { EditedProposalData } from "../types"

export async function generateProposalContent(
  editedData: EditedProposalData,
  analysis: AnalysisResult,
  formActionUrl: string
): Promise<{ html: string }> {
  const mainPlan = editedData.selectedPlans[0]
  const systemPrompt = getContentPrompt(mainPlan.name)

  const plansInfo = editedData.selectedPlans
    .map((p) => `- ${p.name}: R$ ${p.price.toLocaleString("pt-BR")}${p.type === "one-shot" ? " (unico)" : "/mes"} + Setup R$ ${p.setup.toLocaleString("pt-BR")} | ${p.description}`)
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

PLANO(S):
${plansInfo}

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

  // Build ProposalContent with AI data + overrides from edited data
  const content: ProposalContent = {
    // Hero - use edited data directly
    monthYear: aiContent.monthYear || new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }).toUpperCase(),
    companyName: editedData.companyName,
    heroTagline: aiContent.heroTagline || editedData.diagnosis,
    expiryDate: aiContent.expiryDate || "",
    contactName: editedData.contactName,
    location: editedData.location,

    // Verdade Inconveniente
    truthHeadline: aiContent.truthHeadline || editedData.inconvenientTruth,
    truthQuote: aiContent.truthQuote || "",
    card1Eyebrow: aiContent.card1Eyebrow || "DOR 1",
    card1Title: aiContent.card1Title || editedData.selectedPains[0] || "",
    card1Desc: aiContent.card1Desc || "",
    card2Eyebrow: aiContent.card2Eyebrow || "DOR 2",
    card2Title: aiContent.card2Title || editedData.selectedPains[1] || "",
    card2Desc: aiContent.card2Desc || "",
    card3Eyebrow: aiContent.card3Eyebrow || "DOR 3",
    card3Title: aiContent.card3Title || editedData.selectedPains[2] || "",
    card3Desc: aiContent.card3Desc || "",

    // Solucao
    solutionHeadline: aiContent.solutionHeadline || "",
    solutionDesc: aiContent.solutionDesc || "",
    sol1Title: aiContent.sol1Title || "",
    sol1Desc: aiContent.sol1Desc || "",
    sol2Title: aiContent.sol2Title || "",
    sol2Desc: aiContent.sol2Desc || "",
    sol3Title: aiContent.sol3Title || "",
    sol3Desc: aiContent.sol3Desc || "",
    sol4Title: aiContent.sol4Title || "",
    sol4Desc: aiContent.sol4Desc || "",
    sol5Title: aiContent.sol5Title || "",
    sol5Desc: aiContent.sol5Desc || "",
    teamBadges: aiContent.teamBadges || ["Gestor de Trafego", "Customer Success", "Social Media", "Estrategista"],

    // COSMOS
    cosmos1Title: aiContent.cosmos1Title || "Imersao e Diagnostico",
    cosmos1Desc: aiContent.cosmos1Desc || "",
    cosmos1Deliverable: aiContent.cosmos1Deliverable || "",
    cosmos2Title: aiContent.cosmos2Title || "Mapeamento de Oportunidades",
    cosmos2Desc: aiContent.cosmos2Desc || "",
    cosmos2Deliverable: aiContent.cosmos2Deliverable || "",
    cosmos3Title: aiContent.cosmos3Title || "Execucao Criativa e Tecnica",
    cosmos3Desc: aiContent.cosmos3Desc || "",
    cosmos3Deliverable: aiContent.cosmos3Deliverable || "",
    cosmos4Title: aiContent.cosmos4Title || "Monitoramento e Otimizacao",
    cosmos4Desc: aiContent.cosmos4Desc || "",
    cosmos4Deliverable: aiContent.cosmos4Deliverable || "",
    cosmos5Title: aiContent.cosmos5Title || "Escalonamento Estrategico",
    cosmos5Desc: aiContent.cosmos5Desc || "",
    cosmos5Deliverable: aiContent.cosmos5Deliverable || "",

    // Credibilidade (Atacama stats, not prospect-specific)
    test1Quote: aiContent.test1Quote || "Resultado consistente mes a mes. A Atacama entende o que funciona.",
    test1Name: aiContent.test1Name || "Cliente Atacama",
    test1Role: aiContent.test1Role || "Diretor Comercial",
    test2Quote: aiContent.test2Quote || "Finalmente uma agencia que entrega dashboard de verdade.",
    test2Name: aiContent.test2Name || "Cliente Atacama",
    test2Role: aiContent.test2Role || "CEO",
    test3Quote: aiContent.test3Quote || "O metodo COSMOS organizou tudo. Agora sabemos exatamente onde investir.",
    test3Name: aiContent.test3Name || "Cliente Atacama",
    test3Role: aiContent.test3Role || "Gerente de Marketing",
    clientPills: aiContent.clientPills || ["OdontoCompany", "Grau Educacional", "COOPSETA", "Ballian Business", "Precisa Prime"],

    // Investimento - use catalog data
    investmentDesc: aiContent.investmentDesc || "",
    anchorRows: aiContent.anchorRows || [],
    anchorTotal: aiContent.anchorTotal || "",
    planName: mainPlan.name,
    planPrice: `R$ ${mainPlan.price.toLocaleString("pt-BR")}`,
    planPeriod: mainPlan.type === "one-shot" ? " (unico)" : "/mes",
    savingsText: aiContent.savingsText || "",
    features: aiContent.features || [],
    setupOriginal: `R$ ${(mainPlan.setup * 1.5).toLocaleString("pt-BR")}`,
    setupDiscount: `R$ ${mainPlan.setup.toLocaleString("pt-BR")}`,
    setupInstallments: aiContent.setupInstallments || `ou 2x de R$ ${Math.round(mainPlan.setup / 2).toLocaleString("pt-BR")}`,
    setupDesc: aiContent.setupDesc || "",
    setupDiscountLabel: aiContent.setupDiscountLabel || "Desconto exclusivo primeira turma",
    scarcityText: aiContent.scarcityText || "Capacidade limitada. Vagas abertas para novos clientes ate o final do mes.",

    // Proximos Passos
    ctaHeadline: aiContent.ctaHeadline || "Proximos Passos",
    ctaDesc: aiContent.ctaDesc || "",
    roadmapItems: aiContent.roadmapItems || [
      { marker: "SEMANA 1", title: "Kickoff e Imersao", description: "Reuniao de alinhamento e diagnostico completo.", deliverables: ["Kickoff", "Briefing"] },
      { marker: "SEMANA 2-3", title: "Setup e Lancamento", description: "Configuracao de campanhas e primeiros testes.", deliverables: ["Campanhas", "LPs"] },
      { marker: "MES 2+", title: "Otimizacao Continua", description: "Analise de dados e escalonamento.", deliverables: ["Dashboard", "Reports"] },
    ],

    // Form
    formActionUrl,
    hiddenPlano: mainPlan.name,
    hiddenProposta: editedData.companyName,
  }

  const html = renderProposal(content)
  return { html }
}
