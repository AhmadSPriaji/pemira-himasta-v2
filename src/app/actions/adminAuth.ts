"use server"

import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

export async function loginAdmin(username: string, passwordHash: string) {
  try {
    // Auto-seed default admin if no admins exist
    const adminCount = await prisma.admin.count()
    if (adminCount === 0) {
      await prisma.admin.create({
        data: { username: "admin", passwordHash: "password123" }
      })
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin || admin.passwordHash !== passwordHash) {
      return { success: false, error: "Username atau password salah." }
    }

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("admin_session", admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: "Terjadi kesalahan pada server." }
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
}
