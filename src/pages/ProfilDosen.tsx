
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Lecturer {
  id: string;
  name: string;
  field: string;
  education: string;
  experience?: string;
  email?: string;
  phone?: string;
  image_url?: string;
  is_active: boolean;
}

const ProfilDosen = () => {
  const { toast } = useToast();
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const { data, error } = await supabase
        .from('lecturers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLecturers(data || []);
    } catch (error) {
      console.error('Error fetching lecturers:', error);
      toast({
        title: "Error",
        description: "Gagal memuat profil dosen",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactDosen = (lecturer: Lecturer) => {
    if (lecturer.email) {
      window.location.href = `mailto:${lecturer.email}`;
    } else {
      toast({
        title: "Kontak Dosen",
        description: `Email ${lecturer.name} belum tersedia.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Profil Dosen</h1>
            <p className="text-lg text-gray-600">Dosen Berkualitas Institut Teknologi Pertanian Takalar</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-lg">Memuat profil dosen...</div>
            </div>
          ) : lecturers.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Belum ada profil dosen</h3>
              <p className="text-gray-600">Profil dosen akan segera ditampilkan</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lecturers.map((lecturer) => (
                <Card key={lecturer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {lecturer.image_url && (
                      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                        <img 
                          src={lecturer.image_url} 
                          alt={lecturer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardTitle className="text-lg">{lecturer.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{lecturer.field}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Pendidikan:</p>
                      <p className="text-sm text-gray-600">{lecturer.education}</p>
                    </div>
                    {lecturer.experience && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Pengalaman:</p>
                        <p className="text-sm text-gray-600">{lecturer.experience}</p>
                      </div>
                    )}
                    {lecturer.phone && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Telepon:</p>
                        <p className="text-sm text-gray-600">{lecturer.phone}</p>
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleContactDosen(lecturer)}
                    >
                      {lecturer.email ? 'Kirim Email' : 'Kontak Dosen'}
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

export default ProfilDosen;
