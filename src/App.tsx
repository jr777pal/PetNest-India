import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import ThemeTransition from "./components/ThemeTransition";
import LoginPopup from "./components/LoginPopup";
import PageTransitionLoader from "./components/PageTransitionLoader";
import { usePageTransitionLoader } from "./hooks/usePageTransitionLoader";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Index from "./pages/Index";
import MakePet from "./pages/MakePet";
import Dogs from "./pages/Dogs";
import Cats from "./pages/Cats";
import Rabbits from "./pages/Rabbits";
import Squirrels from "./pages/Squirrels";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist";
import MyAddresses from "./pages/MyAddresses";
import HelpCenter from "./pages/HelpCenter";
import ThankYou from "./pages/ThankYou";
import Auth from "./pages/Auth";
import AdoptionJourney from "./pages/AdoptionJourney";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPets from "./pages/admin/Pets";
import AdminOrders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/Users";

const queryClient = new QueryClient();

// Wrapper component to use the hook inside BrowserRouter context
const AppRoutes = () => {
  usePageTransitionLoader();
  useScrollToTop();

  return (
    <>
      <PageTransitionLoader />
      <AuthProvider>
        <LoginPopup />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/make-pet" element={<MakePet />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/rabbits" element={<Rabbits />} />
          <Route path="/squirrels" element={<Squirrels />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/my-addresses" element={<MyAddresses />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/adoption-journey" element={<AdoptionJourney />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/pets" element={<AdminPets />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ThemeTransition />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;
