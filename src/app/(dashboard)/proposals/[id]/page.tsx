export default async function ProposalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Proposta {id}</h1>
      <p className="text-neutral-400">
        Detalhes da proposta (em desenvolvimento)
      </p>
    </div>
  )
}
