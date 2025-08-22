import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Download, Search, FileText, Filter } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Downloads = () => {
  const { toast } = useToast();
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredDownloads, setFilteredDownloads] = useState<any[]>([]);

  useEffect(() => {
    fetchDownloads();
  }, []);

  useEffect(() => {
    filterDownloads();
  }, [downloads, searchTerm, selectedCategory]);

  const fetchDownloads = async () => {
    try {
      const { data, error } = await supabase
        .from('downloads')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDownloads(data || []);
    } catch (error) {
      console.error('Error fetching downloads:', error);
      toast({
        title: "Error",
        description: "Gagal memuat file unduhan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDownloads = () => {
    let filtered = downloads;

    if (searchTerm) {
      filtered = filtered.filter(download =>
        download.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (download.description && download.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(download => download.category === selectedCategory);
    }

    setFilteredDownloads(filtered);
  };

  const handleDownload = async (id: string, fileUrl: string, title: string) => {
    try {
      // Increment download count
      const { data: currentDownload } = await supabase
        .from('downloads')
        .select('download_count')
        .eq('id', id)
        .single();

      if (currentDownload) {
        await supabase
          .from('downloads')
          .update({ download_count: (currentDownload.download_count || 0) + 1 })
          .eq('id', id);
      }

      // Open file in new tab
      window.open(fileUrl, '_blank');

      toast({
        title: "Download Dimulai",
        description: `File "${title}" sedang diunduh`,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Error",
        description: "Gagal mengunduh file",
        variant: "destructive",
      });
    }
  };

  const categories = ['all', ...new Set(downloads.map(d => d.category))];
  const categoryLabels: any = {
    'all': 'Semua Kategori',
    'Umum': 'Umum',
    'Admisi': 'Admisi',
    'Akademik': 'Akademik',
    'Kemahasiswaan': 'Kemahasiswaan',
    'Keuangan': 'Keuangan',
    'Penelitian': 'Penelitian',
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Pusat Unduhan</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Download berbagai dokumen dan file yang Anda butuhkan
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari file..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="sm:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {categoryLabels[category] || category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Downloads Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-gray-500">Memuat file...</div>
            </div>
          ) : filteredDownloads.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || selectedCategory !== 'all' ? 'Tidak ada file yang ditemukan' : 'Belum ada file'}
              </h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Coba ubah kata kunci pencarian atau filter kategori' 
                  : 'File akan ditampilkan di sini setelah admin menambahkannya'
                }
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDownloads.map((download) => (
                <Card key={download.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <FileText className="h-8 w-8 text-green-600 flex-shrink-0" />
                      <Badge variant="outline">{download.category}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{download.title}</CardTitle>
                    {download.description && (
                      <CardDescription className="line-clamp-2">
                        {download.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Badge variant="secondary" className="mr-2">
                          {download.file_type}
                        </Badge>
                        {download.file_size && (
                          <span>{download.file_size}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Download className="h-3 w-3 mr-1" />
                        {download.download_count || 0}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleDownload(download.id, download.file_url, download.title)}
                      disabled={!download.file_url || download.file_url === '#'}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {download.file_url === '#' ? 'Segera Tersedia' : 'Download'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Categories Overview */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategori File</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.filter(cat => cat !== 'all').map((category) => {
                const count = downloads.filter(d => d.category === category).length;
                return (
                  <Card key={category} className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{categoryLabels[category] || category}</h3>
                          <p className="text-sm text-gray-500">{count} file</p>
                        </div>
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;