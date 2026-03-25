import { NextRequest, NextResponse } from "next/server"
import { generateProposal } from "@/lib/ai/generate"
import { generateSlug } from "@/lib/utils"
import type { AnalysisResult } from "@/lib/ai/analyze"

export async function POST(request: NextRequest) {
  try {
    const { analysis, planName } = (await request.json()) as {
      analysis: AnalysisResult
      planName: string
    }

    if (!analysis || !planName) {
      return NextResponse.json(
        { error: "Dados de analise e nome do plano sao obrigatorios" },
        { status: 400 }
      )
    }

    const slug = generateSlug(analysis.prospect.companyName)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const formActionUrl = `${appUrl}/api/contract`

    const html = await generateProposal(analysis, planName, formActionUrl)

    // Inject tracking pixel before </body>
    const trackingPixel = `<img src="${appUrl}/api/proposals/${slug}/viewed" style="position:absolute;width:1px;height:1px;opacity:0;" alt="" />`
    const finalHtml = html.replace("</body>", `${trackingPixel}\n</body>`)

    return NextResponse.json({
      html: finalHtml,
      slug,
      planName,
      planPrice: analysis.analysis.planPrice,
      setupPrice: analysis.analysis.setupPrice,
    })
  } catch (error) {
    console.error("Generation error:", error)
    return NextResponse.json(
      { error: "Erro ao gerar proposta. Tente novamente." },
      { status: 500 }
    )
  }
}

export const maxDuration = 120 // Allow up to 2 minutes for Opus generation
