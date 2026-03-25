import Anthropic from "@anthropic-ai/sdk"

let _client: Anthropic | null = null

export function getClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY nao configurada no .env.local")
    }
    _client = new Anthropic({ apiKey })
  }
  return _client
}

export const MODELS = {
  analysis: "claude-sonnet-4-20250514",
} as const
