import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isAuthLoading: boolean;
  authLoadingType: "login" | "logout" | "signup";
  setIsAuthLoading: (isLoading: boolean) => void;
  setAuthLoadingType: (type: "login" | "logout" | "signup") => void;
  startAuthLoading: (type: "login" | "logout" | "signup") => void;
  stopAuthLoading: () => void;
  isPageTransitioning: boolean;
  setIsPageTransitioning: (isTransitioning: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authLoadingType, setAuthLoadingType] = useState<"login" | "logout" | "signup">("login");
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  const startAuthLoading = (type: "login" | "logout" | "signup") => {
    setAuthLoadingType(type);
    setIsAuthLoading(true);
  };

  const stopAuthLoading = () => {
    setIsAuthLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        isAuthLoading,
        authLoadingType,
        setIsAuthLoading,
        setAuthLoadingType,
        startAuthLoading,
        stopAuthLoading,
        isPageTransitioning,
        setIsPageTransitioning,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useAuthLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useAuthLoading must be used within a LoadingProvider");
  }
  return context;
};

export const usePageTransition = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("usePageTransition must be used within a LoadingProvider");
  }
  return {
    isPageTransitioning: context.isPageTransitioning,
    setIsPageTransitioning: context.setIsPageTransitioning,
  };
};
