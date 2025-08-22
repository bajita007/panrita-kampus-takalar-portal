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
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface AdminCalendarProps {
  onUpdate?: () => void;
}

export const AdminCalendar = ({ onUpdate }: AdminCalendarProps) => {
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    event_type: 'akademik',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('academic_calendar')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Gagal memuat kalender akademik",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.start_date) {
      toast({
        title: "Error",
        description: "Judul dan tanggal mulai wajib diisi",
        variant: "destructive",
      });
      return;
    }

    try {
      const eventData = {
        ...formData,
        end_date: formData.end_date || null,
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('academic_calendar')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Kegiatan berhasil diperbarui",
        });
      } else {
        const { error } = await supabase
          .from('academic_calendar')
          .insert([eventData]);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Kegiatan berhasil ditambahkan",
        });
      }

      setFormData({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        event_type: 'akademik',
      });
      setEditingEvent(null);
      onUpdate?.();
      await fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan kegiatan",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      start_date: event.start_date,
      end_date: event.end_date || '',
      event_type: event.event_type,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) return;

    try {
      const { error } = await supabase
        .from('academic_calendar')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Kegiatan berhasil dihapus",
      });

      onUpdate?.();
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus kegiatan",
        variant: "destructive",
      });
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('academic_calendar')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: `Status kegiatan ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}`,
      });

      await fetchEvents();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Gagal mengubah status kegiatan",
        variant: "destructive",
      });
    }
  };

  const eventTypes = [
    { value: 'akademik', label: 'Akademik' },
    { value: 'admisi', label: 'Admisi' },
    { value: 'orientasi', label: 'Orientasi' },
    { value: 'perkuliahan', label: 'Perkuliahan' },
    { value: 'ujian', label: 'Ujian' },
    { value: 'libur', label: 'Libur' },
    { value: 'wisuda', label: 'Wisuda' },
    { value: 'seminar', label: 'Seminar' },
  ];

  const getEventTypeColor = (type: string) => {
    const colors: any = {
      'akademik': 'default',
      'admisi': 'secondary',
      'orientasi': 'outline',
      'perkuliahan': 'default',
      'ujian': 'destructive',
      'libur': 'secondary',
      'wisuda': 'default',
      'seminar': 'outline',
    };
    return colors[type] || 'default';
  };

  if (loading) {
    return <div className="flex justify-center p-8">Memuat kalender...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Kalender Akademik</h2>
          <p className="text-gray-600">Kelola jadwal kegiatan akademik</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingEvent(null);
              setFormData({
                title: '',
                description: '',
                start_date: '',
                end_date: '',
                event_type: 'akademik',
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Kegiatan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</DialogTitle>
              <DialogDescription>
                {editingEvent ? 'Perbarui informasi kegiatan' : 'Tambahkan kegiatan baru ke kalender akademik'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Kegiatan *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Contoh: Pendaftaran Mahasiswa Baru"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Deskripsi kegiatan"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="event_type">Tipe Kegiatan</Label>
                <Select value={formData.event_type} onValueChange={(value) => setFormData({...formData, event_type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Tanggal Mulai *</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="end_date">Tanggal Selesai</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingEvent ? 'Perbarui' : 'Tambah'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Jadwal Kegiatan
          </CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada kegiatan dalam kalender. Tambahkan kegiatan pertama Anda.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kegiatan</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        {event.description && (
                          <div className="text-sm text-gray-500">{event.description}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getEventTypeColor(event.event_type)}>
                        {eventTypes.find(t => t.value === event.event_type)?.label || event.event_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(new Date(event.start_date), 'dd MMM yyyy', { locale: id })}
                        {event.end_date && event.end_date !== event.start_date && (
                          <div className="text-gray-500">
                            s/d {format(new Date(event.end_date), 'dd MMM yyyy', { locale: id })}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(event.id, event.is_active)}
                      >
                        {event.is_active ? 'Aktif' : 'Nonaktif'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(event.id)}
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