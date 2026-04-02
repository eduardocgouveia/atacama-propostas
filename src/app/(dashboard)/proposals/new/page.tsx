"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { TranscriptionInput } from "@/components/proposals/transcription-input"
import { AnalysisResults } from "@/components/proposals/analysis-results"
import { ProposalPreview } from "@/components/proposals/proposal-preview"
import type { AnalysisResult } from "@/lib/ai/analyze"
import type { EditedProposalData } from "@/lib/types"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

type Step = "transcription" | "analysis" | "proposal"

function NewProposalContent() {
  const searchParams = useSearchParams()
  const editSlug = searchParams.get("edit")

  const [step, setStep] = useState<Step>(editSlug ? "analysis" : "transcription")
  const [analyzing, setAnalyzing] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [initialEditedData, setInitialEditedData] = useState<EditedProposalData | null>(null)
  const [editingSlug, setEditingSlug] = useState<string | null>(editSlug)
  const [loadingEdit, setLoadingEdit] = useState(!!editSlug)
  const [proposal, setProposal] = useState<{
    html: string
    slug: string
    planName: string
    planPrice: number
    setupPrice: number
  } | null>(null)
  const [error, setError] = useState("")

  // Carregar dados para edicao quando ?edit=SLUG
  useEffect(() => {
    if (!editSlug) return
    setLoadingEdit(true)
    fetch(`/api/proposals/${editSlug}/data`)
      .then((r) => {
        if (!r.ok) throw new Error("Proposta nao encontrada")
        return r.json()
      })
      .then((data) => {
        if (data.meta?.analysisData) {
          setAnalysis(data.meta.analysisData as AnalysisResult)
          if (data.meta?.editedData) {
            setInitialEditedData(data.meta.editedData as EditedProposalData)
          }
          setEditingSlug(editSlug)
          setStep("analysis")
        } else {
          // Proposta antiga sem dados de analise — nao da pra editar
          setError("Esta proposta foi criada antes do sistema de edicao. Nao e possivel editar os dados. Crie uma nova proposta a partir da transcricao.")
          setStep("transcription")
        }
      })
      .catch((err) => {
        setError(err.message)
        setStep("transcription")
      })
      .finally(() => setLoadingEdit(false))
  }, [editSlug])

  async function handleAnalyze(transcription: string) {
    setAnalyzing(true)
    setError("")

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcription }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao analisar")
      }

      const result = await response.json()
      setAnalysis(result)
      setStep("analysis")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setAnalyzing(false)
    }
  }

  async function handleGenerate(editedData: EditedProposalData) {
    setGenerating(true)
    setError("")

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 300000)

    try {
      const response = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editedData, analysis }),
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!response.ok) {
        let errorMsg = "Erro ao gerar proposta"
        try {
          const data = await response.json()
          errorMsg = data.error || errorMsg
        } catch {
          errorMsg = `Erro ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMsg)
      }

      const result = await response.json()

      // Use existing slug if editing, otherwise use generated
      const saveSlug = editingSlug || result.slug

      // Save proposal with editedData + analysis for future editing
      try {
        await fetch("/api/proposals/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: saveSlug,
            html: result.html,
            companyName: editedData.companyName,
            planName: result.planName,
            planPrice: result.planPrice,
            setupPrice: result.setupPrice,
            editedData,
            analysisData: analysis,
          }),
        })
      } catch {
        console.warn("Failed to save proposal to disk")
      }

      setProposal({ ...result, slug: saveSlug })
      setStep("proposal")
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Timeout: a geracao demorou mais de 5 minutos. Tente novamente.")
      } else {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      }
    } finally {
      clearTimeout(timeout)
      setGenerating(false)
    }
  }

  if (loadingEdit) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
        <span className="ml-3 text-neutral-400">Carregando dados da proposta...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/proposals"
          className="text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {editingSlug ? "Editar Proposta" : "Nova Proposta"}
          </h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500">
            <span className={step === "transcription" ? "text-white" : ""}>
              1. Transcricao
            </span>
            <span>/</span>
            <span className={step === "analysis" ? "text-white" : ""}>
              2. Analise
            </span>
            <span>/</span>
            <span className={step === "proposal" ? "text-white" : ""}>
              3. Proposta
            </span>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-900 bg-red-950/50 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Steps */}
      {step === "transcription" && (
        <TranscriptionInput onAnalyze={handleAnalyze} loading={analyzing} />
      )}

      {step === "analysis" && analysis && (
        <AnalysisResults
          analysis={analysis}
          onGenerate={handleGenerate}
          generating={generating}
          initialData={initialEditedData || undefined}
        />
      )}

      {step === "proposal" && proposal && (
        <ProposalPreview
          html={proposal.html}
          slug={proposal.slug}
          planName={proposal.planName}
          planPrice={proposal.planPrice}
          setupPrice={proposal.setupPrice}
        />
      )}
    </div>
  )
}

export default function NewProposalPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
      </div>
    }>
      <NewProposalContent />
    </Suspense>
  )
}
