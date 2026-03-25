"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, Loader2, FileText, X } from "lucide-react"

interface TranscriptionInputProps {
  onAnalyze: (transcription: string) => void
  loading: boolean
}

export function TranscriptionInput({ onAnalyze, loading }: TranscriptionInputProps) {
  const [transcription, setTranscription] = useState("")
  const [fileName, setFileName] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const readFile = useCallback(async (file: File) => {
    const text = await file.text()
    setTranscription(text)
    setFileName(file.name)
  }, [])

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await readFile(e.dataTransfer.files[0])
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      await readFile(e.target.files[0])
    }
  }

  function clearFile() {
    setTranscription("")
    setFileName("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (transcription.trim().length < 100) return
    onAnalyze(transcription)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Transcricao da Reuniao
        </CardTitle>
        <CardDescription>
          Arraste um arquivo, faca upload ou cole a transcricao diretamente.
          Formatos aceitos: .txt, .md, .doc, .pdf
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Drop zone */}
          {!transcription && (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors cursor-pointer ${
                dragActive
                  ? "border-[#E13F07] bg-[#E13F07]/5"
                  : "border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900/50"
              }`}
            >
              <Upload className={`h-10 w-10 mb-4 ${dragActive ? "text-[#E13F07]" : "text-neutral-500"}`} />
              <p className="text-sm font-medium text-neutral-300">
                Arraste o arquivo aqui
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                ou clique para selecionar
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.text,.doc,.docx,.pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={loading}
              />
            </div>
          )}

          {/* File loaded indicator */}
          {fileName && (
            <div className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3">
              <FileText className="h-5 w-5 text-neutral-400" />
              <div className="flex-1">
                <p className="text-sm font-medium">{fileName}</p>
                <p className="text-xs text-neutral-500">
                  {transcription.length.toLocaleString("pt-BR")} caracteres carregados
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="rounded-md p-1 text-neutral-500 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Separator */}
          {!transcription && (
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-800" />
              <span className="text-xs text-neutral-500">ou cole diretamente</span>
              <div className="h-px flex-1 bg-neutral-800" />
            </div>
          )}

          {/* Textarea */}
          <Textarea
            placeholder="Cole aqui a transcricao completa da reuniao comercial..."
            value={transcription}
            onChange={(e) => {
              setTranscription(e.target.value)
              if (!e.target.value) setFileName("")
            }}
            className="min-h-[250px] font-mono text-sm"
            disabled={loading}
          />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500">
              {transcription.length.toLocaleString("pt-BR")} caracteres
              {transcription.length > 0 && transcription.length < 100 && (
                <span className="text-red-500"> (minimo 100)</span>
              )}
            </span>
            <Button
              type="submit"
              variant="orange"
              disabled={loading || transcription.trim().length < 100}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analisando...
                </>
              ) : (
                "Analisar Transcricao"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
