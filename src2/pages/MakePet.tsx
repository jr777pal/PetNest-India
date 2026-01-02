import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";

import categoryDogs from "@/assets/category-dogs.jpg";
import categoryCats from "@/assets/category-cats.jpg";
import categoryRabbits from "@/assets/category-rabbits.jpg";
import categorySquirrels from "@/assets/category-squirrels.jpg";

const MakePet = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your Perfect Pet
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our collection of adorable pets. Select a category to see all available pets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <CategoryCard
              title="Dogs"
              image={categoryDogs}
              path="/dogs"
              count={125}
            />
            <CategoryCard
              title="Cats"
              image={categoryCats}
              path="/cats"
              count={98}
            />
            <CategoryCard
              title="Rabbits"
              image={categoryRabbits}
              path="/rabbits"
              count={45}
            />
            <CategoryCard
              title="Squirrels"
              image={categorySquirrels}
              path="/squirrels"
              count={32}
            />
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <div className="bg-accent/20 rounded-2xl p-8 border border-accent">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Not Sure Which Pet is Right for You?
              </h2>
              <p className="text-muted-foreground mb-4">
                Our pet experts are here to help! We can guide you through the adoption process and help you find the perfect companion for your lifestyle.
              </p>
              <a
                href="mailto:contact@petnest.com"
                className="text-primary hover:text-primary/80 font-medium underline"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MakePet;
