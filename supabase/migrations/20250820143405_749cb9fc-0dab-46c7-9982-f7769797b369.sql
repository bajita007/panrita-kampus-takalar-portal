-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'super_admin', 'user');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('content-images', 'content-images', true),
  ('gallery-images', 'gallery-images', true),
  ('program-images', 'program-images', true);

-- Create programs table
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  accreditation TEXT DEFAULT 'Akreditasi Baik',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create news/berita table
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'Akademik',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'Kegiatan',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Umum',
  priority TEXT DEFAULT 'Normal',
  icon TEXT DEFAULT 'Bell',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create lecturers table
CREATE TABLE public.lecturers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  field TEXT NOT NULL,
  education TEXT NOT NULL,
  experience TEXT,
  email TEXT,
  phone TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create laboratories table
CREATE TABLE public.laboratories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  facilities TEXT[] DEFAULT '{}',
  capacity INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create student activities table
CREATE TABLE public.student_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  items TEXT[] DEFAULT '{}',
  icon TEXT DEFAULT 'Users',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lecturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_activities ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE profiles.user_id = $1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (SELECT role IN ('admin', 'super_admin') FROM public.profiles WHERE profiles.user_id = $1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for content tables (public read, admin write)
CREATE POLICY "Anyone can view programs" ON public.programs FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage programs" ON public.programs FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can view published news" ON public.news FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage news" ON public.news FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can view active gallery" ON public.gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage gallery" ON public.gallery FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can view published announcements" ON public.announcements FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage announcements" ON public.announcements FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can view active lecturers" ON public.lecturers FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage lecturers" ON public.lecturers FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can view laboratories" ON public.laboratories FOR SELECT USING (is_available = true);
CREATE POLICY "Admins can manage laboratories" ON public.laboratories FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can view active student activities" ON public.student_activities FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage student activities" ON public.student_activities FOR ALL USING (public.is_admin(auth.uid()));

-- Storage policies
CREATE POLICY "Anyone can view content images" ON storage.objects FOR SELECT USING (bucket_id = 'content-images');
CREATE POLICY "Admins can upload content images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'content-images' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can update content images" ON storage.objects FOR UPDATE USING (bucket_id = 'content-images' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete content images" ON storage.objects FOR DELETE USING (bucket_id = 'content-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Anyone can view gallery images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Admins can upload gallery images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can update gallery images" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery-images' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete gallery images" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-images' AND public.is_admin(auth.uid()));

CREATE POLICY "Anyone can view program images" ON storage.objects FOR SELECT USING (bucket_id = 'program-images');
CREATE POLICY "Admins can upload program images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'program-images' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can update program images" ON storage.objects FOR UPDATE USING (bucket_id = 'program-images' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete program images" ON storage.objects FOR DELETE USING (bucket_id = 'program-images' AND public.is_admin(auth.uid()));

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lecturers_updated_at BEFORE UPDATE ON public.lecturers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_laboratories_updated_at BEFORE UPDATE ON public.laboratories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_student_activities_updated_at BEFORE UPDATE ON public.student_activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.programs (name, description, image_url) VALUES
  ('Agribisnis', 'Program studi yang mempelajari bisnis di bidang pertanian', '/Agribisnis.jpg'),
  ('Manajemen Sumber Daya Perairan', 'Program studi yang fokus pada pengelolaan sumber daya perairan', '/Manajemen Sumber Daya Perairan.jpg'),
  ('Bisnis Digital', 'Program studi yang mempelajari bisnis dalam era digital', '/Bisnis Digital.jpg'),
  ('Nutrisi dan Teknologi Pakan Ternak', 'Program studi yang mempelajari nutrisi dan teknologi pakan ternak', '/placeholder.svg');

INSERT INTO public.news (title, content, excerpt, category) VALUES
  ('Penerimaan Mahasiswa Baru 2024', 'Pendaftaran mahasiswa baru untuk tahun akademik 2024/2025 telah dibuka. Kami menyediakan berbagai program studi unggulan yang siap membekali mahasiswa dengan pengetahuan dan keterampilan yang dibutuhkan di dunia kerja.', 'Pendaftaran mahasiswa baru 2024/2025 telah dibuka', 'Penerimaan'),
  ('Seminar Nasional Teknologi Pertanian', 'Institut Teknologi Pertanian akan mengadakan seminar nasional tentang inovasi teknologi pertanian modern. Acara ini akan menghadirkan pakar-pakar terkemuka di bidang pertanian.', 'Seminar nasional teknologi pertanian modern', 'Akademik'),
  ('Prestasi Mahasiswa ITP', 'Mahasiswa Institut Teknologi Pertanian meraih juara dalam kompetisi inovasi pertanian tingkat nasional. Prestasi ini membanggakan dan menunjukkan kualitas pendidikan yang diberikan.', 'Mahasiswa ITP juara kompetisi nasional', 'Prestasi');

INSERT INTO public.gallery (title, description, image_url, category) VALUES
  ('Kegiatan Praktikum Lapangan', 'Mahasiswa sedang melakukan praktikum lapangan di area pertanian', '/placeholder.svg', 'Akademik'),
  ('Laboratorium Modern', 'Fasilitas laboratorium dengan peralatan modern untuk mendukung pembelajaran', '/placeholder.svg', 'Fasilitas'),
  ('Wisuda Mahasiswa', 'Acara wisuda mahasiswa Institut Teknologi Pertanian', '/placeholder.svg', 'Kegiatan');

INSERT INTO public.announcements (title, content, category, priority) VALUES
  ('Pendaftaran Beasiswa 2024', 'Tersedia beasiswa untuk mahasiswa berprestasi. Silakan mendaftar sebelum batas waktu berakhir.', 'Beasiswa', 'Tinggi'),
  ('Jadwal Ujian Tengah Semester', 'Ujian tengah semester akan dilaksanakan mulai tanggal 15 April 2024. Persiapkan diri dengan baik.', 'Akademik', 'Normal'),
  ('Kegiatan Bakti Sosial', 'Mari bergabung dalam kegiatan bakti sosial yang akan dilaksanakan di desa sekitar kampus.', 'Kemahasiswaan', 'Normal');