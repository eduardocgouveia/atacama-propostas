"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, ExternalLink } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface ProposalMeta {
  slug: string
  companyName: string
  planName: string
  planPrice: number
  setupPrice: number
  status: string
  createdAt: string
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

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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
          {proposals.map((proposal) => (
            <Card key={proposal.slug} className="transition-colors hover:border-neutral-700">
              <CardContent className="flex items-center justify-between py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">{proposal.companyName}</p>
                  <p className="text-sm text-neutral-400 mt-0.5">
                    {proposal.planName} / {formatCurrency(proposal.planPrice)}/mes
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Badge variant="secondary">{proposal.status}</Badge>
                  <span className="text-xs text-neutral-600 hidden sm:inline">
                    {formatDate(proposal.createdAt)}
                  </span>
                  <a
                    href={`/p/${proposal.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
