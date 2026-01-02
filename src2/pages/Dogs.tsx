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

const Dogs = () => {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const [allDogs, setAllDogs] = useState<Pet[]>([]);
  const [dogs, setDogs] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDogs();
  }, []);

  const loadDogs = async () => {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("type", "dog")
        .eq("available", true)
        .order("name");

      if (error) throw error;
      setAllDogs(data || []);
      setDogs(data || []);
    } catch (error) {
      console.error("Error loading dogs:", error);
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
    let filtered = [...allDogs];

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

    setDogs(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Adopt a Dog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your loyal companion. Browse through our collection of adorable dogs looking for their forever home.
            </p>
          </div>

          <FilterBar onFilterChange={handleFilterChange} />

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {dogs.map((dog) => (
                <PetCard
                  key={dog.id}
                  name={dog.name}
                  breed={dog.breed || "Unknown"}
                  age={`${dog.age} year${dog.age !== 1 ? 's' : ''}`}
                  price={`₹${dog.price.toLocaleString()}`}
                  image={dog.image_url || "/placeholder.svg"}
                  gender={dog.gender || "Unknown"}
                  onAdopt={() => handleAdopt(dog)}
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

export default Dogs;
