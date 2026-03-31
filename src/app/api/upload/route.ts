import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    console.log("[upload] Arquivo recebido:", file.name, "tipo:", file.type, "tamanho:", file.size)

    const buffer = Buffer.from(await file.arrayBuffer())
    let text = ""

    if (file.name.toLowerCase().endsWith(".pdf")) {
      try {
        const { extractText } = await import("unpdf")
        const result = await extractText(new Uint8Array(buffer))
        text = Array.isArray(result.text)
          ? result.text.join("\n\n")
          : String(result.text)
      } catch (pdfError) {
        console.error("[upload] Erro ao extrair PDF:", pdfError)
        return NextResponse.json(
          { error: "Nao foi possivel ler o PDF. Tente salvar como .txt ou cole o texto diretamente." },
          { status: 400 }
        )
      }
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

    console.log("[upload] Texto extraido com sucesso:", text.length, "caracteres")

    return NextResponse.json({
      text,
      fileName: file.name,
      characters: text.length,
    })
  } catch (error) {
    console.error("[upload] Erro geral:", error)
    return NextResponse.json(
      { error: "Erro ao processar arquivo. Tente um formato .txt ou cole diretamente." },
      { status: 500 }
    )
  }
}
