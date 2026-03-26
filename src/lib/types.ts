// Dados editados pelo usuario na etapa de analise
export interface EditedProposalData {
  // Prospect
  companyName: string
  contactName: string
  sector: string
  location: string
  revenue: string

  // Conteudo
  goals: string
  plans: string
  timeline: string
  challenges: string
  inconvenientTruth: string
  diagnosis: string

  // Dores selecionadas
  selectedPains: string[]

  // Planos selecionados (com dados do catalogo)
  selectedPlans: Array<{
    name: string
    price: number
    setup: number
    type: "one-shot" | "recorrente"
    description: string
    target: string
  }>

  // Tipo de proposta
  proposalType: "single" | "multiple"
}
