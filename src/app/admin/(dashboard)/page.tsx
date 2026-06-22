import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Vote, Award } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  // Ambil semua statistik sekaligus secara paralel (lebih cepat)
  const [totalVoters, activeVoters, votedCount, candidateCount] = await Promise.all([
    prisma.student.count(),
    prisma.student.count({ where: { isActive: true } }),
    prisma.student.count({ where: { isVoted: true } }),
    prisma.candidate.count(),
  ])

  const participationRate = activeVoters > 0
    ? Math.round((votedCount / activeVoters) * 100)
    : 0

  const stats = [
    {
      title: "Total Voter Terdaftar",
      value: totalVoters,
      icon: Users,
      description: `${activeVoters} voter aktif`
    },
    {
      title: "Sudah Memilih",
      value: votedCount,
      icon: Vote,
      description: `dari ${activeVoters} voter aktif`
    },
    {
      title: "Tingkat Partisipasi",
      value: `${participationRate}%`,
      icon: UserCheck,
      description: "voter aktif yang sudah memilih"
    },
    {
      title: "Jumlah Kandidat",
      value: candidateCount,
      icon: Award,
      description: "kandidat terdaftar"
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Ringkasan kondisi Pemilihan Raya saat ini.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
