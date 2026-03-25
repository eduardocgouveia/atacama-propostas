"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, Loader2 } from "lucide-react"

interface TranscriptionInputProps {
  onAnalyze: (transcription: string) => void
  loading: boolean
}

export function TranscriptionInput({ onAnalyze, loading }: TranscriptionInputProps) {
  const [transcription, setTranscription] = useState("")

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
          Cole a transcricao da call comercial. O sistema vai analisar o prospect,
          qualificar o lead e sugerir o plano ideal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Cole aqui a transcricao completa da reuniao comercial..."
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
            disabled={loading}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500">
              {transcription.length} caracteres
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
