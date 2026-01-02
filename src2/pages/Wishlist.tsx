import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface WishlistItem {
  name: string;
  breed: string;
  age: string;
  price: string;
  image: string;
  gender: string;
  addedAt: string;
}

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
  };

  const removeFromWishlist = (name: string) => {
    const updatedWishlist = wishlist.filter(item => item.name !== name);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    toast.success("Removed from wishlist");
  };

  const handleAdopt = (item: WishlistItem) => {
    navigate("/checkout", {
      state: {
        pet: {
          id: `pet-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
          name: item.name,
          price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
          image_url: item.image,
          type: item.breed,
          breed: item.breed
        }
      }
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

          <Card className="p-8 text-center">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-4">
              Add pets you love to your wishlist
            </p>
            <Button onClick={() => navigate("/make-pet")}>
              Browse Pets
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlist.length})</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item.name)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.breed}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Age: {item.age}</span>
                  <span className="text-muted-foreground">{item.gender}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xl font-bold text-primary">{item.price}</span>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleAdopt(item)}
                >
                  Adopt Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
