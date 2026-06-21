"use client"

import { useState } from "react"
import Link from "next/link"
import { forgotPassword } from "@/app/actions/passwordReset"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const res = await forgotPassword(email)
    if (res.success) {
      setIsSuccess(true)
    } else {
      setError(res.error || "Gagal mengirim email reset password.")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Lupa Password</CardTitle>
          <CardDescription>
            Masukkan email Anda untuk menerima tautan reset password.
          </CardDescription>
        </CardHeader>
        {!isSuccess ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Mengirim..." : "Kirim Tautan Reset"}
              </Button>
              <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-foreground">
                Kembali ke Login
              </Link>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4 py-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Jika email <strong>{email}</strong> terdaftar, Anda akan menerima email berisi instruksi untuk mereset password Anda.
                </p>
                <p className="text-xs text-muted-foreground">
                  Silakan periksa folder Spam jika email tidak ditemukan di Kotak Masuk.
                </p>
              </div>
            </div>
            <Link href="/admin/login" className={buttonVariants({ variant: "outline", className: "w-full mt-4" })}>
              Kembali ke Login
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
