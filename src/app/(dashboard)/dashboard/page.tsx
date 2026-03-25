import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, TrendingUp, Users, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Propostas Ativas",
    value: "0",
    description: "em andamento",
    icon: FileText,
  },
  {
    title: "Taxa de Conversao",
    value: "0%",
    description: "ultimos 30 dias",
    icon: TrendingUp,
  },
  {
    title: "Prospects",
    value: "0",
    description: "no pipeline",
    icon: Users,
  },
  {
    title: "MRR Pipeline",
    value: "R$ 0",
    description: "valor potencial",
    icon: DollarSign,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-neutral-400">
          Visao geral do pipeline comercial
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-400">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-neutral-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline de Propostas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {["Rascunho", "Enviada", "Visualizada", "Em Negociacao", "Fechada"].map(
              (stage) => (
                <div
                  key={stage}
                  className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-400">
                      {stage}
                    </span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-center text-xs text-neutral-600">
                      Nenhuma proposta
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
