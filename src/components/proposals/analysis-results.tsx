"use client"

import { useState } from "react"
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
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { AnalysisResult } from "@/lib/ai/analyze"

interface AnalysisResultsProps {
  analysis: AnalysisResult
  onGenerate: (planName: string) => void
  generating: boolean
}

// Catalogo de planos com descricao resumida
const PLANS_CATALOG = [
  {
    name: "IGNITION",
    price: 5500,
    type: "one-shot",
    description: "Projeto unico para leads com faturamento abaixo de R$ 30k/mes. Sem mensalidade.",
  },
  {
    name: "START",
    price: 2270,
    setup: 1180,
    type: "recorrente",
    description: "1 canal de trafego pago. Ideal para quem fatura R$ 20-50k/mes e nunca fez trafego profissional.",
  },
  {
    name: "PRO",
    price: 3280,
    setup: 1180,
    type: "recorrente",
    description: "2 canais (Google+Meta), 4 LPs, 4 criativos/mes. Para quem fatura R$ 50-120k/mes. Plano ICP.",
  },
  {
    name: "ADVANCED",
    price: 5450,
    setup: 1180,
    type: "recorrente",
    description: "3 canais + social media + video. Para quem fatura R$ 80-200k/mes e quer escalar.",
  },
  {
    name: "SOCIAL-PRO",
    price: 3320,
    setup: 1180,
    type: "recorrente",
    description: "100% organico: social media + audiovisual. Sem trafego pago. R$ 30-80k/mes.",
  },
  {
    name: "PERF PRO + SOCIAL",
    price: 5300,
    setup: 1180,
    type: "recorrente",
    description: "2 canais de trafego + social media (sem video). R$ 40-100k/mes.",
  },
  {
    name: "PERF PRO + SOCIAL + AV",
    price: 6680,
    setup: 1580,
    type: "recorrente",
    description: "2 canais + social + producao de video mensal. BEST SELLER. R$ 50-150k/mes.",
  },
  {
    name: "DIAMOND",
    price: 8780,
    setup: 2580,
    type: "recorrente",
    description: "Sistema 360: multi-canal + social + video + inbound + SEO. R$ 100-500k/mes.",
  },
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
  const [selectedPlans, setSelectedPlans] = useState<string[]>([data.recommendedPlan])
  const [selectedPains, setSelectedPains] = useState<boolean[]>(
    data.keyObjections?.map(() => true) || []
  )
  const [showAllPlans, setShowAllPlans] = useState(false)

  function togglePlan(planName: string) {
    setSelectedPlans((prev) =>
      prev.includes(planName)
        ? prev.filter((p) => p !== planName)
        : [...prev, planName]
    )
  }

  function togglePain(index: number) {
    setSelectedPains((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  function handleGenerate() {
    // Se mais de 1 plano selecionado, gerar proposta multipla
    const planName = selectedPlans.length === 1
      ? selectedPlans[0]
      : selectedPlans.join(" + ")
    onGenerate(planName)
  }

  return (
    <div className="space-y-6">
      {/* Generating overlay */}
      {generating && (
        <div className="rounded-lg border border-[#E13F07]/30 bg-neutral-950 p-6 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#E13F07]" />
          <p className="mt-3 font-medium">Gerando proposta...</p>
          <p className="mt-1 text-sm text-neutral-400">
            Montando o conteudo da proposta. Pode levar ate 1 minuto.
          </p>
        </div>
      )}

      {/* ═══ HEADER: Prospect + Score ═══ */}
      <Card>
        <CardContent className="py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-xl font-bold truncate">{prospect.companyName}</h2>
              <p className="text-sm text-neutral-400 mt-1">
                {prospect.contactName} / {prospect.sector}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                {prospect.city}/{prospect.state} / {prospect.estimatedRevenue}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-3xl font-bold leading-none">{data.leadScore}</div>
              <Badge variant={getTemperatureBadgeVariant(data.leadTemperature)} className="mt-1">
                {data.leadTemperature}
              </Badge>
              <p className="text-xs text-neutral-500 mt-1">Tier {data.tier}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ═══ METAS DO CLIENTE ═══ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-5 w-5 text-emerald-500" />
            Metas e Objetivos do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-emerald-950/20 border border-emerald-900/30 p-4">
            <p className="text-sm text-neutral-200 leading-relaxed">{data.gpct.goals}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-800 p-3">
              <p className="text-xs font-medium text-neutral-500 mb-1">PLANOS ATUAIS</p>
              <p className="text-sm text-neutral-300">{data.gpct.plans}</p>
            </div>
            <div className="rounded-lg border border-neutral-800 p-3">
              <p className="text-xs font-medium text-neutral-500 mb-1">URGENCIA / TIMELINE</p>
              <p className="text-sm text-neutral-300">{data.gpct.timeline}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ═══ DORES / PROBLEMAS (selecionaveis) ═══ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Dores e Problemas Identificados
            <span className="text-xs font-normal text-neutral-500 ml-auto">
              Selecione as que devem aparecer na proposta
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Verdade inconveniente */}
          <div className="rounded-lg bg-red-950/10 border border-red-900/20 p-4 mb-4">
            <p className="text-xs font-medium text-red-400/70 mb-1">VERDADE INCONVENIENTE</p>
            <p className="text-sm text-neutral-200">{data.inconvenientTruth}</p>
          </div>

          {/* Desafios gerais */}
          <div className="rounded-lg border border-neutral-800 p-4 mb-4">
            <p className="text-xs font-medium text-neutral-500 mb-1">DESAFIOS</p>
            <p className="text-sm text-neutral-300">{data.gpct.challenges}</p>
          </div>

          {/* Objecoes selecionaveis */}
          {data.keyObjections && data.keyObjections.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-neutral-500">OBJECOES MAPEADAS (clique para incluir/excluir)</p>
              {data.keyObjections.map((obj, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => togglePain(i)}
                  className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                    selectedPains[i]
                      ? "border-amber-800/40 bg-amber-950/10"
                      : "border-neutral-800 bg-neutral-900/30 opacity-50"
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                    selectedPains[i]
                      ? "border-amber-600 bg-amber-600"
                      : "border-neutral-600"
                  }`}>
                    {selectedPains[i] && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm text-neutral-300">{obj}</span>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ═══ DIAGNOSTICO ═══ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5 text-blue-500" />
            Diagnostico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-300 leading-relaxed">{data.diagnosis}</p>
        </CardContent>
      </Card>

      {/* ═══ PERSONA ═══ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-5 w-5" />
            Persona Match
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">{data.personaMatch}</span>
            <Badge variant="secondary">{data.personaAdherence}% aderencia</Badge>
          </div>
        </CardContent>
      </Card>

      {/* ═══ SELECAO DE PLANOS ═══ */}
      <Card className="border-[#E13F07]/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-5 w-5 text-[#E13F07]" />
            Selecione o(s) Plano(s) para a Proposta
            <span className="text-xs font-normal text-neutral-500 ml-auto">
              {selectedPlans.length} selecionado(s)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Plano recomendado */}
          <div className="mb-2">
            <p className="text-xs font-medium text-[#E13F07]/70 mb-2">RECOMENDADO PELA ANALISE</p>
            {PLANS_CATALOG.filter(p => p.name === data.recommendedPlan).map((plan) => (
              <button
                key={plan.name}
                type="button"
                onClick={() => togglePlan(plan.name)}
                className={`flex w-full items-start gap-3 rounded-lg border-2 p-4 text-left transition-colors ${
                  selectedPlans.includes(plan.name)
                    ? "border-[#E13F07]/50 bg-[#E13F07]/5"
                    : "border-neutral-700"
                }`}
              >
                <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                  selectedPlans.includes(plan.name)
                    ? "border-[#E13F07] bg-[#E13F07]"
                    : "border-neutral-600"
                }`}>
                  {selectedPlans.includes(plan.name) && <Check className="h-3 w-3 text-white" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold">{plan.name}</span>
                    <span className="text-sm text-neutral-400">
                      {plan.type === "one-shot"
                        ? formatCurrency(plan.price) + " (unico)"
                        : formatCurrency(plan.price) + "/mes" + (plan.setup ? " + Setup " + formatCurrency(plan.setup) : "")}
                    </span>
                    <Badge variant="hot" className="text-[10px]">Recomendado</Badge>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{plan.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Alternativa */}
          {data.alternativePlan && data.alternativePlan !== data.recommendedPlan && (
            <div className="mb-2">
              <p className="text-xs font-medium text-neutral-500 mb-2">ALTERNATIVA</p>
              {PLANS_CATALOG.filter(p => p.name === data.alternativePlan).map((plan) => (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => togglePlan(plan.name)}
                  className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                    selectedPlans.includes(plan.name)
                      ? "border-blue-800/40 bg-blue-950/10"
                      : "border-neutral-800"
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                    selectedPlans.includes(plan.name)
                      ? "border-blue-500 bg-blue-500"
                      : "border-neutral-600"
                  }`}>
                    {selectedPlans.includes(plan.name) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-bold">{plan.name}</span>
                      <span className="text-sm text-neutral-400">
                        {plan.type === "one-shot"
                          ? formatCurrency(plan.price) + " (unico)"
                          : formatCurrency(plan.price) + "/mes"}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">{plan.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Outros planos (expandivel) */}
          <button
            type="button"
            onClick={() => setShowAllPlans(!showAllPlans)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-800 py-2 text-sm text-neutral-400 hover:bg-neutral-900 transition-colors"
          >
            {showAllPlans ? (
              <>Ocultar outros planos <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Ver todos os planos <ChevronDown className="h-4 w-4" /></>
            )}
          </button>

          {showAllPlans && (
            <div className="space-y-2">
              {PLANS_CATALOG.filter(
                (p) => p.name !== data.recommendedPlan && p.name !== data.alternativePlan
              ).map((plan) => (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => togglePlan(plan.name)}
                  className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                    selectedPlans.includes(plan.name)
                      ? "border-neutral-600 bg-neutral-900"
                      : "border-neutral-800/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                    selectedPlans.includes(plan.name)
                      ? "border-white bg-white"
                      : "border-neutral-700"
                  }`}>
                    {selectedPlans.includes(plan.name) && <Check className="h-3 w-3 text-black" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{plan.name}</span>
                      <span className="text-xs text-neutral-500">
                        {plan.type === "one-shot"
                          ? formatCurrency(plan.price) + " (unico)"
                          : formatCurrency(plan.price) + "/mes"}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{plan.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Botao gerar */}
          <div className="pt-4 border-t border-neutral-800">
            <Button
              variant="orange"
              className="w-full h-12 text-base"
              onClick={handleGenerate}
              disabled={generating || selectedPlans.length === 0}
            >
              {generating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Gerando Proposta...
                </>
              ) : selectedPlans.length > 1 ? (
                `Gerar Proposta com ${selectedPlans.length} Planos`
              ) : (
                `Gerar Proposta - ${selectedPlans[0] || "Selecione um plano"}`
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
