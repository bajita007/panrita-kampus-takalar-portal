
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JadwalSeminar = () => {
  const { toast } = useToast();

  const seminar = [
    {
      jenis: "Seminar Proposal",
      nama: "Ahmad Fauzi",
      judul: "Penerapan Teknologi IoT dalam Sistem Irigasi Tanaman Padi",
      tanggal: "15 Februari 2024",
      waktu: "09:00 - 11:00",
      tempat: "Ruang Seminar Lantai 2"
    },
    {
      jenis: "Seminar Hasil",
      nama: "Siti Aminah",
      judul: "Analisis Efektivitas Pupuk Organik terhadap Produktivitas Jagung",
      tanggal: "16 Februari 2024", 
      waktu: "13:00 - 15:00",
      tempat: "Ruang Seminar Lantai 2"
    },
    {
      jenis: "Ujian Tugas Akhir",
      nama: "Muhammad Rizki",
      judul: "Pengembangan Sistem Monitoring Kualitas Tanah Berbasis Sensor",
      tanggal: "17 Februari 2024",
      waktu: "10:00 - 12:00", 
      tempat: "Ruang Sidang Lantai 3"
    }
  ];

  const handleDaftarSeminar = () => {
    toast({
      title: "Pendaftaran Seminar",
      description: "Formulir pendaftaran seminar akan segera tersedia.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Jadwal Seminar</h1>
            <p className="text-lg text-gray-600">Seminar Proposal, Hasil, dan Ujian Tugas Akhir</p>
          </div>

          <div className="text-center mb-8">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleDaftarSeminar}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Daftar Seminar
            </Button>
          </div>

          <div className="space-y-6">
            {seminar.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{item.nama}</CardTitle>
                      <CardDescription className="text-green-600 font-medium">{item.jenis}</CardDescription>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {item.jenis}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-medium text-gray-900">{item.judul}</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-green-600" />
                      {item.tanggal}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      {item.waktu}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      {item.tempat}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JadwalSeminar;
