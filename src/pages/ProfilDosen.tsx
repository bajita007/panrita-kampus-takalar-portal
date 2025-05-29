
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ProfilDosen = () => {
  const { toast } = useToast();

  const dosen = [
    {
      nama: "Prof. Dr. Ahmad Maulana, M.Sc",
      bidang: "Teknologi Pertanian Berkelanjutan",
      pendidikan: "S3 Agricultural Technology - IPB University",
      pengalaman: "20 tahun"
    },
    {
      nama: "Dr. Siti Nurhaliza, S.P., M.Si",
      bidang: "Agronomi dan Hortikultura",
      pendidikan: "S3 Agronomi - Universitas Gadjah Mada",
      pengalaman: "15 tahun"
    },
    {
      nama: "Dr. Rahman Syahid, S.P., M.P",
      bidang: "Teknologi Pascapanen",
      pendidikan: "S3 Teknologi Pertanian - IPB University",
      pengalaman: "12 tahun"
    },
    {
      nama: "Dr. Fatimah Zahra, S.P., M.Si",
      bidang: "Agribisnis dan Ekonomi Pertanian",
      pendidikan: "S3 Ekonomi Pertanian - Universitas Hasanuddin",
      pengalaman: "10 tahun"
    },
    {
      nama: "Dr. Abdul Karim, S.TP., M.T",
      bidang: "Teknologi Pangan",
      pendidikan: "S3 Teknologi Pangan - Institut Teknologi Bandung",
      pengalaman: "14 tahun"
    },
    {
      nama: "Dr. Andi Nurul Fitri, S.P., M.P",
      bidang: "Ilmu Tanah dan Lingkungan",
      pendidikan: "S3 Ilmu Tanah - Universitas Brawijaya",
      pengalaman: "11 tahun"
    }
  ];

  const handleContactDosen = (nama: string) => {
    toast({
      title: "Kontak Dosen",
      description: `Fitur kontak untuk ${nama} akan segera tersedia.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Profil Dosen</h1>
            <p className="text-lg text-gray-600">Dosen Berkualitas Institut Teknologi Pertanian Takalar</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dosen.map((lecturer, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{lecturer.nama}</CardTitle>
                  <CardDescription className="text-green-600 font-medium">{lecturer.bidang}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Pendidikan:</p>
                    <p className="text-sm text-gray-600">{lecturer.pendidikan}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Pengalaman:</p>
                    <p className="text-sm text-gray-600">{lecturer.pengalaman}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleContactDosen(lecturer.nama)}
                  >
                    Kontak Dosen
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

export default ProfilDosen;
