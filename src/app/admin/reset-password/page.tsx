"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { resetPassword } from "@/app/actions/passwordReset"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from "lucide-react"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!token) {
    return (
      <CardContent className="py-8 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
        <p className="text-sm text-muted-foreground">
          Token reset password tidak ditemukan. Silakan minta tautan reset yang baru.
        </p>
        <Link href="/admin/forgot-password" className={buttonVariants({ variant: "outline", className: "mt-4" })}>
          Minta Tautan Reset
        </Link>
      </CardContent>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password.length < 8) {
      setError("Password harus memiliki minimal 8 karakter.")
      return
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.")
      return
    }

    setIsLoading(true)
    setError(null)
    
    const res = await resetPassword(token, password)
    if (res.success) {
      setIsSuccess(true)
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/admin/login")
      }, 3000)
    } else {
      setError(res.error || "Gagal mereset password. Token mungkin tidak valid atau sudah kedaluwarsa.")
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <CardContent className="py-8 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
        <p className="font-medium text-lg">Password Berhasil Diubah!</p>
        <p className="text-sm text-muted-foreground">
          Anda akan dialihkan ke halaman login dalam beberapa detik...
        </p>
        <Link href="/admin/login" className={buttonVariants({ variant: "outline", className: "w-full mt-4" })}>
          Login Sekarang
        </Link>
      </CardContent>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="password">Password Baru</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : "Simpan Password Baru"}
        </Button>
      </CardFooter>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Atur Password Baru</CardTitle>
          <CardDescription>
            Silakan masukkan password baru untuk akun Anda.
          </CardDescription>
        </CardHeader>
        <Suspense fallback={<CardContent className="py-8 text-center text-sm text-muted-foreground">Memuat...</CardContent>}>
          <ResetPasswordForm />
        </Suspense>
      </Card>
    </div>
  )
}
