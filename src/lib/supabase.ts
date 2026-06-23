import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Server-side Supabase client with service role key (full access)
export const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey && supabaseServiceRoleKey !== "your-service-role-key-here"
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null as any

export const CANDIDATE_PHOTOS_BUCKET = "candidate-photos"

export function getPublicUrl(filePath: string): string {
  if (!supabaseAdmin) return ""
  const { data } = supabaseAdmin.storage
    .from(CANDIDATE_PHOTOS_BUCKET)
    .getPublicUrl(filePath)
  return data?.publicUrl || ""
}

/**
 * Extract the storage file path from a full public URL.
 * E.g., "https://xxx.supabase.co/storage/v1/object/public/candidate-photos/photo-123.jpg"
 * → "photo-123.jpg"
 */
export function extractStoragePath(publicUrl: string): string | null {
  const marker = `/storage/v1/object/public/${CANDIDATE_PHOTOS_BUCKET}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return null
  return publicUrl.slice(idx + marker.length)
}
