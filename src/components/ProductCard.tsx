import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className="group h-full flex flex-col bg-gradient-card shadow-card hover:shadow-elegant transition-smooth transform hover:-translate-y-1">
      <CardContent className="p-4 flex-1">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-smooth group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          
          <h3 
            className="font-semibold text-sm line-clamp-2 cursor-pointer hover:text-primary transition-colors"
            onClick={() => onViewDetails(product)}
          >
            {product.title}
          </h3>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          
          <p className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-y-3">
        <Button 
          variant="outline" 
          size="sm"
          className="w-full"
          onClick={() => onViewDetails(product)}
        >
          View Details
        </Button>
        
        <Button 
          variant="default" 
          size="sm"
          className="w-full"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;