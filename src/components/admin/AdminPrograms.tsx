import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  description: string;
  accreditation: string;
  image_url: string;
  is_active: boolean;
}

interface AdminProgramsProps {
  onUpdate: () => void;
}

export function AdminPrograms({ onUpdate }: AdminProgramsProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    accreditation: 'Akreditasi Baik',
    image_url: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: "Error",
        description: "Gagal mengambil data program studi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProgram) {
        const { error } = await supabase
          .from('programs')
          .update(formData)
          .eq('id', editingProgram.id);

        if (error) throw error;
        toast({
          title: "Berhasil",
          description: "Program studi berhasil diperbarui.",
        });
      } else {
        const { error } = await supabase
          .from('programs')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Berhasil",
          description: "Program studi berhasil ditambahkan.",
        });
      }

      setIsDialogOpen(false);
      setEditingProgram(null);
      setFormData({
        name: '',
        description: '',
        accreditation: 'Akreditasi Baik',
        image_url: '',
      });
      fetchPrograms();
      onUpdate();
    } catch (error) {
      console.error('Error saving program:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan program studi.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData({
      name: program.name,
      description: program.description || '',
      accreditation: program.accreditation,
      image_url: program.image_url || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus program studi ini?')) return;

    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Berhasil",
        description: "Program studi berhasil dihapus.",
      });
      fetchPrograms();
      onUpdate();
    } catch (error) {
      console.error('Error deleting program:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus program studi.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingProgram(null);
    setFormData({
      name: '',
      description: '',
      accreditation: 'Akreditasi Baik',
      image_url: '',
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
            <CardTitle>Manajemen Program Studi</CardTitle>
            <CardDescription>Kelola program studi institut</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Program
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingProgram ? 'Edit Program Studi' : 'Tambah Program Studi'}
                </DialogTitle>
                <DialogDescription>
                  {editingProgram ? 'Perbarui informasi program studi.' : 'Tambahkan program studi baru.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Program Studi</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <Label htmlFor="accreditation">Akreditasi</Label>
                    <Input
                      id="accreditation"
                      value={formData.accreditation}
                      onChange={(e) => setFormData({ ...formData, accreditation: e.target.value })}
                    />
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
                <DialogFooter>
                  <Button type="submit">
                    {editingProgram ? 'Perbarui' : 'Tambah'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {programs.map((program) => (
            <div key={program.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold">{program.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
                  {program.accreditation}
                </span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(program)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(program.id)}>
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