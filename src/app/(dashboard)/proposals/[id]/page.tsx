"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  Save,
  Eye,
  Calendar,
  Clock,
  Download,
  Pencil,
} from "lucide-react"

interface ProposalMeta {
  slug: string
  companyName: string
  planName: string
  planPrice: number
  setupPrice: number
  status: string
  createdAt: string
  expiresAt: string
}

function formatDate(iso: string) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function getExpiryInfo(expiresAt: string) {
  if (!expiresAt) return { label: "", variant: "secondary" as const }
  const now = new Date()
  const expiry = new Date(expiresAt)
  const diffMs = expiry.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { label: `Vencida ha ${Math.abs(diffDays)} dias`, variant: "cold" as const }
  }
  if (diffDays === 0) {
    return { label: "Vence hoje", variant: "hot" as const }
  }
  if (diffDays <= 3) {
    return { label: `Vence em ${diffDays} dia${diffDays !== 1 ? "s" : ""}`, variant: "warm" as const }
  }
  return { label: `Vence em ${diffDays} dias`, variant: "secondary" as const }
}

export default function ProposalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [html, setHtml] = useState("")
  const [meta, setMeta] = useState<ProposalMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/proposals/${id}/data`)
      .then((r) => {
        if (!r.ok) throw new Error("Proposta nao encontrada")
        return r.json()
      })
      .then((data) => {
        setHtml(data.html)
        setMeta(data.meta)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    try {
      const iframe = document.getElementById("proposal-iframe") as HTMLIFrameElement
      if (iframe?.contentDocument) {
        const updatedHtml = iframe.contentDocument.documentElement.outerHTML
        setHtml("<!DOCTYPE html>\n" + updatedHtml)
      }

      const res = await fetch(`/api/proposals/${id}/data`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      })

      if (!res.ok) throw new Error("Erro ao salvar")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Erro ao salvar proposta")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
      </div>
    )
  }

  if (error && !html) {
    return (
      <div className="space-y-4">
        <Link href="/proposals" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Voltar para propostas
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-red-400">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const expiry = meta?.expiresAt ? getExpiryInfo(meta.expiresAt) : null

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/proposals" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para propostas
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{meta?.companyName || id}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {meta?.planName && (
              <span className="text-sm text-neutral-400">{meta.planName}</span>
            )}
            {meta?.createdAt && (
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <Calendar className="h-3 w-3" />
                {formatDate(meta.createdAt)}
              </span>
            )}
            {expiry && (
              <Badge variant={expiry.variant}>
                <Clock className="h-3 w-3 mr-1" />
                {expiry.label}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href={`/proposals/new?edit=${id}`}>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              <>
                <Save className="h-4 w-4" />
                Salvo
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar
              </>
            )}
          </Button>
          <a href={`/p/${id}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Visualizar</span>
            </Button>
          </a>
          <a href={`/api/proposals/${id}/download`} download>
            <Button variant="ghost" size="icon" title="Baixar HTML">
              <Download className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Erro de save */}
      {error && (
        <div className="rounded-lg border border-red-900 bg-red-950/30 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Preview iframe */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <iframe
            id="proposal-iframe"
            srcDoc={html}
            className="w-full border-0"
            style={{ height: "80vh" }}
            title="Preview da proposta"
          />
        </CardContent>
      </Card>
    </div>
  )
}
