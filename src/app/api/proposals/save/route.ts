import { NextRequest, NextResponse } from "next/server"
import { writeFileSync, existsSync } from "fs"
import { join } from "path"

const PROPOSALS_DIR = join(process.cwd(), "proposals")

export async function POST(request: NextRequest) {
  try {
    const { slug, html } = await request.json()

    if (!slug || !html) {
      return NextResponse.json(
        { error: "Slug e HTML sao obrigatorios" },
        { status: 400 }
      )
    }

    // Ensure unique slug
    let finalSlug = slug
    let counter = 1
    while (existsSync(join(PROPOSALS_DIR, `${finalSlug}.html`))) {
      finalSlug = `${slug}-${counter}`
      counter++
    }

    const filePath = join(PROPOSALS_DIR, `${finalSlug}.html`)
    writeFileSync(filePath, html, "utf-8")

    return NextResponse.json({ slug: finalSlug, path: filePath })
  } catch (error) {
    console.error("Save error:", error)
    return NextResponse.json(
      { error: "Erro ao salvar proposta" },
      { status: 500 }
    )
  }
}
