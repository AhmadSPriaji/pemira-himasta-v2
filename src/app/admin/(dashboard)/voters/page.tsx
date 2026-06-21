import { prisma } from "@/lib/prisma"
import { VoterTable } from "./VoterTable"

export const dynamic = 'force-dynamic'

export default async function VotersAdminPage() {
  const voters = await prisma.student.findMany({
    orderBy: { nim: 'asc' }
  })

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Manajemen Pemilih (Voter)</h2>
      <VoterTable voters={voters} />
    </div>
  )
}
