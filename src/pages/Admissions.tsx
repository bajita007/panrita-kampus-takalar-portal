
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Calendar, FileText, Users, CheckCircle, Clock, DollarSign, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Admissions = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: '',
    highSchool: '',
    graduationYear: '',
    address: '',
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
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.program) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Pendaftaran Berhasil!",
      description: "Data Anda telah diterima. Tim kami akan menghubungi Anda dalam 1x24 jam.",
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      program: '',
      highSchool: '',
      graduationYear: '',
      address: '',
      message: ''
    });
  };

  const requirements = [
    "Ijazah SMA/SMK/MA atau sederajat",
    "Transkrip nilai rapor semester 1-5",
    "Sertifikat prestasi (jika ada)",
    "Pas foto terbaru 3x4 (2 lembar)",
    "Fotokopi KTP dan Kartu Keluarga",
    "Surat keterangan sehat dari dokter"
  ];

  const timeline = [
    { date: "1 Jan - 31 Mei 2024", event: "Pendaftaran Gelombang 1", status: "active" },
    { date: "1 Jun - 15 Jun 2024", event: "Tes Masuk Gelombang 1", status: "upcoming" },
    { date: "20 Jun 2024", event: "Pengumuman Gelombang 1", status: "upcoming" },
    { date: "1 Jul - 31 Agt 2024", event: "Pendaftaran Gelombang 2", status: "upcoming" }
  ];

  const programs = [
    { value: "teknologi-pertanian", label: "Teknologi Pertanian" },
    { value: "agribisnis", label: "Agribisnis" },
    { value: "teknologi-pangan", label: "Teknologi Pangan" }
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
              <Link to="/admissions" className="text-green-600 px-3 py-2 text-sm font-medium">
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
              Penerimaan Mahasiswa Baru
              <span className="block text-green-600">Tahun Akademik 2024/2025</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bergabunglah dengan Institut Teknologi Pertanian Takalar dan wujudkan 
              impian Anda di bidang teknologi pertanian
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Jadwal Penerimaan</h2>
            <p className="text-lg text-gray-600">Timeline penerimaan mahasiswa baru 2024/2025</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, index) => (
              <Card key={index} className={`${item.status === 'active' ? 'border-green-500 bg-green-50' : 'border-gray-200'} hover:shadow-lg transition-shadow duration-300`}>
                <CardHeader className="text-center">
                  <Calendar className={`h-8 w-8 mx-auto mb-2 ${item.status === 'active' ? 'text-green-600' : 'text-gray-400'}`} />
                  <CardTitle className="text-sm font-medium text-gray-600">{item.date}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className={`font-medium ${item.status === 'active' ? 'text-green-700' : 'text-gray-600'}`}>
                    {item.event}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Fee Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-green-600 mb-4" />
                <CardTitle className="text-2xl">Persyaratan Pendaftaran</CardTitle>
                <CardDescription>
                  Dokumen yang harus disiapkan untuk mendaftar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-green-600 mb-4" />
                <CardTitle className="text-2xl">Biaya Pendidikan</CardTitle>
                <CardDescription>
                  Informasi biaya kuliah per semester
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Uang Pangkal</span>
                    <span className="font-semibold">Rp 5.000.000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">SPP per Semester</span>
                    <span className="font-semibold">Rp 3.500.000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Biaya Praktikum</span>
                    <span className="font-semibold">Rp 500.000</span>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-green-700 font-medium">
                      💡 Tersedia beasiswa prestasi hingga 50% untuk siswa berprestasi!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Formulir Pendaftaran</h2>
            <p className="text-lg text-gray-600">
              Isi formulir di bawah ini untuk memulai proses pendaftaran
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Data Calon Mahasiswa</CardTitle>
              <CardDescription>
                Lengkapi semua informasi yang diperlukan dengan benar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nama Lengkap *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="program">Program Studi *</Label>
                    <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih program studi" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program.value} value={program.value}>
                            {program.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="highSchool">Asal Sekolah</Label>
                    <Input
                      id="highSchool"
                      value={formData.highSchool}
                      onChange={(e) => handleInputChange('highSchool', e.target.value)}
                      placeholder="Nama sekolah asal"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Tahun Lulus</Label>
                    <Input
                      id="graduationYear"
                      value={formData.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan (Opsional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Ceritakan motivasi Anda atau pertanyaan lainnya"
                    rows={4}
                  />
                </div>

                <div className="flex justify-center">
                  <Button type="submit" size="lg" className="bg-green-600 hover:bg-green-700 text-white px-12 py-3">
                    Kirim Pendaftaran
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Butuh Bantuan?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Tim admisi kami siap membantu Anda dalam proses pendaftaran
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(0411) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Senin - Jumat: 08:00 - 16:00 WITA</span>
              </div>
            </div>
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

export default Admissions;
