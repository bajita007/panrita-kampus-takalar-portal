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
import { Plus, Edit, Trash2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

interface AdminGalleryProps {
  onUpdate: () => void;
}

export function AdminGallery({ onUpdate }: AdminGalleryProps) {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'Kegiatan',
    is_active: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGallery(data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast({
        title: "Error",
        description: "Gagal mengambil data galeri.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('gallery')
          .update(formData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast({
          title: "Berhasil",
          description: "Item galeri berhasil diperbarui.",
        });
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Berhasil",
          description: "Item galeri berhasil ditambahkan.",
        });
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        image_url: '',
        category: 'Kegiatan',
        is_active: true,
      });
      fetchGallery();
      onUpdate();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan item galeri.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      image_url: item.image_url,
      category: item.category,
      is_active: item.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item galeri ini?')) return;

    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Berhasil",
        description: "Item galeri berhasil dihapus.",
      });
      fetchGallery();
      onUpdate();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus item galeri.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: 'Kegiatan',
      is_active: true,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Manajemen Galeri</CardTitle>
            <CardDescription>Kelola galeri foto dan dokumentasi</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Foto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Foto Galeri' : 'Tambah Foto Galeri'}
                </DialogTitle>
                <DialogDescription>
                  {editingItem ? 'Perbarui informasi foto galeri.' : 'Tambahkan foto baru ke galeri.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Foto</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL Gambar</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="/path/to/image.jpg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kegiatan">Kegiatan</SelectItem>
                        <SelectItem value="Akademik">Akademik</SelectItem>
                        <SelectItem value="Fasilitas">Fasilitas</SelectItem>
                        <SelectItem value="Mahasiswa">Mahasiswa</SelectItem>
                        <SelectItem value="Event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Aktif</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {editingItem ? 'Perbarui' : 'Tambah'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <div className="flex items-center space-x-1">
                    <span className={`inline-block text-xs px-2 py-1 rounded ${
                      item.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}