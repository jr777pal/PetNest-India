import { usePageTransition } from "@/contexts/LoadingContext";
import { Skeleton } from "@/components/ui/skeleton";

const PageTransitionLoader = () => {
  const { isPageTransitioning } = usePageTransition();

  if (!isPageTransitioning) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full h-full">
        {/* Navbar Skeleton */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="space-y-4 mb-12">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTransitionLoader;
