import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  payment_mode: string;
  payment_status: string;
  order_status: string;
  pets: { name: string; type: string } | null;
  addresses: { full_name: string; phone: string } | null;
}

const AdminOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAndLoadOrders();
  }, [user]);

  const checkAdminAndLoadOrders = async () => {
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

      loadOrders();
    } catch (error) {
      console.error("Error:", error);
      navigate("/");
    }
  };

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          pets (name, type),
          addresses (full_name, phone)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ order_status: status })
        .eq("id", orderId);

      if (error) throw error;
      toast.success("Order status updated");
      loadOrders();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
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
            <h1 className="text-4xl font-bold text-foreground mb-2">Manage Orders</h1>
            <p className="text-muted-foreground">View and manage all orders</p>
          </div>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Pet</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.addresses?.full_name || "N/A"}</p>
                        <p className="text-xs text-muted-foreground">{order.addresses?.phone || ""}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{order.pets?.name || "N/A"}</p>
                      <p className="text-xs text-muted-foreground capitalize">{order.pets?.type || ""}</p>
                    </TableCell>
                    <TableCell>₹{order.total_amount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.payment_status === "PENDING" 
                          ? "bg-yellow-500/20 text-yellow-700"
                          : "bg-green-500/20 text-green-700"
                      }`}>
                        {order.payment_mode} - {order.payment_status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.order_status === "PLACED" 
                          ? "bg-blue-500/20 text-blue-700"
                          : order.order_status === "DELIVERED"
                          ? "bg-green-500/20 text-green-700"
                          : "bg-orange-500/20 text-orange-700"
                      }`}>
                        {order.order_status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={order.order_status} 
                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PLACED">Placed</SelectItem>
                          <SelectItem value="PROCESSING">Processing</SelectItem>
                          <SelectItem value="SHIPPED">Shipped</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
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

export default AdminOrders;