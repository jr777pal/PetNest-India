import { TrendingUp, Heart, Award, Users } from "lucide-react";

interface Stat {
  id: number;
  icon: React.ReactNode;
  number: string;
  label: string;
  description: string;
}

const StatsSection = () => {
  const stats: Stat[] = [
    {
      id: 1,
      icon: <Heart className="w-8 h-8 text-red-500" />,
      number: "500+",
      label: "Successful Adoptions",
      description: "Pets placed in loving homes"
    },
    {
      id: 2,
      icon: <Users className="w-8 h-8 text-blue-500" />,
      number: "10K+",
      label: "Happy Families",
      description: "Satisfied customers worldwide"
    },
    {
      id: 3,
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      number: "98%",
      label: "Customer Satisfaction",
      description: "Rating based on reviews"
    },
    {
      id: 4,
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      number: "24/7",
      label: "Expert Support",
      description: "Always here to help"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            By the Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how PetNest has made a difference in the lives of thousands of pets and families
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative bg-card rounded-2xl p-8 shadow-soft border border-border hover:shadow-hover hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="mb-4 inline-block p-3 bg-secondary rounded-lg group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Metrics */}
        <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Our Quality Standards
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">
                Health-checked & Vaccinated Pets
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                All pets undergo thorough medical examination
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">
                Proper Documentation
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Complete records and health certifications provided
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">
                Money-back Guarantee
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Satisfaction guaranteed or your money back
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
