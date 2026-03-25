import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText } from "lucide-react"

export default function ProposalsPage() {
  // TODO: Fetch proposals from database
  const proposals: Array<{
    id: string
    title: string
    slug: string
    planName: string
    leadScore: number
    temperature: string
    status: string
    createdAt: string
  }> = []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Propostas</h1>
          <p className="text-neutral-400">
            Gerencie todas as propostas comerciais
          </p>
        </div>
        <Link href="/proposals/new">
          <Button variant="orange">
            <Plus className="h-4 w-4" />
            Nova Proposta
          </Button>
        </Link>
      </div>

      {proposals.length === 0 ? (
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
            <Link key={proposal.id} href={`/proposals/${proposal.id}`}>
              <Card className="transition-colors hover:border-neutral-700">
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">{proposal.title}</p>
                    <p className="text-sm text-neutral-500">
                      {proposal.planName} / Score: {proposal.leadScore}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{proposal.status}</Badge>
                    <span className="text-xs text-neutral-600">
                      {proposal.createdAt}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
