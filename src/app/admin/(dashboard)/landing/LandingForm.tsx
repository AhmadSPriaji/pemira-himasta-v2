"use client"

import { useState } from "react"
import { updateLandingInfo, addTimelineEvent, deleteTimelineEvent } from "@/app/actions/landingAdmin"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"

type LandingInfo = {
  title: string
  year: string
  about: string
  address: string
  instagramUrl: string
}

type TimelineEvent = {
  id: string
  eventName: string
  displayDate: string
  isVotingEvent: boolean
}

export function LandingForm({ initialInfo, timeline }: { initialInfo: LandingInfo | null, timeline: TimelineEvent[] }) {
  const [info, setInfo] = useState<LandingInfo>({
    title: initialInfo?.title || "Pemilihan Raya",
    year: initialInfo?.year || "2024",
    about: initialInfo?.about || "",
    address: initialInfo?.address || "",
    instagramUrl: initialInfo?.instagramUrl || "https://instagram.com/himastaugm",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null)

  // Timeline State
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    displayDate: "",
    isVotingEvent: false,
  })

  const handleSaveInfo = async () => {
    setIsSaving(true)
    const result = await updateLandingInfo(info)
    setIsSaving(false)
    if (result && !result.success) {
      toast.error(result.error || "Gagal menyimpan info")
    } else {
      toast.success("Berhasil menyimpan info.")
    }
  }

  const handleAddEvent = async () => {
    if (!newEvent.eventName || !newEvent.displayDate) {
      toast.error("Lengkapi semua form timeline.")
      return
    }
    const result = await addTimelineEvent({
      eventName: newEvent.eventName,
      displayDate: newEvent.displayDate,
      isVotingEvent: newEvent.isVotingEvent
    })
    
    if (result && !result.success) {
      toast.error(result.error || "Gagal menambahkan timeline")
      return
    }
    
    toast.success("Timeline event berhasil ditambahkan")
    setNewEvent({ eventName: "", displayDate: "", isVotingEvent: false })
  }

  const handleDeleteEventClick = (id: string) => {
    setDeleteEventId(id)
  }

  const confirmDeleteEvent = async () => {
    if (!deleteEventId) return
    const result = await deleteTimelineEvent(deleteEventId)
    if (result && !result.success) {
      toast.error(result.error || "Gagal menghapus event")
    } else {
      toast.success("Event berhasil dihapus")
    }
    setDeleteEventId(null)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Landing Page Info</CardTitle>
          <CardDescription>Informasi utama yang tampil pada halaman depan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={info.title} onChange={e => setInfo({ ...info, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Tahun (Year)</Label>
              <Input value={info.year} onChange={e => setInfo({ ...info, year: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>About</Label>
            <textarea 
              className="w-full flex min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              value={info.about} 
              onChange={e => setInfo({ ...info, about: e.target.value })} 
            />
          </div>
          <div className="space-y-2">
            <Label>Alamat Sekretariat</Label>
            <Input value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Instagram URL</Label>
            <Input value={info.instagramUrl} onChange={e => setInfo({ ...info, instagramUrl: e.target.value })} />
          </div>
          <Button onClick={handleSaveInfo} disabled={isSaving}>
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline Event</CardTitle>
          <CardDescription>Atur jadwal kegiatan yang muncul di halaman depan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Acara</TableHead>
                <TableHead>Display Tgl</TableHead>
                <TableHead>Voting Event?</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeline.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.eventName}</TableCell>
                  <TableCell>{event.displayDate}</TableCell>
                  <TableCell>{event.isVotingEvent ? "Ya" : "Tidak"}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteEventClick(event.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex gap-2 items-end pt-4">
            <div className="space-y-2 flex-1">
              <Label>Nama Acara</Label>
              <Input value={newEvent.eventName} onChange={e => setNewEvent({ ...newEvent, eventName: e.target.value })} placeholder="Cth: Kampanye" />
            </div>
            <div className="space-y-2 flex-1">
              <Label>Display Tgl</Label>
              <Input value={newEvent.displayDate} onChange={e => setNewEvent({ ...newEvent, displayDate: e.target.value })} placeholder="Cth: 10 - 13 Nov" />
            </div>
            <div className="space-y-2 flex flex-col justify-center">
              <Label className="mb-2">Voting Event?</Label>
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-yellow-500"
                checked={newEvent.isVotingEvent} 
                onChange={e => setNewEvent({ ...newEvent, isVotingEvent: e.target.checked })} 
              />
            </div>
            <Button onClick={handleAddEvent}>Tambah</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!deleteEventId} onOpenChange={(open) => !open && setDeleteEventId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus Event</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus event ini? Tindakan ini tidak bisa dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteEventId(null)}>Batal</Button>
            <Button variant="destructive" onClick={confirmDeleteEvent}>Ya, Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
