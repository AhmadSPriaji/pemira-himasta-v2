"use server"

import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { sendInviteEmail } from "@/lib/mail"
import crypto from "crypto"
import bcrypt from "bcryptjs"
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

export async function getAdmins() {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized" }

  try {
    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        email: true,
        createdAt: true,
        passwordHash: true, // we only need this to check if they have accepted the invite
      }
    })
    
    // Map passwordHash to status
    const formattedAdmins = admins.map(a => ({
      id: a.id,
      email: a.email,
      createdAt: a.createdAt,
      status: a.passwordHash ? "Active" : "Pending"
    }))

    return { success: true, data: formattedAdmins }
  } catch (error) {
    return { success: false, error: "Gagal mengambil data admin." }
  }
}

export async function inviteAdmin(email: string) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized" }

  try {
    const existingAdmin = await prisma.admin.findUnique({ where: { email } })
    if (existingAdmin) {
      return { success: false, error: "Admin dengan email ini sudah terdaftar." }
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 86400000) // 24 hours from now

    await prisma.admin.create({
      data: {
        email,
        resetToken,
        resetTokenExpiry,
        // passwordHash is null initially
      }
    })

    await sendInviteEmail(email, resetToken)

    revalidatePath("/admin/admins")
    return { success: true }
  } catch (error) {
    console.error("Invite admin error:", error)
    return { success: false, error: "Gagal mengundang admin." }
  }
}

export async function deleteAdmin(id: string) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized" }

  if (admin.id === id) {
    return { success: false, error: "Anda tidak dapat menghapus akun Anda sendiri." }
  }

  try {
    await prisma.admin.delete({ where: { id } })
    revalidatePath("/admin/admins")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menghapus admin." }
  }
}

export async function changePassword(oldPasswordPlain: string, newPasswordPlain: string) {
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized" }

  try {
    // Check old password
    if (admin.passwordHash) {
      const isValid = await bcrypt.compare(oldPasswordPlain, admin.passwordHash)
      if (!isValid) {
        return { success: false, error: "Password lama tidak sesuai." }
      }
    }

    const passwordHash = await bcrypt.hash(newPasswordPlain, 10)

    await prisma.admin.update({
      where: { id: admin.id },
      data: { passwordHash }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal mengubah password." }
  }
}
