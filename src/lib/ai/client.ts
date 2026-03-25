import Anthropic from "@anthropic-ai/sdk"

let _client: Anthropic | null = null

export function getClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ATACAMA_ANTHROPIC_KEY || process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error("ATACAMA_ANTHROPIC_KEY nao configurada no .env.local")
    }
    _client = new Anthropic({ apiKey })
  }
  return _client
}

export const MODELS = {
  analysis: "claude-sonnet-4-20250514",
} as const
