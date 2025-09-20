
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

const Gallery = () => {
  const { toast } = useToast();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast({
        title: "Error",
        description: "Gagal memuat galeri",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const groupedItems = galleryItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GalleryItem[]>);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 pt-8 pb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Galeri</h1>
            <p className="text-lg text-gray-600">Dokumentasi Kegiatan Institut Teknologi Pertanian</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-lg">Memuat galeri...</div>
            </div>
          ) : Object.keys(groupedItems).length === 0 ? (
            <div className="text-center py-12">
              <div className="text-lg text-gray-500">Belum ada item galeri yang tersedia</div>
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="aspect-video overflow-hidden cursor-pointer">
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full p-0">
                          <div className="relative">
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="w-full h-auto"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
                              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                              <p className="text-sm">{item.description}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
