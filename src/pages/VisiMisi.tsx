
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const VisiMisi = () => {
  const { toast } = useToast();
  const [visionMission, setVisionMission] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisionMission();
  }, []);

  const fetchVisionMission = async () => {
    try {
      const { data, error } = await supabase
        .from('campus_settings')
        .select('setting_key, setting_value')
        .eq('setting_key', 'vision_mission')
        .single();

      if (error) {
        console.error('Error fetching vision mission:', error);
      } else if (data) {
        setVisionMission(data.setting_value || {});
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data visi dan misi",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="flex justify-center items-center h-96">
            <div className="text-gray-500">Memuat visi dan misi...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 pt-8 pb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Visi dan Misi</h1>
            <p className="text-lg text-gray-600">Institut Teknologi Pertanian</p>
          </div>

          <div className="space-y-8">
            <Card className="border-green-200">
              <CardHeader className="text-center bg-green-50">
                <Eye className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-green-800">VISI</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 text-center leading-relaxed">
                  {visionMission.vision || 
                    "Menjadi institusi pendidikan tinggi yang unggul dalam pengembangan teknologi pertanian berkelanjutan dan menghasilkan lulusan yang kompeten, inovatif, dan berkarakter untuk kesejahteraan masyarakat pada tahun 2030"
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="text-center bg-blue-50">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-blue-800">MISI</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {(visionMission.missions || [
                    "Menyelenggarakan pendidikan tinggi berkualitas di bidang teknologi pertanian yang berlandaskan nilai-nilai islami dan kearifan lokal",
                    "Mengembangkan penelitian dan inovasi teknologi pertanian yang berkelanjutan untuk meningkatkan produktivitas dan kesejahteraan petani",
                    "Melaksanakan pengabdian kepada masyarakat melalui transfer teknologi dan pemberdayaan masyarakat di bidang pertanian",
                    "Membangun kemitraan strategis dengan berbagai institusi dalam dan luar negeri untuk pengembangan ilmu pengetahuan dan teknologi pertanian"
                  ]).map((mission: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{mission}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader className="text-center bg-yellow-50">
                <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-yellow-800">TUJUAN</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Tujuan Pendidikan</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        Menghasilkan lulusan yang kompeten di bidang teknologi pertanian
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        Menciptakan sumber daya manusia yang berkarakter dan berintegritas
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        Mengembangkan kemampuan berpikir kritis dan inovatif
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Tujuan Penelitian</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        Menghasilkan teknologi pertanian yang applicable
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        Memberikan solusi terhadap masalah pertanian
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        Meningkatkan publikasi ilmiah berkualitas
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisiMisi;
