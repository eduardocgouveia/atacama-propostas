import { NextRequest, NextResponse } from "next/server"
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs"

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
      const uint8Array = new Uint8Array(buffer)
      const pdf = await getDocument({ data: uint8Array }).promise
      const pages: string[] = []

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items
          .map((item: { str?: string }) => item.str || "")
          .join(" ")
        pages.push(pageText)
      }

      text = pages.join("\n\n")
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
