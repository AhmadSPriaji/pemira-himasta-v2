"use server"

import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

async function getAdminSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("admin_session")?.value
  if (!sessionId) return null

  const admin = await prisma.admin.findUnique({
    where: { id: sessionId },
  })
  
  return admin
}

export async function addCandidate(data: {
  candidateNumber: number
  name: string
  photoUrl?: string
  cvUrl?: string
  grandDesignUrl?: string
  vision: string
  missions: string[]
  innovations: { name: string; explanation: string[] }[]
}) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    await prisma.candidate.create({
      data: {
        ...data,
        missions: data.missions,
        innovations: data.innovations,
      },
    })
    revalidatePath("/")
    revalidatePath("/admin/candidates")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menambah kandidat." }
  }
}

export async function updateCandidate(id: string, data: {
  candidateNumber: number
  name: string
  photoUrl?: string
  cvUrl?: string
  grandDesignUrl?: string
  vision: string
  missions: string[]
  innovations: { name: string; explanation: string[] }[]
}) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    await prisma.candidate.update({
      where: { id },
      data: {
        ...data,
        missions: data.missions,
        innovations: data.innovations,
      },
    })
    revalidatePath("/")
    revalidatePath("/admin/candidates")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal memperbarui kandidat." }
  }
}

export async function deleteCandidate(id: string) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    await prisma.candidate.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/admin/candidates")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menghapus kandidat." }
  }
}
