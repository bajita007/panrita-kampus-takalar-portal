import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, ArrowLeft, ExternalLink, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Navigation from '@/components/Navigation';

const NewsDetail = () => {
  const { id: newsId } = useParams();
  const { toast } = useToast();
  const [news, setNews] = useState<any>(null);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (newsId) {
      fetchNews();
      fetchRelatedNews();
    }
  }, [newsId]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', newsId)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error",
        description: "Gagal memuat berita",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .neq('id', newsId)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRelatedNews(data || []);
    } catch (error) {
      console.error('Error fetching related news:', error);
    }
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 flex justify-center items-center min-h-[400px]">
          <div className="text-gray-500">Memuat berita...</div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Berita tidak ditemukan</h1>
            <Link to="/news">
              <Button variant="outline">Kembali ke Berita</Button>
            </Link>
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
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/news">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Berita
              </Button>
            </Link>
          </div>

          {/* News Article */}
          <article className="mb-12">
            {/* Featured Image */}
            {news.image_url && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img 
                  src={news.image_url} 
                  alt={news.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )}

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="outline">{news.category}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(news.created_at), 'dd MMMM yyyy', { locale: id })}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {news.title}
              </h1>

              {news.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {news.excerpt}
                </p>
              )}
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {news.full_content ? (
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: news.full_content.replace(/\n/g, '<br>') 
                  }}
                />
              ) : (
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {news.content}
                </div>
              )}
            </div>

            {/* External Link */}
            {news.external_link && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Baca lebih lanjut</h3>
                <p className="text-blue-700 mb-4 text-sm">
                  Artikel ini memiliki sumber tambahan atau versi lengkap di situs lain.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => handleExternalLink(news.external_link)}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Lihat Sumber Asli
                </Button>
              </div>
            )}
          </article>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="border-t pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Berita Terkait</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <Link key={item.id} to={`/news/${item.id}`}>
                    <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                      {item.image_url && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img 
                            src={item.image_url} 
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          {format(new Date(item.created_at), 'dd MMM yyyy', { locale: id })}
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3">
                          {item.excerpt || item.content}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link to="/news">
                  <Button variant="outline" size="lg">
                    Lihat Semua Berita
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;