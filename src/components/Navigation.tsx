
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const menuItems = [
    {
      title: 'BERANDA',
      path: '/',
      hasDropdown: false
    },
    {
      title: 'PROFIL',
      hasDropdown: true,
      items: [
        { title: 'Tentang Program Studi', path: '/about' },
        { title: 'Visi dan Misi', path: '/visi-misi' },
        { title: 'Struktur Organisasi', path: '/struktur-organisasi' },
        { title: 'Profil Dosen', path: '/profil-dosen' }
      ]
    },
    {
      title: 'AKADEMIK',
      hasDropdown: true,
      items: [
        { title: 'Kurikulum', path: '/kurikulum' },
        { title: 'Peraturan Akademik dan Kemahasiswaan', path: '/peraturan-akademik' },
        { title: 'Kalender Akademik', path: '/kalender-akademik' },
        { title: 'Sistem Informasi Akademik', path: '/sia' },
        { title: 'Jadwal Seminar', path: '/jadwal-seminar' }
      ]
    },
    {
      title: 'FASILITAS',
      hasDropdown: true,
      items: [
        { title: 'Laboratorium', path: '/laboratorium' }
      ]
    },
    {
      title: 'KEMAHASISWAAN',
      hasDropdown: true,
      items: [
        { title: 'Penerimaan Mahasiswa Baru', path: '/admissions' },
        { title: 'Kegiatan Mahasiswa', path: '/kegiatan-mahasiswa' },
        { title: 'Beasiswa', path: '/beasiswa' },
        { title: 'Info Karir', path: '/info-karir' }
      ]
    },
    {
      title: 'BERITA',
      hasDropdown: true,
      items: [
        { title: 'Berita Akademik', path: '/berita-akademik' },
        { title: 'Berita Prodi', path: '/news' },
        { title: 'Pengumuman', path: '/pengumuman' }
      ]
    },
    {
      title: 'UNDUH',
      hasDropdown: true,
      items: [
        { title: 'SOP Studium Generale', path: '/unduh/sop-studium-generale' },
        { title: 'Kerja Praktik', path: '/unduh/kerja-praktik' },
        { title: 'Seminar Proposal', path: '/unduh/seminar-proposal' },
        { title: 'Seminar Hasil', path: '/unduh/seminar-hasil' },
        { title: 'Ujian Tugas Akhir', path: '/unduh/ujian-tugas-akhir' },
        { title: 'Kartu Seminar', path: '/unduh/kartu-seminar' },
        { title: 'MBKM', path: '/unduh/mbkm' },
        { title: 'Sertifikat Akreditasi', path: '/unduh/sertifikat-akreditasi' },
        { title: 'Petunjuk Teknis Capstone Design', path: '/unduh/capstone-design' },
        { title: 'Konversi Prestasi Mahasiswa TIP', path: '/unduh/konversi-prestasi' },
        { title: 'Buku Pedoman Pembelajaran', path: '/unduh/pedoman-pembelajaran' },
        { title: 'Buku Panduan Kaderisasi', path: '/unduh/panduan-kaderisasi' },
        { title: 'Buku Petunjuk Teknis Laboratorium', path: '/unduh/petunjuk-laboratorium' }
      ]
    }
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600 mr-2" />
              <span className="font-bold text-xl text-gray-900">ITP Takalar</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {menuItems.map((item) => (
              <div key={item.title} className="relative group">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button 
                      className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                      onMouseEnter={() => setActiveDropdown(item.title)}
                    >
                      {item.title}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </button>
                    <div 
                      className={`absolute top-full left-0 mt-0 w-64 bg-white border border-gray-200 shadow-lg rounded-md z-50 transition-all duration-200 ${
                        activeDropdown === item.title ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.title)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={item.path || '/'}
                    className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t max-h-96 overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(item.title)}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 flex items-center justify-between"
                    >
                      {item.title}
                      <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${
                        activeDropdown === item.title ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {activeDropdown === item.title && (
                      <div className="pl-4 space-y-1">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.title}
                            to={subItem.path}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-green-600"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={item.path || '/'}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
