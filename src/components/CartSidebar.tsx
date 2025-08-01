import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartSidebar = () => {
  const { 
    isOpen, 
    closeCart, 
    items, 
    total, 
    removeItem, 
    updateQuantity, 
    clearCart 
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={closeCart}>
        <SheetContent className="w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">
              Start shopping to add items to your cart
            </p>
            <Button onClick={closeCart}>Continue Shopping</Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:w-[400px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            <Badge variant="secondary">{items.length}</Badge>
          </SheetTitle>
          <SheetDescription>
            Review your items and checkout when ready
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1 mt-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                <div className="w-16 h-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-primary font-semibold mb-2">
                    {formatPrice(item.price)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="mt-4 space-y-4">
          <Separator />
          
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total:</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>
          
          <div className="space-y-2">
            <Button variant="hero" className="w-full" size="lg">
              Checkout
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;