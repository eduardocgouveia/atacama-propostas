import { readFileSync } from "fs"
import { join } from "path"

const TEMPLATES_DIR = join(process.cwd(), "content", "templates")

export interface ProposalContent {
  hero: {
    monthYear: string
    companyName: string
    tagline: string
    expiryDate: string
    contactName: string
    location: string
  }
  truth: {
    headline: string
    quote: string
    cards: Array<{
      eyebrow: string
      title: string
      description: string
    }>
  }
  solution: {
    headline: string
    description: string
    cards: Array<{
      title: string
      description: string
    }>
    teamBadges: string[]
  }
  cosmos: {
    cards: Array<{
      badge: string
      title: string
      description: string
      deliverable: string
    }>
  }
  credibility: {
    numbers: Array<{
      value: string
      label: string
    }>
  }
  investment: {
    anchorRows: Array<{
      service: string
      marketPrice: string
    }>
    anchorTotal: string
    planName: string
    planPrice: string
    planPeriod: string
    savingsText: string
    features: string[]
    setupOriginal: string
    setupDiscount: string
    setupInstallments: string
    scarcityText: string
  }
  roadmap: {
    items: Array<{
      marker: string
      title: string
      description: string
      deliverables: string[]
    }>
  }
}

function renderDiagnosisCards(cards: ProposalContent["truth"]["cards"]): string {
  return cards
    .map(
      (card, i) => `
        <div class="card-glass reveal reveal-delay-${i + 1}">
          <p class="eyebrow" style="margin-bottom:8px;">${card.eyebrow}</p>
          <p style="font-size:28px;font-weight:800;">${card.title}</p>
          <p style="font-size:14px;color:var(--gray-50);margin-top:8px;">${card.description}</p>
        </div>`
    )
    .join("\n")
}

function renderSolutionCards(cards: ProposalContent["solution"]["cards"]): string {
  const icons = [
    // Target icon
    `<svg viewBox="0 0 48 48" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g class="state-a"><circle cx="24" cy="24" r="18" stroke-dasharray="4 4" opacity="0.3"/><circle cx="24" cy="24" r="11" stroke-dasharray="3 3" opacity="0.5"/><circle cx="24" cy="24" r="4"/></g><g class="state-b"><circle cx="24" cy="24" r="18" opacity="0.3"/><circle cx="24" cy="24" r="11" opacity="0.5"/><circle cx="24" cy="24" r="4"/><line x1="24" y1="2" x2="24" y2="10" opacity="0.4"/><line x1="38" y1="24" x2="46" y2="24" opacity="0.4"/></g></svg>`,
    // Eye icon
    `<svg viewBox="0 0 48 48" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g class="state-a"><path d="M4 24s8-14 20-14 20 14 20 14-8 14-20 14S4 24 4 24z"/><circle cx="24" cy="24" r="6"/></g><g class="state-b"><path d="M4 24s8-14 20-14 20 14 20 14-8 14-20 14S4 24 4 24z"/><circle cx="24" cy="24" r="3"/><line x1="24" y1="18" x2="24" y2="30" stroke-width="1.5"/></g></svg>`,
    // Download icon
    `<svg viewBox="0 0 48 48" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g class="state-a"><path d="M8 34v6a2 2 0 002 2h28a2 2 0 002-2v-6"/><line x1="24" y1="6" x2="24" y2="28"/><polyline points="16,22 24,28 32,22"/></g><g class="state-b"><path d="M8 34v6a2 2 0 002 2h28a2 2 0 002-2v-6"/><path d="M16 24l8 8 10-12" stroke-width="3"/></g></svg>`,
    // Heart icon
    `<svg viewBox="0 0 48 48" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g class="state-a"><path d="M24 40s-16-9-16-20a9 9 0 0116-7 9 9 0 0116 7c0 11-16 20-16 20z"/></g><g class="state-b"><path class="icon-heart" d="M24 40s-16-9-16-20a9 9 0 0116-7 9 9 0 0116 7c0 11-16 20-16 20z" fill="#000" stroke="none"/></g></svg>`,
    // Chart icon
    `<svg viewBox="0 0 48 48" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g class="state-a"><rect x="6" y="6" width="36" height="36" rx="4" opacity="0.2"/><line x1="12" y1="30" x2="12" y2="18"/><line x1="20" y1="30" x2="20" y2="14"/><line x1="28" y1="30" x2="28" y2="22"/><line x1="36" y1="30" x2="36" y2="10"/></g><g class="state-b"><rect x="6" y="6" width="36" height="36" rx="4" opacity="0.2"/><path d="M12 28l8-6 8 4 8-12" stroke-width="2.5"/><circle cx="36" cy="14" r="3" fill="#000" stroke="none"/></g></svg>`,
  ]

  return cards
    .map(
      (card, i) => `
      <div class="card-white" style="text-align:center;">
        <div class="anim-icon">${icons[i % icons.length]}</div>
        <h3 style="font-size:15px;font-weight:700;color:#000;">${card.title}</h3>
        <p style="font-size:12px;color:var(--gray-60);margin-top:8px;line-height:1.5;">${card.description}</p>
      </div>`
    )
    .join("\n")
}

function renderTeamBadges(badges: string[]): string {
  return badges
    .map((b) => `<span class="team-badge">${b}</span>`)
    .join("\n      ")
}

function renderCosmosCards(cards: ProposalContent["cosmos"]["cards"]): string {
  return cards
    .map(
      (card, i) => `
      <div class="cosmos-card${i === 0 ? " active" : ""}" data-planet="${i}">
        <span class="cosmos-badge">${card.badge}</span>
        <h3 class="cosmos-card-h">${card.title}</h3>
        <p class="cosmos-card-p">${card.description}</p>
        <div class="cosmos-deliverable">${card.deliverable}</div>
      </div>`
    )
    .join("\n")
}

function renderCredNumbers(numbers: ProposalContent["credibility"]["numbers"]): string {
  return numbers
    .map(
      (n) => `
        <div class="cred-num-item-v10 reveal">
          <div class="cred-num-value-v10" data-target="${n.value.replace(/[^0-9]/g, "")}">${n.value}</div>
          <div class="cred-num-label-v10">${n.label}</div>
        </div>`
    )
    .join("\n")
}

function renderAnchorTable(rows: ProposalContent["investment"]["anchorRows"]): string {
  return rows
    .map(
      (r) => `
          <div class="invest-anchor-row">
            <span>${r.service}</span>
            <span>${r.marketPrice}</span>
          </div>`
    )
    .join("\n")
}

function renderFeatures(features: string[]): string {
  return features
    .map(
      (f) => `
            <li class="feat-item">
              <span class="feat-check"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span class="feat-text">${f}</span>
            </li>`
    )
    .join("\n")
}

function renderRoadmap(items: ProposalContent["roadmap"]["items"]): string {
  return items
    .map(
      (item, i) => `
        <div class="roadmap-item reveal reveal-delay-${i + 1}">
          <div class="roadmap-marker"><span>${item.marker}</span></div>
          <div class="roadmap-dot${i === 0 ? " rdot-now" : " rdot-next"}"></div>
          <div class="roadmap-content">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <div class="deliverables">
              ${item.deliverables.map((d) => `<span class="deliverable">${d}</span>`).join("\n              ")}
            </div>
          </div>
        </div>`
    )
    .join("\n")
}

export function renderProposal(content: ProposalContent): string {
  let html = readFileSync(join(TEMPLATES_DIR, "tipo-a.html"), "utf-8")

  // Simple placeholders
  html = html.replace(/\{\{MONTH_YEAR\}\}/g, content.hero.monthYear)
  html = html.replace(/\{\{COMPANY_NAME\}\}/g, content.hero.companyName)
  html = html.replace(/\{\{HERO_TAGLINE\}\}/g, content.hero.tagline)
  html = html.replace(/\{\{EXPIRY_DATE\}\}/g, content.hero.expiryDate)
  html = html.replace(/\{\{CONTACT_NAME\}\}/g, content.hero.contactName)
  html = html.replace(/\{\{LOCATION\}\}/g, content.hero.location)
  html = html.replace(/\{\{TRUTH_HEADLINE\}\}/g, content.truth.headline)
  html = html.replace(/\{\{TRUTH_QUOTE\}\}/g, content.truth.quote)
  html = html.replace(/\{\{SOLUTION_HEADLINE\}\}/g, content.solution.headline)
  html = html.replace(/\{\{SOLUTION_DESCRIPTION\}\}/g, content.solution.description)
  html = html.replace(/\{\{FORM_ACTION_URL\}\}/g, "")

  // Plan/investment placeholders
  html = html.replace(/\{\{PLAN_NAME\}\}/g, content.investment.planName)
  html = html.replace(/\{\{PLAN_PRICE\}\}/g, content.investment.planPrice)
  html = html.replace(/\{\{SAVINGS_TEXT\}\}/g, content.investment.savingsText)
  html = html.replace(/\{\{SCARCITY_TEXT\}\}/g, content.investment.scarcityText)

  // Dynamic sections - replace content between markers
  // Diagnosis cards
  html = html.replace(
    /<!-- DIAGNOSIS_CARDS_START -->[\s\S]*?<!-- DIAGNOSIS_CARDS_END -->/,
    `<!-- DIAGNOSIS_CARDS_START -->${renderDiagnosisCards(content.truth.cards)}<!-- DIAGNOSIS_CARDS_END -->`
  )

  // Solution cards
  html = html.replace(
    /<!-- SOLUTION_CARDS_START -->[\s\S]*?<!-- SOLUTION_CARDS_END -->/,
    `<!-- SOLUTION_CARDS_START -->${renderSolutionCards(content.solution.cards)}<!-- SOLUTION_CARDS_END -->`
  )

  // Team badges
  html = html.replace(
    /<!-- TEAM_BADGES_START -->[\s\S]*?<!-- TEAM_BADGES_END -->/,
    `<!-- TEAM_BADGES_START -->${renderTeamBadges(content.solution.teamBadges)}<!-- TEAM_BADGES_END -->`
  )

  // Cosmos cards
  html = html.replace(
    /<!-- COSMOS_CARDS_START -->[\s\S]*?<!-- COSMOS_CARDS_END -->/,
    `<!-- COSMOS_CARDS_START -->${renderCosmosCards(content.cosmos.cards)}<!-- COSMOS_CARDS_END -->`
  )

  // Credibility numbers
  html = html.replace(
    /<!-- CRED_NUMBERS_START -->[\s\S]*?<!-- CRED_NUMBERS_END -->/,
    `<!-- CRED_NUMBERS_START -->${renderCredNumbers(content.credibility.numbers)}<!-- CRED_NUMBERS_END -->`
  )

  // Anchor table
  html = html.replace(
    /<!-- ANCHOR_TABLE_START -->[\s\S]*?<!-- ANCHOR_TABLE_END -->/,
    `<!-- ANCHOR_TABLE_START -->${renderAnchorTable(content.investment.anchorRows)}
        <div class="invest-anchor-total">
          <span>Se contratasse separado</span>
          <span>${content.investment.anchorTotal}</span>
        </div><!-- ANCHOR_TABLE_END -->`
  )

  // Features
  html = html.replace(
    /<!-- FEATURES_START -->[\s\S]*?<!-- FEATURES_END -->/,
    `<!-- FEATURES_START -->${renderFeatures(content.investment.features)}<!-- FEATURES_END -->`
  )

  // Roadmap
  html = html.replace(
    /<!-- ROADMAP_START -->[\s\S]*?<!-- ROADMAP_END -->/,
    `<!-- ROADMAP_START -->${renderRoadmap(content.roadmap.items)}<!-- ROADMAP_END -->`
  )

  return html
}
