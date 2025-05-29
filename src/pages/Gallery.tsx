
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      category: "Kampus",
      images: [
        {
          src: "https://images.unsplash.com/photo-1562774053-701939374585?w=500",
          title: "Gedung Utama ITP",
          description: "Gedung utama Institut Teknologi Pertanian"
        },
        {
          src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500", 
          title: "Laboratorium Teknologi Pertanian",
          description: "Fasilitas laboratorium modern untuk praktikum mahasiswa"
        },
        {
          src: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=500",
          title: "Perpustakaan ITP",
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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 pt-8 pb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Galeri</h1>
            <p className="text-lg text-gray-600">Dokumentasi Kegiatan Institut Teknologi Pertanian</p>
          </div>

          {galleryImages.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.images.map((image, imageIndex) => (
                  <Card key={imageIndex} className="hover:shadow-lg transition-shadow overflow-hidden">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="aspect-video overflow-hidden cursor-pointer">
                          <img 
                            src={image.src} 
                            alt={image.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0">
                        <div className="relative">
                          <img 
                            src={image.src.replace('w=500', 'w=1200')} 
                            alt={image.title}
                            className="w-full h-auto"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
                            <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
                            <p className="text-sm">{image.description}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                      <p className="text-sm text-gray-600">{image.description}</p>
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
