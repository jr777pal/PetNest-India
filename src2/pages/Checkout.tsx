import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderProcessingLoader from "@/components/OrderProcessingLoader";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PetData {
  id: string;
  name: string;
  price: number;
  image_url: string;
  type: string;
  breed?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showOrderProcessing, setShowOrderProcessing] = useState(false);
  const [pet, setPet] = useState<PetData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const petData = location.state?.pet as PetData;
    if (!petData) {
      toast.error("No pet selected for adoption");
      navigate("/make-pet");
      return;
    }

    setPet(petData);
  }, [user, location, navigate]);

  if (!pet) {
    return null;
  }

  const subtotal = pet.price;
  const handlingFee = 500;
  const platformFee = 200;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal + handlingFee + platformFee - discount;

  const applyCoupon = () => {
    // Hardcoded coupon for demo
    if (couponCode.toUpperCase() === "PAL") {
      setAppliedCoupon({ code: "PAL", discount: 99 });
      toast.success("Coupon applied! 99% off");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const saveOrderToDatabase = async (addressId: string) => {
    console.log("Saving COD order to database:", { addressId, petId: pet!.id });
    try {
      // First check if pet exists in database
      const { data: existingPet } = await supabase
        .from("pets")
        .select("id")
        .eq("name", pet!.name)
        .eq("type", pet!.type)
        .maybeSingle();

      let petId: string;

      if (existingPet) {
        console.log("Pet exists in database:", existingPet.id);
        petId = existingPet.id;
      } else {
        // Pet doesn't exist, create it first
        console.log("Creating pet in database...");
        const { data: newPet, error: petError } = await supabase
          .from("pets")
          .insert({
            name: pet!.name,
            type: pet!.type,
            breed: pet!.breed || null,
            price: pet!.price,
            image_url: pet!.image_url,
            available: true,
          })
          .select("id")
          .single();

        if (petError) {
          console.error("Error creating pet:", petError);
          // If we can't create the pet (e.g., not admin), just use a placeholder approach
          // This shouldn't happen in production, but let's handle it gracefully
          throw new Error("Unable to process pet information. Please contact support.");
        }

        petId = newPet.id;
        console.log("Pet created with ID:", petId);
      }

      // Now create the order with the valid pet UUID
      const { error } = await supabase.from("orders").insert({
        user_id: user!.id,
        pet_id: petId,
        address_id: addressId,
        pet_price: pet!.price,
        handling_fee: 500,
        platform_fee: 200,
        cod_charge: 0,
        coupon_discount: discount,
        total_amount: total,
        payment_mode: "COD",
        payment_status: "PENDING",
        order_status: "PLACED",
      });

      if (error) {
        console.error("Database insert error:", error);
        throw error;
      }
      
      console.log("Order saved successfully to database");
      return true;
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to save order");
      return false;
    }
  };

  const handleAdoptNow = async () => {
    if (!formData.fullName || !formData.phone || !formData.addressLine1 || !formData.city || !formData.state || !formData.pincode) {
      toast.error("Please fill all required fields");
      return;
    }

    console.log("Starting COD order process");
    setLoading(true);

    try {
      // First, save or get address
      const { data: existingAddress } = await supabase
        .from("addresses")
        .select("id")
        .eq("user_id", user!.id)
        .eq("full_name", formData.fullName)
        .eq("phone", formData.phone)
        .eq("address_line1", formData.addressLine1)
        .eq("city", formData.city)
        .eq("state", formData.state)
        .eq("pincode", formData.pincode)
        .maybeSingle();

      let addressId: string;

      if (existingAddress) {
        addressId = existingAddress.id;
      } else {
        const { data: newAddress, error: insertError } = await supabase
          .from("addresses")
          .insert({
            user_id: user!.id,
            full_name: formData.fullName,
            phone: formData.phone,
            address_line1: formData.addressLine1,
            address_line2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          })
          .select("id")
          .single();

        if (insertError) throw insertError;
        addressId = newAddress.id;
      }

      // Process COD order
      console.log("Processing COD order...");
      const success = await saveOrderToDatabase(addressId);
      
      if (success) {
        console.log("COD order saved successfully");
        setLoading(false);
        setShowOrderProcessing(true);
        
        // Show loading for 3 seconds then redirect
        setTimeout(() => {
          navigate("/thank-you");
        }, 3000);
      } else {
        console.error("Failed to save COD order");
        toast.error("Failed to place order. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order");
      setLoading(false);
    }
  };

  return (
    <>
      {showOrderProcessing && <OrderProcessingLoader />}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Adopt {pet.name}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="Street, House No., Building"
                  />
                </div>
                <div>
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    placeholder="Landmark"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer font-medium">
                    Cash on Delivery
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground ml-7 -mt-2">
                  Pay when your pet is delivered to your doorstep
                </p>
                
                <div className="relative flex items-center space-x-3 p-4 bg-muted/40 rounded-lg opacity-60">
                  <RadioGroupItem value="online" id="online" disabled />
                  <Label htmlFor="online" className="flex-1 font-medium text-muted-foreground">
                    Online Payment
                  </Label>
                  <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                </div>
                <p className="text-sm text-muted-foreground ml-7 -mt-2">
                  UPI, Cards, Net Banking - Available Soon
                </p>
              </RadioGroup>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-4 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex gap-3">
                  <img
                    src={pet.image_url || "/placeholder.svg"}
                    alt={pet.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{pet.breed || pet.type}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between">
                  <span>Pet Price</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Handling Fee</span>
                  <span>₹{handlingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount ({appliedCoupon?.discount}%)</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label htmlFor="coupon">Have a Coupon?</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    disabled={!!appliedCoupon}
                  />
                  <Button 
                    onClick={applyCoupon} 
                    variant="outline"
                    disabled={!!appliedCoupon || !couponCode}
                  >
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-green-600">
                      ✓ Coupon "{appliedCoupon.code}" applied
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponCode("");
                        toast.info("Coupon removed");
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleAdoptNow}
                disabled={loading}
              >
                {loading ? "Processing..." : `Adopt Now (₹${total})`}
              </Button>
            </Card>
          </div>
        </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
