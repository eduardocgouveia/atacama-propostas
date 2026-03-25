import { readFileSync } from "fs"
import { join } from "path"

const CONTENT_DIR = join(process.cwd(), "content")

function loadFile(relativePath: string): string {
  try {
    return readFileSync(join(CONTENT_DIR, relativePath), "utf-8")
  } catch {
    console.error(`Failed to load prompt file: ${relativePath}`)
    return ""
  }
}

export function getAnalysisSystemPrompt(): string {
  const skill = loadFile("prompts/SKILL.md")
  const catalogo = loadFile("plans/CATALOGO_PLANOS.md")
  const personas = loadFile("personas/ATACAMA_PERSONA_ENGINE_MAPA.md")

  return `${skill}

---

# CATALOGO DE PLANOS (source of truth para precos e planos)

${catalogo}

---

# MAPA DE PERSONAS E ICP

${personas}

---

# INSTRUCOES DE OUTPUT

Voce DEVE retornar um JSON valido com a seguinte estrutura (sem markdown code fences, apenas JSON puro):

{
  "prospect": {
    "companyName": "string",
    "contactName": "string",
    "sector": "string",
    "estimatedRevenue": "string (ex: R$ 80.000/mes)",
    "city": "string",
    "state": "string",
    "phone": "string",
    "email": "string"
  },
  "analysis": {
    "gpct": {
      "goals": "string - objetivos do prospect",
      "plans": "string - planos atuais",
      "challenges": "string - desafios identificados",
      "timeline": "string - urgencia/timeline"
    },
    "leadScore": number (0-100),
    "leadTemperature": "HOT|WARM|COOL|COLD",
    "personaMatch": "string - nome da persona mais proxima",
    "personaAdherence": number (0-100),
    "tier": "A|B|C|A+",
    "recommendedPlan": "string - nome do plano recomendado",
    "planPrice": number,
    "setupPrice": number,
    "alternativePlan": "string - plano alternativo",
    "diagnosis": "string - diagnostico resumido (3-5 frases)",
    "keyObjections": ["string - objecao 1", "string - objecao 2"],
    "objectionScripts": [{"objection": "string", "script": "string"}],
    "followUpCadence": "string - cadencia sugerida",
    "inconvenientTruth": "string - verdade inconveniente para o prospect",
    "emotionalTriggers": ["string"]
  }
}`
}

export function getContentPrompt(planName: string): string {
  const ancoragem = loadFile("prompts/ANCORAGEM_PRECOS.md")
  const escassez = loadFile("prompts/ELEMENTOS_ESCASSEZ.md")
  const catalogo = loadFile("plans/CATALOGO_PLANOS.md")

  // Load specific plan file
  const planFileMap: Record<string, string> = {
    "IGNITION": "plans/00_IGNITION.md",
    "START": "plans/01_START.md",
    "TRAFEGO START": "plans/01_START.md",
    "PRO": "plans/02_PRO.md",
    "TRAFEGO PRO": "plans/02_PRO.md",
    "ADVANCED": "plans/03_ADVANCED.md",
    "TRAFEGO ADVANCED": "plans/03_ADVANCED.md",
    "SOCIAL-PRO": "plans/04_SOCIAL_PRO.md",
    "PERF PRO + SOCIAL": "plans/05_PERF_PRO_SOCIAL.md",
    "PERF PRO + SOCIAL + AV": "plans/06_PERF_PRO_SOCIAL_AV.md",
    "DIAMOND": "plans/07_DIAMOND.md",
  }

  const planFile = planFileMap[planName.toUpperCase()] || ""
  const planContent = planFile ? loadFile(planFile) : ""

  return `Voce e o motor comercial da Atacama Digital. Sua funcao e gerar o CONTEUDO TEXTUAL para preencher um template HTML fixo de proposta comercial. NAO gere HTML. Retorne APENAS JSON.

# CATALOGO DE PLANOS

${catalogo}

# ANCORAGEM DE PRECOS

${ancoragem}

# ELEMENTOS DE ESCASSEZ

${escassez}

${planContent ? `# DETALHES DO PLANO: ${planName}\n\n${planContent}` : ""}

# REGRAS DE CONTEUDO

- Portugues brasileiro com acentuacao correta
- Tom: firme, lucido, provocativo. Sem corporativismo
- Use as palavras exatas que o prospect usou na call
- Frases curtas, paragrafos curtos, alto impacto
- A data de validade deve ser 10 dias a partir de hoje (${new Date().toLocaleDateString("pt-BR")})
- Nunca use: "solucao integrada", "confia no processo", "ROI garantido"

# FORMATO DE OUTPUT

Retorne APENAS um JSON valido (sem markdown code fences) com esta estrutura:

{
  "hero": {
    "monthYear": "MES ANO em maiusculas (ex: MARCO 2026)",
    "companyName": "Nome da empresa",
    "tagline": "Frase de impacto sobre o prospect (1-2 linhas)",
    "expiryDate": "DD DE MES DE ANO em maiusculas",
    "contactName": "Nome do contato",
    "location": "Cidade / Estado"
  },
  "truth": {
    "headline": "Verdade inconveniente em 1-2 frases impactantes",
    "quote": "Citacao provocativa usando palavras do prospect da call",
    "cards": [
      {"eyebrow": "TEMA", "title": "Titulo impactante (4-8 palavras)", "description": "Descricao detalhada (2-3 frases)"},
      {"eyebrow": "TEMA", "title": "Titulo impactante", "description": "Descricao detalhada"},
      {"eyebrow": "TEMA", "title": "Titulo impactante", "description": "Descricao detalhada"}
    ]
  },
  "solution": {
    "headline": "Headline da solucao (pode usar <br> para quebra)",
    "description": "Descricao da solucao em 2-3 frases",
    "cards": [
      {"title": "Nome do servico/entrega", "description": "O que entregamos (1-2 frases)"},
      {"title": "Nome do servico/entrega", "description": "O que entregamos"},
      {"title": "Nome do servico/entrega", "description": "O que entregamos"},
      {"title": "Nome do servico/entrega", "description": "O que entregamos"},
      {"title": "Nome do servico/entrega", "description": "O que entregamos"}
    ],
    "teamBadges": ["Badge 1", "Badge 2", "Badge 3", "Badge 4", "Badge 5"]
  },
  "cosmos": {
    "cards": [
      {"badge": "ETAPA 01 / 05", "title": "Imersao e Diagnostico", "description": "Descricao da etapa (2-3 frases)", "deliverable": "Entregavel principal da etapa"},
      {"badge": "ETAPA 02 / 05", "title": "Titulo", "description": "Descricao", "deliverable": "Entregavel"},
      {"badge": "ETAPA 03 / 05", "title": "Titulo", "description": "Descricao", "deliverable": "Entregavel"},
      {"badge": "ETAPA 04 / 05", "title": "Titulo", "description": "Descricao", "deliverable": "Entregavel"},
      {"badge": "ETAPA 05 / 05", "title": "Titulo", "description": "Descricao", "deliverable": "Entregavel"}
    ]
  },
  "credibility": {
    "numbers": [
      {"value": "50+", "label": "Clientes ativos"},
      {"value": "R$ 2M+", "label": "Em midia gerenciada"},
      {"value": "4.9", "label": "Avaliacao Google"},
      {"value": "97%", "label": "Taxa de retencao"}
    ]
  },
  "investment": {
    "anchorRows": [
      {"service": "Nome do servico", "marketPrice": "R$ X.XXX/mes"}
    ],
    "anchorTotal": "R$ XX.XXX/mes",
    "planName": "NOME DO PLANO",
    "planPrice": "R$ X.XXX",
    "planPeriod": "/mes",
    "savingsText": "Economia de R$ X.XXX/mes (XX%)",
    "features": ["Feature 1 incluida", "Feature 2 incluida"],
    "setupOriginal": "R$ X.XXX",
    "setupDiscount": "R$ X.XXX",
    "setupInstallments": "ou Xx de R$ XXX",
    "scarcityText": "Texto de escassez real (capacidade limitada, vagas)"
  },
  "roadmap": {
    "items": [
      {"marker": "SEMANA 1", "title": "Titulo da etapa", "description": "O que acontece", "deliverables": ["Entrega 1", "Entrega 2"]},
      {"marker": "SEMANA 2-3", "title": "Titulo", "description": "Descricao", "deliverables": ["Entrega"]},
      {"marker": "SEMANA 4", "title": "Titulo", "description": "Descricao", "deliverables": ["Entrega"]},
      {"marker": "MES 2+", "title": "Titulo", "description": "Descricao", "deliverables": ["Entrega"]}
    ]
  }
}`
}
