import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-secondary/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-full p-2">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PetNest</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted platform for finding, adopting, and caring for your perfect furry friend.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/make-pet" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Browse Pets
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Pet Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Pet Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dogs" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Dogs
                </Link>
              </li>
              <li>
                <Link to="/cats" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Cats
                </Link>
              </li>
              <li>
                <Link to="/rabbits" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Rabbits
                </Link>
              </li>
              <li>
                <Link to="/squirrels" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Squirrels
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4" />
                petnest@gmail.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4" />
                +91 8018119112 
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                Rupena Agrahara Bengaluru   
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} PetNest. All rights reserved. Made with <Heart className="inline w-4 h-4 text-primary" /> for pets.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;