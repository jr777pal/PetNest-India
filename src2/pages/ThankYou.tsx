import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Package, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ThankYou = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-background">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-3xl w-full relative z-10">
          {/* 3D Card Effect */}
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-border/50 transform hover:scale-[1.02] transition-all duration-500">
            {/* Success Icon with 3D effect */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-full p-8 shadow-2xl transform hover:rotate-12 transition-transform duration-500">
                  <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-primary-foreground animate-bounce-slow" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-primary animate-pulse" />
                <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-secondary animate-pulse animation-delay-300" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                🎉 Order Placed Successfully!
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Thank you for choosing PetNest! Your new furry friend will be on their way to you soon.
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 border border-border/30">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                <Package className="w-7 h-7 text-primary" />
                What Happens Next?
              </h2>
              <div className="space-y-6 max-w-2xl mx-auto">
                {[
                  {
                    step: "1",
                    title: "Order Confirmation",
                    desc: "You'll receive an email confirmation with your order details within minutes.",
                    delay: "animation-delay-100"
                  },
                  {
                    step: "2",
                    title: "Preparation & Care",
                    desc: "Our team prepares your pet with final health checks and care packages.",
                    delay: "animation-delay-200"
                  },
                  {
                    step: "3",
                    title: "Delivery Scheduling",
                    desc: "We'll contact you within 24-48 hours to schedule a convenient delivery time.",
                    delay: "animation-delay-300"
                  },
                  {
                    step: "4",
                    title: "Meet Your New Friend",
                    desc: "Your pet will arrive at your doorstep ready to become part of your family!",
                    delay: "animation-delay-400"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 bg-card/50 rounded-xl p-4 hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg ${item.delay}`}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-2xl group transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/my-orders">
                  <Package className="mr-2 w-5 h-5" />
                  Track My Order
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-2 border-primary/50 hover:bg-primary/10 group transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/">
                  <Home className="mr-2 w-5 h-5" />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground text-center">
                Need help? Contact us at{" "}
                <a href="mailto:support@petnest.com" className="text-primary hover:underline font-medium">
                  support@petnest.com
                </a>{" "}
                or call{" "}
                <a href="tel:+911800123456" className="text-primary hover:underline font-medium">
                  +91 1800-123-4567
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
