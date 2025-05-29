
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Kurikulum = () => {
  const { toast } = useToast();

  const programStudi = [
    {
      nama: "Teknologi Pertanian",
      semester: 8,
      sks: 144,
      mata_kuliah: [
        "Pengantar Teknologi Pertanian",
        "Matematika Dasar",
        "Fisika Pertanian",
        "Kimia Pertanian",
        "Biologi Pertanian"
      ]
    },
    {
      nama: "Agribisnis", 
      semester: 8,
      sks: 144,
      mata_kuliah: [
        "Pengantar Agribisnis",
        "Ekonomi Pertanian",
        "Manajemen Agribisnis",
        "Pemasaran Produk Pertanian",
        "Kewirausahaan Agribisnis"
      ]
    },
    {
      nama: "Teknologi Pangan",
      semester: 8,
      sks: 144,
      mata_kuliah: [
        "Pengantar Teknologi Pangan",
        "Mikrobiologi Pangan",
        "Kimia Pangan",
        "Teknologi Pengolahan Pangan",
        "Keamanan Pangan"
      ]
    }
  ];

  const handleDownloadKurikulum = (prodi: string) => {
    toast({
      title: "Download Kurikulum",
      description: `File kurikulum ${prodi} akan segera tersedia untuk diunduh.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kurikulum</h1>
            <p className="text-lg text-gray-600">Struktur Kurikulum Program Studi ITPT</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {programStudi.map((prodi, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{prodi.nama}</CardTitle>
                  <CardDescription>
                    {prodi.semester} Semester • {prodi.sks} SKS
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Mata Kuliah Inti:</p>
                    <ul className="space-y-1">
                      {prodi.mata_kuliah.map((mk, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {mk}</li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleDownloadKurikulum(prodi.nama)}
                  >
                    Download Kurikulum Lengkap
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

export default Kurikulum;
