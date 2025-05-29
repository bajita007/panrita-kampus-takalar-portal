
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda kembali.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-green-600" />,
      title: "Alamat Kampus",
      details: [
        "Jl. Pendidikan No. 1, Takalar",
        "Sulawesi Selatan, Indonesia",
        "Kode Pos: 92212"
      ]
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Nomor Telepon",
      details: [
        "Telepon: (0411) 123-4567",
        "WhatsApp: +62 812-3456-7890",
        "Fax: (0411) 123-4568"
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-green-600" />,
      title: "Email",
      details: [
        "info@itptakalar.ac.id",
        "admisi@itptakalar.ac.id",
        "humas@itptakalar.ac.id"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-green-600" />,
      title: "Jam Operasional",
      details: [
        "Senin - Jumat: 08:00 - 16:00 WITA",
        "Sabtu: 08:00 - 12:00 WITA",
        "Minggu: Tutup"
      ]
    }
  ];

  const departments = [
    { value: "admisi", label: "Penerimaan Mahasiswa Baru" },
    { value: "akademik", label: "Bagian Akademik" },
    { value: "kemahasiswaan", label: "Kemahasiswaan" },
    { value: "keuangan", label: "Keuangan" },
    { value: "humas", label: "Humas & Kerjasama" },
    { value: "umum", label: "Pertanyaan Umum" }
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
              <Link to="/programs" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Program Studi
              </Link>
              <Link to="/admissions" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Penerimaan
              </Link>
              <Link to="/news" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Berita
              </Link>
              <Link to="/contact" className="text-green-600 px-3 py-2 text-sm font-medium">
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
              Hubungi
              <span className="block text-green-600">ITPT</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami siap membantu menjawab pertanyaan Anda tentang Institut Teknologi Pertanian Takalar. 
              Jangan ragu untuk menghubungi kami!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Informasi Kontak</h2>
            <p className="text-lg text-gray-600">Berbagai cara untuk menghubungi kami</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {info.icon}
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-green-600 mb-4" />
                <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
                <CardDescription>
                  Lengkapi formulir di bawah ini dan kami akan merespons secepat mungkin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="contoh@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Keperluan *</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih keperluan" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tuliskan pesan atau pertanyaan Anda..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Location */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <MapPin className="h-8 w-8 text-green-600 mb-4" />
                  <CardTitle className="text-2xl">Lokasi Kampus</CardTitle>
                  <CardDescription>
                    Temukan kami di jantung kota Takalar, Sulawesi Selatan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-gray-500">Google Maps Embed</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Alamat Lengkap</h4>
                      <p className="text-gray-600">
                        Jl. Pendidikan No. 1, Takalar<br />
                        Sulawesi Selatan, Indonesia 92212
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Akses Transportasi</h4>
                      <ul className="text-gray-600 space-y-1 text-sm">
                        <li>• 15 menit dari Bandara Sultan Hasanuddin</li>
                        <li>• 30 menit dari pusat kota Makassar</li>
                        <li>• Tersedia angkutan umum dan ojek online</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-green-900 mb-2">Butuh Bantuan Cepat?</h3>
                    <p className="text-green-700 text-sm mb-4">
                      Hubungi WhatsApp kami untuk respon yang lebih cepat
                    </p>
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-lg text-gray-600">Jawaban untuk pertanyaan umum tentang ITPT</p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "Bagaimana cara mendaftar di ITPT?",
                answer: "Anda dapat mendaftar melalui halaman Penerimaan di website kami atau datang langsung ke kampus. Proses pendaftaran dibuka setiap tahun pada bulan Januari hingga Mei."
              },
              {
                question: "Apakah tersedia program beasiswa?",
                answer: "Ya, ITPT menyediakan berbagai program beasiswa seperti beasiswa prestasi, beasiswa tidak mampu, dan beasiswa kerjasama dengan berbagai institusi."
              },
              {
                question: "Berapa lama masa studi di ITPT?",
                answer: "Masa studi untuk program S1 adalah 4 tahun (8 semester) untuk semua program studi yang tersedia di ITPT."
              },
              {
                question: "Apakah lulusan ITPT mudah mendapat pekerjaan?",
                answer: "Ya, tingkat penyerapan lulusan ITPT mencapai 95% dalam 6 bulan setelah lulus. Kami memiliki jaringan kerjasama yang luas dengan industri pertanian."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {faq.answer}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
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
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Kontak Cepat</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>(0411) 123-4567</li>
                <li>info@itptakalar.ac.id</li>
                <li>Jl. Pendidikan No. 1, Takalar</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Program Studi</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link to="/programs" className="hover:text-green-400 transition-colors">Teknologi Pertanian</Link></li>
                <li><Link to="/programs" className="hover:text-green-400 transition-colors">Agribisnis</Link></li>
                <li><Link to="/programs" className="hover:text-green-400 transition-colors">Teknologi Pangan</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Informasi</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link to="/about" className="hover:text-green-400 transition-colors">Tentang ITPT</Link></li>
                <li><Link to="/admissions" className="hover:text-green-400 transition-colors">Penerimaan</Link></li>
                <li><Link to="/news" className="hover:text-green-400 transition-colors">Berita</Link></li>
              </ul>
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

export default Contact;
