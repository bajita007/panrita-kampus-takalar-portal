
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InfoKarir = () => {
  const { toast } = useToast();

  const lowongan = [
    {
      posisi: "Agricultural Technology Specialist",
      perusahaan: "PT Agro Nusantara",
      lokasi: "Makassar, Sulawesi Selatan",
      gaji: "Rp 8.000.000 - 12.000.000",
      deadline: "28 Februari 2024"
    },
    {
      posisi: "Agribusiness Analyst", 
      perusahaan: "PT Mitra Tani Sejahtera",
      lokasi: "Jakarta Selatan",
      gaji: "Rp 7.000.000 - 10.000.000",
      deadline: "15 Maret 2024"
    },
    {
      posisi: "Food Quality Manager",
      perusahaan: "PT Indofood Sukses Makmur",
      lokasi: "Tangerang, Banten", 
      gaji: "Rp 10.000.000 - 15.000.000",
      deadline: "20 Maret 2024"
    }
  ];

  const tipKarir = [
    "Bangun portofolio yang kuat dengan proyek-proyek nyata",
    "Ikuti sertifikasi yang relevan dengan bidang pertanian",
    "Aktif dalam magang dan program kerjasama industri",
    "Kembangkan soft skills seperti komunikasi dan leadership",
    "Jaringan dengan alumni dan profesional di industri"
  ];

  const handleApplyJob = (posisi: string) => {
    toast({
      title: "Lamar Pekerjaan",
      description: `Informasi lengkap untuk posisi ${posisi} akan segera tersedia.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Info Karir</h1>
            <p className="text-lg text-gray-600">Peluang Karir untuk Lulusan ITPT</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Lowongan Kerja Terbaru</h2>
              <div className="space-y-6">
                {lowongan.map((job, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{job.posisi}</CardTitle>
                      <CardDescription className="text-green-600 font-medium">{job.perusahaan}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.lokasi}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {job.gaji}
                      </div>
                      <div className="text-sm text-gray-500">
                        Deadline: {job.deadline}
                      </div>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleApplyJob(job.posisi)}
                      >
                        Lamar Sekarang
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips Sukses Karir</h2>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">Panduan Membangun Karir</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tipKarir.map((tip, index) => (
                      <li key={index} className="text-gray-700">• {tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">Career Development Center</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    Tim CDC ITPT siap membantu mahasiswa dan alumni dalam:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Konsultasi karir dan pengembangan diri</li>
                    <li>• Workshop CV dan interview</li>
                    <li>• Job fair dan recruitment</li>
                    <li>• Networking dengan industri</li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => toast({
                      title: "Konsultasi CDC",
                      description: "Layanan konsultasi CDC akan segera tersedia.",
                    })}
                  >
                    Konsultasi dengan CDC
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoKarir;
