import { NextRequest, NextResponse } from "next/server"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

// For MVP, proposals are stored as local files
// In production, these will be fetched from Supabase Storage
const PROPOSALS_DIR = join(process.cwd(), "proposals")

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Try to find the HTML file
  const filePath = join(PROPOSALS_DIR, `${slug}.html`)

  if (!existsSync(filePath)) {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proposta nao encontrada</title>
  <style>
    body { background: #000; color: #fff; font-family: 'Inter Tight', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .container { text-align: center; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    p { color: #8a8a8a; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Proposta nao encontrada</h1>
    <p>O link pode ter expirado ou a proposta foi removida.</p>
  </div>
</body>
</html>`,
      {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    )
  }

  const html = readFileSync(filePath, "utf-8")

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
