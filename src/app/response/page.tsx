import ResponsePage from "@/components/submitted/ResponsePage"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function Response() {
  const allCandidates = await prisma.candidate.findMany({
    orderBy: { candidateNumber: 'asc' },
    select: { candidateNumber: true, name: true },
  })

  return <ResponsePage navbarCandidates={allCandidates} />
}
