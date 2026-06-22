"use server"

import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

export async function loginStudent(username: string, password: string) {
  try {
    const student = await prisma.student.findUnique({
      where: { nim: username },
    })

    if (!student || student.password !== password) {
      return { success: false, error: "Username atau password salah." }
    }

    if (!student.isActive) {
      return { success: false, error: "Akun Anda belum diaktifkan. Hubungi panitia." }
    }

    if (student.isVoted) {
      return { success: false, error: "Kamu sudah memberikan suara sebelumnya." }
    }

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("student_session", student.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2, // 2 hours
      path: "/",
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: "Terjadi kesalahan pada server." }
  }
}

export async function logoutStudent() {
  const cookieStore = await cookies()
  cookieStore.delete("student_session")
}
