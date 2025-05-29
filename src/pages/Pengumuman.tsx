
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Pengumuman = () => {
  const { toast } = useToast();

  const pengumuman = [
    {
      judul: "Pengumuman Kelulusan Semester Ganjil 2023/2024",
      tanggal: "15 Februari 2024",
      kategori: "Akademik",
      prioritas: "tinggi",
      konten: "Hasil evaluasi semester ganjil 2023/2024 telah selesai dan dapat diakses melalui SIA.",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />
    },
    {
      judul: "Perpanjangan Batas Akhir Pembayaran SPP",
      tanggal: "12 Februari 2024",
      kategori: "Keuangan", 
      prioritas: "tinggi",
      konten: "Batas akhir pembayaran SPP diperpanjang hingga 28 Februari 2024.",
      icon: <AlertCircle className="h-5 w-5 text-orange-600" />
    },
    {
      judul: "Seleksi Beasiswa Prestasi Semester Genap",
      tanggal: "10 Februari 2024",
      kategori: "Kemahasiswaan",
      prioritas: "sedang", 
      konten: "Pendaftaran beasiswa prestasi dibuka untuk semester genap 2024/2025.",
      icon: <CheckCircle className="h-5 w-5 text-blue-600" />
    },
    {
      judul: "Maintenance Sistem Informasi Akademik",
      tanggal: "8 Februari 2024",
      kategori: "Teknis",
      prioritas: "sedang",
      konten: "SIA akan mengalami maintenance pada 15 Februari 2024 pukul 01:00-05:00 WIB.",
      icon: <AlertCircle className="h-5 w-5 text-yellow-600" />
    }
  ];

  const handleReadAnnouncement = (judul: string) => {
    toast({
      title: "Detail Pengumuman", 
      description: `Detail lengkap "${judul}" akan segera tersedia.`,
    });
  };

  const getPriorityColor = (prioritas: string) => {
    switch (prioritas) {
      case 'tinggi': return 'bg-red-100 text-red-800';
      case 'sedang': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Pengumuman</h1>
            <p className="text-lg text-gray-600">Pengumuman Resmi Institut Teknologi Pertanian Takalar</p>
          </div>

          <div className="space-y-6">
            {pengumuman.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {item.icon}
                        {item.judul}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {item.tanggal}
                        </div>
                        <span className="text-sm text-gray-500">{item.kategori}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.prioritas)}`}>
                      {item.prioritas.toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{item.konten}</p>
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleReadAnnouncement(item.judul)}
                  >
                    Baca Detail
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl text-green-600">Berlangganan Pengumuman</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Dapatkan notifikasi pengumuman terbaru langsung ke email Anda.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => toast({
                    title: "Berlangganan Email",
                    description: "Fitur berlangganan email akan segera tersedia.",
                  })}
                >
                  Berlangganan Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengumuman;
