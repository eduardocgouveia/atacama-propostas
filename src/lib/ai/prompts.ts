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

IMPORTANTE: Os campos "recommendedPlan" e "alternativePlan" DEVEM ser EXATAMENTE um destes valores:
"IGNITION", "START", "PRO", "ADVANCED", "SOCIAL-PRO", "PERF PRO + SOCIAL", "PERF PRO + SOCIAL + AV", "DIAMOND"

NAO invente combinacoes de planos. NAO use prefixo "TRAFEGO". Use o nome EXATO da lista acima.
Se nenhum plano se encaixa perfeitamente, escolha o mais proximo. NUNCA invente um nome que nao esta na lista.

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

  // Only load plan details for smaller plans (< 15KB)
  // Large plans like DIAMOND (48KB) cause timeouts
  const planFile = planFileMap[planName.toUpperCase()] || ""
  let planContent = ""
  if (planFile) {
    const fullContent = loadFile(planFile)
    // Truncate to first 8000 chars if too long
    planContent = fullContent.length > 8000
      ? fullContent.substring(0, 8000) + "\n\n[... conteudo truncado para performance ...]"
      : fullContent
  }

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
    "tagline": "Frase de impacto sobre o prospect (1-2 linhas)",
    "expiryDate": "DD DE MES DE ANO em maiusculas"
  },
  "truth": {
    "headline": "Verdade inconveniente em 1-2 frases impactantes",
    "quote": "Citacao provocativa usando palavras do prospect da call",
    "cards": [
      {"eyebrow": "TEMA EM MAIUSCULAS", "title": "Titulo impactante (4-8 palavras)", "description": "Descricao detalhada (2-3 frases)"},
      {"eyebrow": "TEMA", "title": "Titulo impactante", "description": "Descricao detalhada"},
      {"eyebrow": "TEMA", "title": "Titulo impactante", "description": "Descricao detalhada"}
    ]
  },
  "solution": {
    "headline": "Headline da solucao (pode usar <br> para quebra)",
    "description": "Descricao da solucao em 2-3 frases",
    "services": [
      {"title": "Nome do servico/entrega", "description": "O que entregamos (1-2 frases)"},
      {"title": "Nome do servico/entrega", "description": "O que entregamos"},
      {"title": "Nome do servico/entrega", "description": "O que entregamos"},
      {"title": "Nome do servico/entrega", "description": "O que entregamos"},
      {"title": "Nome do servico/entrega", "description": "O que entregamos"}
    ],
    "badges": ["Especialidade 1", "Especialidade 2", "Especialidade 3", "Especialidade 4", "Especialidade 5", "Especialidade 6", "Especialidade 7", "Especialidade 8"]
  },
  "delivery": {
    "cards": [
      {"tag": "ETAPA 01", "title": "Nome do entregavel", "description": "O que o cliente recebe (1-2 frases)"},
      {"tag": "ETAPA 02", "title": "Titulo", "description": "Descricao"},
      {"tag": "ETAPA 03", "title": "Titulo", "description": "Descricao"},
      {"tag": "ETAPA 04", "title": "Titulo", "description": "Descricao"},
      {"tag": "ETAPA 05", "title": "Titulo", "description": "Descricao"},
      {"tag": "ETAPA 06", "title": "Titulo", "description": "Descricao"},
      {"tag": "ETAPA 07", "title": "Titulo", "description": "Descricao"},
      {"tag": "ETAPA 08", "title": "Titulo", "description": "Descricao"}
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
    "anchors": [
      {"service": "Nome do servico no mercado", "price": "R$ X.XXX/mes"},
      {"service": "Segundo servico", "price": "R$ X.XXX/mes"}
    ],
    "anchorTotal": "R$ XX.XXX/mes",
    "savingsText": "Economia de R$ X.XXX/mes (XX%)",
    "discountLabel": "XX% abaixo do mercado",
    "inclusos": ["Incluso 1", "Incluso 2", "Incluso 3", "Incluso 4", "Incluso 5", "Incluso 6", "Incluso 7", "Incluso 8"],
    "setupOriginal": "R$ X.XXX",
    "setupDiscounted": "R$ X.XXX",
    "setupDiscountBadge": "XX% OFF SETUP",
    "setupInstallments": "ou Xx de R$ XXX",
    "setupDescription": "Descricao breve do que o setup inclui",
    "scarcityText": "Texto de escassez real (capacidade limitada, vagas)",
    "scarcityTextCta": "Texto de escassez para o CTA final",
    "planAFeatures": ["Feature 1 do plano A", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    "planBFeatures": ["Feature 1 do plano B", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
    "planCFeatures": ["Feature 1 do plano C", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
    "planBSetupDiscount": "Setup GRATIS",
    "compareRows": [
      {"label": "Recurso comparado", "a": "Basico", "b": "Completo", "c": "Premium"}
    ]
  },
  "roadmap": {
    "items": [
      {"marker": "SEMANA 1", "title": "Titulo da etapa", "description": "O que acontece", "deliverables": ["Entrega 1", "Entrega 2"]},
      {"marker": "SEMANA 2-3", "title": "Titulo", "description": "Descricao", "deliverables": ["Entrega"]},
      {"marker": "SEMANA 4", "title": "Titulo", "description": "Descricao", "deliverables": ["Entrega"]},
      {"marker": "MES 2+", "title": "Titulo", "description": "Descricao", "deliverables": ["Entrega"]}
    ]
  },
  "cta": {
    "headline": "Vamos comecar?",
    "subtitle": "Frase de fechamento persuasiva (1-2 linhas)",
    "expiryText": "Condicoes validas ate DD de Mes de AAAA"
  }
}

IMPORTANTE para template tipo-b (3 planos):
- Gere planAFeatures, planBFeatures, planCFeatures e compareRows dentro de investment
- Gere planBSetupDiscount (ex: "Setup GRATIS" ou "50% OFF Setup")
- compareRows deve ter 6-8 linhas comparando os 3 planos

IMPORTANTE para template tipo-a (1 plano):
- Gere anchors (6-8 servicos com precos de mercado para ancoragem)
- Gere inclusos (6-8 itens inclusos no plano)
- NAO precisa gerar planAFeatures/planBFeatures/planCFeatures/compareRows`
}

export function getBodyPrompt(): string {
  const templateCSS = loadFile("prompts/TEMPLATE_CSS.css")
  const ancoragem = loadFile("prompts/ANCORAGEM_PRECOS.md")
  const escassez = loadFile("prompts/ELEMENTOS_ESCASSEZ.md")

  return `Voce e o motor de propostas da Atacama Digital. Gere APENAS o HTML do <body> (sem <html>, <head>, <style>, <script>).

O CSS e o JS ja estao incluidos separadamente. Voce deve usar EXATAMENTE as classes CSS definidas abaixo.

# CLASSES CSS DISPONIVEIS (usar exatamente estas)

\`\`\`css
${templateCSS}
\`\`\`

# ESTRUTURA: 8 SECOES OBRIGATORIAS

Gere o HTML seguindo esta estrutura exata:

## 1. HERO (section.slide.dark.grain)
- Radial gradient background sutil
- div.gridlines com gl-v, gl-h, gl-dot
- div.container centralizado:
  - SVG logo Atacama (viewBox="0 0 1700 1240", path="M1682.36 1220 1188.62 20H951.77v.02H748.23l.01-.02H511.38L17.64 1220h247.7L737.38 46.96v1173.02h225.25V46.96L1434.66 1220Zm0 0")
  - p.eyebrow: "PROPOSTA COMERCIAL EXCLUSIVA . MES ANO"
  - h1.display: nome da empresa
  - p: tagline impactante
  - span.urgencia-badge: "VALIDA ATE [data +10 dias]"
  - p: "Preparado para [contato] / [empresa] . [local]"
- span.coord nos cantos

## 2. VERDADE INCONVENIENTE (section.slide.dark.grain)
- Grid 2 colunas: h2.display (headline) + div com card-glass (dores)
- div.truth-quote: citacao provocativa

## 3. SOLUCAO (section.slide.silver-bg)
- p.eyebrow-dark + h2.display
- Grid de card-white com anim-icon (SVGs animados)
- div.team-badges

## 4. METODO COSMOS (section.cosmos-section-v10.dark)
- Background nebular (gradientes)
- SVG orbital (orbitas, nodes, beams) - use cosmos-orbit-vis, cosmos-node-vis, cosmos-conn-vis, cosmos-beam-vis
- Painel lateral cosmos-content-panel com cosmos-card (5 etapas)
- cosmos-nav com dots e botoes

## 5. CREDIBILIDADE (section.slide.dark)
- cred-numbers-v10 grid (4 numeros: clientes, midia gerenciada, avaliacao, retencao)
- Badges Google Partner
- t-grid com t-card (testimonials - use cases REAIS da Atacama, nao do prospect)
- client-pills (logos de clientes Atacama)

## 6. INVESTIMENTO (section.slide.dark)
- invest-v10: blocos de investimento
  - Tabela ancoragem (invest-anchor-table com invest-anchor-row)
  - Price card (invest-price-card)
  - Feature checklist (feat-list com feat-item)
  - Setup card com animacao strikethrough
  - scarcity-box
- Se MULTIPLOS PLANOS: usar sistema de tabs/abas para cada plano

## 7. PROXIMOS PASSOS (section.slide.silver-bg)
- div.roadmap com roadmap-item
- Formulario "Quero Contratar" (action="{{FORM_ACTION_URL}}")

## 8. FECHAMENTO (section.slide.dark.grain)
- Logo Atacama SVG centralizado
- h2.display: "Bem-vindo a Clareza."
- Coordenadas nos cantos

# ANCORAGEM DE PRECOS

${ancoragem}

# ELEMENTOS DE ESCASSEZ

${escassez}

# REGRAS

1. Retorne APENAS o HTML das 8 secoes, sem <html>, <head>, <body>, <style>, <script>
2. Use EXATAMENTE as classes CSS listadas acima
3. Portugues brasileiro com acentuacao correta
4. Tom: firme, lucido, provocativo. Sem corporativismo
5. Use as palavras do prospect da transcricao
6. Cases de credibilidade devem ser da ATACAMA (nao do prospect)
7. Numeros de credibilidade: 50+ clientes, R$ 2M+ midia, 4.9 Google, 97% retencao
8. Logo Atacama: SVG com o path fornecido acima
9. Formulario com action="{{FORM_ACTION_URL}}"
10. Validade: 10 dias a partir de ${new Date().toLocaleDateString("pt-BR")}`
}
