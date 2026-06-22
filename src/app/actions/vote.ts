"use server"

import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

export async function submitVote(candidateId: string) {
  try {
    const cookieStore = await cookies()
    const studentId = cookieStore.get("student_session")?.value

    if (!studentId) {
      return { success: false, error: "Sesi tidak valid. Silakan login kembali." }
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return { success: false, error: "Mahasiswa tidak ditemukan." }
    }

    if (!student.isActive) {
      return { success: false, error: "Akun Anda tidak aktif." }
    }

    if (student.isVoted) {
      return { success: false, error: "Kamu sudah memberikan suara sebelumnya." }
    }

    // Gunakan transaction untuk memastikan atomicity
    await prisma.$transaction([
      prisma.vote.create({
        data: {
          studentId: studentId,
          candidateId: candidateId,
        },
      }),
      prisma.student.update({
        where: { id: studentId },
        data: {
          isVoted: true,
          votedAt: new Date(),
        },
      }),
    ])

    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menyimpan suara. Terjadi kesalahan server." }
  }
}
