
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Trophy, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const KegiatanMahasiswa = () => {
  const { toast } = useToast();
  const [kegiatan, setKegiatan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentActivities();
  }, []);

  const fetchStudentActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('student_activities')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setKegiatan(data || []);
    } catch (error) {
      console.error('Error fetching student activities:', error);
      toast({
        title: "Error",
        description: "Gagal memuat kegiatan mahasiswa",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'organisasi':
      case 'organisasi kemahasiswaan':
        return <Users className="h-8 w-8 text-green-600" />;
      case 'kompetisi':
      case 'kompetisi & prestasi':
        return <Trophy className="h-8 w-8 text-green-600" />;
      case 'kegiatan rutin':
      case 'rutin':
        return <Calendar className="h-8 w-8 text-green-600" />;
      default:
        return <Users className="h-8 w-8 text-green-600" />;
    }
  };

  const handleJoinActivity = (kategori: string) => {
    toast({
      title: "Bergabung Kegiatan",
      description: `Informasi pendaftaran untuk ${kategori} akan segera tersedia.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kegiatan Mahasiswa</h1>
            <p className="text-lg text-gray-600">Beragam Aktivitas untuk Pengembangan Diri</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-gray-500">Memuat kegiatan mahasiswa...</div>
            </div>
          ) : kegiatan.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada kegiatan mahasiswa</h3>
              <p className="text-gray-500">Kegiatan mahasiswa akan ditampilkan di sini</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {kegiatan.map((section, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                      {getIcon(section.category)}
                    </div>
                    <CardTitle className="text-xl">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {(section.items || []).map((item: string, idx: number) => (
                        <li key={idx} className="text-gray-700">• {item}</li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => handleJoinActivity(section.category)}
                    >
                      Bergabung
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KegiatanMahasiswa;
