import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ShoppingCart, Heart, Star, Filter, Plus, Minus } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import halalMunchiesBurger from 'figma:asset/248137a441e037c6028380b68f38877cba850a5f.png';

interface MenuPreviewProps {
  onBackToHome: () => void;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  rating: number;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegan?: boolean;
}

export function MenuPreview({ onBackToHome }: MenuPreviewProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Chicken Biryani",
      description: "Fragrant basmati rice with tender marinated chicken, aromatic spices, and caramelized onions",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2hlMjBpbmRpYW58ZW58MXx8fHwxNzU3MDg5MjA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "rice",
      tags: ["Popular", "Spicy"],
      rating: 4.8,
      isPopular: true,
      isSpicy: true
    },
    {
      id: "2",
      name: "Mixed Grill Platter",
      description: "Assorted grilled meats including lamb kebab, chicken tikka, and beef kofta with rice and salad",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1677903784547-963c38f74bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwa2ViYWIlMjBncmlsbGVkJTIwbWVhdHxlbnwxfHx8fDE3NTcwODkyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "grills",
      tags: ["Popular", "Protein Rich"],
      rating: 4.9,
      isPopular: true
    },
    {
      id: "3",
      name: "Halal Chicken Burger",
      description: "Crispy halal chicken breast with fresh lettuce, tomatoes, and special sauce on a toasted bun",
      price: 7.99,
      image: halalMunchiesBurger,
      category: "wraps",
      tags: ["Quick Bite", "Popular"],
      rating: 4.6,
      isPopular: true
    },
    {
      id: "4",
      name: "Vegetable Curry",
      description: "Mixed seasonal vegetables in aromatic curry sauce with basmati rice",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1734770931927-6410f9a64832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxhbCUyMGZvb2QlMjBkaXNoZXMlMjByZXN0YXVyYW50JTIwbWVudXxlbnwxfHx8fDE3NTcwODkxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "curries",
      tags: ["Vegan", "Healthy"],
      rating: 4.4,
      isVegan: true
    },
    {
      id: "5",
      name: "Lamb Biryani",
      description: "Slow-cooked lamb with fragrant basmati rice, saffron, and traditional spices",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2hlMjBpbmRpYW58ZW58MXx8fHwxNzU3MDg5MjA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "rice",
      tags: ["Premium", "Spicy"],
      rating: 4.7,
      isSpicy: true
    },
    {
      id: "6",
      name: "Falafel Wrap",
      description: "Crispy falafel with hummus, tahini, and fresh vegetables in pita bread",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1734468330969-93c69106993f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGF3YXJtYSUyMHdyYXAlMjBzYW5kd2ljaHxlbnwxfHx8fDE3NTcwODkyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "wraps",
      tags: ["Vegan", "Healthy"],
      rating: 4.3,
      isVegan: true
    }
  ];

  const categories = [
    { id: "all", name: "All Items", count: menuItems.length },
    { id: "popular", name: "Popular", count: menuItems.filter(item => item.isPopular).length },
    { id: "rice", name: "Rice & Biryani", count: menuItems.filter(item => item.category === "rice").length },
    { id: "grills", name: "Grills", count: menuItems.filter(item => item.category === "grills").length },
    { id: "wraps", name: "Wraps", count: menuItems.filter(item => item.category === "wraps").length },
    { id: "curries", name: "Curries", count: menuItems.filter(item => item.category === "curries").length }
  ];

  const filteredItems = menuItems.filter(item => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "popular") return item.isPopular;
    return item.category === selectedCategory;
  });

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1)
    }));
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, count) => total + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, count]) => {
      const item = menuItems.find(i => i.id === itemId);
      return total + (item ? item.price * count : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-halal-cream">
      <div className="bg-halal-green text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl mb-2">Our Menu</h1>
              <p className="text-lg opacity-90">Discover authentic halal flavors crafted with care</p>
            </div>
            <div className="flex items-center space-x-4">
              {getTotalCartItems() > 0 && (
                <div className="flex items-center space-x-2 bg-halal-gold px-4 py-2 rounded-lg text-halal-green">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-medium">{getTotalCartItems()} items - ${getTotalPrice().toFixed(2)}</span>
                </div>
              )}
              <Button
                variant="outline"
                onClick={onBackToHome}
                className="border-white text-white hover:bg-white hover:text-halal-green"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-halal-green mb-0">Browse Categories</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>Filter by category</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg text-center transition-all ${
                  selectedCategory === category.id
                    ? "bg-halal-green text-white"
                    : "bg-white border border-gray-200 hover:border-halal-gold"
                }`}
              >
                <div className="font-medium">{category.name}</div>
                <div className="text-sm opacity-75">{category.count} items</div>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full ${
                    favorites.has(item.id)
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-600 hover:bg-white"
                  } transition-colors`}
                >
                  <Heart className={`h-4 w-4 ${favorites.has(item.id) ? 'fill-current' : ''}`} />
                </button>
                
                {item.isPopular && (
                  <Badge className="absolute top-3 left-3 bg-halal-gold text-halal-green">
                    Popular
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-halal-green mb-1">{item.name}</CardTitle>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-halal-gold text-halal-gold" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-halal-green">${item.price}</div>
                  </div>
                </div>
                
                <CardDescription className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-xs ${
                        tag === 'Spicy' ? 'border-red-300 text-red-600' :
                        tag === 'Vegan' ? 'border-green-300 text-green-600' :
                        'border-halal-gold text-halal-gold'
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  {cart[item.id] ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-center font-medium min-w-[2rem]">{cart[item.id]}</span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(item.id)}
                        className="h-8 w-8 p-0 bg-halal-green hover:bg-halal-green-dark"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(item.id)}
                      className="flex-1 bg-halal-green hover:bg-halal-green-dark text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {getTotalCartItems() > 0 && (
          <div className="fixed bottom-6 right-6">
            <Card className="bg-halal-green text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm opacity-90">Cart Total</div>
                    <div className="font-bold">${getTotalPrice().toFixed(2)}</div>
                  </div>
                  <Button className="bg-halal-gold text-halal-green hover:bg-halal-gold-dark">
                    Checkout ({getTotalCartItems()})
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}