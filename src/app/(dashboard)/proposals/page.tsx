"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, ExternalLink, Pencil, Clock, Calendar } from "lucide-react"

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
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
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
    return { label: `Vencida ha ${Math.abs(diffDays)} dia${Math.abs(diffDays) !== 1 ? "s" : ""}`, variant: "cold" as const }
  }
  if (diffDays === 0) {
    return { label: "Vence hoje", variant: "hot" as const }
  }
  if (diffDays <= 3) {
    return { label: `Vence em ${diffDays} dia${diffDays !== 1 ? "s" : ""}`, variant: "warm" as const }
  }
  return { label: `Vence em ${diffDays} dias`, variant: "secondary" as const }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "review": return "Em revisao"
    case "sent": return "Enviada"
    case "viewed": return "Visualizada"
    case "accepted": return "Aceita"
    case "expired": return "Vencida"
    default: return status
  }
}

function getStatusVariant(status: string) {
  switch (status) {
    case "review": return "secondary" as const
    case "sent": return "cool" as const
    case "viewed": return "warm" as const
    case "accepted": return "hot" as const
    case "expired": return "cold" as const
    default: return "secondary" as const
  }
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<ProposalMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/proposals/save")
      .then((r) => r.json())
      .then((data) => setProposals(data))
      .catch(() => setProposals([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Propostas</h1>
          <p className="text-neutral-400">
            {proposals.length} proposta{proposals.length !== 1 ? "s" : ""} gerada{proposals.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/proposals/new">
          <Button variant="orange">
            <Plus className="h-4 w-4" />
            Nova Proposta
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-neutral-500">Carregando...</div>
      ) : proposals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-12 w-12 text-neutral-700" />
            <h3 className="mt-4 text-lg font-medium">Nenhuma proposta ainda</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Crie sua primeira proposta colando uma transcricao de reuniao
            </p>
            <Link href="/proposals/new" className="mt-4">
              <Button variant="orange">
                <Plus className="h-4 w-4" />
                Criar Primeira Proposta
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {proposals.map((proposal) => {
            const expiry = getExpiryInfo(proposal.expiresAt)

            return (
              <Card key={proposal.slug} className="transition-colors hover:border-neutral-700">
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    {/* Info principal */}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-lg truncate">{proposal.companyName}</p>
                      <p className="text-sm text-neutral-400 mt-1">{proposal.planName}</p>

                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        {/* Data de emissao */}
                        <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                          <Calendar className="h-3.5 w-3.5" />
                          Emitida em {formatDate(proposal.createdAt)}
                        </span>

                        {/* Vencimento */}
                        {proposal.expiresAt && (
                          <Badge variant={expiry.variant}>
                            <Clock className="h-3 w-3 mr-1" />
                            {expiry.label}
                          </Badge>
                        )}

                        {/* Status */}
                        <Badge variant={getStatusVariant(proposal.status)}>
                          {getStatusLabel(proposal.status)}
                        </Badge>
                      </div>
                    </div>

                    {/* Acoes */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link href={`/proposals/${proposal.slug}`}>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Editar</span>
                        </Button>
                      </Link>
                      <a
                        href={`/p/${proposal.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="icon" title="Ver proposta publica">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
