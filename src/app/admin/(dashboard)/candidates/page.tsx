import { prisma } from "@/lib/prisma"
import { CandidateTable } from "./CandidateTable"

export const dynamic = 'force-dynamic'

export default async function CandidatesAdminPage() {
  const candidates = await prisma.candidate.findMany({
    orderBy: { candidateNumber: 'asc' }
  })

  // Parse JSON objects explicitly for the client component
  const parsedCandidates = candidates.map(c => ({
    ...c,
    missions: c.missions as string[],
    innovations: c.innovations as { name: string; explanation: string[] }[]
  }))

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Manajemen Kandidat</h2>
      <CandidateTable candidates={parsedCandidates} />
    </div>
  )
}
