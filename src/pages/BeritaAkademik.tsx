
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, Eye, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const BeritaAkademik = () => {
  const { toast } = useToast();

  const berita = [
    {
      judul: "Pembukaan Semester Genap 2024/2025",
      tanggal: "1 Februari 2024",
      penulis: "Tim Akademik",
      kategori: "Pengumuman",
      views: 1250,
      ringkasan: "Semester genap 2024/2025 resmi dibuka dengan protokol kesehatan yang ketat dan berbagai inovasi pembelajaran.",
      konten: "Perkuliahan semester genap akan dilaksanakan secara hybrid dengan kombinasi tatap muka dan online. Mahasiswa diharapkan mengikuti prosedur registrasi online yang telah ditetapkan. Jadwal perkuliahan dapat diakses melalui sistem informasi akademik mulai tanggal 5 Februari 2024.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
      detail: "Dalam rangka memulai semester genap 2024/2025, Institut Teknologi Pertanian mengadakan orientasi akademik bagi seluruh mahasiswa. Kegiatan ini meliputi sosialisasi perubahan kurikulum, pengenalan sistem pembelajaran hybrid, dan workshop penggunaan platform e-learning. Seluruh mahasiswa wajib menghadiri kegiatan orientasi yang akan berlangsung selama 3 hari."
    },
    {
      judul: "Pengumuman Jadwal Ujian Tengah Semester",
      tanggal: "28 Januari 2024", 
      penulis: "Bagian Akademik",
      kategori: "Jadwal",
      views: 890,
      ringkasan: "Jadwal UTS semester genap 2024/2025 telah ditetapkan dengan sistem pengawasan yang ketat untuk menjaga integritas akademik.",
      konten: "Ujian Tengah Semester akan dilaksanakan pada tanggal 15-26 Februari 2024. Mahasiswa dapat mengunduh kartu ujian melalui portal akademik mulai tanggal 10 Februari 2024.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
      detail: "Ujian Tengah Semester akan dilaksanakan dengan sistem kombinasi online dan offline sesuai dengan karakteristik mata kuliah. Mata kuliah praktikum dan laboratorium akan dilaksanakan secara tatap muka, sedangkan mata kuliah teori dapat dilaksanakan secara online. Mahasiswa wajib mempersiapkan perangkat dan koneksi internet yang stabil untuk ujian online."
    },
    {
      judul: "Workshop Metodologi Penelitian",
      tanggal: "25 Januari 2024",
      penulis: "Pusat Penelitian ITP",
      kategori: "Workshop",
      views: 650,
      ringkasan: "Workshop metodologi penelitian untuk mahasiswa tingkat akhir guna meningkatkan kualitas tugas akhir dan skripsi.",
      konten: "Workshop akan membahas teknik penulisan proposal dan metodologi penelitian yang baik, serta penggunaan software analisis data terkini.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
      detail: "Workshop metodologi penelitian ini ditujukan khusus untuk mahasiswa semester 6 ke atas yang sedang menyiapkan proposal skripsi. Materi workshop meliputi teknik literature review, desain penelitian, metode sampling, analisis statistik, dan penulisan ilmiah. Workshop akan dipandu oleh dosen-dosen berpengalaman dan peneliti dari lembaga penelitian nasional."
    },
    {
      judul: "Peluncuran Program Magang Industri",
      tanggal: "20 Januari 2024",
      penulis: "Unit Kemitraan",
      kategori: "Program",
      views: 1100,
      ringkasan: "ITP meluncurkan program magang industri dengan 15 perusahaan mitra untuk memberikan pengalaman praktis kepada mahasiswa.",
      konten: "Program magang akan berlangsung selama 6 bulan dan tersedia untuk mahasiswa semester 6. Pendaftaran dibuka mulai 1 Februari 2024.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
      detail: "Program magang industri ini merupakan hasil kerjasama ITP dengan berbagai perusahaan di bidang pertanian, agribisnis, dan teknologi pangan. Mahasiswa akan mendapat bimbingan langsung dari profesional berpengalaman dan kesempatan untuk mengaplikasikan ilmu yang telah dipelajari. Setiap mahasiswa yang mengikuti program ini akan mendapat sertifikat dan rekomendasi dari perusahaan."
    }
  ];

  const handleReadMore = (judul: string) => {
    toast({
      title: "Baca Selengkapnya",
      description: `Artikel lengkap "${judul}" akan segera tersedia.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 pt-8 pb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Berita Akademik</h1>
            <p className="text-lg text-gray-600">Informasi Terkini Seputar Kegiatan Akademik ITP</p>
          </div>

          <div className="space-y-8">
            {berita.map((artikel, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div className="aspect-video md:aspect-square overflow-hidden">
                      <img 
                        src={artikel.image} 
                        alt={artikel.judul}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-green-600 text-green-600">
                          <Tag className="h-3 w-3 mr-1" />
                          {artikel.kategori}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Eye className="h-3 w-3 mr-1" />
                          {artikel.views} views
                        </div>
                      </div>
                      <CardTitle className="text-xl">{artikel.judul}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {artikel.tanggal}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {artikel.penulis}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 font-medium">{artikel.ringkasan}</p>
                      <p className="text-gray-600">{artikel.konten}</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">{artikel.detail}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-green-600 text-green-600 hover:bg-green-50"
                        onClick={() => handleReadMore(artikel.judul)}
                      >
                        Baca Artikel Lengkap
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-50"
              onClick={() => toast({
                title: "Load More",
                description: "Berita lainnya akan segera dimuat.",
              })}
            >
              Muat Berita Lainnya
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaAkademik;
