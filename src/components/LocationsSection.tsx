import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Clock, Phone, ArrowLeft, Navigation, Star, Car } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LocationsSectionProps {
  onBackToHome: () => void;
}

export function LocationsSection({ onBackToHome }: LocationsSectionProps) {
  const locations = [
    {
      name: "Downtown Central",
      address: "123 Main Street, Downtown",
      city: "Metropolitan City, MC 12345",
      phone: "(555) 123-4567",
      hours: "Mon-Thu: 11am-10pm, Fri-Sat: 11am-11pm, Sun: 12pm-9pm",
      features: ["Dine-in", "Takeout", "Delivery", "Catering"],
      rating: 4.8,
      isNew: false,
      image: "https://images.unsplash.com/photo-1747629417823-bdcfab524220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBzdG9yZWZyb250fGVufDF8fHx8MTc1NTY0MzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "University District",
      address: "456 College Avenue",
      city: "University Town, UT 67890",
      phone: "(555) 234-5678",
      hours: "Daily: 10am-12am",
      features: ["Dine-in", "Takeout", "Late-night", "Student discounts"],
      rating: 4.7,
      isNew: false,
      image: "https://images.unsplash.com/photo-1747629417823-bdcfab524220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBzdG9yZWZyb250fGVufDF8fHx8MTc1NTY0MzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Westside Mall",
      address: "789 Shopping Center Blvd",
      city: "Westside, WS 13579",
      phone: "(555) 345-6789",
      hours: "Mon-Sat: 10am-9pm, Sun: 11am-8pm",
      features: ["Food court", "Takeout", "Family-friendly", "Parking"],
      rating: 4.6,
      isNew: true,
      image: "https://images.unsplash.com/photo-1747629417823-bdcfab524220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBzdG9yZWZyb250fGVufDF8fHx8MTc1NTY0MzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              Our Locations
            </h1>
            <p className="text-xl sm:text-2xl mb-4 opacity-90">
              Find a Halal Munchies Near You
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-80">
              Visit any of our conveniently located restaurants to enjoy fresh, authentic halal cuisine 
              in a warm and welcoming environment.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 -mt-8 relative z-10">
          <Card className="bg-white shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-halal-green mb-2">23</div>
              <div className="text-gray-600">Total Locations</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-halal-green mb-2">5</div>
              <div className="text-gray-600">Cities Served</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-halal-green mb-2">4.7</div>
              <div className="text-gray-600 flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                Average Rating
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-halal-green mb-4">
            Featured Locations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each location offers the same high-quality halal food and exceptional service you expect from Halal Munchies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-halal-gold overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={location.image}
                  alt={`${location.name} restaurant exterior`}
                  className="w-full h-48 object-cover"
                />
                {location.isNew && (
                  <div className="absolute top-4 left-4 bg-halal-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                    New Location!
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-lg flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{location.rating}</span>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-halal-green">{location.name}</CardTitle>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div>{location.address}</div>
                      <div>{location.city}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                    {location.phone}
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    {location.hours}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {location.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="bg-halal-green bg-opacity-10 text-halal-green px-2 py-1 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-halal-green hover:bg-halal-green-dark text-white"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Directions
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-halal-gold text-halal-gold hover:bg-halal-gold hover:text-white"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-halal-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl text-halal-green mb-6">
            Can't Find a Location Near You?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We're always expanding! Let us know where you'd like to see a Halal Munchies location next.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-halal-green hover:bg-halal-green-dark text-white px-8 py-3">
              <MapPin className="h-5 w-5 mr-2" />
              Request New Location
            </Button>
            <Button 
              variant="outline" 
              className="border-halal-gold text-halal-gold hover:bg-halal-gold hover:text-white px-8 py-3"
            >
              <Car className="h-5 w-5 mr-2" />
              Delivery Areas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
