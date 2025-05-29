
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Laboratorium = () => {
  const { toast } = useToast();

  const labs = [
    {
      nama: "Laboratorium Teknologi Pertanian",
      deskripsi: "Fasilitas untuk penelitian dan praktikum teknologi pertanian modern",
      fasilitas: ["Alat Pengukur Kelembaban Tanah", "Sistem Irigasi Otomatis", "Sensor IoT Pertanian"],
      kapasitas: "30 mahasiswa"
    },
    {
      nama: "Laboratorium Agribisnis",
      deskripsi: "Ruang untuk analisis ekonomi dan manajemen agribisnis",
      fasilitas: ["Komputer Analisis Data", "Software Statistik", "Proyektor Presentasi"],
      kapasitas: "25 mahasiswa"
    },
    {
      nama: "Laboratorium Teknologi Pangan",
      deskripsi: "Fasilitas pengolahan dan analisis keamanan pangan",
      fasilitas: ["Mesin Pengolahan Pangan", "Alat Uji Kualitas", "Inkubator Mikrobiologi"],
      kapasitas: "20 mahasiswa"
    },
    {
      nama: "Laboratorium Komputer",
      deskripsi: "Fasilitas komputer untuk pembelajaran dan penelitian",
      fasilitas: ["30 Unit Komputer", "Software Pertanian", "Akses Internet"],
      kapasitas: "30 mahasiswa"
    }
  ];

  const handleBookLab = (labName: string) => {
    toast({
      title: "Pemesanan Laboratorium",
      description: `Formulir pemesanan ${labName} akan segera tersedia.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Laboratorium</h1>
            <p className="text-lg text-gray-600">Fasilitas Laboratorium Institut Teknologi Pertanian Takalar</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {labs.map((lab, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{lab.nama}</CardTitle>
                  <CardDescription>{lab.deskripsi}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Fasilitas:</p>
                    <ul className="space-y-1">
                      {lab.fasilitas.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Kapasitas:</span> {lab.kapasitas}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleBookLab(lab.nama)}
                  >
                    Pesan Laboratorium
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

export default Laboratorium;
