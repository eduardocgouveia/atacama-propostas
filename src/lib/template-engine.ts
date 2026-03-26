import { readFileSync } from "fs"
import { join } from "path"

const TEMPLATES_DIR = join(process.cwd(), "content", "templates")

export interface ProposalContent {
  // Hero
  monthYear: string
  companyName: string
  heroTagline: string
  expiryDate: string
  contactName: string
  location: string

  // Verdade Inconveniente
  truthHeadline: string
  truthQuote: string
  card1Eyebrow: string
  card1Title: string
  card1Desc: string
  card2Eyebrow: string
  card2Title: string
  card2Desc: string
  card3Eyebrow: string
  card3Title: string
  card3Desc: string

  // Solucao
  solutionHeadline: string
  solutionDesc: string
  sol1Title: string
  sol1Desc: string
  sol2Title: string
  sol2Desc: string
  sol3Title: string
  sol3Desc: string
  sol4Title: string
  sol4Desc: string
  sol5Title: string
  sol5Desc: string
  teamBadges: string[]

  // COSMOS
  cosmos1Title: string
  cosmos1Desc: string
  cosmos1Deliverable: string
  cosmos2Title: string
  cosmos2Desc: string
  cosmos2Deliverable: string
  cosmos3Title: string
  cosmos3Desc: string
  cosmos3Deliverable: string
  cosmos4Title: string
  cosmos4Desc: string
  cosmos4Deliverable: string
  cosmos5Title: string
  cosmos5Desc: string
  cosmos5Deliverable: string

  // Credibilidade
  test1Quote: string
  test1Name: string
  test1Role: string
  test2Quote: string
  test2Name: string
  test2Role: string
  test3Quote: string
  test3Name: string
  test3Role: string
  clientPills: string[]

  // Investimento
  investmentDesc: string
  anchorRows: Array<{ service: string; price: string }>
  anchorTotal: string
  planName: string
  planPrice: string
  planPeriod: string
  savingsText: string
  features: string[]
  setupOriginal: string
  setupDiscount: string
  setupInstallments: string
  setupDesc: string
  setupDiscountLabel: string
  scarcityText: string

  // Proximos Passos
  ctaHeadline: string
  ctaDesc: string
  roadmapItems: Array<{
    marker: string
    title: string
    description: string
    deliverables: string[]
  }>

  // Form
  formActionUrl: string
  hiddenPlano: string
  hiddenProposta: string
}

function renderTeamBadges(badges: string[]): string {
  return badges.map((b) => `<span class="team-badge">${b}</span>`).join("\n      ")
}

function renderClientPills(pills: string[]): string {
  return pills.map((p) => `<span class="client-pill">${p}</span>`).join("\n")
}

function renderAnchorRows(rows: Array<{ service: string; price: string }>): string {
  return rows
    .map((r) => `<div class="invest-anchor-row"><span>${r.service}</span><span>${r.price}</span></div>`)
    .join("\n          ")
}

function renderFeatures(features: string[]): string {
  return features
    .map((f) => `<li class="feat-item">
              <span class="feat-check"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span class="feat-text">${f}</span>
            </li>`)
    .join("\n")
}

function renderRoadmap(items: ProposalContent["roadmapItems"]): string {
  return items
    .map((item, i) => `<div class="roadmap-item reveal reveal-delay-${i + 1}">
          <div class="roadmap-marker"><span>${item.marker}</span></div>
          <div class="roadmap-dot${i === 0 ? " rdot-now" : " rdot-next"}"></div>
          <div class="roadmap-content">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <div class="deliverables">
              ${item.deliverables.map((d) => `<span class="deliverable">${d}</span>`).join("\n              ")}
            </div>
          </div>
        </div>`)
    .join("\n")
}

export function renderProposal(content: ProposalContent): string {
  let html = readFileSync(join(TEMPLATES_DIR, "tipo-a-clean.html"), "utf-8")

  // Simple string replacements
  const replacements: Record<string, string> = {
    "{{MONTH_YEAR}}": content.monthYear,
    "{{COMPANY_NAME}}": content.companyName,
    "{{HERO_TAGLINE}}": content.heroTagline,
    "{{EXPIRY_DATE}}": content.expiryDate,
    "{{CONTACT_NAME}}": content.contactName,
    "{{LOCATION}}": content.location,
    "{{TRUTH_HEADLINE}}": content.truthHeadline,
    "{{TRUTH_QUOTE}}": content.truthQuote,
    "{{CARD1_EYEBROW}}": content.card1Eyebrow,
    "{{CARD1_TITLE}}": content.card1Title,
    "{{CARD1_DESC}}": content.card1Desc,
    "{{CARD2_EYEBROW}}": content.card2Eyebrow,
    "{{CARD2_TITLE}}": content.card2Title,
    "{{CARD2_DESC}}": content.card2Desc,
    "{{CARD3_EYEBROW}}": content.card3Eyebrow,
    "{{CARD3_TITLE}}": content.card3Title,
    "{{CARD3_DESC}}": content.card3Desc,
    "{{SOLUTION_HEADLINE}}": content.solutionHeadline,
    "{{SOLUTION_DESC}}": content.solutionDesc,
    "{{SOL1_TITLE}}": content.sol1Title,
    "{{SOL1_DESC}}": content.sol1Desc,
    "{{SOL2_TITLE}}": content.sol2Title,
    "{{SOL2_DESC}}": content.sol2Desc,
    "{{SOL3_TITLE}}": content.sol3Title,
    "{{SOL3_DESC}}": content.sol3Desc,
    "{{SOL4_TITLE}}": content.sol4Title,
    "{{SOL4_DESC}}": content.sol4Desc,
    "{{SOL5_TITLE}}": content.sol5Title,
    "{{SOL5_DESC}}": content.sol5Desc,
    "{{COSMOS1_TITLE}}": content.cosmos1Title,
    "{{COSMOS1_DESC}}": content.cosmos1Desc,
    "{{COSMOS1_DELIVERABLE}}": content.cosmos1Deliverable,
    "{{COSMOS2_TITLE}}": content.cosmos2Title,
    "{{COSMOS2_DESC}}": content.cosmos2Desc,
    "{{COSMOS2_DELIVERABLE}}": content.cosmos2Deliverable,
    "{{COSMOS3_TITLE}}": content.cosmos3Title,
    "{{COSMOS3_DESC}}": content.cosmos3Desc,
    "{{COSMOS3_DELIVERABLE}}": content.cosmos3Deliverable,
    "{{COSMOS4_TITLE}}": content.cosmos4Title,
    "{{COSMOS4_DESC}}": content.cosmos4Desc,
    "{{COSMOS4_DELIVERABLE}}": content.cosmos4Deliverable,
    "{{COSMOS5_TITLE}}": content.cosmos5Title,
    "{{COSMOS5_DESC}}": content.cosmos5Desc,
    "{{COSMOS5_DELIVERABLE}}": content.cosmos5Deliverable,
    "{{TEST1_QUOTE}}": content.test1Quote,
    "{{TEST1_NAME}}": content.test1Name,
    "{{TEST1_ROLE}}": content.test1Role,
    "{{TEST2_QUOTE}}": content.test2Quote,
    "{{TEST2_NAME}}": content.test2Name,
    "{{TEST2_ROLE}}": content.test2Role,
    "{{TEST3_QUOTE}}": content.test3Quote,
    "{{TEST3_NAME}}": content.test3Name,
    "{{TEST3_ROLE}}": content.test3Role,
    "{{INVESTMENT_DESC}}": content.investmentDesc,
    "{{ANCHOR_TOTAL}}": content.anchorTotal,
    "{{PLAN_NAME}}": content.planName,
    "{{PLAN_PRICE}}": content.planPrice,
    "{{PLAN_PERIOD}}": content.planPeriod,
    "{{SAVINGS_TEXT}}": content.savingsText,
    "{{SETUP_ORIGINAL}}": content.setupOriginal,
    "{{SETUP_DISCOUNT}}": content.setupDiscount,
    "{{SETUP_INSTALLMENTS}}": content.setupInstallments,
    "{{SETUP_DESC}}": content.setupDesc || "",
    "{{SETUP_DISCOUNT_LABEL}}": content.setupDiscountLabel || "Desconto exclusivo primeira turma",
    "{{SCARCITY_TEXT}}": content.scarcityText,
    "{{CTA_HEADLINE}}": content.ctaHeadline,
    "{{CTA_DESC}}": content.ctaDesc,
    "{{FORM_ACTION_URL}}": content.formActionUrl,
    "{{HIDDEN_PLANO}}": content.hiddenPlano || content.planName,
    "{{HIDDEN_PROPOSTA}}": content.hiddenProposta || content.companyName,
    "{{COMPANY_PLACEHOLDER}}": content.companyName,
    "{{CONTACT_PLACEHOLDER}}": content.contactName,
    "{{EMAIL_PLACEHOLDER}}": "",
    "{{MESSAGE_DEAL_DETAILS}}": `Plano ${content.planName} - ${content.planPrice}${content.planPeriod}`,
  }

  for (const [key, value] of Object.entries(replacements)) {
    html = html.split(key).join(value || "")
  }

  // Array replacements
  html = html.replace("{{TEAM_BADGES}}", renderTeamBadges(content.teamBadges))
  html = html.replace("{{CLIENT_PILLS}}", renderClientPills(content.clientPills))
  html = html.replace("{{ANCHOR_ROWS}}", renderAnchorRows(content.anchorRows))
  html = html.replace("{{FEATURES}}", renderFeatures(content.features))
  html = html.replace("{{ROADMAP_ITEMS}}", renderRoadmap(content.roadmapItems))

  return html
}
