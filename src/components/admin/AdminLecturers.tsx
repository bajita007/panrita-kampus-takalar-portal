import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Users } from 'lucide-react';

interface Lecturer {
  id: string;
  name: string;
  field: string;
  education: string;
  experience?: string;
  email?: string;
  phone?: string;
  image_url?: string;
  is_active: boolean;
}

interface AdminLecturersProps {
  onUpdate?: () => void;
}

export const AdminLecturers = ({ onUpdate }: AdminLecturersProps) => {
  const { toast } = useToast();
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLecturer, setEditingLecturer] = useState<Lecturer | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    education: '',
    experience: '',
    email: '',
    phone: '',
    image_url: '',
    is_active: true,
  });

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const { data, error } = await supabase
        .from('lecturers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLecturers(data || []);
    } catch (error) {
      console.error('Error fetching lecturers:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data dosen",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingLecturer) {
        const { error } = await supabase
          .from('lecturers')
          .update(formData)
          .eq('id', editingLecturer.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Data dosen berhasil diperbarui",
        });
      } else {
        const { error } = await supabase
          .from('lecturers')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Dosen berhasil ditambahkan",
        });
      }

      setDialogOpen(false);
      setEditingLecturer(null);
      resetForm();
      fetchLecturers();
      onUpdate?.();
    } catch (error) {
      console.error('Error saving lecturer:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan data dosen",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (lecturer: Lecturer) => {
    setEditingLecturer(lecturer);
    setFormData({
      name: lecturer.name,
      field: lecturer.field,
      education: lecturer.education,
      experience: lecturer.experience || '',
      email: lecturer.email || '',
      phone: lecturer.phone || '',
      image_url: lecturer.image_url || '',
      is_active: lecturer.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus dosen ini?')) return;

    try {
      const { error } = await supabase
        .from('lecturers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Dosen berhasil dihapus",
      });

      fetchLecturers();
      onUpdate?.();
    } catch (error) {
      console.error('Error deleting lecturer:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus dosen",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      field: '',
      education: '',
      experience: '',
      email: '',
      phone: '',
      image_url: '',
      is_active: true,
    });
  };

  const handleAddNew = () => {
    setEditingLecturer(null);
    resetForm();
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Memuat data dosen...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manajemen Dosen</h2>
          <p className="text-muted-foreground">Kelola profil dosen institut</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Dosen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingLecturer ? 'Edit Dosen' : 'Tambah Dosen Baru'}
              </DialogTitle>
              <DialogDescription>
                Isi informasi lengkap tentang dosen
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="field">Bidang Keahlian *</Label>
                  <Input
                    id="field"
                    value={formData.field}
                    onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="education">Pendidikan *</Label>
                <Input
                  id="education"
                  value={formData.education}
                  onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  placeholder="contoh: S3 Teknologi Pertanian - IPB University"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="experience">Pengalaman</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="contoh: 15 tahun"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telepon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">URL Foto</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/foto-dosen.jpg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Aktif</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingLecturer ? 'Perbarui' : 'Tambah'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {lecturers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada data dosen</h3>
              <p className="text-muted-foreground text-center mb-4">
                Mulai tambahkan profil dosen untuk ditampilkan di website
              </p>
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Dosen Pertama
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lecturers.map((lecturer) => (
              <Card key={lecturer.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{lecturer.name}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {lecturer.field}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(lecturer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(lecturer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Pendidikan:</span> {lecturer.education}
                  </p>
                  {lecturer.experience && (
                    <p className="text-sm">
                      <span className="font-medium">Pengalaman:</span> {lecturer.experience}
                    </p>
                  )}
                  {lecturer.email && (
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {lecturer.email}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${lecturer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {lecturer.is_active ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};