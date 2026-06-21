import { prisma } from "@/lib/prisma"
import { ResultChart } from "./ResultChart"

export const dynamic = 'force-dynamic'

export default async function ResultsAdminPage() {
  // Fetch candidates and their vote counts
  const candidates = await prisma.candidate.findMany({
    include: {
      _count: {
        select: { Votes: true }
      }
    },
    orderBy: { candidateNumber: 'asc' }
  })

  const chartData = candidates.map(c => ({
    candidateName: c.name,
    candidateNumber: c.candidateNumber,
    votes: c._count.Votes
  }))

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Hasil Voting</h2>
      <ResultChart data={chartData} />
    </div>
  )
}
