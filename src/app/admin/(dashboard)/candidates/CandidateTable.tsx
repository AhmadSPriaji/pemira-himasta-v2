"use client"

import { useState } from "react"
import { addCandidate, updateCandidate, deleteCandidate } from "@/app/actions/candidateAdmin"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Loader2 } from "lucide-react"

type Innovation = { name: string; explanation: string[] }

type Candidate = {
  id: string
  candidateNumber: number
  name: string
  photoUrl: string | null
  cvUrl: string | null
  grandDesignUrl: string | null
  vision: string
  missions: string[]
  innovations: Innovation[]
}

export function CandidateTable({ candidates }: { candidates: Candidate[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [currentId, setCurrentId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    candidateNumber: 1,
    name: "",
    photoUrl: "",
    cvUrl: "",
    grandDesignUrl: "",
    vision: "",
    missions: [] as string[],
    innovations: [] as Innovation[]
  })

  const handleOpenNew = () => {
    setIsEdit(false)
    setFormData({
      candidateNumber: candidates.length + 1,
      name: "",
      photoUrl: "",
      cvUrl: "",
      grandDesignUrl: "",
      vision: "",
      missions: [""],
      innovations: []
    })
    setIsOpen(true)
  }

  const handleOpenEdit = (c: Candidate) => {
    setIsEdit(true)
    setCurrentId(c.id)
    setFormData({
      candidateNumber: c.candidateNumber,
      name: c.name,
      photoUrl: c.photoUrl || "",
      cvUrl: c.cvUrl || "",
      grandDesignUrl: c.grandDesignUrl || "",
      vision: c.vision,
      missions: c.missions,
      innovations: c.innovations,
    })
    setIsOpen(true)
  }

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setDeleteTarget(id)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setIsLoading(true)
    try {
      await deleteCandidate(deleteTarget)
    } finally {
      setIsLoading(false)
      setDeleteTarget(null)
    }
  }

  const handleSave = async () => {
    const payload = {
      ...formData,
      missions: formData.missions.filter(m => m.trim() !== ""),
      innovations: formData.innovations.filter(i => i.name.trim() !== "")
    }

    setIsLoading(true)
    try {
      if (isEdit) {
        await updateCandidate(currentId, payload)
      } else {
        await addCandidate(payload)
      }
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleOpenNew}>Tambah Kandidat</Button>

      <Table className="bg-card rounded-md shadow-sm border">
        <TableHeader>
          <TableRow>
            <TableHead>No. Urut</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Visi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.candidateNumber}</TableCell>
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell className="max-w-[200px] truncate">{c.vision}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleOpenEdit(c)} disabled={isLoading}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(c.id)} disabled={isLoading}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {candidates.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">Belum ada kandidat.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Kandidat" : "Tambah Kandidat"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nomor Urut</Label>
                <Input type="number" value={formData.candidateNumber} onChange={e => setFormData({ ...formData, candidateNumber: parseInt(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Foto URL</Label>
              <Input value={formData.photoUrl} onChange={e => setFormData({ ...formData, photoUrl: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CV URL (Opsional)</Label>
                <Input value={formData.cvUrl} onChange={e => setFormData({ ...formData, cvUrl: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Grand Design URL (Opsional)</Label>
                <Input value={formData.grandDesignUrl} onChange={e => setFormData({ ...formData, grandDesignUrl: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Visi</Label>
              <textarea 
                className="w-full flex min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                value={formData.vision} 
                onChange={e => setFormData({ ...formData, vision: e.target.value })} 
              />
            </div>

            <div className="space-y-2">
              <Label>Misi</Label>
              {formData.missions.map((mission, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input value={mission} onChange={e => {
                    const newMissions = [...formData.missions]
                    newMissions[idx] = e.target.value
                    setFormData({ ...formData, missions: newMissions })
                  }} />
                  <Button variant="outline" onClick={() => {
                    const newMissions = formData.missions.filter((_, i) => i !== idx)
                    setFormData({ ...formData, missions: newMissions })
                  }}>X</Button>
                </div>
              ))}
              <Button variant="secondary" size="sm" onClick={() => setFormData({ ...formData, missions: [...formData.missions, ""] })}>Tambah Misi</Button>
            </div>

            <div className="space-y-2 border p-4 rounded-md">
              <Label>Inovasi</Label>
              {formData.innovations.map((inov, idx) => (
                <div key={idx} className="space-y-2 mb-4 border-b pb-4">
                  <Input placeholder="Nama Inovasi" value={inov.name} onChange={e => {
                    const newInov = [...formData.innovations]
                    newInov[idx].name = e.target.value
                    setFormData({ ...formData, innovations: newInov })
                  }} />
                  <div className="space-y-1">
                    <Label className="text-xs">Penjelasan (Poin-poin)</Label>
                    {inov.explanation.map((expl, eIdx) => (
                       <Input key={eIdx} className="mb-1" value={expl} onChange={e => {
                         const newInov = [...formData.innovations]
                         newInov[idx].explanation[eIdx] = e.target.value
                         setFormData({ ...formData, innovations: newInov })
                       }} />
                    ))}
                    <Button variant="secondary" size="sm" onClick={() => {
                      const newInov = [...formData.innovations]
                      newInov[idx].explanation.push("")
                      setFormData({ ...formData, innovations: newInov })
                    }}>+ Penjelasan</Button>
                  </div>
                </div>
              ))}
              <Button variant="secondary" size="sm" onClick={() => setFormData({ ...formData, innovations: [...formData.innovations, { name: "", explanation: [""] }] })}>Tambah Inovasi</Button>
            </div>

          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>Batal</Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus kandidat ini? Tindakan ini tidak bisa dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={isLoading}>Batal</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
