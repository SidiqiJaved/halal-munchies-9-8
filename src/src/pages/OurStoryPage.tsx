import { Card, CardContent } from '../components/ui/card'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Heart, Users, Award, Globe } from 'lucide-react'

export function OurStoryPage() {
  const milestones = [
    { year: '2018', title: 'Founded', description: 'Started with a vision to serve authentic halal cuisine' },
    { year: '2020', title: 'First Franchise', description: 'Opened our first franchise location' },
    { year: '2022', title: 'AI Integration', description: 'Partnered with Sidiqi AI for smart operations' },
    { year: '2024', title: 'National Expansion', description: 'Expanded to 25+ locations nationwide' }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Authentic Halal',
      description: 'Committed to serving genuine halal food with proper certification and quality standards.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building strong communities by bringing people together through exceptional food experiences.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for excellence in every aspect of our service, from food quality to customer experience.'
    },
    {
      icon: Globe,
      title: 'Growth',
      description: 'Expanding responsibly while maintaining our core values and commitment to quality.'
    }
  ]

  return (
    <div className="bg-halal-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-halal-green to-halal-green-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            From humble beginnings to a nationwide franchise, our journey is driven by passion for authentic halal cuisine and community service.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl text-halal-green mb-6">
                A Vision Born from Tradition
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Halal Munchies was founded with a simple yet powerful vision: to bring authentic, 
                  high-quality halal food to communities across the nation while maintaining the 
                  highest standards of Islamic dietary laws.
                </p>
                <p>
                  Our founders recognized the need for a franchise that not only served delicious 
                  food but also understood the cultural and religious significance of halal 
                  preparation. Every ingredient is carefully sourced, every recipe is crafted 
                  with tradition in mind.
                </p>
                <p>
                  Today, with the power of Sidiqi AI technology, we've enhanced our operations 
                  while staying true to our roots, ensuring consistent quality and authentic 
                  flavors across all our locations.
                </p>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="/images/restaurant-kitchen.jpg"
                alt="Halal Munchies kitchen with chefs preparing authentic halal food"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-halal-gold text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm">Franchise Locations</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h3 className="text-3xl text-halal-green text-center mb-12">Our Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-halal-gold mb-2">{milestone.year}</div>
                    <h4 className="text-lg font-semibold text-halal-green mb-2">{milestone.title}</h4>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-3xl text-halal-green text-center mb-12">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="bg-halal-green text-white p-3 rounded-lg">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-halal-green mb-3">{value.title}</h4>
                          <p className="text-gray-600">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}