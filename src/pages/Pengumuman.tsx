
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, AlertCircle, CheckCircle, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Pengumuman = () => {
  const { toast } = useToast();
  const [pengumuman, setPengumuman] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPengumuman(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast({
        title: "Error",
        description: "Gagal memuat pengumuman",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
      case 'tinggi':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'medium':
      case 'sedang':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'low':
      case 'rendah':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleReadAnnouncement = (judul: string) => {
    toast({
      title: "Detail Pengumuman", 
      description: `Detail lengkap "${judul}" akan segera tersedia.`,
    });
  };

  const getPriorityColor = (prioritas: string) => {
    switch (prioritas) {
      case 'tinggi': return 'bg-red-100 text-red-800';
      case 'sedang': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Pengumuman</h1>
            <p className="text-lg text-gray-600">Pengumuman Resmi Institut Teknologi Pertanian Takalar</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-gray-500">Memuat pengumuman...</div>
            </div>
          ) : pengumuman.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada pengumuman</h3>
              <p className="text-gray-500">Pengumuman akan ditampilkan di sini</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pengumuman.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl flex items-center gap-2">
                          {getIcon(item.priority)}
                          {item.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(item.created_at)}
                          </div>
                          <span className="text-sm text-gray-500">{item.category}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority.toUpperCase()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{item.content}</p>
                    <Button 
                      variant="outline" 
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => handleReadAnnouncement(item.title)}
                    >
                      Baca Detail
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl text-green-600">Berlangganan Pengumuman</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Dapatkan notifikasi pengumuman terbaru langsung ke email Anda.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => toast({
                    title: "Berlangganan Email",
                    description: "Fitur berlangganan email akan segera tersedia.",
                  })}
                >
                  Berlangganan Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengumuman;
