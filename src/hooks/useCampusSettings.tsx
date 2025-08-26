import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CampusSettings {
  hero_title?: string;
  hero_description?: string;
  hero_image?: string;
  about_description?: string;
  vision?: string;
  mission?: string;
  contact_address?: string;
  contact_phone?: string;
  contact_email?: string;
  student_count?: number;
  lecturer_count?: number;
  research_count?: number;
  graduation_rate?: number;
}

export function useCampusSettings() {
  const [settings, setSettings] = useState<CampusSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('campus_settings')
        .select('setting_key, setting_value');

      if (data) {
        const settingsObj: Record<string, any> = {};
        data.forEach((item) => {
          settingsObj[item.setting_key] = item.setting_value;
        });
        setSettings(settingsObj as CampusSettings);
      }
    } catch (error) {
      console.error('Error fetching campus settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading, refetch: fetchSettings };
}