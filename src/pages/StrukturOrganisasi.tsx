
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface OrganizationalStructure {
  id: string;
  position_name: string;
  person_name: string;
  level: number;
  parent_id?: string;
  description?: string;
  is_active: boolean;
}

const StrukturOrganisasi = () => {
  const { toast } = useToast();
  const [structures, setStructures] = useState<OrganizationalStructure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStructures();
  }, []);

  const fetchStructures = async () => {
    try {
      const { data, error } = await supabase
        .from('organizational_structure')
        .select('*')
        .eq('is_active', true)
        .order('level', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setStructures(data || []);
    } catch (error) {
      console.error('Error fetching organizational structure:', error);
      toast({
        title: "Error",
        description: "Gagal memuat struktur organisasi",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStructuresByLevel = (level: number) => {
    return structures.filter(s => s.level === level);
  };

  const getLevelName = (level: number) => {
    switch (level) {
      case 1: return 'Pimpinan Tertinggi';
      case 2: return 'Wakil/Deputi';
      case 3: return 'Ketua Program Studi';
      case 4: return 'Koordinator';
      default: return `Level ${level}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Struktur Organisasi</h1>
            <p className="text-lg text-gray-600">Institut Teknologi Pertanian Takalar</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-lg">Memuat struktur organisasi...</div>
            </div>
          ) : structures.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Belum ada struktur organisasi</h3>
              <p className="text-gray-600">Struktur organisasi akan segera ditampilkan</p>
            </div>
          ) : (
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map(level => {
                const levelStructures = getStructuresByLevel(level);
                if (levelStructures.length === 0) return null;

                return (
                  <div key={level} className="space-y-4">
                    <div className="border-l-4 border-green-600 pl-4">
                      <h3 className="text-xl font-semibold text-green-600">{getLevelName(level)}</h3>
                      <p className="text-sm text-gray-500">Level {level}</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {levelStructures.map((structure) => (
                        <Card key={structure.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-lg text-green-600">{structure.position_name}</CardTitle>
                            <CardDescription className="font-semibold text-gray-800">
                              {structure.person_name}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            {structure.description && (
                              <p className="text-sm text-gray-600">{structure.description}</p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;
