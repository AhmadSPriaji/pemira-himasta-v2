import { prisma } from "@/lib/prisma"
import Landing from "@/components/Landing/Landing"

export const dynamic = 'force-dynamic' // Ensure it always fetches fresh data

export default async function Home() {
  // Fetch data
  const landingInfo = await prisma.landingInfo.findFirst()
  const timelineEvents = await prisma.timelineEvent.findMany({
    orderBy: { sortOrder: 'asc' }
  })
  const candidates = await prisma.candidate.findMany({
    orderBy: { candidateNumber: 'asc' }
  })

  const content = {
    year: landingInfo?.year || "2025",
    about: landingInfo?.about || "Deskripsi Pemira...",
    voteDate: timelineEvents.find((e) => e.isVotingEvent)?.displayDate || "TBA",
    timeLine: timelineEvents.map((e) => ({
      eventName: e.eventName,
      displayDate: e.displayDate
    })),
    candidates: candidates.map((c) => ({
      id: c.id,
      candidateNumber: c.candidateNumber,
      name: c.name,
      photoUrl: c.photoUrl
    })),
    instagramUrl: landingInfo?.instagramUrl || "https://instagram.com",
    address: landingInfo?.address || "Alamat belum disetel"
  }

  return <Landing content={content} />
}
