"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Target,
  User,
  TrendingUp,
  AlertTriangle,
  Zap,
  Loader2,
  FileText,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { AnalysisResult } from "@/lib/ai/analyze"

interface AnalysisResultsProps {
  analysis: AnalysisResult
  onGenerate: (planName: string) => void
  generating: boolean
}

const PLANS = [
  "IGNITION",
  "START",
  "PRO",
  "ADVANCED",
  "SOCIAL-PRO",
  "PERF PRO + SOCIAL",
  "PERF PRO + SOCIAL + AV",
  "DIAMOND",
]

function getTemperatureBadgeVariant(temp: string) {
  switch (temp) {
    case "HOT": return "hot" as const
    case "WARM": return "warm" as const
    case "COOL": return "cool" as const
    case "COLD": return "cold" as const
    default: return "secondary" as const
  }
}

export function AnalysisResults({
  analysis,
  onGenerate,
  generating,
}: AnalysisResultsProps) {
  const { prospect, analysis: data } = analysis

  return (
    <div className="space-y-6">
      {/* Generating overlay */}
      {generating && (
        <div className="rounded-lg border border-[#E13F07]/30 bg-neutral-950 p-6 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#E13F07]" />
          <p className="mt-3 font-medium">Gerando proposta com Claude Opus...</p>
          <p className="mt-1 text-sm text-neutral-400">
            Isso pode levar ate 2 minutos. O HTML completo esta sendo construido.
          </p>
        </div>
      )}

      {/* Header com Score */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">{prospect.companyName}</h2>
          <p className="text-neutral-400">
            {prospect.contactName} / {prospect.sector}
          </p>
          <p className="text-sm text-neutral-500">
            {prospect.city}/{prospect.state} / {prospect.estimatedRevenue}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{data.leadScore}</div>
          <Badge variant={getTemperatureBadgeVariant(data.leadTemperature)}>
            {data.leadTemperature}
          </Badge>
        </div>
      </div>

      {/* GPCT Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-emerald-500" />
              Goals (Objetivos)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-300">{data.gpct.goals}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-blue-500" />
              Plans (Planos Atuais)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-300">{data.gpct.plans}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Challenges (Desafios)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-300">{data.gpct.challenges}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              Timeline (Urgencia)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-300">{data.gpct.timeline}</p>
          </CardContent>
        </Card>
      </div>

      {/* Persona + Diagnostico */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              Persona Match
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="font-medium">{data.personaMatch}</span>
              <Badge variant="secondary">{data.personaAdherence}% aderencia</Badge>
            </div>
            <p className="mt-1 text-xs text-neutral-500">Tier {data.tier}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-[#E13F07]" />
              Verdade Inconveniente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-300">{data.inconvenientTruth}</p>
          </CardContent>
        </Card>
      </div>

      {/* Diagnostico */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Diagnostico</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-300">{data.diagnosis}</p>
        </CardContent>
      </Card>

      {/* Objecoes */}
      {data.keyObjections && data.keyObjections.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Objecoes Mapeadas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.keyObjections.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-neutral-500">{i + 1}.</span>
                  <span className="text-neutral-300">{obj}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Plano Recomendado + Acao */}
      <Card className="border-[#E13F07]/30 bg-neutral-950">
        <CardHeader>
          <CardTitle>Plano Recomendado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{data.recommendedPlan}</p>
              <p className="text-neutral-400">
                {formatCurrency(data.planPrice)}/mes + Setup{" "}
                {formatCurrency(data.setupPrice)}
              </p>
              {data.alternativePlan && (
                <p className="mt-1 text-xs text-neutral-500">
                  Alternativa: {data.alternativePlan}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {data.alternativePlan && (
                <Button
                  variant="outline"
                  onClick={() => onGenerate(data.alternativePlan)}
                  disabled={generating}
                >
                  Gerar {data.alternativePlan}
                </Button>
              )}
              <Button
                variant="orange"
                onClick={() => onGenerate(data.recommendedPlan)}
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Gerando Proposta...
                  </>
                ) : (
                  "Gerar Proposta"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selecao manual de plano */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-neutral-400">
            Ou selecione outro plano manualmente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {PLANS.filter(
              (p) =>
                p !== data.recommendedPlan && p !== data.alternativePlan
            ).map((plan) => (
              <Button
                key={plan}
                variant="ghost"
                size="sm"
                onClick={() => onGenerate(plan)}
                disabled={generating}
                className="text-xs"
              >
                {plan}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
