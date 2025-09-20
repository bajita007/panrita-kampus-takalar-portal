import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Building } from 'lucide-react';

interface OrganizationalStructure {
  id: string;
  position_name: string;
  person_name: string;
  level: number;
  parent_id?: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AdminOrganisasiProps {
  onUpdate?: () => void;
}

export const AdminOrganisasi = ({ onUpdate }: AdminOrganisasiProps) => {
  const { toast } = useToast();
  const [structures, setStructures] = useState<OrganizationalStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStructure, setEditingStructure] = useState<OrganizationalStructure | null>(null);
  const [formData, setFormData] = useState({
    position_name: '',
    person_name: '',
    level: 1,
    parent_id: '',
    description: '',
    is_active: true,
  });

  useEffect(() => {
    fetchStructures();
  }, []);

  const fetchStructures = async () => {
    try {
      const { data, error } = await supabase
        .from('organizational_structure')
        .select('*')
        .order('level', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setStructures(data || []);
    } catch (error) {
      console.error('Error fetching organizational structure:', error);
      toast({
        title: "Error",
        description: "Gagal memuat struktur organisasi",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        parent_id: formData.parent_id || null,
      };

      if (editingStructure) {
        const { error } = await supabase
          .from('organizational_structure')
          .update(submitData)
          .eq('id', editingStructure.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Struktur organisasi berhasil diperbarui",
        });
      } else {
        const { error } = await supabase
          .from('organizational_structure')
          .insert([submitData]);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Struktur organisasi berhasil ditambahkan",
        });
      }

      setDialogOpen(false);
      setEditingStructure(null);
      resetForm();
      fetchStructures();
      onUpdate?.();
    } catch (error) {
      console.error('Error saving organizational structure:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan struktur organisasi",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (structure: OrganizationalStructure) => {
    setEditingStructure(structure);
    setFormData({
      position_name: structure.position_name,
      person_name: structure.person_name,
      level: structure.level,
      parent_id: structure.parent_id || '',
      description: structure.description || '',
      is_active: structure.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus struktur organisasi ini?')) return;

    try {
      const { error } = await supabase
        .from('organizational_structure')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Struktur organisasi berhasil dihapus",
      });

      fetchStructures();
      onUpdate?.();
    } catch (error) {
      console.error('Error deleting organizational structure:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus struktur organisasi",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      position_name: '',
      person_name: '',
      level: 1,
      parent_id: '',
      description: '',
      is_active: true,
    });
  };

  const handleAddNew = () => {
    setEditingStructure(null);
    resetForm();
    setDialogOpen(true);
  };

  const getStructuresByLevel = (level: number) => {
    return structures.filter(s => s.level === level);
  };

  const getLevelName = (level: number) => {
    switch (level) {
      case 1: return 'Pimpinan Tertinggi';
      case 2: return 'Wakil/Deputi';
      case 3: return 'Ketua Program Studi';
      case 4: return 'Koordinator';
      default: return `Level ${level}`;
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Memuat struktur organisasi...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Struktur Organisasi</h2>
          <p className="text-muted-foreground">Kelola struktur organisasi institut</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Posisi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border shadow-lg">
            <DialogHeader>
              <DialogTitle>
                {editingStructure ? 'Edit Struktur Organisasi' : 'Tambah Struktur Organisasi Baru'}
              </DialogTitle>
              <DialogDescription>
                Isi informasi lengkap tentang struktur organisasi
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position_name">Nama Jabatan *</Label>
                  <Input
                    id="position_name"
                    value={formData.position_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, position_name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="person_name">Nama Pejabat *</Label>
                  <Input
                    id="person_name"
                    value={formData.person_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, person_name: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="level">Level Jabatan *</Label>
                <Select value={formData.level.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, level: parseInt(value) }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih level jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Pimpinan Tertinggi</SelectItem>
                    <SelectItem value="2">2 - Wakil/Deputi</SelectItem>
                    <SelectItem value="3">3 - Ketua Program Studi</SelectItem>
                    <SelectItem value="4">4 - Koordinator</SelectItem>
                    <SelectItem value="5">5 - Staf</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="parent_id">Atasan Langsung</Label>
                <Select value={formData.parent_id} onValueChange={(value) => setFormData(prev => ({ ...prev, parent_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih atasan langsung (opsional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tidak ada atasan</SelectItem>
                    {structures.filter(s => s.level < formData.level).map((structure) => (
                      <SelectItem key={structure.id} value={structure.id}>
                        {structure.position_name} - {structure.person_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Deskripsi tugas dan tanggung jawab..."
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
                  {editingStructure ? 'Perbarui' : 'Tambah'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-8">
        {structures.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada struktur organisasi</h3>
              <p className="text-muted-foreground text-center mb-4">
                Mulai tambahkan struktur organisasi untuk ditampilkan di website
              </p>
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Struktur Pertama
              </Button>
            </CardContent>
          </Card>
        ) : (
          [1, 2, 3, 4, 5].map(level => {
            const levelStructures = getStructuresByLevel(level);
            if (levelStructures.length === 0) return null;

            return (
              <div key={level} className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-lg font-semibold text-primary">{getLevelName(level)}</h3>
                  <p className="text-sm text-muted-foreground">Level {level}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {levelStructures.map((structure) => (
                    <Card key={structure.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{structure.position_name}</CardTitle>
                            <CardDescription className="font-medium">
                              {structure.person_name}
                            </CardDescription>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(structure)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(structure.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {structure.description && (
                          <p className="text-sm text-muted-foreground">
                            {structure.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${structure.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {structure.is_active ? 'Aktif' : 'Tidak Aktif'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Level {structure.level}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};