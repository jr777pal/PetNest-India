import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-pets.jpg";
import { ArrowRight, Sparkles } from "lucide-react";
const HeroSection = () => {
  return <section className="relative overflow-hidden bg-gradient-hero">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl float-animation" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl float-animation-delayed" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/15 rounded-full blur-xl float-animation" />
      
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Find Your Perfect Companion</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-destructive">
              Find Your Perfect
              <span className="text-primary block relative">
                Furry Friend!
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" className="animate-in fade-in duration-1000 delay-500" />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Browse through our collection of adorable pets waiting for their forever home. 
              From playful puppies to cuddly kittens, your new best friend is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-hover group pulse-glow">
                <Link to="/make-pet">
                  Browse Pets
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 hover:bg-secondary tilt-3d">
                <Link to="/adoption-journey">Adoption Form</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right duration-700">
            <div className="relative rounded-3xl overflow-hidden hero-3d shimmer">
              <img src={heroImage} alt="Happy pets" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-3d card-3d glass-effect">
              <p className="text-sm text-muted-foreground">Over</p>
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Happy Adoptions</p>
            </div>
            
            {/* Additional floating element */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-2xl p-3 shadow-3d card-3d">
              <p className="text-xs font-medium">Trusted by</p>
              <p className="text-lg font-bold">10K+ Families</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;