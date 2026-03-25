"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  Download,
  Copy,
  Check,
  Eye,
} from "lucide-react"
import { useState } from "react"

interface ProposalPreviewProps {
  html: string
  slug: string
  planName: string
  planPrice: number
  setupPrice: number
}

export function ProposalPreview({
  html,
  slug,
  planName,
  planPrice,
  setupPrice,
}: ProposalPreviewProps) {
  const [copied, setCopied] = useState(false)

  const publicUrl = `${window.location.origin}/p/${slug}`

  function handleCopyUrl() {
    navigator.clipboard.writeText(publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `proposta-${slug}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Actions bar */}
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="success">Proposta Gerada</Badge>
              <span className="font-medium">{planName}</span>
            </div>
            <p className="mt-1 text-sm text-neutral-400">
              R$ {planPrice.toLocaleString("pt-BR")}/mes + Setup R${" "}
              {setupPrice.toLocaleString("pt-BR")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyUrl}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copiado!" : "Copiar Link"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Download
            </Button>
            <a href={publicUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm">
                <ExternalLink className="h-4 w-4" />
                Abrir
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* URL display */}
      <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2">
        <Eye className="h-4 w-4 text-neutral-500" />
        <code className="flex-1 text-sm text-neutral-300">{publicUrl}</code>
      </div>

      {/* Preview iframe */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-neutral-400">
            Preview da Proposta
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <iframe
            srcDoc={html}
            className="h-[700px] w-full border-0"
            title="Preview da proposta"
            sandbox="allow-scripts allow-same-origin"
          />
        </CardContent>
      </Card>
    </div>
  )
}
