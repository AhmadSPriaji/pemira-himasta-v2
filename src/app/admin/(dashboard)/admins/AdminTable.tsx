"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { inviteAdmin, deleteAdmin } from "@/app/actions/adminManagement"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, UserPlus } from "lucide-react"
import { toast } from "sonner"

type Admin = {
  id: string
  email: string
  createdAt: Date
  status: string
}

export function AdminTable({ initialAdmins }: { initialAdmins: Admin[] }) {
  const router = useRouter()
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [emailToInvite, setEmailToInvite] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const res = await inviteAdmin(emailToInvite)
    
    if (res.success) {
      toast.success("Undangan berhasil dikirim", {
        description: `Tautan pendaftaran telah dikirim ke ${emailToInvite}`
      })
      setIsInviteOpen(false)
      setEmailToInvite("")
      // Refresh the page data
      router.refresh()
    } else {
      toast.error("Gagal mengundang admin", {
        description: res.error
      })
    }
    
    setIsLoading(false)
  }

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus admin ${email}?`)) {
      return
    }

    const res = await deleteAdmin(id)
    if (res.success) {
      toast.success("Admin berhasil dihapus")
      setAdmins(admins.filter(a => a.id !== id))
      router.refresh()
    } else {
      toast.error("Gagal menghapus admin", {
        description: res.error
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Daftar Admin</h2>
        
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger
            render={
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Undang Admin
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Undang Admin Baru</DialogTitle>
              <DialogDescription>
                Masukkan alamat email. Kami akan mengirimkan tautan bagi mereka untuk mengatur password.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvite}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="col-span-3"
                    value={emailToInvite}
                    onChange={(e) => setEmailToInvite(e.target.value)}
                    placeholder="admin@example.com"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Mengirim..." : "Kirim Undangan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Terdaftar Pada</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  Tidak ada data admin.
                </TableCell>
              </TableRow>
            ) : (
              admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.email}</TableCell>
                  <TableCell>
                    {admin.status === "Active" ? (
                      <Badge variant="default" className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20">
                        Aktif
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 border-yellow-500/20">
                        Menunggu Undangan
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(admin.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(admin.id, admin.email)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Hapus</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
