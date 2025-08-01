import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { productApi } from '@/lib/api';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';
import { CartProvider } from '@/contexts/CartContext';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const { data: products, isLoading: isLoadingProducts, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAllProducts,
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: productApi.getCategories,
  });

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (productsError) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Products</h2>
              <p className="text-muted-foreground">Please try again later.</p>
            </div>
          </div>
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <CartSidebar />
        
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Discover Amazing Products
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in">
              Shop the latest and greatest products from our curated collection
            </p>
            <Button variant="secondary" size="lg" className="animate-scale-in">
              Start Shopping
            </Button>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('')}
                disabled={isLoadingCategories}
              >
                All Categories
              </Button>
              {categories?.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {isLoadingProducts ? (
            <LoadingSpinner text="Loading amazing products..." />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
                </h2>
                <Badge variant="secondary">
                  {filteredProducts?.length || 0} products found
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts?.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard
                      product={product}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))}
              </div>
              
              {filteredProducts?.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </>
          )}
        </main>

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={closeModal}
        />
      </div>
    </CartProvider>
  );
};

export default Index;
