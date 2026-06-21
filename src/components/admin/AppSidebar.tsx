import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Home, Users, Settings, UserCheck, LayoutDashboard, Shield, BarChart, LogOut } from "lucide-react"
import { logoutAdmin } from "@/app/actions/adminAuth"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Landing Info",
    url: "/admin/landing",
    icon: Home,
  },
  {
    title: "Kandidat",
    url: "/admin/candidates",
    icon: Users,
  },
  {
    title: "Voters",
    url: "/admin/voters",
    icon: UserCheck,
  },
  {
    title: "Hasil Voting",
    url: "/admin/results",
    icon: BarChart,
  },
  {
    title: "Manajemen Admin",
    url: "/admin/admins",
    icon: Shield,
  },
  {
    title: "Pengaturan Akun",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={logoutAdmin}>
              <SidebarMenuButton type="submit" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">
                <LogOut />
                <span>Keluar</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
