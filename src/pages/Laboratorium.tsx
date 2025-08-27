
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Microscope } from 'lucide-react';

const Laboratorium = () => {
  const { toast } = useToast();
  const [labs, setLabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaboratories();
  }, []);

  const fetchLaboratories = async () => {
    try {
      const { data, error } = await supabase
        .from('laboratories')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setLabs(data || []);
    } catch (error) {
      console.error('Error fetching laboratories:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data laboratorium",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookLab = (labName: string) => {
    toast({
      title: "Pemesanan Laboratorium",
      description: `Formulir pemesanan ${labName} akan segera tersedia.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Laboratorium</h1>
            <p className="text-lg text-gray-600">Fasilitas Laboratorium Institut Teknologi Pertanian Takalar</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-gray-500">Memuat data laboratorium...</div>
            </div>
          ) : labs.length === 0 ? (
            <div className="text-center py-12">
              <Microscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada data laboratorium</h3>
              <p className="text-gray-500">Data laboratorium akan ditampilkan di sini</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {labs.map((lab, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600">{lab.name}</CardTitle>
                    <CardDescription>{lab.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Fasilitas:</p>
                      <ul className="space-y-1">
                        {(lab.facilities || []).map((item: string, idx: number) => (
                          <li key={idx} className="text-sm text-gray-600">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Kapasitas:</span> {lab.capacity || 0} mahasiswa
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => handleBookLab(lab.name)}
                    >
                      Pesan Laboratorium
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Laboratorium;
