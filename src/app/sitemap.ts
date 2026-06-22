import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pemira-himasta.netlify.app'

  // Fetch candidates to add to sitemap dynamically
  let candidates: { candidateNumber: number; updatedAt: Date }[] = []
  try {
    candidates = await prisma.candidate.findMany({
      select: { candidateNumber: true, updatedAt: true }
    })
  } catch (error) {
    console.error("Error fetching candidates for sitemap:", error)
  }

  const candidateEntries = candidates.map((candidate) => ({
    url: `${baseUrl}/candidate/${candidate.candidateNumber}`,
    lastModified: candidate.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    ...candidateEntries,
  ]
}
