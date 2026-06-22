import LoginLayout from "@/components/login/LoginLayout"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  const allCandidates = await prisma.candidate.findMany({
    orderBy: { candidateNumber: 'asc' },
    select: { candidateNumber: true, name: true },
  })

  return <LoginLayout navbarCandidates={allCandidates} />
}
