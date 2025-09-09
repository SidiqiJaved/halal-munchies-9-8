import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ShoppingCart, ClipboardCheck, BookOpen, Package, Heart, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CustomerWebsiteProps {
  onSectionChange: (section: string) => void;
}

export function CustomerWebsite({ onSectionChange }: CustomerWebsiteProps) {
  const solutions = [
    {
      id: 'ordering',
      title: 'Online Ordering',
      description: 'Browse our menu, customize your order, and enjoy fresh halal food delivered to your door.',
      icon: ShoppingCart,
      features: ['Fresh daily menu', 'Custom meal options', 'Fast delivery & pickup'],
      userType: 'Order Now',
      color: 'bg-halal-orange'
    },
    {
      id: 'catering',
      title: 'Catering Services',
      description: 'Perfect for events, parties, and corporate gatherings with authentic halal cuisine.',
      icon: Package,
      features: ['Event catering', 'Group meal packages', 'Custom menu planning'],
      userType: 'Plan Your Event',
      color: 'bg-halal-red'
    }
  ];

  return (
    <div className="bg-halal-cream min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-halal-orange to-halal-red text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 font-bold">
            Welcome to Halal Munchies
          </h1>
          <p className="text-xl sm:text-2xl mb-4 opacity-95 font-medium">
            Authentic Halal Cuisine & Fresh Flavors
          </p>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto opacity-90">
            Experience the finest halal food made with love, tradition, and the freshest ingredients. 
            Order online, plan your catering, or visit one of our locations for an unforgettable meal.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-halal-white py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-halal-orange opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-halal-red opacity-5 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              {/* Decorative divider */}
              <div className="flex items-center mb-8">
                <div className="w-12 h-1 bg-halal-orange rounded-full"></div>
                <Heart className="h-6 w-6 text-halal-orange mx-4" />
                <div className="w-12 h-1 bg-halal-orange rounded-full"></div>
              </div>
              
              <h2 className="text-4xl sm:text-5xl text-halal-red mb-8 font-bold">
                Our Story
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Halal Munchies started with one simple goal: to bring authentic flavors and a welcoming 
                  experience to our community. From humble beginnings in a small neighborhood kitchen, 
                  our passion for serving delicious, certified halal food has grown into something beautiful.
                </p>
                
                <p>
                  From humble beginnings to a growing family of locations, our story is about quality, 
                  passion, and community. Every dish we serve carries the tradition of authentic recipes 
                  passed down through generations, combined with modern culinary techniques that bring 
                  out the very best flavors.
                </p>
                
                <p>
                  We're more than a restaurant—we're a place where tradition meets taste, where families 
                  gather to share meals, and where every guest becomes part of our extended family. 
                  Our commitment to halal certification and exceptional quality ensures that every bite 
                  you take reflects our dedication to serving you the very best.
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="mt-8">
                <Button 
                  variant="outline"
                  className="border-2 border-halal-orange text-halal-orange hover:bg-halal-orange hover:text-white px-8 py-3 text-lg transition-all duration-300 group"
                >
                  Learn More About Us
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
            
            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Main image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1578366941741-9e517759c620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwdGVhbSUyMGNvb2tpbmclMjBraXRjaGVufGVufDF8fHx8MTc1NTY0Mjc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Our passionate team preparing authentic halal cuisine in our kitchen"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-halal-orange text-white p-6 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">25+</div>
                    <div className="text-sm opacity-90">Years of Tradition</div>
                  </div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute -top-6 -right-6 bg-halal-green text-white p-6 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">100%</div>
                    <div className="text-sm opacity-90">Halal Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-halal-red mb-4 font-bold">
            Delicious Food, Convenient Ordering
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From quick meals to special events, we make it easy to enjoy authentic halal cuisine whenever you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <Card key={solution.id} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-halal-orange">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${solution.color} text-white`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-halal-red font-bold">
                    {solution.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-halal-orange rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => onSectionChange(solution.id)}
                    className="w-full bg-halal-orange hover:bg-halal-orange-dark text-white font-medium"
                  >
                    {solution.userType}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-halal-red text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl mb-4 font-bold">
            Ready to Experience Amazing Halal Food?
          </h2>
          <p className="text-lg mb-8 opacity-95">
            Join thousands of satisfied customers who trust Halal Munchies for their favorite meals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onSectionChange('ordering')}
              className="bg-halal-orange hover:bg-halal-orange-dark text-white px-8 py-3 font-medium shadow-lg"
            >
              Order Now
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-halal-red px-8 py-3 font-medium"
              onClick={() => onSectionChange('locations')}
            >
              Find Locations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
