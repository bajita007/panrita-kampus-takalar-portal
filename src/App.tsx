import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Admissions from "./pages/Admissions";
import News from "./pages/News";
import Contact from "./pages/Contact";
import VisiMisi from "./pages/VisiMisi";
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import ProfilDosen from "./pages/ProfilDosen";
import Kurikulum from "./pages/Kurikulum";
import PeraturanAkademik from "./pages/PeraturanAkademik";
import KalenderAkademik from "./pages/KalenderAkademik";
import SIA from "./pages/SIA";
import JadwalSeminar from "./pages/JadwalSeminar";
import Laboratorium from "./pages/Laboratorium";
import KegiatanMahasiswa from "./pages/KegiatanMahasiswa";
import Beasiswa from "./pages/Beasiswa";
import InfoKarir from "./pages/InfoKarir";
import BeritaAkademik from "./pages/BeritaAkademik";
import Pengumuman from "./pages/Pengumuman";
import Gallery from "./pages/Gallery";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/visi-misi" element={<VisiMisi />} />
            <Route path="/struktur-organisasi" element={<StrukturOrganisasi />} />
            <Route path="/profil-dosen" element={<ProfilDosen />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/kurikulum" element={<Kurikulum />} />
            <Route path="/peraturan-akademik" element={<PeraturanAkademik />} />
            <Route path="/kalender-akademik" element={<KalenderAkademik />} />
            <Route path="/sia" element={<SIA />} />
            <Route path="/jadwal-seminar" element={<JadwalSeminar />} />
            <Route path="/laboratorium" element={<Laboratorium />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/kegiatan-mahasiswa" element={<KegiatanMahasiswa />} />
            <Route path="/beasiswa" element={<Beasiswa />} />
            <Route path="/info-karir" element={<InfoKarir />} />
            <Route path="/news" element={<News />} />
            <Route path="/berita-akademik" element={<BeritaAkademik />} />
            <Route path="/pengumuman" element={<Pengumuman />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;