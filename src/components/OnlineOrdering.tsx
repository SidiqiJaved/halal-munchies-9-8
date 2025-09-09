import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ShoppingCart, Plus, Minus, Star, Clock, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OrderingProps {
  onBackToHome: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isHalal: boolean;
  prepTime: string;
  servings: string;
  rating: number;
}

export function OnlineOrdering({ onBackToHome }: OrderingProps) {
  const [currentStep, setCurrentStep] = useState<'menu' | 'cart' | 'checkout' | 'confirmation'>('menu');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialInstructions: ''
  });

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'platters', name: 'Catering Platters' },
    { id: 'sides', name: 'Sides' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
  ];

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Halal Chicken Biryani Platter',
      description: 'Aromatic basmati rice with tender halal chicken, served with raita and pickles',
      price: 35.99,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400',
      category: 'platters',
      isHalal: true,
      prepTime: '45 min',
      servings: '10-12 people',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Mediterranean Mezze Platter',
      description: 'Hummus, baba ganoush, tabbouleh, dolmas, and fresh vegetables with pita',
      price: 28.99,
      image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400',
      category: 'platters',
      isHalal: true,
      prepTime: '30 min',
      servings: '8-10 people',
      rating: 4.6
    },
    {
      id: '3',
      name: 'Halal Beef Kebab Platter',
      description: 'Grilled halal beef kebabs with rice, grilled vegetables, and tzatziki',
      price: 42.99,
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400',
      category: 'platters',
      isHalal: true,
      prepTime: '40 min',
      servings: '12-15 people',
      rating: 4.9
    },
    {
      id: '4',
      name: 'Falafel & Hummus Bowl',
      description: 'Crispy falafels with creamy hummus, fresh salad, and tahini sauce',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1595909315417-2d5216e3c9d0?w=400',
      category: 'mains',
      isHalal: true,
      prepTime: '15 min',
      servings: '1 person',
      rating: 4.7
    },
    {
      id: '5',
      name: 'Halal Chicken Shawarma',
      description: 'Tender halal chicken shawarma in warm pita with garlic sauce and vegetables',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      category: 'mains',
      isHalal: true,
      prepTime: '12 min',
      servings: '1 person',
      rating: 4.8
    },
    {
      id: '6',
      name: 'Baklava Assortment',
      description: 'Traditional honey-sweetened baklava with pistachios and almonds',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1571197845891-8fefe0c29e05?w=400',
      category: 'desserts',
      isHalal: true,
      prepTime: '5 min',
      servings: '6-8 pieces',
      rating: 4.5
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image
      }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCurrentStep('checkout');
  };

  const handlePlaceOrder = () => {
    if (!orderDetails.name || !orderDetails.email || !orderDetails.phone) return;
    setCurrentStep('confirmation');
  };

  if (currentStep === 'menu') {
    return (
      <div className="min-h-screen bg-halal-cream">
        <div className="bg-halal-green text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl mb-2">Online Ordering</h1>
                <p className="text-lg opacity-90">Fresh, halal catering for your events</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setCurrentStep('cart')}
                  className="bg-halal-gold hover:bg-halal-gold-dark text-white relative"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-white text-halal-green min-w-[20px] h-5 flex items-center justify-center text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
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
            <h2 className="text-xl text-halal-green mb-4">Browse Menu</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-halal-green text-white"
                      : "border-halal-green text-halal-green hover:bg-halal-green hover:text-white"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.isHalal && (
                    <Badge className="absolute top-2 left-2 bg-halal-green text-white">
                      Halal Certified
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2 flex items-center bg-white rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm ml-1">{item.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg text-halal-green">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.prepTime}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {item.servings}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-halal-green">
                      ${item.price}
                    </span>
                    <Button
                      onClick={() => addToCart(item)}
                      className="bg-halal-gold hover:bg-halal-gold-dark text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'cart') {
    return (
      <div className="min-h-screen bg-halal-cream">
        <div className="bg-halal-green text-white py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl mb-2">Your Cart</h1>
            <p className="text-lg opacity-90">Review your order before checkout</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl text-gray-600 mb-4">Your cart is empty</h2>
              <Button
                onClick={() => setCurrentStep('menu')}
                className="bg-halal-green hover:bg-halal-green-dark text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {cart.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-halal-green">{item.name}</h3>
                          <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-halal-green">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center text-xl">
                    <span>Total:</span>
                    <span className="font-bold text-halal-green">${cartTotal.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep('menu')}
                  className="flex-1 border-halal-green text-halal-green hover:bg-halal-green hover:text-white"
                >
                  Continue Shopping
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1 bg-halal-gold hover:bg-halal-gold-dark text-white"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentStep === 'checkout') {
    return (
      <div className="min-h-screen bg-halal-cream">
        <div className="bg-halal-green text-white py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl mb-2">Checkout</h1>
            <p className="text-lg opacity-90">Complete your order</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-halal-green">Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={orderDetails.name}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderDetails.email}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={orderDetails.phone}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      value={orderDetails.address}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter delivery address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={orderDetails.specialInstructions}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, specialInstructions: e.target.value }))}
                      placeholder="Any special requests or dietary requirements"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-halal-green">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center text-lg font-bold text-halal-green">
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <Button
                      onClick={handlePlaceOrder}
                      className="w-full bg-halal-gold hover:bg-halal-gold-dark text-white"
                      disabled={!orderDetails.name || !orderDetails.email || !orderDetails.phone}
                    >
                      Place Order
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('cart')}
                      className="w-full border-halal-green text-halal-green hover:bg-halal-green hover:text-white"
                    >
                      Back to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'confirmation') {
    const orderNumber = `HM${Date.now().toString().slice(-6)}`;
    
    return (
      <div className="min-h-screen bg-halal-cream">
        <div className="bg-halal-green text-white py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl mb-2">Order Confirmed!</h1>
            <p className="text-lg opacity-90">Thank you for your order</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-halal-green rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl text-halal-green mb-4">Order #{orderNumber}</h2>
              <p className="text-gray-600 mb-6">
                Your order has been confirmed and we're preparing it now. 
                A confirmation email has been sent to {orderDetails.email}.
              </p>
              
              <div className="bg-halal-cream p-6 rounded-lg mb-6">
                <h3 className="font-medium text-halal-green mb-4">Order Details</h3>
                <div className="space-y-2 text-left">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-bold text-halal-green">
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setCart([]);
                    setCurrentStep('menu');
                  }}
                  className="bg-halal-green hover:bg-halal-green-dark text-white"
                >
                  Order Again
                </Button>
                <Button
                  variant="outline"
                  onClick={onBackToHome}
                  className="border-halal-green text-halal-green hover:bg-halal-green hover:text-white"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
