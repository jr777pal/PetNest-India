import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface AuthLoadingPageProps {
  isVisible: boolean;
  message?: string;
  type?: "login" | "logout" | "signup";
}

const AuthLoadingPage = ({
  isVisible,
  message = "Loading...",
  type = "login"
}: AuthLoadingPageProps) => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const messages = {
    login: "Logging you in",
    logout: "Logging you out",
    signup: "Creating your account"
  };

  const displayMessage = message || messages[type];

  return (
    <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-card rounded-2xl shadow-3d border border-border p-8 max-w-sm w-full mx-4 text-center">
        {/* Animated Heart Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-10 h-10 text-primary animate-bounce" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {displayMessage}
          <span className="inline-block w-6">{dots}</span>
        </h2>

        {/* Loading Bar */}
        <div className="mt-6 space-y-2">
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
              style={{
                animation: "shimmer 2s infinite",
              }}
            />
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-muted-foreground text-sm mt-6">
          {type === "login" && "Please wait while we authenticate your credentials..."}
          {type === "logout" && "Securely logging you out..."}
          {type === "signup" && "Setting up your PetNest account..."}
        </p>

        <style>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AuthLoadingPage;
