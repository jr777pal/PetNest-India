import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Pet Parent",
      company: "Delhi",
      content: "PetNest made finding my perfect companion so easy! The entire adoption process was transparent, and my puppy arrived healthy and well-trained. The 24/7 support has been invaluable!",
      rating: 5,
      avatar: "PS"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Family Owner",
      company: "Mumbai",
      content: "We adopted two kittens through PetNest. The quality of care, health certifications, and post-adoption guidance exceeded our expectations. Highly recommended!",
      rating: 5,
      avatar: "RK"
    },
    {
      id: 3,
      name: "Anita Verma",
      role: "Cat Enthusiast",
      company: "Bangalore",
      content: "The expertise and passion of the PetNest team is remarkable. They helped us choose the perfect breed for our family. Our rabbit is the happiest pet we could ask for!",
      rating: 5,
      avatar: "AV"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "First-time Adopter",
      company: "Pune",
      content: "As a first-time pet owner, I was nervous. But PetNest's comprehensive guidance, training videos, and customer support made everything seamless. Best decision ever!",
      rating: 5,
      avatar: "VS"
    },
    {
      id: 5,
      name: "Neha Patel",
      role: "Experienced Pet Lover",
      company: "Ahmedabad",
      content: "I've adopted multiple pets over the years, and PetNest stands out for their ethical practices and genuine care. Every pet is healthy, well-socialized, and perfect!",
      rating: 5,
      avatar: "NP"
    },
    {
      id: 6,
      name: "Arjun Reddy",
      role: "Dog Parent",
      company: "Hyderabad",
      content: "The transparency, quality guarantee, and lifetime support from PetNest is unmatched. My golden retriever is thriving, and the team is always there to help!",
      rating: 5,
      avatar: "AR"
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setDirection("next");
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  const nextSlide = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const currentTestimonial = testimonials[currentIndex];
  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
    testimonials[(currentIndex + 3) % testimonials.length]
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary">// What clients say about working with me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Client <span className="text-primary">Testimonials</span>
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-12 perspective">
          <div className={`bg-gradient-to-br from-card to-card/50 rounded-3xl p-8 md:p-12 shadow-hover border border-border/50 backdrop-blur-sm relative overflow-hidden group transition-all duration-500 transform ${
            direction === "next" 
              ? 'animate-slide-in-right' 
              : 'animate-slide-in-left'
          }`}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-primary/20 transition-colors" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full -ml-16 -mb-16 blur-2xl" />

            {/* Line number */}
            <div className="absolute top-6 right-8 text-3xl md:text-4xl font-bold text-primary/30">
              {String(currentIndex + 1).padStart(2, '0')}
            </div>

            {/* File indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-muted-foreground">testimonial_{currentIndex + 1}.json</span>
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {renderStars(currentTestimonial.rating)}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl font-semibold text-foreground mb-8 leading-relaxed">
                "{currentTestimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-8 border-t border-border/30">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {currentTestimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-muted-foreground">
                    {currentTestimonial.role} <span className="text-primary">@ {currentTestimonial.company}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20 hover:border-primary/40"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20 hover:border-primary/40"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Carousel - Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleTestimonials.map((testimonial, idx) => {
            const isActive = idx === 0;
            return (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 transform ${
                  direction === "next"
                    ? isActive ? "animate-card-pop-in" : "animate-card-slide-left"
                    : isActive ? "animate-card-pop-in" : "animate-card-slide-right"
                }`}
              >
                <button
                  onClick={() => {
                    setDirection("next");
                    setCurrentIndex((currentIndex + idx) % testimonials.length);
                    setIsAutoPlay(false);
                    // Resume auto-play after 5 seconds of inactivity
                    setTimeout(() => setIsAutoPlay(true), 5000);
                  }}
                  className={`w-full text-left rounded-2xl p-6 transition-all duration-300 border ${
                    isActive
                      ? 'bg-primary/20 border-primary/40 shadow-hover'
                      : 'bg-card border-border hover:border-primary/30 hover:shadow-hover'
                  }`}
                >
                  <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${
                    isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}>
                    {testimonial.content}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      isActive
                        ? 'bg-gradient-to-br from-primary to-accent text-white'
                        : 'bg-gradient-to-br from-primary/60 to-accent/60 text-white/80'
                    }`}>
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm truncate ${
                        isActive ? 'text-foreground' : 'text-foreground'
                      }`}>
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlay(false);
                // Resume auto-play after 5 seconds of inactivity
                setTimeout(() => setIsAutoPlay(true), 5000);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-border hover:bg-border/80 w-2'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
