import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AdminPrograms } from '@/components/admin/AdminPrograms';
import { AdminNews } from '@/components/admin/AdminNews';
import { AdminGallery } from '@/components/admin/AdminGallery';
import { AdminAnnouncements } from '@/components/admin/AdminAnnouncements';
import { AdminUsers } from '@/components/admin/AdminUsers';
import { Users, BookOpen, Image, Bell, Newspaper, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    programs: 0,
    news: 0,
    gallery: 0,
    announcements: 0,
    users: 0,
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
      const [programsRes, newsRes, galleryRes, announcementsRes, usersRes] = await Promise.all([
        supabase.from('programs').select('id', { count: 'exact' }),
        supabase.from('news').select('id', { count: 'exact' }),
        supabase.from('gallery').select('id', { count: 'exact' }),
        supabase.from('announcements').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
      ]);

      setStats({
        programs: programsRes.count || 0,
        news: newsRes.count || 0,
        gallery: galleryRes.count || 0,
        announcements: announcementsRes.count || 0,
        users: usersRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Institut Teknologi Pertanian</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="programs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="programs">Program Studi</TabsTrigger>
            <TabsTrigger value="news">Berita</TabsTrigger>
            <TabsTrigger value="gallery">Galeri</TabsTrigger>
            <TabsTrigger value="announcements">Pengumuman</TabsTrigger>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
          </TabsList>
          
          <TabsContent value="programs">
            <AdminPrograms onUpdate={fetchStats} />
          </TabsContent>
          
          <TabsContent value="news">
            <AdminNews onUpdate={fetchStats} />
          </TabsContent>
          
          <TabsContent value="gallery">
            <AdminGallery onUpdate={fetchStats} />
          </TabsContent>
          
          <TabsContent value="announcements">
            <AdminAnnouncements onUpdate={fetchStats} />
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUsers onUpdate={fetchStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;