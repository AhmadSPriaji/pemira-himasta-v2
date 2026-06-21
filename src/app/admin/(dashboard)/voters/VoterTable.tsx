"use client"

import { useState } from "react"
import { addVoter, deleteVoter, resetVoterStatus, importVotersCsv, toggleVoterStatus, toggleVotersByGeneration } from "@/app/actions/voterAdmin"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, RotateCcw, Upload, Power } from "lucide-react"

type Student = {
  id: string
  nim: string
  password: string
  generation: string
  isActive: boolean
  isVoted: boolean
  votedAt: Date | null
}

export function VoterTable({ voters }: { voters: Student[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCsvOpen, setIsCsvOpen] = useState(false)
  const [isBulkToggleOpen, setIsBulkToggleOpen] = useState(false)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    nim: "",
    generation: "2023",
  })

  const [bulkToggleData, setBulkToggleData] = useState({
    generation: "2023",
    action: "activate"
  })

  const handleAdd = async () => {
    if (!formData.nim) return
    await addVoter(formData)
    setIsOpen(false)
    setFormData({ nim: "", generation: "2023" })
  }

  const handleDelete = async (id: string) => {
    if (confirm("Hapus pemilih ini?")) {
      await deleteVoter(id)
    }
  }

  const handleReset = async (id: string) => {
    if (confirm("Reset status voting pemilih ini? Ini akan menghapus suaranya.")) {
      await resetVoterStatus(id)
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    if (confirm(`Pilih OK untuk ${currentStatus ? 'menonaktifkan' : 'mengaktifkan'} pemilih ini.`)) {
      await toggleVoterStatus(id, !currentStatus)
    }
  }

  const handleBulkToggle = async () => {
    const isActive = bulkToggleData.action === "activate"
    if (confirm(`Yakin ingin ${isActive ? 'mengaktifkan' : 'menonaktifkan'} semua pemilih angkatan ${bulkToggleData.generation}?`)) {
      const result = await toggleVotersByGeneration(bulkToggleData.generation, isActive)
      if (result && "success" in result && result.success) {
        alert(`Berhasil mengubah status ${result.count} pemilih.`)
        setIsBulkToggleOpen(false)
      } else {
        alert(result?.error || "Terjadi kesalahan")
      }
    }
  }

  const handleImportCsv = async () => {
    if (!csvFile) return
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = e.target?.result as string
      // Basic CSV parser (NIM, Generation)
      const rows = text.split("\n").filter(row => row.trim() !== "")
      const parsed = rows.map(row => {
        const [nim, generation] = row.split(",").map(s => s.trim())
        return { nim, generation: generation || "Unknown" }
      })

      // Remove header if it exists
      if (parsed[0].nim.toLowerCase() === "nim") {
        parsed.shift()
      }

      await importVotersCsv(parsed)
      setIsCsvOpen(false)
      setCsvFile(null)
      alert(`Berhasil mengimport ${parsed.length} data.`)
    }
    reader.readAsText(csvFile)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button onClick={() => setIsOpen(true)}>Tambah Pemilih</Button>
        <Button variant="secondary" onClick={() => setIsCsvOpen(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Import CSV
        </Button>
        <Button variant="outline" onClick={() => setIsBulkToggleOpen(true)}>
          <Power className="w-4 h-4 mr-2" />
          Aktifkan/Nonaktifkan Angkatan
        </Button>
      </div>

      <Table className="bg-card rounded-md shadow-sm border">
        <TableHeader>
          <TableRow>
            <TableHead>NIM</TableHead>
            <TableHead>Angkatan</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Status Aktif</TableHead>
            <TableHead>Status Vote</TableHead>
            <TableHead>Waktu Vote</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {voters.map((v) => (
            <TableRow key={v.id}>
              <TableCell className="font-medium">{v.nim}</TableCell>
              <TableCell>{v.generation}</TableCell>
              <TableCell className="font-mono">{v.password}</TableCell>
              <TableCell>
                {v.isActive ? (
                  <span className="text-green-600 font-semibold">Aktif</span>
                ) : (
                  <span className="text-red-500 font-semibold">Nonaktif</span>
                )}
              </TableCell>
              <TableCell>
                {v.isVoted ? (
                  <span className="text-green-600 font-semibold">Sudah</span>
                ) : (
                  <span className="text-muted-foreground">Belum</span>
                )}
              </TableCell>
              <TableCell>
                {v.votedAt ? v.votedAt.toLocaleString() : "-"}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant={v.isActive ? "secondary" : "default"} size="sm" onClick={() => handleToggleActive(v.id, v.isActive)}>
                    {v.isActive ? "Nonaktifkan" : "Aktifkan"}
                  </Button>
                  <Button variant="outline" size="icon" title="Reset Vote" onClick={() => handleReset(v.id)}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(v.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {voters.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">Belum ada data pemilih.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Add Single Voter Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Pemilih</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>NIM</Label>
              <Input value={formData.nim} onChange={e => setFormData({ ...formData, nim: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Angkatan</Label>
              <Input value={formData.generation} onChange={e => setFormData({ ...formData, generation: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
            <Button onClick={handleAdd}>Simpan</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import CSV Modal */}
      <Dialog open={isCsvOpen} onOpenChange={setIsCsvOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Data Pemilih (CSV)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Format CSV: <code>nim,angkatan</code> (tanpa header atau dengan header NIM,Angkatan).
              Password akan di-generate secara otomatis untuk tiap baris.
            </p>
            <div className="space-y-2">
              <Label>Pilih File CSV</Label>
              <Input type="file" accept=".csv" onChange={e => setCsvFile(e.target.files?.[0] || null)} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCsvOpen(false)}>Batal</Button>
            <Button onClick={handleImportCsv} disabled={!csvFile}>Import</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Toggle Modal */}
      <Dialog open={isBulkToggleOpen} onOpenChange={setIsBulkToggleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aktifkan / Nonaktifkan Angkatan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Angkatan (Generation)</Label>
              <Input value={bulkToggleData.generation} onChange={e => setBulkToggleData({ ...bulkToggleData, generation: e.target.value })} placeholder="Cth: 2023" />
            </div>
            <div className="space-y-2">
              <Label>Aksi</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={bulkToggleData.action} 
                onChange={e => setBulkToggleData({ ...bulkToggleData, action: e.target.value })}
              >
                <option value="activate">Aktifkan Semua</option>
                <option value="deactivate">Nonaktifkan Semua</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsBulkToggleOpen(false)}>Batal</Button>
            <Button onClick={handleBulkToggle}>Terapkan</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
