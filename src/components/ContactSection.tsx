import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Phone, Mail, MapPin, Clock, ArrowLeft, MessageCircle, Users, Utensils } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ContactSectionProps {
  onBackToHome: () => void;
}

export function ContactSection({ onBackToHome }: ContactSectionProps) {
  const contactOptions = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      info: "(555) 123-HALAL",
      subInfo: "Mon-Sun: 9am-10pm",
      color: "bg-halal-green"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us your questions",
      info: "hello@eathalalmunchies.com",
      subInfo: "Response within 24 hours",
      color: "bg-halal-gold"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant support online",
      info: "Available on website",
      subInfo: "Daily: 10am-8pm",
      color: "bg-halal-green-light"
    }
  ];

  const inquiryTypes = [
    { icon: Utensils, label: "Food & Menu Questions" },
    { icon: Users, label: "Catering & Events" },
    { icon: MapPin, label: "Locations & Hours" },
    { icon: Phone, label: "General Support" }
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
              Contact Us
            </h1>
            <p className="text-xl sm:text-2xl mb-4 opacity-90">
              We're Here to Help
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-80">
              Have questions about our food, need catering information, or want to share feedback? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-8 relative z-10">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-halal-green">{option.title}</CardTitle>
                  <p className="text-gray-600">{option.description}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium text-halal-green mb-1">{option.info}</p>
                  <p className="text-sm text-gray-600">{option.subInfo}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-halal-green">Send Us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you soon.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>
                
                <div>
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <select 
                    id="inquiryType" 
                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                  >
                    <option value="">Select a topic</option>
                    {inquiryTypes.map((type, index) => (
                      <option key={index} value={type.label}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us how we can help you..."
                    rows={5}
                  />
                </div>
                
                <Button className="w-full bg-halal-green hover:bg-halal-green-dark text-white">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Image */}
          <div className="space-y-8">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1553775282-20af80779df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwY3VzdG9tZXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc1NTY0MzQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Friendly customer service representative ready to help"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Quick Contact Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-halal-green">Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-halal-green" />
                  <div>
                    <p className="font-medium">Main Line</p>
                    <p className="text-sm text-gray-600">(555) 123-HALAL</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-halal-gold" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">hello@eathalalmunchies.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-halal-green mt-1" />
                  <div>
                    <p className="font-medium">Headquarters</p>
                    <p className="text-sm text-gray-600">
                      69-21 164th St Fresh Meadows<br />
                      Queens, NY 11365
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-halal-gold mt-1" />
                  <div>
                    <p className="font-medium">Support Hours</p>
                    <p className="text-sm text-gray-600">
                      Monday - Sunday<br />
                      9:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Suggestion */}
            <Card className="shadow-lg bg-halal-green text-white">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-medium mb-2">Looking for Quick Answers?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Check out our FAQ section for instant answers to common questions.
                </p>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-halal-green"
                >
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-halal-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl text-halal-green mb-4">Need Immediate Assistance?</h2>
          <p className="text-gray-600 mb-6">
            For urgent matters or immediate support, call our 24/7 hotline.
          </p>
          <Button className="bg-halal-gold hover:bg-halal-gold-dark text-white px-8 py-3">
            <Phone className="h-5 w-5 mr-2" />
            Call Emergency Line: (555) 911-HELP
          </Button>
        </div>
      </div>
    </div>
  );
}
