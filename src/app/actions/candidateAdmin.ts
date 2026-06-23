"use server"

import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { supabaseAdmin, CANDIDATE_PHOTOS_BUCKET, getPublicUrl, extractStoragePath } from "@/lib/supabase"

async function getAdminSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("admin_session")?.value
  if (!sessionId) return null

  const admin = await prisma.admin.findUnique({
    where: { id: sessionId },
  })
  
  return admin
}

/**
 * Upload a candidate photo to Supabase Storage.
 * Returns the public URL of the uploaded file.
 */
export async function uploadCandidatePhoto(formData: FormData) {
  try {
    const admin = await getAdminSession()
    if (!admin) return { success: false as const, error: "Unauthorized: Silakan login terlebih dahulu." }

    if (!supabaseAdmin) {
      return {
        success: false as const,
        error: "Supabase client belum terkonfigurasi. Pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di file .env sudah diisi dengan benar dan Server sudah di-restart."
      }
    }

    const file = formData.get("file") as File | null
    if (!file) return { success: false as const, error: "File tidak ditemukan." }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return { success: false as const, error: "Format file tidak didukung. Gunakan JPG, PNG, atau WebP." }
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return { success: false as const, error: "Ukuran file terlalu besar. Maksimal 5MB." }
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg"
    const fileName = `candidate-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    // Convert File to ArrayBuffer then to Buffer for upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error } = await supabaseAdmin.storage
      .from(CANDIDATE_PHOTOS_BUCKET)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("Supabase upload error details:", error)
      let customError = error.message
      if (error.message.toLowerCase().includes("bucket")) {
        customError = "Bucket 'candidate-photos' tidak ditemukan. Silakan buat public bucket bernama 'candidate-photos' di Supabase Dashboard → Storage."
      } else if (error.message.toLowerCase().includes("jwt") || error.message.toLowerCase().includes("key") || error.message.toLowerCase().includes("unauthorized") || error.message.toLowerCase().includes("invalid")) {
        customError = "Kunci API (Service Role Key) Supabase tidak valid. Pastikan SUPABASE_SERVICE_ROLE_KEY di .env sudah disalin secara lengkap (dimulai dengan eyJ...)."
      }
      return { success: false as const, error: `Gagal mengupload foto ke Supabase Storage: ${customError}` }
    }

    const publicUrl = getPublicUrl(fileName)
    if (!publicUrl) {
      return { success: false as const, error: "Berhasil upload, tetapi gagal membuat URL publik untuk foto." }
    }
    return { success: true as const, url: publicUrl }
  } catch (err: any) {
    console.error("Runtime upload error:", err)
    return { 
      success: false as const, 
      error: `Terjadi kesalahan internal saat memproses upload: ${err?.message || err || "Unknown error"}. Silakan periksa log server.`
    }
  }
}

/**
 * Delete a candidate photo from Supabase Storage by its public URL.
 */
async function deletePhotoFromStorage(photoUrl: string) {
  const path = extractStoragePath(photoUrl)
  if (!path) return // Not a Supabase URL, skip

  const { error } = await supabaseAdmin.storage
    .from(CANDIDATE_PHOTOS_BUCKET)
    .remove([path])

  if (error) {
    console.error("Failed to delete photo from storage:", error)
  }
}

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
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

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
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    // If photoUrl changed, delete the old one from storage
    const existing = await prisma.candidate.findUnique({
      where: { id },
      select: { photoUrl: true },
    })

    if (existing?.photoUrl && existing.photoUrl !== data.photoUrl) {
      await deletePhotoFromStorage(existing.photoUrl)
    }

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
  const admin = await getAdminSession()
  if (!admin) return { success: false, error: "Unauthorized: Silakan login terlebih dahulu." }

  try {
    // Delete photo from storage before deleting candidate
    const candidate = await prisma.candidate.findUnique({
      where: { id },
      select: { photoUrl: true },
    })

    if (candidate?.photoUrl) {
      await deletePhotoFromStorage(candidate.photoUrl)
    }

    await prisma.candidate.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/admin/candidates")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Gagal menghapus kandidat." }
  }
}
