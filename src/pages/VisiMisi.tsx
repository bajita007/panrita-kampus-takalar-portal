
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const VisiMisi = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Visi dan Misi</h1>
            <p className="text-lg text-gray-600">Institut Teknologi Pertanian Takalar</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">VISI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Menjadi institusi pendidikan tinggi yang unggul dalam bidang teknologi pertanian 
                  dan berkelanjutan pada tahun 2030, yang mampu menghasilkan lulusan berkualitas 
                  dan berdaya saing tinggi dalam mengembangkan teknologi pertanian berkelanjutan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">MISI</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li>• Menyelenggarakan pendidikan tinggi yang berkualitas dalam bidang teknologi pertanian</li>
                  <li>• Mengembangkan penelitian dan inovasi teknologi pertanian berkelanjutan</li>
                  <li>• Melaksanakan pengabdian kepada masyarakat dalam bidang pertanian</li>
                  <li>• Membangun kemitraan strategis dengan berbagai stakeholder</li>
                  <li>• Mengembangkan tata kelola institusi yang baik dan berkelanjutan</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisiMisi;
