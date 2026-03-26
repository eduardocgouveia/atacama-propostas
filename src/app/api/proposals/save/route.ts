import { NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const PROPOSALS_DIR = join(process.cwd(), "proposals")
const INDEX_FILE = join(PROPOSALS_DIR, "index.json")

interface ProposalMeta {
  slug: string
  companyName: string
  planName: string
  planPrice: number
  setupPrice: number
  status: string
  createdAt: string
}

function loadIndex(): ProposalMeta[] {
  if (!existsSync(INDEX_FILE)) return []
  try {
    return JSON.parse(readFileSync(INDEX_FILE, "utf-8"))
  } catch {
    return []
  }
}

function saveIndex(index: ProposalMeta[]) {
  writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2), "utf-8")
}

export async function POST(request: NextRequest) {
  try {
    const { slug, html, companyName, planName, planPrice, setupPrice } = await request.json()

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

    // Save HTML
    const filePath = join(PROPOSALS_DIR, `${finalSlug}.html`)
    writeFileSync(filePath, html, "utf-8")

    // Save to index
    const index = loadIndex()
    index.unshift({
      slug: finalSlug,
      companyName: companyName || "Sem nome",
      planName: planName || "Sem plano",
      planPrice: planPrice || 0,
      setupPrice: setupPrice || 0,
      status: "review",
      createdAt: new Date().toISOString(),
    })
    saveIndex(index)

    return NextResponse.json({ slug: finalSlug, path: filePath })
  } catch (error) {
    console.error("Save error:", error)
    return NextResponse.json(
      { error: "Erro ao salvar proposta" },
      { status: 500 }
    )
  }
}

// GET: list all proposals
export async function GET() {
  try {
    const index = loadIndex()
    return NextResponse.json(index)
  } catch {
    return NextResponse.json([])
  }
}
