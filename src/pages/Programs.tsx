
import { Link } from 'react-router-dom';
import { GraduationCap, Clock, Users, Award, BookOpen, Microscope, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Programs = () => {
  const programs = [
    {
      title: "Teknologi Pertanian",
      degree: "S1 (Sarjana)",
      duration: "4 Tahun (8 Semester)",
      capacity: "60 Mahasiswa/Tahun",
      accreditation: "A",
      description: "Program studi yang memadukan teknologi modern dengan praktik pertanian berkelanjutan. Mahasiswa akan mempelajari inovasi teknologi untuk meningkatkan produktivitas dan efisiensi pertanian.",
      subjects: [
        "Mekanisasi Pertanian",
        "Teknologi Pascapanen",
        "Sistem Informasi Pertanian",
        "Teknik Irigasi dan Drainase",
        "Teknologi Greenhouse",
        "Precision Agriculture"
      ],
      careers: [
        "Ahli Teknologi Pertanian",
        "Konsultan Agritech",
        "Peneliti Pertanian",
        "Supervisor Perkebunan",
        "Entrepreneur Agribisnis"
      ],
      icon: <Microscope className="h-8 w-8 text-green-600" />
    },
    {
      title: "Agribisnis",
      degree: "S1 (Sarjana)",
      duration: "4 Tahun (8 Semester)",
      capacity: "50 Mahasiswa/Tahun",
      accreditation: "A",
      description: "Fokus pada manajemen bisnis di sektor pertanian dan pengembangan wirausaha agribisnis. Program ini mempersiapkan lulusan yang mampu mengelola bisnis pertanian secara profesional.",
      subjects: [
        "Manajemen Agribisnis",
        "Pemasaran Produk Pertanian",
        "Ekonomi Pertanian",
        "Keuangan Agribisnis",
        "Supply Chain Management",
        "Digital Marketing Agrikultur"
      ],
      careers: [
        "Manajer Agribisnis",
        "Analis Pasar Komoditas",
        "Entrepreneur Pertanian",
        "Konsultan Bisnis Pertanian",
        "Peneliti Ekonomi Pertanian"
      ],
      icon: <TrendingUp className="h-8 w-8 text-green-600" />
    },
    {
      title: "Teknologi Pangan",
      degree: "S1 (Sarjana)",
      duration: "4 Tahun (8 Semester)",
      capacity: "40 Mahasiswa/Tahun",
      accreditation: "B",
      description: "Pengembangan inovasi teknologi pengolahan dan keamanan pangan berkelanjutan. Program ini mengintegrasikan ilmu pangan dengan teknologi modern untuk menghasilkan produk pangan yang aman dan berkualitas.",
      subjects: [
        "Mikrobiologi Pangan",
        "Teknologi Pengolahan Pangan",
        "Keamanan dan Mutu Pangan",
        "Kimia Pangan",
        "Gizi dan Kesehatan",
        "Inovasi Produk Pangan"
      ],
      careers: [
        "Food Technologist",
        "Quality Control Specialist",
        "Product Development Manager",
        "Food Safety Inspector",
        "Nutritionist"
      ],
      icon: <BookOpen className="h-8 w-8 text-green-600" />
    }
  ];

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
              <Link to="/programs" className="text-green-600 px-3 py-2 text-sm font-medium">
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Program Studi
              <span className="block text-green-600">Unggulan ITPT</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilihan program studi berkualitas tinggi yang dirancang untuk menghadapi 
              tantangan masa depan di bidang teknologi pertanian
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="grid lg:grid-cols-3 gap-8 p-8">
                  <div className="lg:col-span-2">
                    <CardHeader className="p-0">
                      <div className="flex items-center mb-4">
                        {program.icon}
                        <div className="ml-4">
                          <CardTitle className="text-2xl mb-2">{program.title}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{program.degree}</Badge>
                            <Badge variant="outline" className={program.accreditation === 'A' ? 'border-green-600 text-green-600' : 'border-blue-600 text-blue-600'}>
                              Akreditasi {program.accreditation}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <CardDescription className="text-gray-600 mb-6 text-base">
                        {program.description}
                      </CardDescription>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-green-600" />
                          {program.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-green-600" />
                          {program.capacity}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Award className="h-4 w-4 mr-2 text-green-600" />
                          Terakreditasi {program.accreditation}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Mata Kuliah Utama</h4>
                      <ul className="space-y-2">
                        {program.subjects.slice(0, 4).map((subject, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            {subject}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Prospek Karir</h4>
                      <ul className="space-y-2">
                        {program.careers.slice(0, 3).map((career, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            {career}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link to="/admissions">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Daftar Program Ini
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Keunggulan Program Studi ITPT</h2>
            <p className="text-lg text-gray-600">Mengapa memilih ITPT untuk masa depan Anda?</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Terakreditasi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Semua program studi telah terakreditasi BAN-PT dengan standar nasional yang tinggi
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Dosen Berkualitas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tenaga pengajar berpengalaman dengan kualifikasi minimal S2 dan banyak yang bergelar Doktor
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Microscope className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Fasilitas Modern</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Laboratorium lengkap dengan peralatan modern untuk mendukung pembelajaran dan penelitian
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Siap Memulai Perjalanan Akademik Anda?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ITPT dan wujudkan impian Anda di bidang teknologi pertanian
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admissions">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Daftar Sekarang
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
                Konsultasi Program
              </Button>
            </Link>
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

export default Programs;
