import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Settings, Save } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface AdminSettingsProps {
  onUpdate?: () => void;
}

export const AdminSettings = ({ onUpdate }: AdminSettingsProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('campus_settings')
        .select('*');

      if (error) throw error;

      const settingsObj = data.reduce((acc: any, setting: any) => {
        acc[setting.setting_key] = setting.setting_value;
        return acc;
      }, {});

      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Gagal memuat pengaturan kampus",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    setSaving(true);
    try {
      // Validate that we have valid data to save
      if (!value || (typeof value === 'object' && Object.keys(value).length === 0)) {
        throw new Error('Tidak ada data untuk disimpan');
      }

      const { error } = await supabase
        .from('campus_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Pengaturan berhasil disimpan",
      });

      onUpdate?.();
      await fetchSettings();
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menyimpan pengaturan",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleHeroUpdate = (field: string, value: string) => {
    const newHero = { ...(settings.hero_section || {}), [field]: value };
    setSettings(prev => ({ ...prev, hero_section: newHero }));
  };

  const handleContactUpdate = (field: string, value: string) => {
    const newContact = { ...(settings.contact_info || {}), [field]: value };
    setSettings(prev => ({ ...prev, contact_info: newContact }));
  };

  const handleStatsUpdate = (field: string, value: string) => {
    const newStats = { ...(settings.stats || {}), [field]: value };
    setSettings(prev => ({ ...prev, stats: newStats }));
  };

  const handleVisionMissionUpdate = (field: string, value: any) => {
    const newVisionMission = { ...(settings.vision_mission || {}), [field]: value };
    setSettings(prev => ({ ...prev, vision_mission: newVisionMission }));
  };

  if (loading) {
    return <div className="flex justify-center p-8">Memuat pengaturan...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Hero Section Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Hero Section
          </CardTitle>
          <CardDescription>Pengaturan bagian utama halaman beranda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero-title">Judul Utama</Label>
            <Input
              id="hero-title"
              value={settings.hero_section?.title || ''}
              onChange={(e) => handleHeroUpdate('title', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hero-subtitle">Subtitle</Label>
            <Textarea
              id="hero-subtitle"
              value={settings.hero_section?.subtitle || ''}
              onChange={(e) => handleHeroUpdate('subtitle', e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload
              label="Gambar Hero"
              currentImageUrl={settings.hero_section?.hero_image}
              onImageUpload={(url) => handleHeroUpdate('hero_image', url)}
              bucket="content-images"
              folder="hero"
            />
            <ImageUpload
              label="Background Image"
              currentImageUrl={settings.hero_section?.background_image}
              onImageUpload={(url) => handleHeroUpdate('background_image', url)}
              bucket="content-images"
              folder="background"
            />
          </div>
          <Button onClick={() => updateSetting('hero_section', settings.hero_section)} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            Simpan Hero Section
          </Button>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Kontak</CardTitle>
          <CardDescription>Pengaturan kontak kampus</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Alamat</Label>
            <Textarea
              id="address"
              value={settings.contact_info?.address || ''}
              onChange={(e) => handleContactUpdate('address', e.target.value)}
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Telepon</Label>
              <Input
                id="phone"
                value={settings.contact_info?.phone || ''}
                onChange={(e) => handleContactUpdate('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={settings.contact_info?.whatsapp || ''}
                onChange={(e) => handleContactUpdate('whatsapp', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="email">Email Utama</Label>
              <Input
                id="email"
                type="email"
                value={settings.contact_info?.email || ''}
                onChange={(e) => handleContactUpdate('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="admissions-email">Email Admisi</Label>
              <Input
                id="admissions-email"
                type="email"
                value={settings.contact_info?.admissions_email || ''}
                onChange={(e) => handleContactUpdate('admissions_email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pr-email">Email Humas</Label>
              <Input
                id="pr-email"
                type="email"
                value={settings.contact_info?.public_relations_email || ''}
                onChange={(e) => handleContactUpdate('public_relations_email', e.target.value)}
              />
            </div>
          </div>
          <Button onClick={() => updateSetting('contact_info', settings.contact_info)} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            Simpan Kontak
          </Button>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Statistik Kampus</CardTitle>
          <CardDescription>Data statistik untuk ditampilkan di beranda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="students">Mahasiswa Aktif</Label>
              <Input
                id="students"
                value={settings.stats?.active_students || ''}
                onChange={(e) => handleStatsUpdate('active_students', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lecturers">Dosen Berkualitas</Label>
              <Input
                id="lecturers"
                value={settings.stats?.qualified_lecturers || ''}
                onChange={(e) => handleStatsUpdate('qualified_lecturers', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="research">Penelitian Unggulan</Label>
              <Input
                id="research"
                value={settings.stats?.research_projects || ''}
                onChange={(e) => handleStatsUpdate('research_projects', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="graduation">Tingkat Kelulusan</Label>
              <Input
                id="graduation"
                value={settings.stats?.graduation_rate || ''}
                onChange={(e) => handleStatsUpdate('graduation_rate', e.target.value)}
              />
            </div>
          </div>
          <Button onClick={() => updateSetting('stats', settings.stats)} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            Simpan Statistik
          </Button>
        </CardContent>
      </Card>

      {/* Vision & Mission */}
      <Card>
        <CardHeader>
          <CardTitle>Visi & Misi</CardTitle>
          <CardDescription>Visi dan misi institusi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="vision">Visi</Label>
            <Textarea
              id="vision"
              value={settings.vision_mission?.vision || ''}
              onChange={(e) => handleVisionMissionUpdate('vision', e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="missions">Misi (pisahkan dengan enter untuk setiap misi)</Label>
            <Textarea
              id="missions"
              value={settings.vision_mission?.missions?.join('\n') || ''}
              onChange={(e) => handleVisionMissionUpdate('missions', e.target.value.split('\n').filter(m => m.trim()))}
              rows={6}
            />
          </div>
          <Button onClick={() => updateSetting('vision_mission', settings.vision_mission)} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            Simpan Visi & Misi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};