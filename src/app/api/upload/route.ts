import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let text = ""

    if (file.name.toLowerCase().endsWith(".pdf")) {
      // pdf-parse v1.1.1 exports a function directly
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>
      const data = await pdfParse(buffer)
      text = data.text
    } else {
      text = buffer.toString("utf-8")
    }

    // Clean up text
    text = text
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()

    if (text.length < 50) {
      return NextResponse.json(
        { error: "Arquivo vazio ou sem texto extraivel. Tente um .txt ou cole diretamente." },
        { status: 400 }
      )
    }

    return NextResponse.json({
      text,
      fileName: file.name,
      characters: text.length,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Erro ao processar arquivo. Tente um formato .txt ou cole diretamente." },
      { status: 500 }
    )
  }
}
