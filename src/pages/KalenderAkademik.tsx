
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const KalenderAkademik = () => {
  const { toast } = useToast();

  const kegiatan = [
    { bulan: "Agustus 2024", kegiatan: "Pendaftaran Mahasiswa Baru", tanggal: "1-31 Agustus" },
    { bulan: "September 2024", kegiatan: "Orientasi Mahasiswa Baru", tanggal: "1-7 September" },
    { bulan: "September 2024", kegiatan: "Perkuliahan Semester Ganjil Dimulai", tanggal: "9 September" },
    { bulan: "Oktober 2024", kegiatan: "Ujian Tengah Semester", tanggal: "14-25 Oktober" },
    { bulan: "Desember 2024", kegiatan: "Ujian Akhir Semester", tanggal: "2-13 Desember" },
    { bulan: "Januari 2025", kegiatan: "Libur Semester", tanggal: "16 Desember - 31 Januari" },
    { bulan: "Februari 2025", kegiatan: "Perkuliahan Semester Genap Dimulai", tanggal: "3 Februari" }
  ];

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

          <div className="space-y-4">
            {kegiatan.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{item.kegiatan}</h3>
                      <p className="text-green-600 font-medium">{item.tanggal}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{item.bulan}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KalenderAkademik;
