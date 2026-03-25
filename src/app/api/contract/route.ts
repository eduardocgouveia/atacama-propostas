import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // TODO: Save to database (contract_submissions table)
    // For now, log and return success
    console.log("Contract submission received:", formData)

    // TODO: Send email notification to financeiro@agenciaatacama.com.br

    return NextResponse.json({
      success: true,
      message: "Contratacao recebida com sucesso!",
    })
  } catch (error) {
    console.error("Contract submission error:", error)
    return NextResponse.json(
      { error: "Erro ao processar contratacao" },
      { status: 500 }
    )
  }
}

// Also handle form-encoded submissions from proposals
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
