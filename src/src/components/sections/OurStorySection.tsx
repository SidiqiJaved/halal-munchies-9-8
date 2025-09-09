import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { Heart, Users, Award } from 'lucide-react'

export function OurStorySection() {
  const highlights = [
    {
      icon: Heart,
      title: 'Authentic Recipes',
      description: 'Traditional recipes passed down through generations'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Serving communities with care and dedication'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Highest standards of food quality and service'
    }
  ]

  return (
    <section className="bg-halal-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <ImageWithFallback
              src="/images/restaurant-interior.jpg"
              alt="Warm and welcoming Halal Munchies restaurant interior"
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-halal-green/20 to-transparent rounded-2xl"></div>
          </div>
          
          {/* Content */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-1 bg-halal-gold rounded-full"></div>
              <span className="text-halal-gold font-medium uppercase tracking-wide text-sm">Our Story</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-halal-green mb-6">
              Bringing Authentic Halal Flavors to Your Community
            </h2>
            
            <p className="text-gray-700 text-lg mb-8">
              Founded with a passion for authentic halal cuisine, Halal Munchies has grown from a 
              single location to a trusted franchise serving communities nationwide. Our commitment 
              to quality, tradition, and exceptional service drives everything we do.
            </p>
            
            <div className="space-y-6 mb-8">
              {highlights.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-halal-green text-white p-3 rounded-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-halal-green mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <Link to="/our-story">
              <Button className="bg-halal-green hover:bg-halal-green-dark text-white">
                Read Our Full Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}