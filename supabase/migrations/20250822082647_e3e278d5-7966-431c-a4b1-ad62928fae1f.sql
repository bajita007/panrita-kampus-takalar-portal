-- Create campus_settings table for dynamic site content
CREATE TABLE public.campus_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key text NOT NULL UNIQUE,
  setting_value jsonb NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create downloads table for file management
CREATE TABLE public.downloads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  category text NOT NULL DEFAULT 'Umum',
  file_size text,
  file_type text,
  download_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create academic_calendar table
CREATE TABLE public.academic_calendar (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date,
  event_type text DEFAULT 'akademik',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add external_link and full_content columns to news table
ALTER TABLE public.news 
ADD COLUMN external_link text,
ADD COLUMN full_content text;

-- Enable RLS on new tables
ALTER TABLE public.campus_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_calendar ENABLE ROW LEVEL SECURITY;

-- RLS Policies for campus_settings
CREATE POLICY "Anyone can view campus settings" 
ON public.campus_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage campus settings" 
ON public.campus_settings 
FOR ALL 
USING (is_admin(auth.uid()));

-- RLS Policies for downloads
CREATE POLICY "Anyone can view active downloads" 
ON public.downloads 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage downloads" 
ON public.downloads 
FOR ALL 
USING (is_admin(auth.uid()));

-- RLS Policies for academic_calendar
CREATE POLICY "Anyone can view active calendar events" 
ON public.academic_calendar 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage calendar events" 
ON public.academic_calendar 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create triggers for updated_at columns
CREATE TRIGGER update_campus_settings_updated_at
BEFORE UPDATE ON public.campus_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_downloads_updated_at
BEFORE UPDATE ON public.downloads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_academic_calendar_updated_at
BEFORE UPDATE ON public.academic_calendar
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default campus settings
INSERT INTO public.campus_settings (setting_key, setting_value, description) VALUES 
('hero_section', '{
  "title": "Institut Teknologi Pertanian",
  "subtitle": "Bagian dari Yayasan Panrita Takalar - Mengembangkan teknologi pertanian berkelanjutan untuk masa depan Indonesia yang lebih hijau dan sejahtera",
  "hero_image": "https://images.unsplash.com/photo-1562774053-701939374585?w=600",
  "background_image": "https://images.unsplash.com/photo-1586281010691-3d3857c8e9ad?w=1200"
}', 'Hero section content for homepage'),

('campus_info', '{
  "name": "Institut Teknologi Pertanian",
  "short_name": "ITP",
  "description": "Institut Teknologi Pertanian adalah bagian dari Yayasan Panrita Takalar yang fokus mengembangkan teknologi pertanian berkelanjutan.",
  "logo_url": "",
  "established_year": "2010",
  "accreditation": "Akreditasi Baik"
}', 'Basic campus information'),

('vision_mission', '{
  "vision": "Menjadi institusi pendidikan tinggi yang unggul dalam pengembangan teknologi pertanian berkelanjutan dan menghasilkan lulusan yang kompeten, inovatif, dan berkarakter untuk kesejahteraan masyarakat pada tahun 2030",
  "missions": [
    "Menyelenggarakan pendidikan tinggi berkualitas di bidang teknologi pertanian yang berlandaskan nilai-nilai islami dan kearifan lokal",
    "Mengembangkan penelitian dan inovasi teknologi pertanian yang berkelanjutan untuk meningkatkan produktivitas dan kesejahteraan petani", 
    "Melaksanakan pengabdian kepada masyarakat melalui transfer teknologi dan pemberdayaan masyarakat di bidang pertanian",
    "Membangun kemitraan strategis dengan berbagai institusi dalam dan luar negeri untuk pengembangan ilmu pengetahuan dan teknologi pertanian"
  ]
}', 'Vision and mission statements'),

('contact_info', '{
  "address": "Jl. Pendidikan No. 1, Takalar, Sulawesi Selatan, Indonesia 92212",
  "phone": "(0411) 123-4567",
  "whatsapp": "+62 812-3456-7890",
  "fax": "(0411) 123-4568",
  "email": "info@itptakalar.ac.id",
  "admissions_email": "admisi@itptakalar.ac.id",
  "public_relations_email": "humas@itptakalar.ac.id",
  "operating_hours": {
    "weekday": "08:00 - 16:00 WITA",
    "saturday": "08:00 - 12:00 WITA",
    "sunday": "Tutup"
  }
}', 'Campus contact information'),

('stats', '{
  "active_students": "1000+",
  "qualified_lecturers": "50+",
  "research_projects": "20+",
  "graduation_rate": "95%"
}', 'Campus statistics for homepage');

-- Insert sample downloads
INSERT INTO public.downloads (title, description, file_url, category, file_type) VALUES 
('Panduan Pendaftaran 2024', 'Panduan lengkap pendaftaran mahasiswa baru tahun 2024/2025', '#', 'Admisi', 'PDF'),
('Kurikulum Program Studi Agribisnis', 'Dokumen kurikulum lengkap program studi Agribisnis', '#', 'Akademik', 'PDF'),
('Kalender Akademik 2024/2025', 'Kalender akademik tahun ajaran 2024/2025', '#', 'Akademik', 'PDF'),
('Formulir Beasiswa', 'Formulir pendaftaran berbagai jenis beasiswa', '#', 'Kemahasiswaan', 'PDF'),
('Peraturan Akademik', 'Dokumen peraturan dan tata tertib akademik', '#', 'Akademik', 'PDF');

-- Insert sample academic calendar
INSERT INTO public.academic_calendar (title, description, start_date, end_date, event_type) VALUES 
('Pendaftaran Mahasiswa Baru', 'Periode pendaftaran mahasiswa baru tahun akademik 2024/2025', '2024-08-01', '2024-08-31', 'admisi'),
('Orientasi Mahasiswa Baru', 'Kegiatan orientasi dan pengenalan kampus untuk mahasiswa baru', '2024-09-01', '2024-09-07', 'orientasi'),
('Perkuliahan Semester Ganjil', 'Dimulainya perkuliahan semester ganjil', '2024-09-09', '2024-12-20', 'perkuliahan'),
('Ujian Tengah Semester', 'Pelaksanaan ujian tengah semester ganjil', '2024-10-14', '2024-10-25', 'ujian'),
('Ujian Akhir Semester', 'Pelaksanaan ujian akhir semester ganjil', '2024-12-02', '2024-12-13', 'ujian'),
('Libur Semester', 'Libur semester dan masa pengisian KRS', '2024-12-16', '2025-01-31', 'libur'),
('Perkuliahan Semester Genap', 'Dimulainya perkuliahan semester genap', '2025-02-03', '2025-06-15', 'perkuliahan');