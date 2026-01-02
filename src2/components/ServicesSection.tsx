import { Smartphone, Headphones, Truck, Heart, Shield, FileCheck, Clock, Zap } from "lucide-react";

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServicesSection = () => {
  const services: Service[] = [
    {
      id: 1,
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: "Easy Online Browsing",
      description: "Browse hundreds of pets from your home with detailed profiles and high-quality photos"
    },
    {
      id: 2,
      icon: <Headphones className="w-6 h-6 text-primary" />,
      title: "24/7 Customer Support",
      description: "Our expert team is always available to answer your questions and guide you"
    },
    {
      id: 3,
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: "Safe Delivery",
      description: "Secure and comfortable transportation with live tracking for your new pet"
    },
    {
      id: 4,
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Pet Welfare",
      description: "All pets are health-checked, vaccinated, and raised in loving environments"
    },
    {
      id: 5,
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Verified Breeders",
      description: "Work only with certified and verified breeders who follow ethical practices"
    },
    {
      id: 6,
      icon: <FileCheck className="w-6 h-6 text-primary" />,
      title: "Complete Documentation",
      description: "Get all health certificates, vaccination records, and adoption papers"
    },
    {
      id: 7,
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Lifetime Support",
      description: "We're here to help throughout your pet's life with ongoing care guidance"
    },
    {
      id: 8,
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Quick Adoption Process",
      description: "Fast and straightforward adoption process with minimal paperwork"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Pet Lovers Choose PetNest
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive services designed to make pet adoption easy, safe, and joyful
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-hover hover:border-primary/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Section */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Pet, Your Family
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              At PetNest, we believe every pet deserves a loving home and every family deserves the perfect companion. 
              Our mission is to connect pets with families who will cherish them forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/make-pet"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Find Your Match
              </a>
              <a
                href="/help-center"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
