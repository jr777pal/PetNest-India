import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Calendar, User, ArrowRight, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  featured: boolean;
  comments: number;
  link: string;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Complete Guide to Puppy Care: First 6 Months",
      excerpt: "Learn essential tips for caring for your new puppy during the crucial first six months of life.",
      content: "The first six months of a puppy's life are critical for development. This guide covers nutrition, training, socialization, and health checkups...",
      category: "Care Guide",
      author: "Dr. Sarah Smith",
      date: "December 14, 2024",
      readTime: 8,
      image: "🐕",
      featured: true,
      comments: 24,
      link: "https://www.akc.org/expert-advice/puppies-first-year-what-expect/"
    },
    {
      id: 2,
      title: "Best Cat Breeds for Small Apartments",
      excerpt: "Discover which cat breeds thrive in compact living spaces and make great apartment companions.",
      content: "Not all cat breeds are suited for apartment living. Learn about calm, quiet breeds that are perfect for small spaces...",
      category: "Pet Selection",
      author: "Emily Thompson",
      date: "December 12, 2024",
      readTime: 6,
      image: "🐱",
      featured: true,
      comments: 18,
      link: "https://www.thesprucepets.com/best-apartment-cats-5072900"
    },
    {
      id: 3,
      title: "Understanding Pet Nutrition: What Your Pet Needs",
      excerpt: "A comprehensive overview of balanced nutrition for dogs, cats, rabbits, and other pets.",
      content: "Proper nutrition is the foundation of your pet's health. This article breaks down the essential nutrients...",
      category: "Health",
      author: "Dr. Michael Brown",
      date: "December 10, 2024",
      readTime: 10,
      image: "🍽️",
      featured: true,
      comments: 32,
      link: "https://www.aspca.org/pet-care/dog-care/nutrition-tips-your-dog"
    },
    {
      id: 4,
      title: "Training Tips: How to Teach Your Dog Basic Commands",
      excerpt: "Step-by-step instructions for teaching sit, stay, come, and other essential dog commands.",
      content: "Training your dog is one of the best investments in their happiness and safety. Here are proven methods...",
      category: "Training",
      author: "James Wilson",
      date: "December 8, 2024",
      readTime: 7,
      image: "🎓",
      featured: false,
      comments: 28,
      link: "https://www.cesarsway.com/teaching-dog-sit-stay-come-commands/"
    },
    {
      id: 5,
      title: "Rabbit Care 101: Creating the Perfect Habitat",
      excerpt: "Everything you need to know about setting up a comfortable and safe home for your rabbit.",
      content: "Rabbits require specific environmental conditions. Learn about space, temperature, and enrichment needs...",
      category: "Care Guide",
      author: "Lisa Anderson",
      date: "December 6, 2024",
      readTime: 9,
      image: "🐰",
      featured: false,
      comments: 15,
      link: "https://www.humanesociety.org/resources/rabbit-care"
    },
    {
      id: 6,
      title: "Preparing Your Home for a New Pet",
      excerpt: "A checklist of everything you need before bringing your new furry friend home.",
      content: "Bringing a new pet home is exciting! Make sure your home is prepared with these essential items...",
      category: "Home Preparation",
      author: "David Martinez",
      date: "December 4, 2024",
      readTime: 5,
      image: "🏠",
      featured: false,
      comments: 22,
      link: "https://www.thesprucepets.com/prepare-home-new-pet-5198827"
    },
    {
      id: 7,
      title: "Pet Health: Recognizing Signs of Illness",
      excerpt: "Important symptoms that warrant a visit to the veterinarian and how to monitor your pet's health.",
      content: "Knowing the signs of illness can help you catch health issues early. Watch for these warning signs...",
      category: "Health",
      author: "Dr. Sarah Smith",
      date: "December 2, 2024",
      readTime: 7,
      image: "🏥",
      featured: false,
      comments: 19,
      link: "https://www.petmd.com/health/pet-health-emergency-warning-signs"
    },
    {
      id: 8,
      title: "Success Stories: Adoptions That Changed Lives",
      excerpt: "Real stories from our community about how pet adoption brought joy and companionship.",
      content: "Meet the families and pets that found each other through PetNest. These heartwarming stories...",
      category: "Stories",
      author: "PetNest Team",
      date: "November 30, 2024",
      readTime: 6,
      image: "💕",
      featured: false,
      comments: 41,
      link: "https://www.adoptapet.com/adoption-tips"
    }
  ];

  const categories = [
    "all",
    "Care Guide",
    "Pet Selection",
    "Health",
    "Training",
    "Home Preparation",
    "Stories"
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured).slice(0, 3);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                PetNest Blog & News
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert tips, success stories, and everything you need to know about pet care
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search blog posts..."
                  className="pl-12 py-3 text-base bg-card border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {filteredPosts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              {featuredPosts.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-8">Featured Articles</h2>
                  <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {featuredPosts.map(post => (
                      <a
                        key={post.id}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-card rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-hover hover:border-primary/30 transition-all duration-300 block h-full"
                      >
                        {/* Image */}
                        <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 h-48 flex items-center justify-center overflow-hidden">
                          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                            {post.image}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <Badge className="mb-3 bg-primary/20 text-primary hover:bg-primary/30">
                            {post.category}
                          </Badge>
                          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              {post.readTime} min read
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MessageCircle className="w-3 h-3" />
                              {post.comments} comments
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary hover:bg-primary/10 group"
                              asChild
                            >
                              <span>
                                Read More
                                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </Button>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-8">Latest Articles</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {regularPosts.map(post => (
                      <a
                        key={post.id}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-card rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-hover hover:border-primary/30 transition-all duration-300 block h-full"
                      >
                        <div className="flex gap-4 h-full">
                          {/* Image */}
                          <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 w-32 h-32 flex-shrink-0 flex items-center justify-center">
                            <span className="text-4xl">{post.image}</span>
                          </div>

                          {/* Content */}
                          <div className="p-4 flex flex-col justify-between flex-1">
                            <div>
                              <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/30 text-xs">
                                {post.category}
                              </Badge>
                              <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {post.excerpt}
                              </p>
                            </div>

                            {/* Meta */}
                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {post.date}
                              </div>
                              <div className="flex items-center gap-1">
                                {post.readTime} min
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {post.comments}
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <p className="text-lg text-muted-foreground">
                No articles found matching your search. Try different keywords or browse all categories.
              </p>
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest pet care tips and success stories
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                type="email"
                className="bg-card border-border"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
