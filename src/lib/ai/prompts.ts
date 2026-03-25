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

export function getGenerationSystemPrompt(planName: string): string {
  const engine = loadFile("prompts/PROPOSAL_ENGINE_v2.md")
  const tipoA = loadFile("prompts/PROPOSAL_ENGINE_TIPO_A.md")
  const ancoragem = loadFile("prompts/ANCORAGEM_PRECOS.md")
  const escassez = loadFile("prompts/ELEMENTOS_ESCASSEZ.md")
  const catalogo = loadFile("plans/CATALOGO_PLANOS.md")
  const templateCSS = loadFile("prompts/TEMPLATE_CSS.css")

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

  return `${engine}

---

# FORMATO: TIPO A (email/reader-alone)

${tipoA}

---

# CSS DO TEMPLATE APROVADO (USAR EXATAMENTE ESTE CSS)

Voce DEVE copiar este CSS inteiro no <style> do HTML gerado. NAO invente classes novas. Use EXATAMENTE estas classes.

\`\`\`css
${templateCSS}
\`\`\`

---

# ESTRUTURA HTML OBRIGATORIA (seguir este esqueleto exato)

Cada secao deve seguir este padrao estrutural:

## SLIDE 1: HERO (class="slide dark grain")
- Background: radial-gradient com orange sutil (0.06 opacity)
- Gridlines (div.gridlines com gl-v, gl-h, gl-dot)
- Container centralizado com:
  - Logo SVG Atacama (o A estilizado, opacity 0.35)
  - p.eyebrow: "PROPOSTA COMERCIAL EXCLUSIVA . MES ANO"
  - h1.display: Nome da empresa (font-size clamp 3.5rem-6rem)
  - p: frase de impacto sobre o prospect (color var(--gray-30))
  - span.urgencia-badge: "VALIDA ATE [data +10 dias]"
  - p: "Preparado para [nome] / [empresa] . [localizacao]"
- Coordenadas nos cantos (span.coord)

## SLIDE 2: VERDADE INCONVENIENTE (class="slide dark grain")
- Gridlines
- p.eyebrow: "01 / VERDADE INCONVENIENTE"
- Grid 2 colunas: headline display + cards de diagnostico
- div.truth-quote com citacao provocativa

## SLIDE 3: SOLUCAO (class="slide silver-bg")
- p.eyebrow-dark: "02 / O QUE VAMOS CONSTRUIR"
- Grid de cards (card-white) com icones SVG animados (anim-icon)
- Cada card: icone + titulo + descricao
- team-badges no final

## SLIDE 4: METODO COSMOS (class="cosmos-section-v10 dark")
- SVG orbital animado (cosmos-svg-wrap)
- Painel lateral (cosmos-content-panel) com carrossel:
  - cosmos-card com cosmos-badge, cosmos-card-h, cosmos-card-p
  - cosmos-nav com cosmos-dots e cosmos-btn

## SLIDE 5: CREDIBILIDADE (class="slide dark" / cred-section-v10)
- p.eyebrow: "04 / NUMEROS E HISTORICO"
- Grid de numeros (cred-numbers-v10): 4 colunas com contadores animados
- Badges Google Partner
- Testimonial cards (t-grid com t-card)
- Logo marquee de clientes (logo-marquee)

## SLIDE 6: INVESTIMENTO (class="slide dark" / invest-v10)
- p.eyebrow: "05 / INVESTIMENTO"
- Bloco 1: Tabela de ancoragem (invest-anchor-table)
- Bloco 2: Price card (invest-price-card) com preco grande
- Bloco 3: Feature checklist (feat-list com feat-item)
- Bloco 4: Setup card com animacao strikethrough
- Scarcity box

## SLIDE 7: PROXIMOS PASSOS (class="slide silver-bg")
- p.eyebrow-dark: "06 / PROXIMOS PASSOS"
- Roadmap vertical (div.roadmap com roadmap-item)
- Formulario "Quero Contratar" multi-step

## SLIDE 8: FECHAMENTO (class="slide dark grain")
- Logo Atacama centralizado
- h2.display: "Bem-vindo a Clareza."
- Coordenadas nos cantos

---

# JAVASCRIPT OBRIGATORIO (incluir no final do <body>)

O HTML deve incluir scripts para:
1. IntersectionObserver para .reveal (adicionar class "visible")
2. IntersectionObserver para .gridlines (adicionar class "gl-active")
3. Contadores animados (countUp nos .cred-num-value-v10)
4. Carrossel COSMOS (cosmos-card navigation)
5. Animacao strikethrough no setup (struck/revealed classes)
6. Feature checklist reveal (feat-item.shown)
7. Validacao do formulario de contratacao

---

# CATALOGO DE PLANOS

${catalogo}

---

# ANCORAGEM DE PRECOS

${ancoragem}

---

# ELEMENTOS DE ESCASSEZ

${escassez}

${planContent ? `---

# DETALHES DO PLANO: ${planName}

${planContent}` : ""}

---

# REGRAS OBRIGATORIAS DE OUTPUT

1. Retorne APENAS o HTML completo, sem markdown code fences
2. O HTML deve ser self-contained com o CSS acima no <style> e JS no <script>
3. Usar fontes Inter Tight e Cormorant Unicase via Google Fonts <link>
4. Use EXATAMENTE as classes CSS definidas acima. NAO invente classes novas
5. 8 secoes obrigatorias conforme estrutura acima
6. Formulario "Quero Contratar" com POST para: {{FORM_ACTION_URL}}
7. Responsivo (ja esta no CSS: breakpoints 768px)
8. Logo Atacama: SVG do A estilizado (viewBox 0 0 1700 1240, path M1682.36...)
9. Portugues brasileiro com acentuacao correta
10. Badge de urgencia com validade de 10 dias a partir de hoje`
}
