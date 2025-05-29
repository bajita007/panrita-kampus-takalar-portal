
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const StrukturOrganisasi = () => {
  const struktur = [
    { jabatan: "Direktur", nama: "Prof. Dr. Ahmad Maulana, M.Sc" },
    { jabatan: "Wakil Direktur I (Akademik)", nama: "Dr. Siti Nurhaliza, S.P., M.Si" },
    { jabatan: "Wakil Direktur II (Umum & Keuangan)", nama: "Dr. Muhammad Fadli, S.E., M.M" },
    { jabatan: "Wakil Direktur III (Kemahasiswaan)", nama: "Dr. Andi Nurul Fitri, S.P., M.P" },
    { jabatan: "Ketua Program Studi Teknologi Pertanian", nama: "Dr. Rahman Syahid, S.P., M.P" },
    { jabatan: "Ketua Program Studi Agribisnis", nama: "Dr. Fatimah Zahra, S.P., M.Si" },
    { jabatan: "Ketua Program Studi Teknologi Pangan", nama: "Dr. Abdul Karim, S.TP., M.T" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Struktur Organisasi</h1>
            <p className="text-lg text-gray-600">Institut Teknologi Pertanian Takalar</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {struktur.map((person, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">{person.jabatan}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-gray-800">{person.nama}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;
