import { NextRequest, NextResponse } from "next/server"
import { generateProposalContent } from "@/lib/ai/generate"
import { generateSlug } from "@/lib/utils"
import type { AnalysisResult } from "@/lib/ai/analyze"
import type { EditedProposalData } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { editedData, analysis } = (await request.json()) as {
      editedData: EditedProposalData
      analysis: AnalysisResult
    }

    if (!editedData || !editedData.selectedPlans?.length) {
      return NextResponse.json(
        { error: "Dados editados e planos selecionados sao obrigatorios" },
        { status: 400 }
      )
    }

    const planName = editedData.selectedPlans.map(p => p.name).join(" + ")
    console.log(`[generate-proposal] Starting for ${editedData.companyName} / Plan: ${planName}`)
    const startTime = Date.now()

    const slug = generateSlug(editedData.companyName)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const formActionUrl = `${appUrl}/api/contract`

    const { html } = await generateProposalContent(editedData, analysis, formActionUrl)

    // Inject tracking pixel
    const trackingPixel = `<img src="${appUrl}/api/proposals/${slug}/viewed" style="position:absolute;width:1px;height:1px;opacity:0;" alt="" />`
    const finalHtml = html.replace("</body>", `${trackingPixel}\n</body>`)

    const mainPlan = editedData.selectedPlans[0]
    console.log(`[generate-proposal] Done in ${((Date.now() - startTime) / 1000).toFixed(1)}s`)

    return NextResponse.json({
      html: finalHtml,
      slug,
      planName,
      planPrice: mainPlan.price,
      setupPrice: mainPlan.setup,
    })
  } catch (error) {
    console.error("Generation error:", error)
    return NextResponse.json(
      { error: "Erro ao gerar proposta. Tente novamente." },
      { status: 500 }
    )
  }
}

export const maxDuration = 300
