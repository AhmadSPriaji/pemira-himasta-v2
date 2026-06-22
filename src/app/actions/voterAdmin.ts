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

export async function addVoter(data: { nim: string; password?: string; generation: string }) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    // Generate random 6 char password if not provided
    const password = data.password || Math.random().toString(36).slice(-6).toUpperCase()

    await prisma.student.create({
      data: {
        nim: data.nim,
        password,
        generation: data.generation,
      }
    })
    revalidatePath("/admin/voters")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menambah pemilih. Pastikan NIM unik." }
  }
}

export async function deleteVoter(id: string) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    await prisma.student.delete({ where: { id } })
    revalidatePath("/admin/voters")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menghapus pemilih." }
  }
}

export async function resetVoterStatus(id: string) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    // Reset isVoted to false and delete associated Vote
    await prisma.$transaction(async (tx) => {
      await tx.student.update({
        where: { id },
        data: { isVoted: false, votedAt: null }
      })
      await tx.vote.deleteMany({
        where: { studentId: id }
      })
    })
    revalidatePath("/admin/voters")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal mereset status voting." }
  }
}

export async function importVotersCsv(voters: { nim: string; generation: string }[]) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    const data = voters.map(v => ({
      nim: v.nim,
      generation: v.generation,
      password: Math.random().toString(36).slice(-6).toUpperCase()
    }))

    await prisma.student.createMany({
      data,
      skipDuplicates: true // skip if NIM already exists
    })

    revalidatePath("/admin/voters")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal mengimport CSV." }
  }
}

export async function toggleVoterStatus(id: string, isActive: boolean) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    await prisma.student.update({
      where: { id },
      data: { isActive }
    })
    revalidatePath("/admin/voters")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal merubah status pemilih." }
  }
}

export async function toggleVotersByGeneration(generation: string, isActive: boolean) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    const result = await prisma.student.updateMany({
      where: { generation },
      data: { isActive }
    })
    revalidatePath("/admin/voters")
    return { success: true, count: result.count }
  } catch (error) {
    return { success: false, error: "Gagal merubah status pemilih massal." }
  }
}
