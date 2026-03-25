import { getClient, MODELS } from "./client"
import { getAnalysisSystemPrompt } from "./prompts"

export interface AnalysisResult {
  prospect: {
    companyName: string
    contactName: string
    sector: string
    estimatedRevenue: string
    city: string
    state: string
    phone: string
    email: string
  }
  analysis: {
    gpct: {
      goals: string
      plans: string
      challenges: string
      timeline: string
    }
    leadScore: number
    leadTemperature: "HOT" | "WARM" | "COOL" | "COLD"
    personaMatch: string
    personaAdherence: number
    tier: string
    recommendedPlan: string
    planPrice: number
    setupPrice: number
    alternativePlan: string
    diagnosis: string
    keyObjections: string[]
    objectionScripts: Array<{ objection: string; script: string }>
    followUpCadence: string
    inconvenientTruth: string
    emotionalTriggers: string[]
  }
}

export async function analyzeTranscription(
  transcription: string
): Promise<AnalysisResult> {
  const systemPrompt = getAnalysisSystemPrompt()

  const response = await getClient().messages.create({
    model: MODELS.analysis,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Analise a seguinte transcricao de reuniao comercial e retorne o JSON estruturado conforme as instrucoes:\n\n${transcription}`,
      },
    ],
  })

  const text =
    response.content[0].type === "text" ? response.content[0].text : ""

  // Clean up potential markdown fences
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim()

  return JSON.parse(cleaned) as AnalysisResult
}
