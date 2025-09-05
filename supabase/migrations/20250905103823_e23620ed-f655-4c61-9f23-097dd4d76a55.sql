-- Create organizational structure table
CREATE TABLE public.organizational_structure (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  position_name TEXT NOT NULL,
  person_name TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  parent_id UUID REFERENCES public.organizational_structure(id) ON DELETE CASCADE,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.organizational_structure ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active organizational structure" 
ON public.organizational_structure 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage organizational structure" 
ON public.organizational_structure 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_organizational_structure_updated_at
BEFORE UPDATE ON public.organizational_structure
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial data
INSERT INTO public.organizational_structure (position_name, person_name, level) VALUES
('Direktur', 'Prof. Dr. Ahmad Maulana, M.Sc', 1),
('Wakil Direktur I (Akademik)', 'Dr. Siti Nurhaliza, S.P., M.Si', 2),
('Wakil Direktur II (Umum & Keuangan)', 'Dr. Muhammad Fadli, S.E., M.M', 2),
('Wakil Direktur III (Kemahasiswaan)', 'Dr. Andi Nurul Fitri, S.P., M.P', 2),
('Ketua Program Studi Teknologi Pertanian', 'Dr. Rahman Syahid, S.P., M.P', 3),
('Ketua Program Studi Agribisnis', 'Dr. Fatimah Zahra, S.P., M.Si', 3),
('Ketua Program Studi Teknologi Pangan', 'Dr. Abdul Karim, S.TP., M.T', 3);