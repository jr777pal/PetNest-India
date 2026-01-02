import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, X, User, LogOut, Package, Heart as HeartIcon, MapPin, HelpCircle, Shield, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { supabase } from "@/integrations/supabase/client";
import AuthLoadingPage from "@/components/AuthLoadingPage";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const { user, isGuest, signOut } = useAuth();
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      setIsAdmin(!!data);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    await signOut();
    setTimeout(() => {
      setIsLogoutLoading(false);
      navigate("/");
    }, 1500);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find a Pet", path: "/make-pet" },
    { name: "Dogs", path: "/dogs" },
    { name: "Cats", path: "/cats" },
    { name: "Rabbits", path: "/rabbits" },
    { name: "Squirrels", path: "/squirrels" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      <AuthLoadingPage isVisible={isLogoutLoading} message="Logging you out" type="logout" />
      <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary rounded-full p-2 transition-transform group-hover:scale-110">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">PetNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              disabled={isTransitioning}
              className="relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <Sun className={`h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
              <Moon className={`absolute h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            </Button>

            {/* Account Dropdown */}
            {user && !isGuest ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <Shield className="w-4 h-4 mr-2 text-purple-600" />
                        <span className="text-purple-600 font-semibold">Admin Panel</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={() => navigate("/my-orders")}>
                    <Package className="w-4 h-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                    <HeartIcon className="w-4 h-4 mr-2" />
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-addresses")}>
                    <MapPin className="w-4 h-4 mr-2" />
                    My Addresses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/help-center")}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help Center
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate("/auth")}>
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              disabled={isTransitioning}
              className="relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <Sun className={`h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
              <Moon className={`absolute h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            </Button>
            <button
              className="text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user && !isGuest && (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block py-3 px-4 text-purple-600 font-semibold hover:bg-accent rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ⚡ Admin Panel
                  </Link>
                )}
                <Link
                  to="/my-orders"
                  className="block py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="block py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wishlist
                </Link>
                <Link
                  to="/my-addresses"
                  className="block py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Addresses
                </Link>
                <Link
                  to="/help-center"
                  className="block py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Help Center
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 text-destructive hover:bg-accent rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            )}
            {(!user || isGuest) && (
              <Link
                to="/auth"
                className="block py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
