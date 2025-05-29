
import { Link } from 'react-router-dom';
import { GraduationCap, Target, Eye, Award, Users, BookOpen, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
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
              <Link to="/about" className="text-green-600 px-3 py-2 text-sm font-medium">
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tentang Institut Teknologi
              <span className="block text-green-600">Pertanian Takalar</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Institusi pendidikan tinggi yang berkomitmen untuk mengembangkan teknologi pertanian 
              berkelanjutan di bawah naungan Yayasan Panrita Takalar
            </p>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Profil Institut</h2>
              <p className="text-gray-600 mb-6">
                Institut Teknologi Pertanian Takalar (ITPT) adalah institusi pendidikan tinggi yang berada 
                di bawah naungan Yayasan Panrita Takalar. Didirikan dengan visi untuk menjadi pusat 
                keunggulan dalam pengembangan teknologi pertanian yang berkelanjutan dan inovatif.
              </p>
              <p className="text-gray-600 mb-6">
                Sebagai bagian integral dari sistem pendidikan nasional Indonesia, ITPT berkomitmen 
                untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan 
                global di bidang pertanian dan teknologi.
              </p>
              <p className="text-gray-600">
                Dengan dukungan penuh dari Yayasan Panrita Takalar, ITPT terus berinovasi dalam 
                mengembangkan kurikulum yang relevan dengan kebutuhan industri dan perkembangan 
                teknologi terkini.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">2020</div>
                  <div className="text-gray-600">Tahun Berdiri</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                  <div className="text-gray-600">Program Studi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">A</div>
                  <div className="text-gray-600">Akreditasi BAN-PT</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
                  <div className="text-gray-600">Alumni</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="h-full">
              <CardHeader className="text-center">
                <Eye className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Menjadi institut teknologi pertanian terdepan di Indonesia yang menghasilkan 
                  lulusan berkualitas, inovatif, dan berkarakter dalam mengembangkan teknologi 
                  pertanian berkelanjutan untuk kesejahteraan masyarakat pada tahun 2030.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Menyelenggarakan pendidikan tinggi berkualitas di bidang teknologi pertanian
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Mengembangkan penelitian inovatif untuk kemajuan teknologi pertanian
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Melaksanakan pengabdian masyarakat untuk pemberdayaan petani
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Membangun kerjasama strategis dengan berbagai pihak
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Institusi</h2>
            <p className="text-lg text-gray-600">Prinsip dasar yang memandu setiap kegiatan di ITPT</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Integritas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Menjunjung tinggi kejujuran, transparansi, dan akuntabilitas dalam setiap kegiatan
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Microscope className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Inovasi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Mendorong kreativitas dan pengembangan teknologi baru untuk kemajuan pertanian
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Kolaborasi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Membangun kerjasama yang saling menguntungkan dengan berbagai pihak
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Yayasan Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Yayasan Panrita Takalar</h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              ITPT bangga menjadi bagian dari Yayasan Panrita Takalar yang telah berdedikasi 
              dalam bidang pendidikan dan pengembangan masyarakat di Sulawesi Selatan
            </p>
            <p className="text-lg text-green-100 max-w-4xl mx-auto">
              Dengan dukungan penuh dari yayasan, ITPT terus berkembang menjadi institusi pendidikan 
              yang memberikan kontribusi nyata bagi kemajuan teknologi pertanian di Indonesia
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Bergabunglah dengan ITPT
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Wujudkan impian Anda untuk berkontribusi dalam pengembangan teknologi pertanian Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admissions">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Daftar Sekarang
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3">
                Lihat Program Studi
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

export default About;
