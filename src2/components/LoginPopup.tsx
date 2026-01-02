import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const LoginPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isGuest, setIsGuest } = useAuth();

  useEffect(() => {
    // Show popup only if user is not logged in and not a guest
    const hasSeenPopup = sessionStorage.getItem("hasSeenLoginPopup");
    if (!user && !isGuest && !hasSeenPopup) {
      setOpen(true);
    }
  }, [user, isGuest]);

  const handleLogin = () => {
    sessionStorage.setItem("hasSeenLoginPopup", "true");
    setOpen(false);
    navigate("/auth");
  };

  const handleGuestVisit = () => {
    sessionStorage.setItem("hasSeenLoginPopup", "true");
    setIsGuest(true);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">Welcome to PetNest! 🐾</DialogTitle>
          <DialogDescription className="text-center">
            Please login to access all features and adopt your perfect furry friend
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button 
            onClick={handleLogin} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            Login to Continue
          </Button>
          <Button 
            onClick={handleGuestVisit} 
            variant="outline"
            className="w-full"
            size="lg"
          >
            Continue as Guest
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Guest users can browse pets but need to login to adopt or purchase
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
