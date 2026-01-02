import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface PetCardProps {
  name: string;
  breed: string;
  age: string;
  price: string;
  image: string;
  gender: string;
  onAdopt: () => void;
}

const PetCard = ({ name, breed, age, price, image, gender, onAdopt }: PetCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if pet is in wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isInWishlist = wishlist.some((item: any) => item.name === name);
    setIsFavorite(isInWishlist);
  }, [name]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    
    if (isFavorite) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item: any) => item.name !== name);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsFavorite(false);
      toast.success("Removed from wishlist");
    } else {
      // Add to wishlist
      const petData = {
        name,
        breed,
        age,
        price,
        image,
        gender,
        addedAt: new Date().toISOString()
      };
      wishlist.push(petData);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsFavorite(true);
      toast.success("Added to wishlist");
    }
  };

  return (
    <Card className="group overflow-hidden card-3d bg-gradient-card border-border gradient-border">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-all duration-300 hover:scale-110 tilt-3d"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isFavorite ? "fill-primary text-primary scale-110" : "text-muted-foreground"
            }`}
          />
        </button>
        {/* New badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
          <Sparkles className="w-3 h-3" />
          Available
        </div>
      </div>
      <CardContent className="p-5 space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-muted-foreground text-sm">{breed}</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">Age: {age}</span>
          <span className="text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">Gender: {gender}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-2xl font-bold text-primary">{price}</span>
          <Button
            onClick={onAdopt}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft group-hover:shadow-hover transition-all duration-300 hover:scale-105"
          >
            Adopt Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetCard;
