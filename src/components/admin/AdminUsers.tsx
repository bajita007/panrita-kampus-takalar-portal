import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Shield, User } from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin' | 'super_admin';
  created_at: string;
}

interface AdminUsersProps {
  onUpdate: () => void;
}

export function AdminUsers({ onUpdate }: AdminUsersProps) {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Gagal mengambil data pengguna.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin' | 'super_admin') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;
      
      toast({
        title: "Berhasil",
        description: "Role pengguna berhasil diperbarui.",
      });
      
      fetchUsers();
      onUpdate();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Gagal memperbarui role pengguna.",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Shield className="w-4 h-4" />;
      case 'admin':
        return <Users className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'destructive';
      case 'admin':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin':
        return 'Admin';
      default:
        return 'User';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Manajemen Pengguna</CardTitle>
          <CardDescription>Kelola pengguna dan hak akses</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-full">
                  {getRoleIcon(user.role)}
                </div>
                <div>
                  <h3 className="font-semibold">{user.full_name || 'Tidak ada nama'}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Bergabung: {new Date(user.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {getRoleLabel(user.role)}
                </Badge>
                <Select
                  value={user.role}
                  onValueChange={(newRole: 'user' | 'admin' | 'super_admin') => 
                    updateUserRole(user.user_id, newRole)
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
          
          {users.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Belum ada pengguna terdaftar.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}