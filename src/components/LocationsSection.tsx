import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { MapPin, Clock, Phone, ArrowLeft, Navigation, Star, Car, Search, Loader2, MapIcon, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { fetchLocations, Location as ApiLocation } from "../lib/api";

interface LocationsSectionProps {
  onBackToHome: () => void;
}

interface FranchiseLocation {
  id: number;
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
  distance?: number;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1080&q=80";

const LOCATION_META: Record<string, {
  features: string[];
  rating: number;
  isNew?: boolean;
  image: string;
  hours: string;
  phone?: string;
}> = {
  HQ: {
    features: ["Corporate kitchen", "Training hub", "Event space"],
    rating: 4.9,
    isNew: false,
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1080&q=80",
    hours: "Mon-Fri: 9am-6pm",
    phone: "(415) 555-0101",
  },
  "SF-DT": {
    features: ["Dine-in", "Delivery", "Corporate catering", "Late night"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1080&q=80",
    hours: "Daily: 11am-11pm",
    phone: "(415) 555-0120",
  },
  "SF-UP": {
    features: ["Franchise", "Outdoor seating", "Catering"],
    rating: 4.7,
    isNew: true,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1080&q=80",
    hours: "Daily: 10:30am-10:30pm",
    phone: "(415) 555-0188",
  },
};

export function LocationsSection({ onBackToHome }: LocationsSectionProps) {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableLocations, setAvailableLocations] = useState<FranchiseLocation[]>([]);
  const [sortedLocations, setSortedLocations] = useState<FranchiseLocation[]>([]);
  const [locationsError, setLocationsError] = useState<string | null>(null);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadLocations = async () => {
      try {
        setIsLoadingLocations(true);
        setLocationsError(null);

        const response = await fetchLocations();
        if (cancelled) return;

        const mapped = response.map((location: ApiLocation) => {
          const metaKey = (location as { code?: string }).code ?? `id-${location.id}`;
          const meta = LOCATION_META[metaKey] ?? {
            features: ["Dine-in", "Takeout"],
            rating: 4.7,
            isNew: false,
            image: FALLBACK_IMAGE,
            hours: "Daily: 11am-9pm",
            phone: location.phone ?? "(555) 555-5555",
          };

          const addressLine2 = (location as { addressLine2?: string | null }).addressLine2;
          const addressParts = [location.addressLine1, addressLine2].filter(Boolean);
          const address = addressParts.join(", ") || location.addressLine1;
          const cityLine = `${location.city}, ${location.state} ${location.postalCode}`;

          const latitude = Number((location as { latitude?: number | string | null }).latitude ?? 0);
          const longitude = Number((location as { longitude?: number | string | null }).longitude ?? 0);

          return {
            id: location.id,
            name: location.name,
            address,
            city: cityLine,
            phone: location.phone || meta.phone || "(555) 555-5555",
            hours: meta.hours,
            features: meta.features,
            rating: meta.rating,
            isNew: Boolean(meta.isNew),
            image: meta.image || FALLBACK_IMAGE,
            latitude: Number.isFinite(latitude) ? latitude : 0,
            longitude: Number.isFinite(longitude) ? longitude : 0,
          } satisfies FranchiseLocation;
        });

        setAvailableLocations(mapped);
        setSortedLocations(mapped);
      } catch (error) {
        if (cancelled) return;
        const message =
          error instanceof Error && error.message
            ? error.message
            : "Unable to load locations right now. Please try again later.";
        setLocationsError(message);
      } finally {
        if (!cancelled) {
          setIsLoadingLocations(false);
        }
      }
    };

    void loadLocations();

    return () => {
      cancelled = true;
    };
  }, []);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    if (
      !Number.isFinite(lat1) ||
      !Number.isFinite(lon1) ||
      !Number.isFinite(lat2) ||
      !Number.isFinite(lon2)
    ) {
      return Infinity;
    }

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
    if (availableLocations.length === 0) {
      setLocationError("Locations are still loading. Please try again in a moment.");
      return;
    }

    setIsLoadingLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setIsLoadingLocation(false);
      setSortedLocations(availableLocations);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLoc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(userLoc);
        setIsLoadingLocation(false);

        const locationsWithDistance = availableLocations
          .map((location) => ({
            ...location,
            distance: calculateDistance(
              userLoc.latitude,
              userLoc.longitude,
              location.latitude,
              location.longitude
            ),
          }))
          .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));

        setSortedLocations(locationsWithDistance);
      },
      (error) => {
        setIsLoadingLocation(false);
        switch (error.code) {
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
        setSortedLocations(availableLocations);
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
  const handleDirections = (location: FranchiseLocation) => {
    const query = encodeURIComponent(`${location.address}, ${location.city}`);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    window.open(url, '_blank');
  };

  // Handle phone call
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

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

      {locationsError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex items-center space-x-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4" />
            <span>{locationsError}</span>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 -mt-8 relative z-10">
          <Card className="bg-white shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-halal-green mb-2">{availableLocations.length}</div>
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

        {isLoadingLocations ? (
          <div className="flex flex-col items-center justify-center py-16 text-halal-green">
            <Loader2 className="h-8 w-8 animate-spin mb-3" />
            <p className="font-semibold">Loading nearby locations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayedLocations.length === 0 ? (
              <div className="col-span-full text-center text-gray-600 py-12">
                No locations match your search yet. Try another city or check back soon.
              </div>
            ) : (
              displayedLocations.map((location, index) => (
                <Card
                  key={location.id ?? index}
                  className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-halal-gold overflow-hidden"
                >
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

                    <div className="flex justify-between items-center">
                      <div>
                        <Button
                          variant="outline"
                          onClick={() => handleDirections(location)}
                          className="border-halal-green text-halal-green hover:bg-halal-green hover:text-white"
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Directions
                        </Button>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Car className="h-4 w-4 mr-2" />
                        {location.distance && Number.isFinite(location.distance)
                          ? `${location.distance.toFixed(1)} miles away`
                          : "Distance unavailable"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
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
