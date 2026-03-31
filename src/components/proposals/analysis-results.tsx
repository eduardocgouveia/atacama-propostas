"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Target,
  AlertTriangle,
  Zap,
  Loader2,
  FileText,
  Check,
  Building2,
  Pencil,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { AnalysisResult } from "@/lib/ai/analyze"
import type { EditedProposalData } from "@/lib/types"

interface AnalysisResultsProps {
  analysis: AnalysisResult
  onGenerate: (data: EditedProposalData) => void
  generating: boolean
}

const PLANS_CATALOG = [
  {
    name: "IGNITION",
    price: 5500,
    setup: 0,
    type: "one-shot" as const,
    description: "Projeto unico para leads abaixo de R$ 30k/mes. Sem mensalidade.",
    target: "R$ 0-30k/mes",
  },
  {
    name: "START",
    price: 2270,
    setup: 1180,
    type: "recorrente" as const,
    description: "1 canal de trafego pago. Para quem nunca fez trafego profissional.",
    target: "R$ 20-50k/mes",
  },
  {
    name: "PRO",
    price: 3280,
    setup: 1180,
    type: "recorrente" as const,
    description: "2 canais (Google+Meta), 4 LPs, 4 criativos/mes. Plano ICP.",
    target: "R$ 50-120k/mes",
  },
  {
    name: "ADVANCED",
    price: 5450,
    setup: 1180,
    type: "recorrente" as const,
    description: "3 canais + social media + video. Para escalar.",
    target: "R$ 80-200k/mes",
  },
  {
    name: "SOCIAL-PRO",
    price: 3320,
    setup: 1180,
    type: "recorrente" as const,
    description: "100% organico: social media + audiovisual. Sem trafego pago.",
    target: "R$ 30-80k/mes",
  },
  {
    name: "PERF PRO + SOCIAL",
    price: 5300,
    setup: 1180,
    type: "recorrente" as const,
    description: "2 canais de trafego + social media (sem video).",
    target: "R$ 40-100k/mes",
  },
  {
    name: "PERF PRO + SOCIAL + AV",
    price: 6680,
    setup: 1580,
    type: "recorrente" as const,
    description: "2 canais + social + producao de video mensal. BEST SELLER.",
    target: "R$ 50-150k/mes",
  },
  {
    name: "DIAMOND",
    price: 8780,
    setup: 2580,
    type: "recorrente" as const,
    description: "Sistema 360: multi-canal + social + video + inbound + SEO.",
    target: "R$ 100-500k/mes",
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

// Componente de campo editavel
function EditableField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <div className="space-y-1">
        <Label className="text-xs text-neutral-500">{label}</Label>
        {multiline ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setEditing(false)}
            autoFocus
            className="min-h-[80px] text-sm"
          />
        ) : (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setEditing(false)}
            autoFocus
            className="text-sm"
          />
        )}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="group w-full text-left"
    >
      <div className="flex items-start gap-1">
        <span className="text-sm text-neutral-300 leading-relaxed flex-1">{value || "(clique para editar)"}</span>
        <Pencil className="h-3 w-3 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
      </div>
    </button>
  )
}

export function AnalysisResults({
  analysis,
  onGenerate,
  generating,
}: AnalysisResultsProps) {
  const { prospect, analysis: data } = analysis

  // Estado editavel do prospect
  const [companyName, setCompanyName] = useState(prospect.companyName || "")
  const [contactName, setContactName] = useState(prospect.contactName || "")
  const [sector, setSector] = useState(prospect.sector || "")
  const [location, setLocation] = useState(
    prospect.city && prospect.state ? `${prospect.city}/${prospect.state}` : ""
  )
  const [revenue, setRevenue] = useState(prospect.estimatedRevenue || "")

  // Estado editavel da analise
  const [goals, setGoals] = useState(data.gpct.goals || "")
  const [plans, setPlans] = useState(data.gpct.plans || "")
  const [timeline, setTimeline] = useState(data.gpct.timeline || "")
  const [challenges, setChallenges] = useState(data.gpct.challenges || "")
  const [inconvenientTruth, setInconvenientTruth] = useState(data.inconvenientTruth || "")
  const [diagnosis, setDiagnosis] = useState(data.diagnosis || "")

  // Dores selecionaveis e editaveis
  const [pains, setPains] = useState(
    (data.keyObjections || []).map((obj) => ({ text: obj, selected: true }))
  )

  // Planos
  const [selectedPlans, setSelectedPlans] = useState<string[]>([data.recommendedPlan])
  const [proposalType, setProposalType] = useState<"single" | "multiple">("single")

  function togglePlan(planName: string) {
    if (proposalType === "single") {
      setSelectedPlans([planName])
    } else {
      setSelectedPlans((prev) =>
        prev.includes(planName)
          ? prev.filter((p) => p !== planName)
          : [...prev, planName]
      )
    }
  }

  function togglePain(index: number) {
    setPains((prev) => prev.map((p, i) => i === index ? { ...p, selected: !p.selected } : p))
  }

  function updatePainText(index: number, text: string) {
    setPains((prev) => prev.map((p, i) => i === index ? { ...p, text } : p))
  }

  function handleGenerate() {
    const plansData = selectedPlans.map((name) => {
      const catalog = PLANS_CATALOG.find((p) => p.name === name)
      return catalog || { name, price: 0, setup: 0, type: "recorrente" as const, description: "", target: "" }
    })

    const editedData: EditedProposalData = {
      companyName,
      contactName,
      sector,
      location,
      revenue,
      goals,
      plans,
      timeline,
      challenges,
      inconvenientTruth,
      diagnosis,
      selectedPains: pains.filter((p) => p.selected).map((p) => p.text),
      selectedPlans: plansData,
      proposalType,
    }

    onGenerate(editedData)
  }

  const missingFields = !companyName || !contactName

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

      {/* ═══ DADOS DO PROSPECT (editaveis) ═══ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="h-5 w-5" />
            Dados do Prospect
            <span className="text-xs font-normal text-neutral-500 ml-auto">
              Clique em qualquer campo para editar
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-xs text-neutral-500">Nome da Empresa *</Label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nome da empresa"
                className={!companyName ? "border-red-800" : ""}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-neutral-500">Nome do Contato *</Label>
              <Input
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nome do decisor"
                className={!contactName ? "border-red-800" : ""}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-neutral-500">Setor</Label>
              <Input
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="Ex: Odontologia, E-commerce"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-neutral-500">Localizacao</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Cidade/Estado"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label className="text-xs text-neutral-500">Faturamento Estimado</Label>
              <Input
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="Ex: R$ 80.000/mes"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Lead Score: {data.leadScore}</span>
              <Badge variant={getTemperatureBadgeVariant(data.leadTemperature)}>
                {data.leadTemperature}
              </Badge>
            </div>
            <span className="text-xs text-neutral-500">
              Persona: {data.personaMatch} ({data.personaAdherence}%)
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ═══ METAS DO CLIENTE (editaveis) ═══ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-5 w-5 text-emerald-500" />
            Metas e Objetivos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-emerald-950/20 border border-emerald-900/30 p-4">
            <Label className="text-xs text-emerald-400/70 mb-2 block">OBJETIVOS PRINCIPAIS</Label>
            <EditableField label="Objetivos" value={goals} onChange={setGoals} multiline />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-800 p-3">
              <Label className="text-xs text-neutral-500 mb-1 block">PLANOS ATUAIS</Label>
              <EditableField label="Planos" value={plans} onChange={setPlans} />
            </div>
            <div className="rounded-lg border border-neutral-800 p-3">
              <Label className="text-xs text-neutral-500 mb-1 block">URGENCIA / TIMELINE</Label>
              <EditableField label="Timeline" value={timeline} onChange={setTimeline} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ═══ DORES (selecionaveis + editaveis) ═══ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Dores e Problemas
            <span className="text-xs font-normal text-neutral-500 ml-auto">
              Selecione e edite as que vao para a proposta
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Verdade inconveniente */}
          <div className="rounded-lg bg-red-950/10 border border-red-900/20 p-4">
            <Label className="text-xs text-red-400/70 mb-2 block">VERDADE INCONVENIENTE</Label>
            <EditableField label="Verdade" value={inconvenientTruth} onChange={setInconvenientTruth} multiline />
          </div>

          {/* Desafios */}
          <div className="rounded-lg border border-neutral-800 p-4">
            <Label className="text-xs text-neutral-500 mb-2 block">DESAFIOS GERAIS</Label>
            <EditableField label="Desafios" value={challenges} onChange={setChallenges} multiline />
          </div>

          {/* Objecoes selecionaveis e editaveis */}
          {pains.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs text-neutral-500">OBJECOES MAPEADAS</Label>
              {pains.map((pain, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                    pain.selected
                      ? "border-amber-800/40 bg-amber-950/10"
                      : "border-neutral-800 bg-neutral-900/30 opacity-50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => togglePain(i)}
                    className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                      pain.selected
                        ? "border-amber-600 bg-amber-600"
                        : "border-neutral-600"
                    }`}
                  >
                    {pain.selected && <Check className="h-3 w-3 text-white" />}
                  </button>
                  <div className="flex-1">
                    <EditableField label={`Objecao ${i + 1}`} value={pain.text} onChange={(v) => updatePainText(i, v)} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ═══ DIAGNOSTICO (editavel) ═══ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5 text-blue-500" />
            Diagnostico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditableField label="Diagnostico" value={diagnosis} onChange={setDiagnosis} multiline />
        </CardContent>
      </Card>

      {/* ═══ TIPO DE PROPOSTA ═══ */}
      <Card className="border-[#E13F07]/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-5 w-5 text-[#E13F07]" />
            Proposta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tipo de proposta */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setProposalType("single")
                setSelectedPlans([selectedPlans[0] || data.recommendedPlan])
              }}
              className={`flex-1 rounded-lg border p-3 text-center text-sm font-medium transition-colors ${
                proposalType === "single"
                  ? "border-[#E13F07]/50 bg-[#E13F07]/10 text-white"
                  : "border-neutral-800 text-neutral-400 hover:border-neutral-700"
              }`}
            >
              Plano Unico
              <p className="text-xs font-normal mt-0.5 opacity-70">Recomendar 1 plano</p>
            </button>
            <button
              type="button"
              onClick={() => setProposalType("multiple")}
              className={`flex-1 rounded-lg border p-3 text-center text-sm font-medium transition-colors ${
                proposalType === "multiple"
                  ? "border-[#E13F07]/50 bg-[#E13F07]/10 text-white"
                  : "border-neutral-800 text-neutral-400 hover:border-neutral-700"
              }`}
            >
              Multiplos Planos
              <p className="text-xs font-normal mt-0.5 opacity-70">Apresentar 2-3 opcoes</p>
            </button>
          </div>

          {/* Todos os planos */}
          <div>
            <p className="text-xs font-medium text-neutral-500 mb-3">
              ESCOLHA {proposalType === "single" ? "O PLANO" : "OS PLANOS"} PARA A PROPOSTA
            </p>
            <div className="space-y-2">
              {PLANS_CATALOG.map((plan) => {
                const isSelected = selectedPlans.includes(plan.name)
                const isRecommended = plan.name === data.recommendedPlan
                const isAlternative = plan.name === data.alternativePlan

                return (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => togglePlan(plan.name)}
                    className={`flex w-full items-start gap-3 rounded-lg border-2 p-4 text-left transition-colors ${
                      isSelected
                        ? "border-[#E13F07]/50 bg-[#E13F07]/5"
                        : "border-neutral-800 hover:border-neutral-600"
                    }`}
                  >
                    <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isSelected
                        ? "border-[#E13F07] bg-[#E13F07]"
                        : "border-neutral-600"
                    }`}>
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold">{plan.name}</span>
                        {isRecommended && (
                          <Badge variant="hot" className="text-[10px]">Sugestao IA</Badge>
                        )}
                        {isAlternative && (
                          <Badge variant="secondary" className="text-[10px]">Alternativa IA</Badge>
                        )}
                      </div>
                      <p className="text-sm text-neutral-300 mt-0.5">
                        {plan.type === "one-shot"
                          ? formatCurrency(plan.price) + " (pagamento unico)"
                          : formatCurrency(plan.price) + "/mes + Setup " + formatCurrency(plan.setup)}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">{plan.description}</p>
                      <span className="text-[10px] text-neutral-600">Faixa: {plan.target}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Resumo da selecao */}
          {selectedPlans.length > 0 && (
            <div className="rounded-lg bg-neutral-900 border border-neutral-800 p-3">
              <p className="text-xs text-neutral-500 mb-1">
                {proposalType === "multiple" ? "PLANOS NA PROPOSTA" : "PLANO SELECIONADO"}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedPlans.map((p) => (
                  <Badge key={p} variant="secondary">{p}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Aviso de campos obrigatorios */}
          {missingFields && (
            <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-3 text-sm text-red-400">
              Preencha o nome da empresa e do contato antes de gerar a proposta.
            </div>
          )}

          {/* Botao gerar */}
          <Button
            variant="orange"
            className="w-full h-12 text-base"
            onClick={handleGenerate}
            disabled={generating || selectedPlans.length === 0 || missingFields}
          >
            {generating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Gerando Proposta...
              </>
            ) : proposalType === "multiple" && selectedPlans.length > 1 ? (
              `Gerar Proposta com ${selectedPlans.length} Planos`
            ) : (
              `Gerar Proposta - ${selectedPlans[0] || "Selecione um plano"}`
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
