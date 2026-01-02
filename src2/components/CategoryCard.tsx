import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  image: string;
  path: string;
  count: number;
}

const CategoryCard = ({ title, image, path, count }: CategoryCardProps) => {
  return (
    <Link to={path}>
      <Card className="group overflow-hidden card-3d cursor-pointer bg-gradient-card border-border gradient-border">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* 3D overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm mb-1 opacity-80">{count} Available</p>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">View {title}</h3>
                <div className="bg-primary-foreground/20 rounded-full p-2 backdrop-blur-sm">
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
          {/* Shimmer effect */}
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4 text-center relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground">{count} pets available</p>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
