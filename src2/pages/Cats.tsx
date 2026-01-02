import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import PetCard from "@/components/PetCard";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  price: number;
  image_url: string;
  gender: string;
  type: string;
}

const Cats = () => {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const [allCats, setAllCats] = useState<Pet[]>([]);
  const [cats, setCats] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCats();
  }, []);

  const loadCats = async () => {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("type", "cat")
        .eq("available", true)
        .order("name");

      if (error) throw error;
      setAllCats(data || []);
      setCats(data || []);
    } catch (error) {
      console.error("Error loading cats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = (pet: Pet) => {
    if (!user || isGuest) {
      toast.error("Please login to adopt a pet");
      navigate("/auth");
      return;
    }
    
    navigate("/checkout", { 
      state: { 
        pet: {
          id: pet.id,
          name: pet.name,
          price: pet.price,
          image_url: pet.image_url,
          type: pet.type,
          breed: pet.breed
        }
      }
    });
  };

  const handleFilterChange = (filters: { sortBy: string; age: string; gender: string; priceRange: string }) => {
    let filtered = [...allCats];

    if (filters.gender !== "all") {
      filtered = filtered.filter(pet => pet.gender?.toLowerCase() === filters.gender.toLowerCase());
    }

    if (filters.age !== "all") {
      filtered = filtered.filter(pet => {
        const age = pet.age || 0;
        switch (filters.age) {
          case "puppy": return age <= 1;
          case "young": return age > 1 && age <= 3;
          case "adult": return age > 3 && age <= 7;
          case "senior": return age > 7;
          default: return true;
        }
      });
    }

    if (filters.priceRange !== "all") {
      filtered = filtered.filter(pet => {
        const price = pet.price || 0;
        switch (filters.priceRange) {
          case "0-15000": return price <= 15000;
          case "15000-20000": return price > 15000 && price <= 20000;
          case "20000+": return price > 20000;
          default: return true;
        }
      });
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "price-low": return (a.price || 0) - (b.price || 0);
          case "price-high": return (b.price || 0) - (a.price || 0);
          case "age-young": return (a.age || 0) - (b.age || 0);
          case "age-old": return (b.age || 0) - (a.age || 0);
          case "name": return a.name.localeCompare(b.name);
          default: return 0;
        }
      });
    }

    setCats(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Adopt a Cat
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your perfect feline friend. Browse through our collection of adorable cats waiting for a loving home.
            </p>
          </div>

          <FilterBar onFilterChange={handleFilterChange} />

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {cats.map((cat) => (
                <PetCard
                  key={cat.id}
                  name={cat.name}
                  breed={cat.breed || "Unknown"}
                  age={`${cat.age} year${cat.age !== 1 ? 's' : ''}`}
                  price={`₹${cat.price.toLocaleString()}`}
                  image={cat.image_url || "/placeholder.svg"}
                  gender={cat.gender || "Unknown"}
                  onAdopt={() => handleAdopt(cat)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cats;
