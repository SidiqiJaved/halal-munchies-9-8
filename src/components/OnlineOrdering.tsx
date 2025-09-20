import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ShoppingCart, Plus, Minus, Star, Clock, Users, Loader2, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { createOrder, fetchMenuItems, MenuItem as ApiMenuItem, OrderRecord } from "../lib/api";

interface OrderingProps {
  onBackToHome: () => void;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
}

type MenuItem = ApiMenuItem;

export function OnlineOrdering({ onBackToHome }: OrderingProps) {
  const initialOrderDetails = {
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    specialInstructions: '',
  };

  const [currentStep, setCurrentStep] = useState<'menu' | 'cart' | 'checkout' | 'confirmation'>('menu');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderDetails, setOrderDetails] = useState(initialOrderDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmationOrder, setConfirmationOrder] = useState<OrderRecord | null>(null);
  const [confirmedContact, setConfirmedContact] = useState<{ name: string; email: string } | null>(null);

  const formatCategoryLabel = (category: string) =>
    category
      .split(/[\s_-]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const categories = useMemo(() => {
    if (menuItems.length === 0) {
      return [{ id: 'all', name: 'All Items' }];
    }

    const unique = Array.from(new Set(menuItems.map((item) => item.category))).sort();
    return [
      { id: 'all', name: 'All Items' },
      ...unique.map((category) => ({ id: category, name: formatCategoryLabel(category) })),
    ];
  }, [menuItems]);

  useEffect(() => {
    let cancelled = false;
    setIsLoadingMenu(true);
    fetchMenuItems()
      .then((items) => {
        if (!cancelled) {
          setMenuItems(items);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          const message =
            error instanceof Error && error.message
              ? error.message
              : 'Failed to load menu. Please try again shortly.';
          setMenuError(message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoadingMenu(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);


  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: Number(item.price),
          quantity: 1,
          imageUrl: item.imageUrl ?? null,
        },
      ];
    });
  };

  const updateQuantity = (id: number, change: number) => {
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
    setSubmitError(null);
    setConfirmedContact(null);
    setCurrentStep('checkout');
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setSubmitError('Your cart is empty. Please add at least one item.');
      return;
    }

    if (
      !orderDetails.name ||
      !orderDetails.email ||
      !orderDetails.phone ||
      !orderDetails.addressLine1 ||
      !orderDetails.city ||
      !orderDetails.state ||
      !orderDetails.postalCode
    ) {
      setSubmitError('Please complete all required delivery details before placing your order.');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const { order } = await createOrder({
        customerName: orderDetails.name,
        email: orderDetails.email,
        phone: orderDetails.phone,
        addressLine1: orderDetails.addressLine1,
        addressLine2: orderDetails.addressLine2 || undefined,
        city: orderDetails.city,
        state: orderDetails.state,
        postalCode: orderDetails.postalCode,
        specialInstructions: orderDetails.specialInstructions || undefined,
        items: cart.map(item => ({ menuItemId: item.id, quantity: item.quantity })),
      });
      setConfirmedContact({ name: orderDetails.name, email: orderDetails.email });
      setConfirmationOrder(order);
      setCurrentStep('confirmation');
      setCart([]);
      setOrderDetails(initialOrderDetails);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Unable to place the order right now. Please try again later.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
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
          {isLoadingMenu ? (
            <div className="flex flex-col items-center justify-center py-16 text-halal-green">
              <Loader2 className="h-8 w-8 animate-spin mb-3" />
              <p className="font-semibold">Loading our latest menu...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuError && (
                <div className="col-span-full flex items-center space-x-3 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <span>{menuError}</span>
                </div>
              )}
              {filteredItems.length === 0 && !menuError ? (
                <div className="col-span-full text-center text-gray-600 py-12">
                  No items match this category yet. Please choose another category or check back soon.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={item.imageUrl || "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80"}
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
                    <span className="text-sm ml-1">{item.rating ?? "4.8"}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg text-halal-green">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.prepTimeMinutes ? `${item.prepTimeMinutes} min` : "Custom prep"}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {item.servings || "Serves 2-3"}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-halal-green">
                      ${Number(item.price).toFixed(2)}
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
              ))
              )}
            </div>
          )}
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
                          src={item.imageUrl || "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80"}
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
                    <Label htmlFor="address-line1">Address Line 1 *</Label>
                    <Input
                      id="address-line1"
                      value={orderDetails.addressLine1}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, addressLine1: e.target.value }))}
                      placeholder="Street address, company, c/o"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address-line2">Address Line 2</Label>
                    <Input
                      id="address-line2"
                      value={orderDetails.addressLine2}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, addressLine2: e.target.value }))}
                      placeholder="Apartment, suite, unit, building"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={orderDetails.city}
                        onChange={(e) => setOrderDetails(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={orderDetails.state}
                        onChange={(e) => setOrderDetails(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={orderDetails.postalCode}
                        onChange={(e) => setOrderDetails(prev => ({ ...prev, postalCode: e.target.value }))}
                        placeholder="ZIP / Postal code"
                      />
                    </div>
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
                  {submitError && (
                    <div className="flex items-center space-x-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      <AlertCircle className="h-4 w-4" />
                      <span>{submitError}</span>
                    </div>
                  )}
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
                      disabled={
                        isSubmitting ||
                        !orderDetails.name ||
                        !orderDetails.email ||
                        !orderDetails.phone ||
                        !orderDetails.addressLine1 ||
                        !orderDetails.city ||
                        !orderDetails.state ||
                        !orderDetails.postalCode
                      }
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Processing...
                        </span>
                      ) : (
                        'Place Order'
                      )}
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
    const orderId =
      confirmationOrder && typeof confirmationOrder.id === 'number'
        ? `HM${String(confirmationOrder.id).padStart(6, '0')}`
        : `HM${Date.now().toString().slice(-6)}`;

    const lineItems = confirmationOrder?.items ?? [];

    const totalAmount = typeof confirmationOrder?.total === 'number'
      ? confirmationOrder.total
      : cartTotal;

    const contactEmail = confirmedContact?.email ?? orderDetails.email;

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
              
              <h2 className="text-2xl text-halal-green mb-4">Order #{orderId}</h2>
              <p className="text-gray-600 mb-6">
                Your order has been confirmed and we're preparing it now. 
                {contactEmail ? `A confirmation email has been sent to ${contactEmail}.` : 'We will email you the confirmation shortly.'}
              </p>
              
              <div className="bg-halal-cream p-6 rounded-lg mb-6">
                <h3 className="font-medium text-halal-green mb-4">Order Details</h3>
                <div className="space-y-2 text-left">
                  {lineItems.length > 0
                    ? lineItems.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.nameSnapshot} × {item.quantity}</span>
                          <span>${(Number(item.unitPrice) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))
                    : (
                        <div className="text-gray-600">Your order details will arrive in the confirmation email.</div>
                      )}
                  <div className="border-t pt-2 flex justify-between font-bold text-halal-green">
                    <span>Total:</span>
                    <span>${Number(totalAmount).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setCart([]);
                    setCurrentStep('menu');
                    setConfirmationOrder(null);
                    setConfirmedContact(null);
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
