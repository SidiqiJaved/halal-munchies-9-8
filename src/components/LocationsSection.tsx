import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { MapPin, Clock, Phone, ArrowLeft, Navigation, Star, Car, Search, Loader2, MapIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LocationsSectionProps {
  onBackToHome: () => void;
}

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  features: string[];
  rating: number;
  isNew: boolean;
  image: string;
  latitude: number;
  longitude: number;
  distance?: number; // Distance in miles from user
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

export function LocationsSection({ onBackToHome }: LocationsSectionProps) {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);

  // Static locations data with real coordinates (you can update these with actual locations)
  const locations: Location[] = [
    {
      id: "downtown",
      name: "Our Main Location",
      address: "69-21 164th St Fresh Meadows",
      city: "Queens, NY 11365",
      phone: "(555) 123-4567",
      hours: "Mon-Thu: 11am-10pm, Fri-Sat: 11am-11pm, Sun: 12pm-9pm",
      features: ["Dine-in", "Takeout", "Delivery", "Catering"],
      rating: 4.8,
      isNew: false,
      latitude: 40.7589, // Example: NYC coordinates
      longitude: -73.9851,
      image: "https://images.unsplash.com/photo-1747629417823-bdcfab524220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBzdG9yZWZyb250fGVufDF8fHx8MTc1NTY0MzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "university",
      name: "University District",
      address: "456 College Avenue",
      city: "University Town, UT 67890", 
      phone: "(555) 234-5678",
      hours: "Daily: 10am-12am",
      features: ["Dine-in", "Takeout", "Late-night", "Student discounts"],
      rating: 4.7,
      isNew: false,
      latitude: 40.7505, // Example coordinates
      longitude: -73.9934,
      image: "https://images.unsplash.com/photo-1747629417823-bdcfab524220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBzdG9yZWZyb250fGVufDF8fHx8MTc1NTY0MzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "westside",
      name: "Westside Mall",
      address: "789 Shopping Center Blvd",
      city: "Westside, WS 13579",
      phone: "(555) 345-6789",
      hours: "Mon-Sat: 10am-9pm, Sun: 11am-8pm",
      features: ["Food court", "Takeout", "Family-friendly", "Parking"],
      rating: 4.6,
      isNew: true,
      latitude: 40.7614,
      longitude: -73.9776,
      image: "https://images.unsplash.com/photo-1747629417823-bdcfab524220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBzdG9yZWZyb250fGVufDF8fHx8MTc1NTY0MzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "brooklyn",
      name: "Brooklyn Heights",
      address: "321 Montague Street",
      city: "Brooklyn, NY 11201",
      phone: "(555) 456-7890",
      hours: "Mon-Sun: 11am-10pm",
      features: ["Dine-in", "Takeout", "Delivery", "Outdoor seating"],
      rating: 4.9,
      isNew: false,
      latitude: 40.6962,
      longitude: -73.9968,
      image: "https://images.unsplash.com/photo-1747629417823-bdcfab524220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBzdG9yZWZyb250fGVufDF8fHx8MTc1NTY0MzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "queens",
      name: "Queens Plaza",
      address: "567 Northern Blvd",
      city: "Queens, NY 11101",
      phone: "(555) 567-8901",
      hours: "Daily: 10am-11pm",
      features: ["Dine-in", "Takeout", "Delivery", "Catering", "Halal certified"],
      rating: 4.8,
      isNew: true,
      latitude: 40.7505,
      longitude: -73.9401,
      image: "https://images.unsplash.com/photo-1747629417823-bdcfab524220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBzdG9yZWZyb250fGVufDF8fHx8MTc1NTY0MzQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user's location
  const getUserLocation = () => {
    setIsLoadingLocation(true);
    setLocationError("");
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLoc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setUserLocation(userLoc);
        setIsLoadingLocation(false);
        
        // Calculate distances and sort locations
        const locationsWithDistance = locations.map(location => ({
          ...location,
          distance: calculateDistance(
            userLoc.latitude, 
            userLoc.longitude, 
            location.latitude, 
            location.longitude
          )
        })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
        
        setSortedLocations(locationsWithDistance);
      },
      (error) => {
        setIsLoadingLocation(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied. Please enable location services and try again.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out.");
            break;
          default:
            setLocationError("An unknown error occurred while getting your location.");
            break;
        }
        // Show all locations without sorting if location fails
        setSortedLocations(locations);
      }
    );
  };

  // Filter locations based on search query
  const filteredLocations = sortedLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle directions
  const handleDirections = (location: Location) => {
    const query = encodeURIComponent(`${location.address}, ${location.city}`);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    window.open(url, '_blank');
  };

  // Handle phone call
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  // Initialize locations on component mount
  useEffect(() => {
    setSortedLocations(locations);
  }, []);

  const displayedLocations = filteredLocations.length > 0 ? filteredLocations : sortedLocations;

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
            <p className="text-lg max-w-3xl mx-auto opacity-80 mb-8">
              Visit any of our conveniently located restaurants to enjoy fresh, authentic halal cuisine 
              in a warm and welcoming environment.
            </p>
            
            {/* Location Finder */}
            <div className="max-w-lg mx-auto">
              <Button
                onClick={getUserLocation}
                disabled={isLoadingLocation}
                className="bg-white text-halal-green hover:bg-gray-100 mb-4 px-6 py-3"
              >
                {isLoadingLocation ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Finding your location...
                  </>
                ) : (
                  <>
                    <MapIcon className="h-4 w-4 mr-2" />
                    Find Nearest Locations
                  </>
                )}
              </Button>
              
              {locationError && (
                <div className="bg-white bg-opacity-90 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {locationError}
                </div>
              )}
              
              {userLocation && (
                <div className="bg-white bg-opacity-90 text-halal-green p-3 rounded-lg text-sm mb-4">
                  ✓ Location found! Showing nearest locations first.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 -mt-8 relative z-10">
          <Card className="bg-white shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-halal-green mb-2">{locations.length}</div>
              <div className="text-gray-600">Total Locations</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-halal-green mb-2">3</div>
              <div className="text-gray-600">Cities Served</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-halal-green mb-2">4.8</div>
              <div className="text-gray-600 flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                Average Rating
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by location, address, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 border-2 border-gray-200 focus:border-halal-green"
          />
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
