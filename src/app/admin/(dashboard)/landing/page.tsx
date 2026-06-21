import { prisma } from "@/lib/prisma"
import { LandingForm } from "./LandingForm"

export const dynamic = 'force-dynamic'

export default async function LandingAdminPage() {
  const landingInfo = await prisma.landingInfo.findFirst()
  const timeline = await prisma.timelineEvent.findMany({
    orderBy: { createdAt: 'asc' }
  })

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Manajemen Landing Info</h2>
      <LandingForm initialInfo={landingInfo} timeline={timeline} />
    </div>
  )
}
