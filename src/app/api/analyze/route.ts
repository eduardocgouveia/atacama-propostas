import { NextRequest, NextResponse } from "next/server"
import { analyzeTranscription } from "@/lib/ai/analyze"

export async function POST(request: NextRequest) {
  try {
    const { transcription } = await request.json()

    if (!transcription || typeof transcription !== "string") {
      return NextResponse.json(
        { error: "Transcricao e obrigatoria" },
        { status: 400 }
      )
    }

    if (transcription.length < 100) {
      return NextResponse.json(
        { error: "Transcricao muito curta. Minimo 100 caracteres." },
        { status: 400 }
      )
    }

    const result = await analyzeTranscription(transcription)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      { error: "Erro ao analisar transcricao. Tente novamente." },
      { status: 500 }
    )
  }
}
