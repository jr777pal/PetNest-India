import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, ShieldOff } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  full_name: string;
  phone: string | null;
  created_at: string;
  isAdmin: boolean;
}

const AdminUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAndLoadUsers();
  }, [user]);

  const checkAdminAndLoadUsers = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roles) {
        toast.error("Access denied");
        navigate("/");
        return;
      }

      loadUsers();
    } catch (error) {
      console.error("Error:", error);
      navigate("/");
    }
  };

  const loadUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Check admin status for each user
      const usersWithRoles = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", profile.id)
            .eq("role", "admin")
            .maybeSingle();

          return {
            ...profile,
            isAdmin: !!roleData
          };
        })
      );

      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId: string, currentlyAdmin: boolean) => {
    try {
      if (currentlyAdmin) {
        // Remove admin role
        const { error } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .eq("role", "admin");

        if (error) throw error;
        toast.success("Admin role removed");
      } else {
        // Add admin role
        const { error } = await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: "admin" });

        if (error) throw error;
        toast.success("Admin role granted");
      }

      loadUsers();
    } catch (error) {
      console.error("Error toggling admin role:", error);
      toast.error("Failed to update user role");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Manage Users</h1>
            <p className="text-muted-foreground">View users and manage admin roles</p>
          </div>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((userItem) => (
                  <TableRow key={userItem.id}>
                    <TableCell className="font-medium">{userItem.full_name}</TableCell>
                    <TableCell>{userItem.phone || "N/A"}</TableCell>
                    <TableCell>{new Date(userItem.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        userItem.isAdmin 
                          ? "bg-purple-500/20 text-purple-700"
                          : "bg-gray-500/20 text-gray-700"
                      }`}>
                        {userItem.isAdmin ? "Admin" : "User"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {userItem.id !== user?.id && (
                        <Button
                          size="sm"
                          variant={userItem.isAdmin ? "destructive" : "default"}
                          onClick={() => toggleAdminRole(userItem.id, userItem.isAdmin)}
                        >
                          {userItem.isAdmin ? (
                            <>
                              <ShieldOff className="w-4 h-4 mr-2" />
                              Remove Admin
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4 mr-2" />
                              Make Admin
                            </>
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminUsers;