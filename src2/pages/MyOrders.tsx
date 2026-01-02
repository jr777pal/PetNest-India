import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { X } from "lucide-react";

interface Order {
  id: string;
  total_amount: number;
  payment_mode: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  pets: {
    name: string;
    image_url: string;
    type: string;
    price: number;
  };
  addresses: {
    full_name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
}

const MyOrders = () => {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || isGuest) {
      navigate("/auth");
      return;
    }

    loadOrders();
  }, [user, isGuest, navigate]);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          pets (name, image_url, type, price),
          addresses (full_name, phone, address_line1, address_line2, city, state, pincode)
        `)
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    setCancellingId(orderId);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ order_status: "CANCELLED" })
        .eq("id", orderId)
        .eq("user_id", user!.id);

      if (error) throw error;

      toast.success("Order cancelled successfully");
      loadOrders();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLACED": return "bg-blue-500";
      case "CONFIRMED": return "bg-green-500";
      case "SHIPPED": return "bg-purple-500";
      case "DELIVERED": return "bg-green-600";
      case "CANCELLED": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const canCancelOrder = (status: string) => {
    return ["PLACED", "CONFIRMED"].includes(status);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground">
              Start browsing pets and place your first order!
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex gap-4">
                  <img
                    src={order.pets?.image_url || "/placeholder.svg"}
                    alt={order.pets?.name || "Pet"}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{order.pets?.name || "Unknown Pet"}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {order.pets?.type || "Pet"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(order.order_status)}>
                          {order.order_status}
                        </Badge>
                        {canCancelOrder(order.order_status) && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                disabled={cancellingId === order.id}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel this order for {order.pets?.name}? 
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>No, keep order</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Yes, cancel order
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      <p><strong>Deliver to:</strong> {order.addresses?.full_name || "N/A"}</p>
                      <p>{order.addresses?.address_line1 || "N/A"}, {order.addresses?.city || "N/A"}</p>
                      <p>{order.addresses?.state || "N/A"} - {order.addresses?.pincode || "N/A"}</p>
                      <p><strong>Phone:</strong> {order.addresses?.phone || "N/A"}</p>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div className="text-sm text-muted-foreground">
                        <p>Ordered on: {new Date(order.created_at).toLocaleDateString()}</p>
                        <p>Payment: {order.payment_mode} ({order.payment_status})</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-xl font-bold">₹{order.total_amount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyOrders;
