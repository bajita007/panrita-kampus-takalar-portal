
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, DollarSign, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Beasiswa = () => {
  const { toast } = useToast();

  const beasiswa = [
    {
      nama: "Beasiswa Prestasi Akademik",
      icon: <Award className="h-8 w-8 text-green-600" />,
      jumlah: "Rp 2.000.000/semester",
      syarat: ["IPK minimal 3.50", "Tidak sedang menerima beasiswa lain", "Aktif dalam kegiatan kampus"],
      kuota: "10 mahasiswa"
    },
    {
      nama: "Beasiswa Kurang Mampu",
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      jumlah: "Rp 1.500.000/semester", 
      syarat: ["Penghasilan orang tua maksimal Rp 3.000.000", "IPK minimal 3.00", "Surat keterangan tidak mampu"],
      kuota: "20 mahasiswa"
    },
    {
      nama: "Beasiswa Organisasi",
      icon: <Users className="h-8 w-8 text-green-600" />,
      jumlah: "Rp 1.000.000/semester",
      syarat: ["Aktif dalam organisasi kemahasiswaan", "IPK minimal 3.25", "Rekomendasi dari pembina organisasi"],
      kuota: "15 mahasiswa"
    }
  ];

  const handleApplyBeasiswa = (nama: string) => {
    toast({
      title: "Pendaftaran Beasiswa",
      description: `Formulir pendaftaran ${nama} akan segera tersedia.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Beasiswa</h1>
            <p className="text-lg text-gray-600">Program Bantuan Pendidikan untuk Mahasiswa ITPT</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {beasiswa.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl">{item.nama}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-green-600">
                    {item.jumlah}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Persyaratan:</p>
                    <ul className="space-y-1">
                      {item.syarat.map((req, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {req}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Kuota:</span> {item.kuota}
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleApplyBeasiswa(item.nama)}
                  >
                    Daftar Beasiswa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl text-green-600">Informasi Penting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-left">
                <p>• Pendaftaran beasiswa dibuka setiap awal semester</p>
                <p>• Berkas harus diserahkan paling lambat 2 minggu setelah pembukaan</p>
                <p>• Pengumuman hasil seleksi akan diumumkan 1 bulan setelah penutupan</p>
                <p>• Penerima beasiswa wajib mempertahankan prestasi akademik</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beasiswa;
