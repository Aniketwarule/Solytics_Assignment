import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const { addItem } = useCart();

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <DialogTitle className="text-2xl font-bold mb-2">
                  {product.title}
                </DialogTitle>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating.rate}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({product.rating.count} reviews)
                  </span>
                </div>
                
                <p className="text-3xl font-bold text-primary mb-4">
                  {formatPrice(product.price)}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <DialogDescription className="text-base leading-relaxed">
                  {product.description}
                </DialogDescription>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="default" 
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;