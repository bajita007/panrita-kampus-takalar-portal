
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap, Users, BookOpen, Award, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const programs = [
    {
      title: "Teknologi Pertanian",
      description: "Program studi unggulan yang memadukan teknologi modern dengan praktik pertanian berkelanjutan",
      icon: <GraduationCap className="h-8 w-8 text-green-600" />
    },
    {
      title: "Agribisnis",
      description: "Fokus pada manajemen bisnis di sektor pertanian dan pengembangan wirausaha agribisnis",
      icon: <Users className="h-8 w-8 text-green-600" />
    },
    {
      title: "Teknologi Pangan",
      description: "Pengembangan inovasi teknologi pengolahan dan keamanan pangan berkelanjutan",
      icon: <BookOpen className="h-8 w-8 text-green-600" />
    }
  ];

  const news = [
    {
      title: "Penerimaan Mahasiswa Baru 2024/2025",
      date: "15 Januari 2024",
      description: "Pendaftaran mahasiswa baru untuk tahun akademik 2024/2025 telah dibuka dengan berbagai program beasiswa unggulan."
    },
    {
      title: "Kerja Sama dengan Kementerian Pertanian",
      date: "10 Januari 2024",
      description: "ITPT menandatangani MoU dengan Kementerian Pertanian untuk pengembangan teknologi pertanian berkelanjutan."
    },
    {
      title: "Penelitian Unggul Dosen ITPT",
      date: "5 Januari 2024",
      description: "Tim peneliti ITPT berhasil mengembangkan varietas padi unggul yang tahan terhadap perubahan iklim."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <GraduationCap className="h-8 w-8 text-green-600 mr-2" />
                <span className="font-bold text-xl text-gray-900">ITPT</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-900 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
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
              <Link to="/news" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Berita
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Kontak
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-green-600">
                Beranda
              </Link>
              <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600">
                Tentang
              </Link>
              <Link to="/programs" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600">
                Program Studi
              </Link>
              <Link to="/admissions" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600">
                Penerimaan
              </Link>
              <Link to="/news" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600">
                Berita
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600">
                Kontak
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Institut Teknologi
              <span className="block text-green-600">Pertanian Takalar</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Bagian dari Yayasan Panrita Takalar - Mengembangkan teknologi pertanian berkelanjutan 
              untuk masa depan Indonesia yang lebih hijau dan sejahtera
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Daftar Sekarang
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Studi Unggulan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilihan program studi berkualitas tinggi yang dirancang untuk menghadapi tantangan masa depan
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    {program.icon}
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {program.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/programs">
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
                Lihat Semua Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-green-100">Mahasiswa Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-green-100">Dosen Berkualitas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-green-100">Penelitian Unggulan</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Tingkat Kelulusan</div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Berita & Pengumuman</h2>
            <p className="text-lg text-gray-600">Informasi terkini seputar kegiatan kampus</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {item.date}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/news">
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
                Lihat Semua Berita
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-green-400 mr-2" />
                <span className="font-bold text-xl">ITPT</span>
              </div>
              <p className="text-gray-300 mb-4">
                Institut Teknologi Pertanian Takalar - Yayasan Panrita Takalar
              </p>
              <p className="text-gray-400 text-sm">
                Mengembangkan teknologi pertanian untuk masa depan yang berkelanjutan
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Program Studi</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/programs" className="hover:text-green-400 transition-colors">Teknologi Pertanian</Link></li>
                <li><Link to="/programs" className="hover:text-green-400 transition-colors">Agribisnis</Link></li>
                <li><Link to="/programs" className="hover:text-green-400 transition-colors">Teknologi Pangan</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Informasi</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-green-400 transition-colors">Tentang ITPT</Link></li>
                <li><Link to="/admissions" className="hover:text-green-400 transition-colors">Penerimaan</Link></li>
                <li><Link to="/news" className="hover:text-green-400 transition-colors">Berita</Link></li>
                <li><Link to="/contact" className="hover:text-green-400 transition-colors">Kontak</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Kontak</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-green-400" />
                  <span className="text-sm">Jl. Pendidikan No. 1, Takalar, Sulawesi Selatan</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-green-400" />
                  <span className="text-sm">(0411) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-green-400" />
                  <span className="text-sm">info@itptakalar.ac.id</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Institut Teknologi Pertanian Takalar - Yayasan Panrita Takalar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
