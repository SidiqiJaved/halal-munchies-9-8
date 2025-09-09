import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Users, Calendar, Utensils, Phone, ArrowLeft, CheckCircle, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CateringSectionProps {
  onBackToHome: () => void;
}

export function CateringSection({ onBackToHome }: CateringSectionProps) {
  const cateringPackages = [
    {
      title: "Small Gathering",
      subtitle: "10-25 people",
      price: "$12",
      priceUnit: "per person",
      features: [
        "Choice of 3 main dishes",
        "Rice and bread selection",
        "Fresh salad bar",
        "Dessert included",
        "Setup and cleanup"
      ],
      popular: false
    },
    {
      title: "Corporate Events",
      subtitle: "25-75 people",
      price: "$15",
      priceUnit: "per person",
      features: [
        "Choice of 5 main dishes",
        "Premium rice and bread",
        "Fresh salad and appetizers",
        "Dessert and beverages",
        "Professional service staff",
        "Custom menu options"
      ],
      popular: true
    },
    {
      title: "Large Events",
      subtitle: "75+ people",
      price: "Custom",
      priceUnit: "pricing",
      features: [
        "Unlimited menu selections",
        "Premium presentation",
        "Full service team",
        "Custom decorations",
        "Event coordination",
        "Special dietary accommodations"
      ],
      popular: false
    }
  ];

  return (
    <div className="bg-halal-cream min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-halal-green to-halal-green-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="outline" 
            onClick={onBackToHome}
            className="border-white text-white hover:bg-white hover:text-halal-green mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Catering Services
            </h1>
            <p className="text-xl sm:text-2xl mb-4 opacity-90">
              Authentic Halal Cuisine for Your Special Events
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-80">
              From intimate gatherings to large corporate events, we bring the authentic taste of 
              Halal Munchies to your celebration with our comprehensive catering services.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative">
        <div className="h-96 overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1668097519018-f7d13a079c0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGJ1ZmZldCUyMGZvb2R8ZW58MXx8fHwxNzU1NjQzNDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Beautiful catering buffet spread with diverse halal cuisine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        {/* Floating stats */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-90 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-halal-green">500+</div>
              <div className="text-sm text-gray-600">Events Catered</div>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-halal-green">4.9</div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  Average Rating
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-90 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-halal-green">100%</div>
              <div className="text-sm text-gray-600">Halal Certified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Catering Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-halal-green mb-4">
            Catering Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect package for your event size and requirements. All packages include our signature halal dishes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cateringPackages.map((pkg, index) => (
            <Card key={index} className={`relative hover:shadow-lg transition-shadow duration-300 ${pkg.popular ? 'border-2 border-halal-gold' : 'border-2 border-transparent hover:border-halal-gold'}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-halal-gold text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-halal-green">{pkg.title}</CardTitle>
                <CardDescription className="text-lg text-gray-600">{pkg.subtitle}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-halal-green">{pkg.price}</span>
                  <span className="text-gray-600 ml-2">{pkg.priceUnit}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-halal-green mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${pkg.popular 
                    ? 'bg-halal-gold hover:bg-halal-gold-dark text-white' 
                    : 'bg-halal-green hover:bg-halal-green-dark text-white'
                  }`}
                >
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-halal-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl text-halal-green mb-6">
            Ready to Plan Your Event?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact our catering team to discuss your event requirements and get a custom quote.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="bg-halal-green bg-opacity-10 p-4 rounded-full mb-4">
                <Phone className="h-8 w-8 text-halal-green" />
              </div>
              <h3 className="text-lg font-medium text-halal-green mb-2">Call Us</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-halal-gold bg-opacity-10 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-halal-gold" />
              </div>
              <h3 className="text-lg font-medium text-halal-green mb-2">Book Online</h3>
              <p className="text-gray-600">Schedule consultation</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-halal-green bg-opacity-10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-halal-green" />
              </div>
              <h3 className="text-lg font-medium text-halal-green mb-2">Visit Us</h3>
              <p className="text-gray-600">In-person planning</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-halal-green hover:bg-halal-green-dark text-white px-8 py-3">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button 
              variant="outline" 
              className="border-halal-gold text-halal-gold hover:bg-halal-gold hover:text-white px-8 py-3"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}