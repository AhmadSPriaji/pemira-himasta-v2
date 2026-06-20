import VotingPage from "@/components/Voting/VotingPage"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function Page() {
  const candidates = await prisma.candidate.findMany({
    orderBy: { candidateNumber: 'asc' },
    select: {
      id: true,
      name: true,
      photoUrl: true,
      candidateNumber: true
    }
  })

  return <VotingPage candidates={candidates} />
}
