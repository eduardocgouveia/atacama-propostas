import { NextRequest, NextResponse } from "next/server"
import { readFileSync, existsSync, writeFileSync } from "fs"
import { join } from "path"

const PROPOSALS_DIR = join(process.cwd(), "proposals")
const INDEX_FILE = join(PROPOSALS_DIR, "index.json")

function loadIndex() {
  if (!existsSync(INDEX_FILE)) return []
  try {
    return JSON.parse(readFileSync(INDEX_FILE, "utf-8"))
  } catch {
    return []
  }
}

// GET: load proposal HTML + metadata
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const htmlPath = join(PROPOSALS_DIR, `${id}.html`)

  if (!existsSync(htmlPath)) {
    return NextResponse.json({ error: "Proposta nao encontrada" }, { status: 404 })
  }

  const html = readFileSync(htmlPath, "utf-8")
  const index = loadIndex()
  const meta = index.find((p: Record<string, string>) => p.slug === id) || {}

  return NextResponse.json({ html, meta })
}

// PUT: update proposal HTML
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const htmlPath = join(PROPOSALS_DIR, `${id}.html`)

  if (!existsSync(htmlPath)) {
    return NextResponse.json({ error: "Proposta nao encontrada" }, { status: 404 })
  }

  const { html } = await request.json()
  if (!html) {
    return NextResponse.json({ error: "HTML obrigatorio" }, { status: 400 })
  }

  writeFileSync(htmlPath, html, "utf-8")
  return NextResponse.json({ ok: true })
}
