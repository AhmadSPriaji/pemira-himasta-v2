"use server"

import { prisma } from "@/lib/prisma"
import { sendResetPasswordEmail } from "@/lib/mail"
import crypto from "crypto"
import bcrypt from "bcryptjs"

export async function forgotPassword(email: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin) {
      // Return success even if not found to prevent email enumeration
      return { success: true }
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    await sendResetPasswordEmail(email, resetToken)

    return { success: true }
  } catch (error) {
    console.error("Forgot password error:", error)
    return { success: false, error: "Gagal mengirim email reset password." }
  }
}

export async function resetPassword(token: string, passwordPlain: string) {
  try {
    const admin = await prisma.admin.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    })

    if (!admin) {
      return { success: false, error: "Token tidak valid atau sudah kedaluwarsa." }
    }

    const passwordHash = await bcrypt.hash(passwordPlain, 10)

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Reset password error:", error)
    return { success: false, error: "Gagal mereset password." }
  }
}
