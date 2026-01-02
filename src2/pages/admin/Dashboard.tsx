import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Users, PawPrint } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPets: 0,
    totalOrders: 0,
    totalUsers: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) {
      toast.error("Please login to access admin panel");
      navigate("/auth");
      return;
    }

    try {
      // Check if user has admin role
      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) throw error;

      if (!roles) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      loadStats();
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast.error("Failed to verify admin access");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Get total pets
      const { count: petsCount } = await supabase
        .from("pets")
        .select("*", { count: "exact", head: true });

      // Get total orders
      const { count: ordersCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

      // Get pending orders
      const { count: pendingCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("order_status", "PLACED");

      // Get total users
      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      setStats({
        totalPets: petsCount || 0,
        totalOrders: ordersCount || 0,
        totalUsers: usersCount || 0,
        pendingOrders: pendingCount || 0
      });
    } catch (error) {
      console.error("Error loading stats:", error);
      toast.error("Failed to load statistics");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your pet adoption platform</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pets</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalPets}</p>
                </div>
                <PawPrint className="w-12 h-12 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="w-12 h-12 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pendingOrders}</p>
                </div>
                <Package className="w-12 h-12 text-orange-500 opacity-20" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
                </div>
                <Users className="w-12 h-12 text-primary opacity-20" />
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Manage Pets</h3>
              <p className="text-muted-foreground mb-4">
                Add, edit, or remove pets from your inventory
              </p>
              <Button onClick={() => navigate("/admin/pets")} className="w-full">
                Go to Pets
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Manage Orders</h3>
              <p className="text-muted-foreground mb-4">
                View and update order status and details
              </p>
              <Button onClick={() => navigate("/admin/orders")} className="w-full">
                Go to Orders
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Manage Users</h3>
              <p className="text-muted-foreground mb-4">
                View users and manage admin roles
              </p>
              <Button onClick={() => navigate("/admin/users")} className="w-full">
                Go to Users
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;