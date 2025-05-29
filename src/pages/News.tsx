
import { Link } from 'react-router-dom';
import { GraduationCap, Calendar, User, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const News = () => {
  const featuredNews = {
    title: "ITPT Raih Penghargaan Kampus Berkelanjutan 2024",
    excerpt: "Institut Teknologi Pertanian Takalar berhasil meraih penghargaan sebagai kampus berkelanjutan terbaik di Sulawesi Selatan berkat inovasi teknologi ramah lingkungan dan program pengembangan pertanian berkelanjutan.",
    date: "25 Januari 2024",
    author: "Tim Humas ITPT",
    category: "Prestasi",
    image: "/placeholder.svg"
  };

  const newsItems = [
    {
      title: "Penerimaan Mahasiswa Baru 2024/2025 Dibuka",
      excerpt: "Pendaftaran mahasiswa baru untuk tahun akademik 2024/2025 telah resmi dibuka dengan berbagai program beasiswa unggulan untuk calon mahasiswa berprestasi.",
      date: "20 Januari 2024",
      author: "Bagian Akademik",
      category: "Pengumuman",
      featured: false
    },
    {
      title: "Kerja Sama Penelitian dengan Universitas Hasanuddin",
      excerpt: "ITPT menjalin kerjasama strategis dengan Universitas Hasanuddin dalam bidang penelitian teknologi pertanian dan pengembangan varietas unggul.",
      date: "18 Januari 2024",
      author: "Tim Penelitian",
      category: "Kerjasama",
      featured: false
    },
    {
      title: "Workshop Teknologi Precision Agriculture",
      excerpt: "Mahasiswa dan dosen ITPT mengikuti workshop teknologi precision agriculture yang diselenggarakan bersama dengan pakar dari IPB University.",
      date: "15 Januari 2024",
      author: "Dr. Ahmad Hidayat",
      category: "Akademik",
      featured: false
    },
    {
      title: "Mahasiswa ITPT Juara Kompetisi Inovasi Teknologi Pertanian",
      excerpt: "Tim mahasiswa Program Studi Teknologi Pertanian berhasil meraih juara 1 dalam kompetisi inovasi teknologi pertanian tingkat nasional.",
      date: "12 Januari 2024",
      author: "Tim Kemahasiswaan",
      category: "Prestasi",
      featured: false
    },
    {
      title: "Seminar Nasional: Masa Depan Pertanian Indonesia",
      excerpt: "ITPT sukses menyelenggarakan seminar nasional dengan tema 'Masa Depan Pertanian Indonesia di Era Digital' yang dihadiri 500+ peserta.",
      date: "10 Januari 2024",
      author: "Panitia Seminar",
      category: "Event",
      featured: false
    },
    {
      title: "Penelitian Dosen ITPT Dimuat di Jurnal Internasional",
      excerpt: "Penelitian tentang teknologi pengolahan pakan ternak berkelanjutan berhasil dipublikasikan di jurnal internasional bereputasi.",
      date: "8 Januari 2024",
      author: "Dr. Siti Aminah",
      category: "Penelitian",
      featured: false
    }
  ];

  const categories = ["Semua", "Pengumuman", "Prestasi", "Kerjasama", "Akademik", "Event", "Penelitian"];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Pengumuman": "bg-blue-100 text-blue-800",
      "Prestasi": "bg-yellow-100 text-yellow-800",
      "Kerjasama": "bg-green-100 text-green-800",
      "Akademik": "bg-purple-100 text-purple-800",
      "Event": "bg-pink-100 text-pink-800",
      "Penelitian": "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <GraduationCap className="h-8 w-8 text-green-600 mr-2" />
                <span className="font-bold text-xl text-gray-900">ITPT</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Beranda
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Tentang
              </Link>
              <Link to="/programs" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Program Studi
              </Link>
              <Link to="/admissions" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Penerimaan
              </Link>
              <Link to="/news" className="text-green-600 px-3 py-2 text-sm font-medium">
                Berita
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Berita & Pengumuman
              <span className="block text-green-600">ITPT</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Informasi terkini seputar kegiatan akademik, penelitian, dan pencapaian 
              Institut Teknologi Pertanian Takalar
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari berita..."
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "Semua" ? "default" : "outline"}
                  size="sm"
                  className={category === "Semua" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 lg:p-12 flex items-center">
                <div className="w-full h-64 lg:h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Featured Image</span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className={getCategoryColor(featuredNews.category)}>
                    {featuredNews.category}
                  </Badge>
                  <div className="text-sm text-gray-500">BERITA UTAMA</div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="mr-4">{featuredNews.date}</span>
                  <User className="h-4 w-4 mr-2" />
                  <span>{featuredNews.author}</span>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 w-fit">
                  Baca Selengkapnya
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Berita Terbaru</h2>
            <p className="text-lg text-gray-600">Update terkini dari kampus ITPT</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(news.category)}>
                      {news.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 hover:text-green-600 transition-colors cursor-pointer">
                    {news.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                    {news.excerpt}
                  </CardDescription>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{news.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="h-4 w-4 mr-2" />
                    <span>{news.author}</span>
                  </div>
                  <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                    Baca Selengkapnya
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
              Muat Berita Lainnya
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Tetap Terhubung dengan ITPT
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Dapatkan update berita dan pengumuman terbaru langsung di email Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder="Masukkan email Anda"
              className="bg-white text-gray-900"
            />
            <Button variant="secondary" className="whitespace-nowrap">
              Berlangganan
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-green-400 mr-2" />
              <span className="font-bold text-xl">ITPT</span>
            </div>
            <p className="text-gray-300 mb-4">
              Institut Teknologi Pertanian Takalar - Yayasan Panrita Takalar
            </p>
            <p className="text-gray-400 text-sm">
              &copy; 2024 Institut Teknologi Pertanian Takalar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default News;
