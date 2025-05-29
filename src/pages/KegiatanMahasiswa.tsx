
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Trophy, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const KegiatanMahasiswa = () => {
  const { toast } = useToast();

  const kegiatan = [
    {
      kategori: "Organisasi Kemahasiswaan",
      icon: <Users className="h-8 w-8 text-green-600" />,
      items: [
        "Himpunan Mahasiswa Teknologi Pertanian",
        "Himpunan Mahasiswa Agribisnis", 
        "Himpunan Mahasiswa Teknologi Pangan",
        "Senat Mahasiswa ITPT"
      ]
    },
    {
      kategori: "Kompetisi & Prestasi",
      icon: <Trophy className="h-8 w-8 text-green-600" />,
      items: [
        "Lomba Karya Tulis Ilmiah",
        "Kompetisi Inovasi Teknologi Pertanian",
        "Olimpiade Matematika dan Sains",
        "Festival Seni dan Budaya"
      ]
    },
    {
      kategori: "Kegiatan Rutin",
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      items: [
        "Seminar Nasional Pertanian",
        "Workshop Kewirausahaan",
        "Bakti Sosial ke Petani",
        "Study Tour ke Industri Pertanian"
      ]
    }
  ];

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

          <div className="grid lg:grid-cols-3 gap-8">
            {kegiatan.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    {section.icon}
                  </div>
                  <CardTitle className="text-xl">{section.kategori}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="text-gray-700">• {item}</li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleJoinActivity(section.kategori)}
                  >
                    Bergabung
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

export default KegiatanMahasiswa;
