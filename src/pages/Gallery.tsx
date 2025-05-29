
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Gallery = () => {
  const { toast } = useToast();

  const galleryImages = [
    {
      category: "Kampus",
      images: [
        {
          src: "https://images.unsplash.com/photo-1562774053-701939374585?w=500",
          title: "Gedung Utama ITPT",
          description: "Gedung utama Institut Teknologi Pertanian Takalar"
        },
        {
          src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500", 
          title: "Laboratorium Teknologi Pertanian",
          description: "Fasilitas laboratorium modern untuk praktikum mahasiswa"
        },
        {
          src: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=500",
          title: "Perpustakaan ITPT",
          description: "Perpustakaan dengan koleksi buku dan jurnal lengkap"
        }
      ]
    },
    {
      category: "Kegiatan Akademik",
      images: [
        {
          src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500",
          title: "Seminar Nasional Pertanian",
          description: "Seminar nasional dengan pembicara ahli pertanian"
        },
        {
          src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500",
          title: "Workshop Teknologi Pertanian",
          description: "Workshop praktik teknologi pertanian modern"
        },
        {
          src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500",
          title: "Praktikum Laboratorium",
          description: "Mahasiswa melakukan praktikum di laboratorium"
        }
      ]
    },
    {
      category: "Kegiatan Mahasiswa",
      images: [
        {
          src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500",
          title: "Lomba Karya Tulis Ilmiah",
          description: "Kompetisi karya tulis ilmiah antar mahasiswa"
        },
        {
          src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500",
          title: "Study Tour Industri",
          description: "Kunjungan mahasiswa ke industri pertanian"
        },
        {
          src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=500",
          title: "Bakti Sosial ke Petani",
          description: "Kegiatan pengabdian masyarakat bersama petani lokal"
        }
      ]
    }
  ];

  const handleImageClick = (title: string) => {
    toast({
      title: "Lihat Detail",
      description: `Detail foto "${title}" akan segera tersedia.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Galeri</h1>
            <p className="text-lg text-gray-600">Dokumentasi Kegiatan Institut Teknologi Pertanian Takalar</p>
          </div>

          {galleryImages.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.images.map((image, imageIndex) => (
                  <Card key={imageIndex} className="hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={image.src} 
                        alt={image.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{image.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-green-600 text-green-600 hover:bg-green-50"
                        onClick={() => handleImageClick(image.title)}
                      >
                        Lihat Detail
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
