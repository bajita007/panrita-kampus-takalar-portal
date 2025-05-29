
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PeraturanAkademik = () => {
  const { toast } = useToast();

  const peraturan = [
    {
      kategori: "Peraturan Akademik",
      items: [
        "Sistem Kredit Semester (SKS)",
        "Penilaian dan Evaluasi",
        "Kehadiran Mahasiswa",
        "Ujian dan Evaluasi",
        "Tugas Akhir dan Skripsi"
      ]
    },
    {
      kategori: "Peraturan Kemahasiswaan",
      items: [
        "Kode Etik Mahasiswa",
        "Organisasi Kemahasiswaan", 
        "Sanksi dan Pelanggaran",
        "Beasiswa dan Bantuan",
        "Kegiatan Ekstrakurikuler"
      ]
    }
  ];

  const handleDownloadPeraturan = (kategori: string) => {
    toast({
      title: "Download Peraturan",
      description: `File ${kategori} akan segera tersedia untuk diunduh.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Peraturan Akademik dan Kemahasiswaan</h1>
            <p className="text-lg text-gray-600">Panduan dan Aturan untuk Mahasiswa ITPT</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {peraturan.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{section.kategori}</CardTitle>
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
                    onClick={() => handleDownloadPeraturan(section.kategori)}
                  >
                    Download {section.kategori}
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

export default PeraturanAkademik;
