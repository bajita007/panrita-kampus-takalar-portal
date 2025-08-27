
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const KalenderAkademik = () => {
  const { toast } = useToast();
  const [kegiatan, setKegiatan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcademicCalendar();
  }, []);

  const fetchAcademicCalendar = async () => {
    try {
      const { data, error } = await supabase
        .from('academic_calendar')
        .select('*')
        .eq('is_active', true)
        .order('start_date', { ascending: true });

      if (error) throw error;
      setKegiatan(data || []);
    } catch (error) {
      console.error('Error fetching academic calendar:', error);
      toast({
        title: "Error",
        description: "Gagal memuat kalender akademik",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    if (endDate) {
      const end = new Date(endDate);
      const endFormatted = end.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
      return `${startFormatted} - ${endFormatted}`;
    }
    
    return startFormatted;
  };

  const getMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  const handleDownloadKalender = () => {
    toast({
      title: "Download Kalender",
      description: "File kalender akademik akan segera tersedia untuk diunduh.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kalender Akademik</h1>
            <p className="text-lg text-gray-600">Tahun Akademik 2024/2025</p>
          </div>

          <div className="mb-8 text-center">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleDownloadKalender}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Download Kalender Lengkap
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-gray-500">Memuat kalender akademik...</div>
            </div>
          ) : kegiatan.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada jadwal kegiatan</h3>
              <p className="text-gray-500">Jadwal kegiatan akademik akan ditampilkan di sini</p>
            </div>
          ) : (
            <div className="space-y-4">
              {kegiatan.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                        <p className="text-green-600 font-medium">
                          {formatDateRange(item.start_date, item.end_date)}
                        </p>
                        {item.description && (
                          <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{getMonthYear(item.start_date)}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                          item.event_type === 'akademik' ? 'bg-blue-100 text-blue-800' :
                          item.event_type === 'ujian' ? 'bg-red-100 text-red-800' :
                          item.event_type === 'libur' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.event_type}
                        </span>
                      </div>
                    </div>
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

export default KalenderAkademik;
