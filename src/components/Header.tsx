import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const { itemCount, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Modern Store
          </h1>
        </div>
        
        <Button 
          variant="cart" 
          size="default"
          onClick={toggleCart}
          className="relative"
        >
          <ShoppingCart className="h-4 w-4" />
          Cart
          {itemCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0">
              {itemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;