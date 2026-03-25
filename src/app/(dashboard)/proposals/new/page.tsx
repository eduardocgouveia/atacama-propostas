"use client"

import { useState } from "react"
import { TranscriptionInput } from "@/components/proposals/transcription-input"
import { AnalysisResults } from "@/components/proposals/analysis-results"
import { ProposalPreview } from "@/components/proposals/proposal-preview"
import type { AnalysisResult } from "@/lib/ai/analyze"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type Step = "transcription" | "analysis" | "proposal"

export default function NewProposalPage() {
  const [step, setStep] = useState<Step>("transcription")
  const [analyzing, setAnalyzing] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [proposal, setProposal] = useState<{
    html: string
    slug: string
    planName: string
    planPrice: number
    setupPrice: number
  } | null>(null)
  const [error, setError] = useState("")

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

  async function handleGenerate(planName: string) {
    if (!analysis) return
    setGenerating(true)
    setError("")

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 150000) // 2.5 min timeout

    try {
      const response = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis, planName }),
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

      // Save proposal HTML locally (MVP - file-based storage)
      try {
        await fetch("/api/proposals/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: result.slug, html: result.html }),
        })
      } catch {
        // Save failed but we still have the proposal - continue
        console.warn("Failed to save proposal to disk")
      }

      setProposal(result)
      setStep("proposal")
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Timeout: a geracao demorou mais de 2 minutos. Tente novamente.")
      } else {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      }
    } finally {
      clearTimeout(timeout)
      setGenerating(false)
    }
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
          <h1 className="text-2xl font-bold tracking-tight">Nova Proposta</h1>
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
