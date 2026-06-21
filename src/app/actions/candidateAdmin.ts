"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

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
  try {
    await prisma.candidate.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/admin/candidates")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menghapus kandidat." }
  }
}
