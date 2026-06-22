import VotingPage from "@/components/Voting/VotingPage"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [candidates, allCandidates] = await Promise.all([
    prisma.candidate.findMany({
      orderBy: { candidateNumber: 'asc' },
      select: {
        id: true,
        name: true,
        photoUrl: true,
      }
    }),
    prisma.candidate.findMany({
      orderBy: { candidateNumber: 'asc' },
      select: { candidateNumber: true, name: true },
    }),
  ])

  return <VotingPage candidates={candidates} navbarCandidates={allCandidates} />
}
