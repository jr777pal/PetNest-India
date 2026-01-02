import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePageTransition } from "@/contexts/LoadingContext";

export const usePageTransitionLoader = () => {
  const location = useLocation();
  const { setIsPageTransitioning } = usePageTransition();

  useEffect(() => {
    // Show loading on route change
    setIsPageTransitioning(true);

    // Hide loading after 1 second
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location, setIsPageTransitioning]);
};
