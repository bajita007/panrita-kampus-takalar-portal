
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, Award, Calendar, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCampusSettings } from '@/hooks/useCampusSettings';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const { toast } = useToast();
  const { settings, loading } = useCampusSettings();
  const [programs, setPrograms] = useState<any[]>([]);
  const [featuredNews, setFeaturedNews] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  useEffect(() => {
    fetchPrograms();
    fetchNews();
    fetchGallery();
  }, []);

  const fetchPrograms = async () => {
    const { data } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .limit(4);
    
    if (data) {
      setPrograms(data.map(program => ({
        title: program.name,
        description: program.description,
        icon: <Users className="h-8 w-8 text-green-600" />,
        image: program.image_url || "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400",
        accreditation: program.accreditation
      })));
    }
  };

  const fetchNews = async () => {
    const { data } = await supabase
      .from('news')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3);
    
    if (data) {
      setFeaturedNews(data.map(news => ({
        id: news.id,
        title: news.title,
        date: new Date(news.created_at!).toLocaleDateString('id-ID'),
        description: news.excerpt || news.content.substring(0, 150) + '...',
        image: news.image_url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"
      })));
    }
  };

  const fetchGallery = async () => {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .eq('is_active', true)
      .limit(5);
    
    if (data) {
      setGalleryImages(data);
    }
  };

  const handleButtonClick = (buttonName: string) => {
    toast({
      title: "Navigasi",
      description: `Tombol "${buttonName}" diklik. Halaman akan segera tersedia.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Featured Image */}
      <section className="pt-16 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1586281010691-3d3857c8e9ad?w=1200" 
            alt="Agricultural Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="pt-8 pb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {settings.hero_title || 'Institut Teknologi'}
                <span className="block text-green-600">Pertanian</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {settings.hero_description || 'Bagian dari Yayasan Panrita Takalar - Mengembangkan teknologi pertanian berkelanjutan untuk masa depan Indonesia yang lebih hijau dan sejahtera'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admissions">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                    Daftar Sekarang
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
                  onClick={() => handleButtonClick("Pelajari Lebih Lanjut")}
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={settings.hero_image || "https://images.unsplash.com/photo-1562774053-701939374585?w=600"} 
                alt="Campus ITP"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section with Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Studi Unggulan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilihan program studi berkualitas tinggi yang dirancang untuk menghadapi tantangan masa depan
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    {program.icon}
                  </div>
                  <CardTitle className="text-lg">{program.title}</CardTitle>
                  <Badge variant="outline" className="border-green-600 text-green-600 mx-auto">
                    {program.accreditation}
                  </Badge>
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
              <div className="text-4xl font-bold mb-2">{settings.student_count || '1000+'}+</div>
              <div className="text-green-100">Mahasiswa Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{settings.lecturer_count || '50+'}+</div>
              <div className="text-green-100">Dosen Berkualitas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{settings.research_count || '20+'}+</div>
              <div className="text-green-100">Penelitian Unggulan</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{settings.graduation_rate || '95'}%</div>
              <div className="text-green-100">Tingkat Kelulusan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Section with Images */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Berita & Pengumuman Terbaru</h2>
            <p className="text-lg text-gray-600">Informasi terkini seputar kegiatan kampus</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredNews.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {item.date}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{item.description}</CardDescription>
                  <Link to={`/news/${item.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    >
                      Baca Selengkapnya
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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

      {/* Gallery Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Galeri Kampus</h2>
            <p className="text-lg text-gray-600">Lihat kehidupan kampus dan kegiatan mahasiswa</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            {galleryImages.slice(0, 5).map((image, index) => (
              <div key={image.id} className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                <img 
                  src={image.image_url} 
                  alt={image.title}
                  className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
            {galleryImages.length === 0 && (
              <>
                <div className="md:col-span-2 md:row-span-2">
                  <img 
                    src="https://images.unsplash.com/photo-1562774053-701939374585?w=600" 
                    alt="Campus Life"
                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300" 
                    alt="Academic Activity"
                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300" 
                    alt="Student Activity"
                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300" 
                    alt="Research"
                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300" 
                    alt="Laboratory"
                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
                Lihat Galeri Lengkap
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
                <span className="font-bold text-xl">ITP</span>
              </div>
              <p className="text-gray-300 mb-4">
                Institut Teknologi Pertanian - Yayasan Panrita Takalar
              </p>
              <p className="text-gray-400 text-sm">
                Mengembangkan teknologi pertanian untuk masa depan yang berkelanjutan
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Program Studi</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/programs" className="hover:text-green-400 transition-colors">Agribisnis</Link></li>
                <li><Link to="/programs" className="hover:text-green-400 transition-colors">Manajemen Sumber Daya Perairan</Link></li>
                <li><Link to="/programs" className="hover:text-green-400 transition-colors">Bisnis Digital</Link></li>
                <li><Link to="/programs" className="hover:text-green-400 transition-colors">Nutrisi dan Teknologi Pakan Ternak</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Informasi</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-green-400 transition-colors">Tentang ITP</Link></li>
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
                  <span className="text-sm">{settings.contact_address || 'Jl. Pendidikan No. 1, Takalar, Sulawesi Selatan'}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-green-400" />
                  <span className="text-sm">{settings.contact_phone || '(0411) 123-4567'}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-green-400" />
                  <span className="text-sm">{settings.contact_email || 'info@itptakalar.ac.id'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Institut Teknologi Pertanian - Yayasan Panrita Takalar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
