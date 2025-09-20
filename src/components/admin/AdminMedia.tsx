import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Copy, Trash2, Image, ExternalLink } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface MediaFile {
  id: string;
  name: string;
  bucket_id: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  metadata: any;
}

interface AdminMediaProps {
  onUpdate?: () => void;
}

export const AdminMedia = ({ onUpdate }: AdminMediaProps) => {
  const { toast } = useToast();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBucket, setSelectedBucket] = useState('content-images');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const buckets = [
    { id: 'content-images', name: 'Content Images', description: 'Gambar untuk konten website' },
    { id: 'gallery-images', name: 'Gallery Images', description: 'Gambar untuk galeri' },
    { id: 'program-images', name: 'Program Images', description: 'Gambar untuk program studi' }
  ];

  useEffect(() => {
    fetchMediaFiles();
  }, [selectedBucket]);

  const fetchMediaFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from(selectedBucket)
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      const filesWithUrls = data?.map(file => ({
        ...file,
        id: file.name,
        bucket_id: selectedBucket,
        publicUrl: getPublicUrl(selectedBucket, file.name)
      })) || [];

      setMediaFiles(filesWithUrls as any);
    } catch (error) {
      console.error('Error fetching media files:', error);
      toast({
        title: "Error",
        description: "Gagal memuat file media",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPublicUrl = (bucket: string, fileName: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Berhasil",
      description: "Link gambar telah disalin ke clipboard",
    });
  };

  const deleteFile = async (fileName: string) => {
    if (!confirm('Yakin ingin menghapus file ini?')) return;

    try {
      const { error } = await supabase.storage
        .from(selectedBucket)
        .remove([fileName]);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "File berhasil dihapus",
      });

      fetchMediaFiles();
      onUpdate?.();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus file",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (url: string) => {
    setUploadedImageUrl(url);
    fetchMediaFiles();
    onUpdate?.();
    toast({
      title: "Berhasil",
      description: "Gambar berhasil diupload",
    });
  };

  const handleAddNew = () => {
    setUploadedImageUrl('');
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Memuat file media...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Media Manager</h2>
          <p className="text-muted-foreground">Kelola file gambar dan media website</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Upload Media Baru</DialogTitle>
              <DialogDescription>
                Upload gambar ke bucket yang dipilih
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bucket">Pilih Bucket</Label>
                <select 
                  id="bucket"
                  value={selectedBucket}
                  onChange={(e) => setSelectedBucket(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {buckets.map(bucket => (
                    <option key={bucket.id} value={bucket.id}>
                      {bucket.name}
                    </option>
                  ))}
                </select>
              </div>
              <ImageUpload
                label="Upload Gambar"
                currentImageUrl={uploadedImageUrl}
                onImageUpload={handleImageUpload}
                bucket={selectedBucket}
                folder=""
              />
              {uploadedImageUrl && (
                <div className="space-y-2">
                  <Label>Link Gambar:</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={uploadedImageUrl}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(uploadedImageUrl)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
              >
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bucket Selector */}
      <div className="flex space-x-2">
        {buckets.map(bucket => (
          <Button
            key={bucket.id}
            variant={selectedBucket === bucket.id ? "default" : "outline"}
            onClick={() => setSelectedBucket(bucket.id)}
            size="sm"
          >
            {bucket.name}
          </Button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mediaFiles.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Image className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada file media</h3>
              <p className="text-muted-foreground text-center mb-4">
                Upload gambar pertama untuk bucket {buckets.find(b => b.id === selectedBucket)?.name}
              </p>
              <Button onClick={handleAddNew}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </CardContent>
          </Card>
        ) : (
          mediaFiles.map((file) => (
            <Card key={file.id} className="overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={(file as any).publicUrl} 
                  alt={file.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-3">
                <CardTitle className="text-sm truncate">{file.name}</CardTitle>
                <CardDescription className="text-xs">
                  {new Date(file.created_at).toLocaleDateString('id-ID')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => copyToClipboard((file as any).publicUrl)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open((file as any).publicUrl, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteFile(file.name)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};