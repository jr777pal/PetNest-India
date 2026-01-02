import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Skeleton */}
      <div className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="hidden md:flex gap-4">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            <Skeleton className="md:hidden w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </div>
              <Skeleton className="h-96 rounded-3xl" />
            </div>
          </div>
        </section>

        {/* About Section Skeleton */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto mb-12" />

            <div className="grid md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-32 mx-auto" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Skeleton */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto mb-12" />

            <div className="grid md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 rounded-2xl" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section Skeleton */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-32 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto mb-12" />

            <div className="grid md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-6 space-y-4 bg-card rounded-2xl border border-border">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t border-border bg-secondary/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8">
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardSkeleton;
