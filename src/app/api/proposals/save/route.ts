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
  expiresAt: string
  editedData?: Record<string, unknown>
  analysisData?: Record<string, unknown>
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
    const { slug, html, companyName, planName, planPrice, setupPrice, expiresAt, editedData, analysisData } = await request.json()

    if (!slug || !html) {
      return NextResponse.json(
        { error: "Slug e HTML sao obrigatorios" },
        { status: 400 }
      )
    }

    // Check if this is an update (slug already exists)
    const index = loadIndex()
    const existingIdx = index.findIndex((p) => p.slug === slug)

    const filePath = join(PROPOSALS_DIR, `${slug}.html`)

    if (existingIdx >= 0) {
      // Update existing proposal
      writeFileSync(filePath, html, "utf-8")
      index[existingIdx] = {
        ...index[existingIdx],
        companyName: companyName || index[existingIdx].companyName,
        planName: planName || index[existingIdx].planName,
        planPrice: planPrice ?? index[existingIdx].planPrice,
        setupPrice: setupPrice ?? index[existingIdx].setupPrice,
        expiresAt: expiresAt || index[existingIdx].expiresAt,
        editedData: editedData || index[existingIdx].editedData,
        analysisData: analysisData || index[existingIdx].analysisData,
      }
      saveIndex(index)
      return NextResponse.json({ slug, path: filePath })
    }

    // New proposal — ensure unique slug
    let finalSlug = slug
    let counter = 1
    while (existsSync(join(PROPOSALS_DIR, `${finalSlug}.html`))) {
      finalSlug = `${slug}-${counter}`
      counter++
    }

    // Save HTML
    const newFilePath = join(PROPOSALS_DIR, `${finalSlug}.html`)
    writeFileSync(newFilePath, html, "utf-8")

    // Save to index
    index.unshift({
      slug: finalSlug,
      companyName: companyName || "Sem nome",
      planName: planName || "Sem plano",
      planPrice: planPrice || 0,
      setupPrice: setupPrice || 0,
      status: "review",
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt || new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      editedData: editedData || undefined,
      analysisData: analysisData || undefined,
    })
    saveIndex(index)

    return NextResponse.json({ slug: finalSlug, path: newFilePath })
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
