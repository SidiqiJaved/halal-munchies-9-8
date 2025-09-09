import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { ShoppingCart, MapPin, Star } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-halal-green to-halal-green-light text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-halal-gold fill-current" />
                ))}
              </div>
              <span className="text-halal-gold font-medium">Certified Halal</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Authentic Halal
              <span className="block text-halal-gold">Cuisine</span>
            </h1>
            
            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl">
              Experience the finest halal dining with our carefully crafted menu, 
              fresh ingredients, and traditional recipes. Now available for online ordering and catering.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/online-ordering">
                <Button size="lg" className="bg-halal-gold hover:bg-halal-gold-dark text-white w-full sm:w-auto">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Order Online Now
                </Button>
              </Link>
              <Link to="/locations">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-halal-green w-full sm:w-auto"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Find Locations
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/images/hero-food.jpg"
                alt="Delicious halal food platter featuring grilled meats and fresh vegetables"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 bg-halal-gold text-white p-4 rounded-xl shadow-lg">
              <div className="text-lg font-bold">100%</div>
              <div className="text-xs">Halal Certified</div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white text-halal-green p-4 rounded-xl shadow-lg">
              <div className="text-lg font-bold">25+</div>
              <div className="text-xs">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}