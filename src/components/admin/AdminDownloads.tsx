import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Download, FileText } from 'lucide-react';

interface AdminDownloadsProps {
  onUpdate?: () => void;
}

export const AdminDownloads = ({ onUpdate }: AdminDownloadsProps) => {
  const { toast } = useToast();
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDownload, setEditingDownload] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_url: '',
    category: 'Umum',
    file_type: 'PDF',
    file_size: '',
  });

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const { data, error } = await supabase
        .from('downloads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDownloads(data || []);
    } catch (error) {
      console.error('Error fetching downloads:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data unduhan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.file_url) {
      toast({
        title: "Error",
        description: "Judul dan URL file wajib diisi",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingDownload) {
        const { error } = await supabase
          .from('downloads')
          .update(formData)
          .eq('id', editingDownload.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "File unduhan berhasil diperbarui",
        });
      } else {
        const { error } = await supabase
          .from('downloads')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "File unduhan berhasil ditambahkan",
        });
      }

      setFormData({
        title: '',
        description: '',
        file_url: '',
        category: 'Umum',
        file_type: 'PDF',
        file_size: '',
      });
      setEditingDownload(null);
      onUpdate?.();
      await fetchDownloads();
    } catch (error) {
      console.error('Error saving download:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan file unduhan",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (download: any) => {
    setEditingDownload(download);
    setFormData({
      title: download.title,
      description: download.description || '',
      file_url: download.file_url,
      category: download.category,
      file_type: download.file_type || 'PDF',
      file_size: download.file_size || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus file ini?')) return;

    try {
      const { error } = await supabase
        .from('downloads')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "File unduhan berhasil dihapus",
      });

      onUpdate?.();
      await fetchDownloads();
    } catch (error) {
      console.error('Error deleting download:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus file unduhan",
        variant: "destructive",
      });
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('downloads')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: `Status file ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}`,
      });

      await fetchDownloads();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Gagal mengubah status file",
        variant: "destructive",
      });
    }
  };

  const categories = ['Umum', 'Admisi', 'Akademik', 'Kemahasiswaan', 'Keuangan', 'Penelitian'];
  const fileTypes = ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'ZIP', 'RAR'];

  if (loading) {
    return <div className="flex justify-center p-8">Memuat data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Kelola Unduhan</h2>
          <p className="text-gray-600">Tambah dan kelola file yang dapat diunduh</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingDownload(null);
              setFormData({
                title: '',
                description: '',
                file_url: '',
                category: 'Umum',
                file_type: 'PDF',
                file_size: '',
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah File
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingDownload ? 'Edit File' : 'Tambah File Baru'}</DialogTitle>
              <DialogDescription>
                {editingDownload ? 'Perbarui informasi file' : 'Tambahkan file baru untuk diunduh'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul File *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Contoh: Panduan Pendaftaran 2024"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Deskripsi singkat tentang file"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="file_url">URL File *</Label>
                <Input
                  id="file_url"
                  value={formData.file_url}
                  onChange={(e) => setFormData({...formData, file_url: e.target.value})}
                  placeholder="https://example.com/file.pdf"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="file_type">Tipe File</Label>
                  <Select value={formData.file_type} onValueChange={(value) => setFormData({...formData, file_type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fileTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="file_size">Ukuran File</Label>
                <Input
                  id="file_size"
                  value={formData.file_size}
                  onChange={(e) => setFormData({...formData, file_size: e.target.value})}
                  placeholder="Contoh: 2.5 MB"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingDownload ? 'Perbarui' : 'Tambah'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Daftar File Unduhan
          </CardTitle>
        </CardHeader>
        <CardContent>
          {downloads.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada file unduhan. Tambahkan file pertama Anda.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Download</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {downloads.map((download) => (
                  <TableRow key={download.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{download.title}</div>
                        {download.description && (
                          <div className="text-sm text-gray-500">{download.description}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{download.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{download.file_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(download.id, download.is_active)}
                      >
                        {download.is_active ? 'Aktif' : 'Nonaktif'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {download.download_count || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(download)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(download.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};