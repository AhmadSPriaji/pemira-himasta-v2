"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function loginAdmin(email: string, passwordPlain: string) {
  try {
    // Auto-seed default admin if no admins exist
    const adminCount = await prisma.admin.count()
    if (adminCount === 0) {
      const defaultPassword = await bcrypt.hash("password123", 10)
      await prisma.admin.create({
        data: { email: "admin@example.com", passwordHash: defaultPassword }
      })
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin || !admin.passwordHash) {
      return { success: false, error: "Email atau password salah." }
    }

    const isValid = await bcrypt.compare(passwordPlain, admin.passwordHash)
    if (!isValid) {
      return { success: false, error: "Email atau password salah." }
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
  redirect("/admin/login")
}

