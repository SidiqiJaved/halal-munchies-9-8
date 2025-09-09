import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Search, 
  Filter,
  CheckCircle,
  Star,
  Car,
  Utensils
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import businessHoursImage from 'figma:asset/b8e9a7c6d5f4e3b2a1c0d9e8f7g6h5i4.png';

interface LocationFinderProps {
  onBackToHome: () => void;
}

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: {
    [key: string]: string;
  };
  distance: number;
  image: string;
  rating: number;
  isOpen: boolean;
  hasCatering: boolean;
  hasParking: boolean;
  hasDineIn: boolean;
  features: string[];
  coordinates: { lat: number; lng: number };
}

export function LocationFinder({ onBackToHome }: LocationFinderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    openNow: false,
    catering: false,
    parking: false,
    dineIn: false
  });

  const locations: Location[] = [
    {
      id: "1",
      name: "Halal Munchies Downtown",
      address: "123 Main Street",
      city: "Downtown",
      state: "NY",
      zipCode: "10001",
      phone: "(555) 123-4567",
      hours: {
        "Monday": "11:00 AM - 10:00 PM",
        "Tuesday": "11:00 AM - 10:00 PM",
        "Wednesday": "11:00 AM - 10:00 PM",
        "Thursday": "11:00 AM - 10:00 PM",
        "Friday": "11:00 AM - 11:00 PM",
        "Saturday": "10:00 AM - 11:00 PM",
        "Sunday": "10:00 AM - 10:00 PM"
      },
      distance: 0.8,
      image: "https://images.unsplash.com/photo-1715616861222-7445441620e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBidWlsZGluZyUyMGxvY2F0aW9ufGVufDF8fHx8MTc1NzA4OTI2OXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      isOpen: true,
      hasCatering: true,
      hasParking: false,
      hasDineIn: true,
      features: ["WiFi", "Delivery", "Takeout", "Catering"],
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: "2",
      name: "Halal Munchies Mall Plaza",
      address: "456 Shopping Center Way",
      city: "Westfield",
      state: "NY",
      zipCode: "10002",
      phone: "(555) 234-5678",
      hours: {
        "Monday": "10:00 AM - 9:00 PM",
        "Tuesday": "10:00 AM - 9:00 PM",
        "Wednesday": "10:00 AM - 9:00 PM",
        "Thursday": "10:00 AM - 9:00 PM",
        "Friday": "10:00 AM - 10:00 PM",
        "Saturday": "10:00 AM - 10:00 PM",
        "Sunday": "11:00 AM - 9:00 PM"
      },
      distance: 2.3,
      image: "https://images.unsplash.com/photo-1715616861222-7445441620e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBidWlsZGluZyUyMGxvY2F0aW9ufGVufDF8fHx8MTc1NzA4OTI2OXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      isOpen: true,
      hasCatering: true,
      hasParking: true,
      hasDineIn: true,
      features: ["WiFi", "Parking", "Family Friendly", "Catering"],
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: "3",
      name: "Halal Munchies Airport",
      address: "789 Airport Terminal B",
      city: "Queens",
      state: "NY",
      zipCode: "11430",
      phone: "(555) 345-6789",
      hours: {
        "Monday": "6:00 AM - 11:00 PM",
        "Tuesday": "6:00 AM - 11:00 PM",
        "Wednesday": "6:00 AM - 11:00 PM",
        "Thursday": "6:00 AM - 11:00 PM",
        "Friday": "6:00 AM - 11:00 PM",
        "Saturday": "6:00 AM - 11:00 PM",
        "Sunday": "6:00 AM - 11:00 PM"
      },
      distance: 12.1,
      image: "https://images.unsplash.com/photo-1715616861222-7445441620e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBidWlsZGluZyUyMGxvY2F0aW9ufGVufDF8fHx8MTc1NzA4OTI2OXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.4,
      isOpen: false,
      hasCatering: false,
      hasParking: false,
      hasDineIn: false,
      features: ["Grab & Go", "Extended Hours", "Travel Friendly"],
      coordinates: { lat: 40.6892, lng: -73.7781 }
    },
    {
      id: "4",
      name: "Halal Munchies University",
      address: "321 Campus Drive",
      city: "University Heights",
      state: "NY",
      zipCode: "10003",
      phone: "(555) 456-7890",
      hours: {
        "Monday": "11:00 AM - 12:00 AM",
        "Tuesday": "11:00 AM - 12:00 AM",
        "Wednesday": "11:00 AM - 12:00 AM",
        "Thursday": "11:00 AM - 2:00 AM",
        "Friday": "11:00 AM - 2:00 AM",
        "Saturday": "11:00 AM - 2:00 AM",
        "Sunday": "11:00 AM - 12:00 AM"
      },
      distance: 5.7,
      image: "https://images.unsplash.com/photo-1715616861222-7445441620e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZXh0ZXJpb3IlMjBidWlsZGluZyUyMGxvY2F0aW9ufGVufDF8fHx8MTc1NzA4OTI2OXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      isOpen: true,
      hasCatering: true,
      hasParking: true,
      hasDineIn: true,
      features: ["Late Night", "Student Discounts", "WiFi", "Study Space"],
      coordinates: { lat: 40.8176, lng: -73.9442 }
    }
  ];

  const filteredLocations = locations.filter(location => {
    // Text search
    if (searchQuery && !location.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !location.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !location.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filters
    if (filters.openNow && !location.isOpen) return false;
    if (filters.catering && !location.hasCatering) return false;
    if (filters.parking && !location.hasParking) return false;
    if (filters.dineIn && !location.hasDineIn) return false;

    return true;
  });

  const getDirections = (location: Location) => {
    const address = encodeURIComponent(`${location.address}, ${location.city}, ${location.state} ${location.zipCode}`);
    window.open(`https://maps.google.com/maps?daddr=${address}`, '_blank');
  };

  const callLocation = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const getCurrentDayHours = (hours: { [key: string]: string }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    return hours[today] || 'Hours not available';
  };

  return (
    <div className="min-h-screen bg-halal-cream">
      <div className="bg-halal-green text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl mb-2">Find a Location</h1>
              <p className="text-lg opacity-90">Discover Halal Munchies locations near you</p>
            </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by location, address, or zip code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`border-halal-green text-halal-green hover:bg-halal-green hover:text-white ${
                showFilters ? 'bg-halal-green text-white' : ''
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-halal-green">Filter Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.openNow}
                      onChange={(e) => setFilters(prev => ({ ...prev, openNow: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span>Open Now</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.catering}
                      onChange={(e) => setFilters(prev => ({ ...prev, catering: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span>Catering Available</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.parking}
                      onChange={(e) => setFilters(prev => ({ ...prev, parking: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span>Parking Available</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.dineIn}
                      onChange={(e) => setFilters(prev => ({ ...prev, dineIn: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span>Dine-In Available</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Business Hours Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-0">
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-halal-green" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">Map integration would be implemented with Google Maps or Mapbox</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-halal-green flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Store Hours
              </CardTitle>
              <CardDescription>
                Our standard operating hours across most locations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ImageWithFallback
                src={businessHoursImage}
                alt="Halal Munchies business hours sign showing operating times"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-halal-cream">
                <div className="text-sm text-gray-600">
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>Mon-Thu:</strong> 10:00 AM - 8:00 PM</div>
                    <div><strong>Fri-Sat:</strong> 10:00 AM - 10:00 PM</div>
                    <div><strong>Sunday:</strong> 12:00 PM - 7:00 PM</div>
                    <div className="col-span-2 text-xs text-gray-500 mt-2">
                      * Hours may vary by location. Please check individual store details.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-2xl text-halal-green mb-2">
            {filteredLocations.length} Location{filteredLocations.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-gray-600">Showing results sorted by distance</p>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLocations.map((location) => (
            <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <ImageWithFallback
                    src={location.image}
                    alt={location.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                
                <div className="md:w-2/3">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-halal-green mb-1">{location.name}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-halal-gold text-halal-gold" />
                            <span>{location.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Navigation className="h-4 w-4" />
                            <span>{location.distance} mi</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={location.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {location.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p>{location.address}</p>
                          <p>{location.city}, {location.state} {location.zipCode}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{getCurrentDayHours(location.hours)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <button
                          onClick={() => callLocation(location.phone)}
                          className="text-sm text-halal-green hover:underline"
                        >
                          {location.phone}
                        </button>
                      </div>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1 pt-2">
                        {location.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => getDirections(location)}
                          className="bg-halal-green hover:bg-halal-green-dark text-white"
                        >
                          <Navigation className="h-4 w-4 mr-1" />
                          Directions
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedLocation(location)}
                          className="border-halal-green text-halal-green hover:bg-halal-green hover:text-white"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <Card className="text-center py-8">
            <CardContent>
              <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No locations found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}