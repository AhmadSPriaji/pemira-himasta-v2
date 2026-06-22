import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/AppSidebar"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("admin_session")?.value
  const currentAdmin = sessionId
    ? await prisma.admin.findUnique({
        where: { id: sessionId },
        select: { email: true }
      })
    : null

  return (
    <SidebarProvider>
      <AppSidebar currentAdminEmail={currentAdmin?.email} />
      <main className="w-full h-screen overflow-y-auto bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6 dark:bg-zinc-900">
          <SidebarTrigger />
          <h1 className="font-semibold text-lg">Pemira Admin</h1>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
