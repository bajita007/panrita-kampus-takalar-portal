import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Bell, AlertTriangle, Info } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: string;
  icon: string;
  is_published: boolean;
  created_at: string;
}

interface AdminAnnouncementsProps {
  onUpdate: () => void;
}

export function AdminAnnouncements({ onUpdate }: AdminAnnouncementsProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Umum',
    priority: 'Normal',
    icon: 'Bell',
    is_published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast({
        title: "Error",
        description: "Gagal mengambil data pengumuman.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAnnouncement) {
        const { error } = await supabase
          .from('announcements')
          .update(formData)
          .eq('id', editingAnnouncement.id);

        if (error) throw error;
        toast({
          title: "Berhasil",
          description: "Pengumuman berhasil diperbarui.",
        });
      } else {
        const { error } = await supabase
          .from('announcements')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Berhasil",
          description: "Pengumuman berhasil ditambahkan.",
        });
      }

      setIsDialogOpen(false);
      setEditingAnnouncement(null);
      setFormData({
        title: '',
        content: '',
        category: 'Umum',
        priority: 'Normal',
        icon: 'Bell',
        is_published: true,
      });
      fetchAnnouncements();
      onUpdate();
    } catch (error) {
      console.error('Error saving announcement:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan pengumuman.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      priority: announcement.priority,
      icon: announcement.icon,
      is_published: announcement.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) return;

    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Berhasil",
        description: "Pengumuman berhasil dihapus.",
      });
      fetchAnnouncements();
      onUpdate();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus pengumuman.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingAnnouncement(null);
    setFormData({
      title: '',
      content: '',
      category: 'Umum',
      priority: 'Normal',
      icon: 'Bell',
      is_published: true,
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Info':
        return <Info className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Tinggi':
        return 'bg-red-100 text-red-800';
      case 'Sedang':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Manajemen Pengumuman</CardTitle>
            <CardDescription>Kelola pengumuman dan pemberitahuan</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Pengumuman
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingAnnouncement ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
                </DialogTitle>
                <DialogDescription>
                  {editingAnnouncement ? 'Perbarui informasi pengumuman.' : 'Tambahkan pengumuman baru.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Pengumuman</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Isi Pengumuman</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Umum">Umum</SelectItem>
                          <SelectItem value="Akademik">Akademik</SelectItem>
                          <SelectItem value="Beasiswa">Beasiswa</SelectItem>
                          <SelectItem value="Kemahasiswaan">Kemahasiswaan</SelectItem>
                          <SelectItem value="Penerimaan">Penerimaan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Prioritas</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="Sedang">Sedang</SelectItem>
                          <SelectItem value="Tinggi">Tinggi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bell">Bell</SelectItem>
                        <SelectItem value="AlertTriangle">Alert Triangle</SelectItem>
                        <SelectItem value="Info">Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                    />
                    <Label htmlFor="is_published">Publikasikan</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {editingAnnouncement ? 'Perbarui' : 'Tambah'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex items-start space-x-3 flex-1">
                <div className="p-2 bg-blue-100 rounded-full">
                  {getIcon(announcement.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`inline-block text-xs px-2 py-1 rounded ${
                        announcement.is_published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {announcement.is_published ? 'Published' : 'Draft'}
                      </span>
                      <span className={`inline-block text-xs px-2 py-1 rounded ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {announcement.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(announcement.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(announcement)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(announcement.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}