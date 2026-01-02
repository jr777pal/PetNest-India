import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import AdoptionModal from "@/components/AdoptionModal";
import Testimonials from "@/components/Testimonials";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Award, Users, Shield } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import categoryDogs from "@/assets/category-dogs.jpg";
import categoryCats from "@/assets/category-cats.jpg";
import categoryRabbits from "@/assets/category-rabbits.jpg";
import categorySquirrels from "@/assets/category-squirrels.jpg";

const Index = () => {
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    petType: "",
    message: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Thank you for your interest! We'll contact you soon.");
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />

        {/* About Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose PetNest?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide comprehensive training, care, and maintenance support for every pet at our center.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center space-y-3 p-6 bg-card rounded-2xl shadow-soft border border-border hover:shadow-hover transition-shadow">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Loving Care</h3>
                <p className="text-muted-foreground text-sm">
                  Every pet receives individual attention and love from our dedicated team.
                </p>
              </div>

              <div className="text-center space-y-3 p-6 bg-card rounded-2xl shadow-soft border border-border hover:shadow-hover transition-shadow">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Quality Assured</h3>
                <p className="text-muted-foreground text-sm">
                  Health-checked and vaccinated pets with proper documentation.
                </p>
              </div>

              <div className="text-center space-y-3 p-6 bg-card rounded-2xl shadow-soft border border-border hover:shadow-hover transition-shadow">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Expert Support</h3>
                <p className="text-muted-foreground text-sm">
                  24/7 guidance from veterinarians and pet care specialists.
                </p>
              </div>

              <div className="text-center space-y-3 p-6 bg-card rounded-2xl shadow-soft border border-border hover:shadow-hover transition-shadow">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Safe & Secure</h3>
                <p className="text-muted-foreground text-sm">
                  Secure adoption process with proper verification and contracts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Pet Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find your perfect companion from our diverse selection of pets.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
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
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Services Section */}
        <ServicesSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Adoption Request Form */}
        <section id="adoption-form" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Start Your Adoption Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out this form and we'll help you find the perfect pet for your family.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="bg-card rounded-2xl p-8 shadow-soft border border-border space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Your Name *</Label>
                  <Input
                    id="contact-name"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email Address *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="john@example.com"
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-pet-type">Interested In</Label>
                <Select
                  value={contactForm.petType}
                  onValueChange={(value) => setContactForm({ ...contactForm, petType: value })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select a pet type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="dog">Dogs</SelectItem>
                    <SelectItem value="cat">Cats</SelectItem>
                    <SelectItem value="rabbit">Rabbits</SelectItem>
                    <SelectItem value="squirrel">Squirrels</SelectItem>
                    <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Tell Us About Yourself</Label>
                <Textarea
                  id="contact-message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Tell us about your home, family, and why you want to adopt a pet..."
                  className="bg-background border-border min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-hover"
                size="lg"
              >
                Submit Request
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
      <AdoptionModal
        isOpen={isAdoptionModalOpen}
        onClose={() => setIsAdoptionModalOpen(false)}
      />
    </div>
  );
};

export default Index;
