import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { ShoppingCart, UtensilsCrossed, MapPin, Phone } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Online Ordering',
      description: 'Order your favorite halal dishes online for pickup or delivery',
      link: '/online-ordering',
      buttonText: 'Order Now'
    },
    {
      icon: UtensilsCrossed,
      title: 'Catering Services',
      description: 'Perfect halal catering for events, parties, and corporate functions',
      link: '/online-ordering',
      buttonText: 'View Catering'
    },
    {
      icon: MapPin,
      title: 'Multiple Locations',
      description: 'Find a Halal Munchies location near you across the country',
      link: '/locations',
      buttonText: 'Find Locations'
    },
    {
      icon: Phone,
      title: 'Contact Us',
      description: 'Get in touch for franchise opportunities or customer support',
      link: '/contact',
      buttonText: 'Contact Us'
    }
  ]

  return (
    <section className="bg-halal-cream py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-halal-green mb-6">
            Your Halal Dining Experience
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            From convenient online ordering to exceptional catering services, 
            we make it easy to enjoy authentic halal cuisine wherever you are.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-halal-green text-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-halal-gold transition-colors duration-300">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl text-halal-green">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link to={feature.link}>
                    <Button 
                      variant="outline" 
                      className="border-halal-green text-halal-green hover:bg-halal-green hover:text-white w-full"
                    >
                      {feature.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}