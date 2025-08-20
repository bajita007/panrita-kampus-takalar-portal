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

interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  category: string;
  is_published: boolean;
  created_at: string;
}

interface AdminNewsProps {
  onUpdate: () => void;
}

export function AdminNews({ onUpdate }: AdminNewsProps) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    category: 'Akademik',
    is_published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error",
        description: "Gagal mengambil data berita.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingNews) {
        const { error } = await supabase
          .from('news')
          .update(formData)
          .eq('id', editingNews.id);

        if (error) throw error;
        toast({
          title: "Berhasil",
          description: "Berita berhasil diperbarui.",
        });
      } else {
        const { error } = await supabase
          .from('news')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Berhasil",
          description: "Berita berhasil ditambahkan.",
        });
      }

      setIsDialogOpen(false);
      setEditingNews(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        image_url: '',
        category: 'Akademik',
        is_published: true,
      });
      fetchNews();
      onUpdate();
    } catch (error) {
      console.error('Error saving news:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan berita.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt || '',
      image_url: newsItem.image_url || '',
      category: newsItem.category,
      is_published: newsItem.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Berhasil",
        description: "Berita berhasil dihapus.",
      });
      fetchNews();
      onUpdate();
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus berita.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      image_url: '',
      category: 'Akademik',
      is_published: true,
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
            <CardTitle>Manajemen Berita</CardTitle>
            <CardDescription>Kelola berita dan artikel</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Berita
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingNews ? 'Edit Berita' : 'Tambah Berita'}
                </DialogTitle>
                <DialogDescription>
                  {editingNews ? 'Perbarui informasi berita.' : 'Tambahkan berita baru.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Berita</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Ringkasan</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={2}
                      placeholder="Ringkasan singkat berita..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Isi Berita</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
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
                          <SelectItem value="Akademik">Akademik</SelectItem>
                          <SelectItem value="Penerimaan">Penerimaan</SelectItem>
                          <SelectItem value="Prestasi">Prestasi</SelectItem>
                          <SelectItem value="Kegiatan">Kegiatan</SelectItem>
                          <SelectItem value="Umum">Umum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image_url">URL Gambar</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="/path/to/image.jpg"
                      />
                    </div>
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
                    {editingNews ? 'Perbarui' : 'Tambah'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((newsItem) => (
            <div key={newsItem.id} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{newsItem.title}</h3>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`inline-block text-xs px-2 py-1 rounded ${
                      newsItem.is_published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {newsItem.is_published ? 'Published' : 'Draft'}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {newsItem.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{newsItem.excerpt}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(newsItem.created_at).toLocaleDateString('id-ID')}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(newsItem)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(newsItem.id)}>
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