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
  const brandkit = loadFile("prompts/BRANDKIT_REFERENCE.md")
  const ancoragem = loadFile("prompts/ANCORAGEM_PRECOS.md")
  const escassez = loadFile("prompts/ELEMENTOS_ESCASSEZ.md")

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

# BRAND KIT REFERENCE

${brandkit}

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
2. O HTML deve ser self-contained (CSS inline no <style>, JS inline no <script>)
3. Usar fontes Inter Tight e Cormorant Unicase via Google Fonts <link>
4. Cores: preto (#000), branco (#FFF), prata (#DBDCDD), laranja (#E13F07 apenas atmosferico)
5. Intercalar secoes pretas e pratas
6. 8 secoes obrigatorias: Hero, Verdade Inconveniente, Solucao, Metodo Cosmos, Credibilidade, Investimento, Proximos Passos, Fechamento
7. Formulario "Quero Contratar" com campos: nome, CNPJ/CPF, email, telefone, endereco
8. O formulario deve fazer POST para a URL: {{FORM_ACTION_URL}}
9. Responsivo: breakpoints em 1024px, 768px, 480px
10. Logo Atacama Digital completo (horizontal), nunca apenas o simbolo "A"
11. Portugues brasileiro com acentuacao correta
12. Graficos e elementos interativos (contadores animados, barras de comparacao)
13. Badge de urgencia com validade de 10 dias`
}
