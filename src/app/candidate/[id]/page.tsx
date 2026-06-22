import CandidatePageLayout from "@/components/Candidate/CandidatePageLayout"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function CandidatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const candidateNumber = parseInt(id, 10)

  if (isNaN(candidateNumber)) {
    return notFound()
  }

  const [candidate, allCandidates] = await Promise.all([
    prisma.candidate.findUnique({
      where: { candidateNumber },
    }),
    prisma.candidate.findMany({
      orderBy: { candidateNumber: 'asc' },
      select: { candidateNumber: true, name: true },
    }),
  ])

  if (!candidate) {
    return notFound()
  }

  const candidateProps = {
    ...candidate,
    missions: candidate.missions as string[],
    innovations: candidate.innovations as { name: string; explanation: string[] }[],
  }

  return (
    <CandidatePageLayout
      key={candidateProps.id}
      index={candidateProps.candidateNumber.toString()}
      candidate={candidateProps}
      navbarCandidates={allCandidates}
    />
  )
}
