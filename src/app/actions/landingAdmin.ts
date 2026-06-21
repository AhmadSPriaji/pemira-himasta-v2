"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateLandingInfo(data: {
  title: string
  year: string
  about: string
  address: string
  instagramUrl: string
}) {
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
}) {
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
  try {
    await prisma.timelineEvent.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/admin/landing")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menghapus event." }
  }
}
