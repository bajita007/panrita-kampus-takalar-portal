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
          const value = item.setting_value;
          
          // Handle nested objects properly
          if (item.setting_key === 'hero_section' && value && typeof value === 'object') {
            const heroValue = value as any;
            settingsObj.hero_title = heroValue.title;
            settingsObj.hero_description = heroValue.subtitle;
            settingsObj.hero_image = heroValue.hero_image;
          } else if (item.setting_key === 'contact_info' && value && typeof value === 'object') {
            const contactValue = value as any;
            settingsObj.contact_address = contactValue.address;
            settingsObj.contact_phone = contactValue.phone;
            settingsObj.contact_email = contactValue.email;
          } else if (item.setting_key === 'stats' && value && typeof value === 'object') {
            const statsValue = value as any;
            settingsObj.student_count = statsValue.active_students;
            settingsObj.lecturer_count = statsValue.qualified_lecturers;
            settingsObj.research_count = statsValue.research_projects;
            settingsObj.graduation_rate = statsValue.graduation_rate;
          } else if (item.setting_key === 'vision_mission' && value && typeof value === 'object') {
            const visionValue = value as any;
            settingsObj.vision = visionValue.vision;
            settingsObj.mission = visionValue.missions;
          } else {
            // For direct key-value pairs
            settingsObj[item.setting_key] = value;
          }
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