import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { 
  BookOpen, 
  Newspaper, 
  Image, 
  Bell, 
  Users, 
  Download, 
  Calendar, 
  Settings,
  LogOut,
  LayoutDashboard
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Program Studi", url: "/admin?tab=programs", icon: BookOpen },
  { title: "Profil Dosen", url: "/admin?tab=lecturers", icon: Users },
  { title: "Berita", url: "/admin?tab=news", icon: Newspaper },
  { title: "Galeri", url: "/admin?tab=gallery", icon: Image },
  { title: "Pengumuman", url: "/admin?tab=announcements", icon: Bell },
  { title: "Pengguna", url: "/admin?tab=users", icon: Users },
  { title: "Unduhan", url: "/admin?tab=downloads", icon: Download },
  { title: "Kalender", url: "/admin?tab=calendar", icon: Calendar },
  { title: "Pengaturan", url: "/admin?tab=settings", icon: Settings },
]

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const { state } = useSidebar()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const handleTabClick = (url: string, title: string) => {
    if (url === "/admin") {
      onTabChange("overview")
    } else {
      const tab = new URL(url, window.location.origin).searchParams.get('tab')
      if (tab) {
        onTabChange(tab)
      }
    }
  }

  const getActiveClass = (url: string) => {
    if (url === "/admin" && activeTab === "overview") {
      return "bg-sidebar-accent text-sidebar-accent-foreground"
    }
    const tab = new URL(url, window.location.origin).searchParams.get('tab')
    if (tab === activeTab) {
      return "bg-sidebar-accent text-sidebar-accent-foreground"
    }
    return "hover:bg-sidebar-accent/50"
  }

  const isCollapsed = state === "collapsed"

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground text-sm font-semibold">
            ITP
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Admin Panel</span>
              <span className="text-xs text-muted-foreground">Institut Teknologi Pertanian</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleTabClick(item.url, item.title)}
                    className={getActiveClass(item.url)}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}