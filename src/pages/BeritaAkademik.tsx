
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BeritaAkademik = () => {
  const { toast } = useToast();

  const berita = [
    {
      judul: "Pembukaan Semester Genap 2024/2025",
      tanggal: "1 Februari 2024",
      penulis: "Tim Akademik",
      ringkasan: "Semester genap 2024/2025 resmi dibuka dengan protokol kesehatan yang ketat.",
      konten: "Perkuliahan semester genap akan dilaksanakan secara hybrid dengan kombinasi tatap muka dan online."
    },
    {
      judul: "Pengumuman Jadwal Ujian Tengah Semester",
      tanggal: "28 Januari 2024", 
      penulis: "Bagian Akademik",
      ringkasan: "Jadwal UTS semester genap 2024/2025 telah ditetapkan.",
      konten: "Ujian Tengah Semester akan dilaksanakan pada tanggal 15-26 Februari 2024."
    },
    {
      judul: "Workshop Metodologi Penelitian",
      tanggal: "25 Januari 2024",
      penulis: "Pusat Penelitian ITPT",
      ringkasan: "Workshop metodologi penelitian untuk mahasiswa tingkat akhir.",
      konten: "Workshop akan membahas teknik penulisan proposal dan metodologi penelitian yang baik."
    }
  ];

  const handleReadMore = (judul: string) => {
    toast({
      title: "Baca Selengkapnya",
      description: `Artikel lengkap "${judul}" akan segera tersedia.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Berita Akademik</h1>
            <p className="text-lg text-gray-600">Informasi Terkini Seputar Kegiatan Akademik ITPT</p>
          </div>

          <div className="space-y-8">
            {berita.map((artikel, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{artikel.judul}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {artikel.tanggal}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {artikel.penulis}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{artikel.ringkasan}</p>
                  <p className="text-gray-600">{artikel.konten}</p>
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleReadMore(artikel.judul)}
                  >
                    Baca Selengkapnya
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaAkademik;
