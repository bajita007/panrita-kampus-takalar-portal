
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, User, BookOpen, FileText, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SIA = () => {
  const { toast } = useToast();

  const fiturSIA = [
    {
      icon: <User className="h-8 w-8 text-green-600" />,
      title: "Profil Mahasiswa",
      description: "Kelola data pribadi dan akademik"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      title: "Kartu Rencana Studi (KRS)",
      description: "Pengisian dan perubahan mata kuliah"
    },
    {
      icon: <FileText className="h-8 w-8 text-green-600" />,
      title: "Kartu Hasil Studi (KHS)",
      description: "Lihat nilai dan transkrip"
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      title: "Jadwal Kuliah",
      description: "Jadwal perkuliahan dan ujian"
    }
  ];

  const handleAccessSIA = () => {
    toast({
      title: "Akses SIA",
      description: "Sistem Informasi Akademik akan segera tersedia.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sistem Informasi Akademik</h1>
            <p className="text-lg text-gray-600">Portal Mahasiswa ITPT</p>
          </div>

          <div className="text-center mb-12">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleAccessSIA}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Akses SIA
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fiturSIA.map((fitur, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {fitur.icon}
                  </div>
                  <CardTitle className="text-lg">{fitur.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{fitur.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl text-green-600">Panduan Penggunaan SIA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-left">
                <p>• Login menggunakan NIM dan password yang telah diberikan</p>
                <p>• Pastikan mengisi KRS sesuai jadwal yang ditentukan</p>
                <p>• Periksa jadwal kuliah secara berkala</p>
                <p>• Download KHS setiap akhir semester</p>
                <p>• Hubungi admin akademik jika mengalami kendala</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIA;
