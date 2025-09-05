import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AdminPrograms } from '@/components/admin/AdminPrograms';
import { AdminNews } from '@/components/admin/AdminNews';
import { AdminGallery } from '@/components/admin/AdminGallery';
import { AdminAnnouncements } from '@/components/admin/AdminAnnouncements';
import { AdminUsers } from '@/components/admin/AdminUsers';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { AdminDownloads } from '@/components/admin/AdminDownloads';
import { AdminCalendar } from '@/components/admin/AdminCalendar';
import { AdminLecturers } from '@/components/admin/AdminLecturers';
import { AdminOrganisasi } from '@/components/admin/AdminOrganisasi';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Users, BookOpen, Image, Bell, Newspaper, Download, Calendar, Menu } from 'lucide-react';
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    programs: 0,
    news: 0,
    gallery: 0,
    announcements: 0,
    users: 0,
    downloads: 0,
    calendar: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!isAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki akses admin.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    fetchStats();
  }, [user, isAdmin, navigate, toast]);

  const fetchStats = async () => {
    try {
      const [programsRes, newsRes, galleryRes, announcementsRes, usersRes, downloadsRes, calendarRes] = await Promise.all([
        supabase.from('programs').select('id', { count: 'exact' }),
        supabase.from('news').select('id', { count: 'exact' }),
        supabase.from('gallery').select('id', { count: 'exact' }),
        supabase.from('announcements').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('downloads').select('id', { count: 'exact' }),
        supabase.from('academic_calendar').select('id', { count: 'exact' }),
      ]);

      setStats({
        programs: programsRes.count || 0,
        news: newsRes.count || 0,
        gallery: galleryRes.count || 0,
        announcements: announcementsRes.count || 0,
        users: usersRes.count || 0,
        downloads: downloadsRes.count || 0,
        calendar: calendarRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "programs":
        return <AdminPrograms onUpdate={fetchStats} />;
      case "lecturers":
        return <AdminLecturers onUpdate={fetchStats} />;
      case "organization":
        return <AdminOrganisasi onUpdate={fetchStats} />;
      case "news":
        return <AdminNews onUpdate={fetchStats} />;
      case "gallery":
        return <AdminGallery onUpdate={fetchStats} />;
      case "announcements":
        return <AdminAnnouncements onUpdate={fetchStats} />;
      case "users":
        return <AdminUsers onUpdate={fetchStats} />;
      case "downloads":
        return <AdminDownloads onUpdate={fetchStats} />;
      case "calendar":
        return <AdminCalendar onUpdate={fetchStats} />;
      case "settings":
        return <AdminSettings onUpdate={fetchStats} />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Program Studi</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.programs}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Berita</CardTitle>
                <Newspaper className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.news}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Galeri</CardTitle>
                <Image className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.gallery}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pengumuman</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.announcements}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pengguna</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.users}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unduhan</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.downloads}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kalender</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.calendar}</div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sticky Header */}
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
              <SidebarTrigger className="-ml-1" />
              <div className="flex-1">
                 <h1 className="text-lg font-semibold">
                  {activeTab === "overview" ? "Dashboard Overview" : 
                   activeTab === "programs" ? "Program Studi" :
                   activeTab === "lecturers" ? "Profil Dosen" :
                   activeTab === "organization" ? "Struktur Organisasi" :
                   activeTab === "news" ? "Berita" :
                   activeTab === "gallery" ? "Galeri" :
                   activeTab === "announcements" ? "Pengumuman" :
                   activeTab === "users" ? "Pengguna" :
                   activeTab === "downloads" ? "Unduhan" :
                   activeTab === "calendar" ? "Kalender" :
                   activeTab === "settings" ? "Pengaturan" : "Dashboard"}
                </h1>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;