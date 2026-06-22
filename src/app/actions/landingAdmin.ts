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

export async function updateLandingInfo(data: {
  title: string
  year: string
  about: string
  address: string
  instagramUrl: string
}) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    let landingInfo = await prisma.landingInfo.findFirst()
    
    if (landingInfo) {
      await prisma.landingInfo.update({
        where: { id: landingInfo.id },
        data,
      })
    } else {
      await prisma.landingInfo.create({
        data,
      })
    }

    revalidatePath("/")
    revalidatePath("/admin/landing")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menyimpan data." }
  }
}

export async function addTimelineEvent(data: {
  eventName: string
  displayDate: string
  isVotingEvent: boolean
  sortOrder?: number
}) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    await prisma.timelineEvent.create({ data })
    revalidatePath("/")
    revalidatePath("/admin/landing")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menambah event." }
  }
}

export async function deleteTimelineEvent(id: string) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    await prisma.timelineEvent.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/admin/landing")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menghapus event." }
  }
}
