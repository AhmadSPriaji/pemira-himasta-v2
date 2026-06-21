import { getAdmins } from "@/app/actions/adminManagement"
import { AdminTable } from "./AdminTable"

export const dynamic = 'force-dynamic'

export default async function AdminsAdminPage() {
  const adminsRes = await getAdmins()
  
  const admins = adminsRes.success && adminsRes.data ? adminsRes.data : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Admin</h1>
        <p className="text-muted-foreground">
          Kelola akun administrator untuk sistem Pemira Himasta.
        </p>
      </div>

      <AdminTable initialAdmins={admins} />
    </div>
  )
}
