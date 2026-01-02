import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  onFilterChange: (filters: {
    sortBy: string;
    age: string;
    gender: string;
    priceRange: string;
  }) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState({
    sortBy: "",
    age: "all",
    gender: "all",
    priceRange: "all"
  });

  const handleFilterUpdate = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      sortBy: "",
      age: "all",
      gender: "all",
      priceRange: "all"
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
      <div className="flex items-center gap-3 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Filter & Sort</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Sort By</label>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterUpdate("sortBy", value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="age-young">Age: Youngest</SelectItem>
              <SelectItem value="age-old">Age: Oldest</SelectItem>
              <SelectItem value="name">Name: A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Age</label>
          <Select value={filters.age} onValueChange={(value) => handleFilterUpdate("age", value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Any Age" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">Any Age</SelectItem>
              <SelectItem value="puppy">Puppy/Kitten (0-1 year)</SelectItem>
              <SelectItem value="young">Young (1-3 years)</SelectItem>
              <SelectItem value="adult">Adult (3-7 years)</SelectItem>
              <SelectItem value="senior">Senior (7+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Gender</label>
          <Select value={filters.gender} onValueChange={(value) => handleFilterUpdate("gender", value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Any Gender" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">Any Gender</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Price Range</label>
          <Select value={filters.priceRange} onValueChange={(value) => handleFilterUpdate("priceRange", value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="0-15000">₹0 - ₹15,000</SelectItem>
              <SelectItem value="15000-20000">₹15,000 - ₹20,000</SelectItem>
              <SelectItem value="20000+">₹20,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button 
          onClick={applyFilters} 
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Apply Filters
        </Button>
        <Button 
          onClick={resetFilters}
          variant="outline" 
          className="flex-1 border-border hover:bg-secondary"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
