import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ClipboardCheck, BookOpen, Package, BarChart3, Users, Calendar, TrendingUp, AlertTriangle, CheckCircle, Shield, Building } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FranchiseDashboardProps {
  onSectionChange: (section: string) => void;
}

export function FranchiseDashboard({ onSectionChange }: FranchiseDashboardProps) {
  const dashboardModules = [
    {
      id: 'inspections',
      title: 'Quality & Inspections',
      description: 'Monitor food quality, health inspections, and compliance across all locations.',
      icon: ClipboardCheck,
      features: ['Inspection schedules', 'Compliance tracking', 'Quality reports'],
      color: 'bg-halal-green',
      stats: { value: '98%', label: 'Compliance Rate' }
    },
    {
      id: 'training',
      title: 'Employee Training',
      description: 'Manage staff training programs, SOPs, and certification tracking.',
      icon: BookOpen,
      features: ['Training modules', 'Progress tracking', 'Certification management'],
      color: 'bg-halal-gold',
      stats: { value: '156', label: 'Active Employees' }
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      description: 'Track stock levels, manage suppliers, and optimize inventory across locations.',
      icon: Package,
      features: ['Stock monitoring', 'Supplier management', 'Cost optimization'],
      color: 'bg-halal-green-light',
      stats: { value: '85%', label: 'Stock Efficiency' }
    }
  ];

  const quickStats = [
    { icon: TrendingUp, value: '$45,280', label: 'Monthly Revenue', change: '+12%', positive: true },
    { icon: Users, value: '23', label: 'Active Locations', change: '+2', positive: true },
    { icon: AlertTriangle, value: '3', label: 'Pending Issues', change: '-1', positive: true },
    { icon: CheckCircle, value: '97%', label: 'Overall Score', change: '+2%', positive: true }
  ];

  return (
    <div className="bg-halal-cream min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-halal-green to-halal-green-light text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              {/* Business Portal Indicator */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4 text-halal-gold">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">FRANCHISE MANAGEMENT PORTAL</span>
                <Building className="h-5 w-5" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
                Business Intelligence Dashboard
              </h1>
              <p className="text-lg sm:text-xl opacity-90">
                Halal Munchies Franchise Operations Center
              </p>
              <p className="text-sm opacity-75 mt-2">
                Powered by Sidiqi AI Analytics
              </p>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-8 w-8" />
                  <div>
                    <div className="text-sm opacity-75">System Status</div>
                    <div className="text-lg font-medium">All Systems Online</div>
                    <div className="text-xs opacity-60">Last updated: Just now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16 relative z-10">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white shadow-lg border-l-4 border-halal-green">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-halal-green">{stat.value}</p>
                      <p className={`text-sm flex items-center ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="bg-halal-green bg-opacity-10 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-halal-green" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Management Modules */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-1 bg-halal-gold rounded-full"></div>
            <Building className="h-6 w-6 text-halal-gold" />
            <div className="w-8 h-1 bg-halal-gold rounded-full"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl text-halal-green mb-4">
            Franchise Management Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive business tools to manage quality, training, and operations across your franchise network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {dashboardModules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.id} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-halal-gold group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${module.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-halal-green">{module.stats.value}</div>
                      <div className="text-sm text-gray-600">{module.stats.label}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-halal-green">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {module.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-halal-gold rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => onSectionChange(module.id)}
                    className="w-full bg-halal-green hover:bg-halal-green-dark text-white group-hover:shadow-lg transition-all duration-300"
                  >
                    Access {module.title}
                    <BarChart3 className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-halal-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="h-6 w-6 text-halal-gold" />
                <span className="text-sm font-medium text-halal-gold uppercase tracking-wide">BUSINESS ANALYTICS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl text-halal-green mb-6">
                Advanced Reporting & Intelligence
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Get comprehensive insights into your franchise performance with real-time analytics, 
                  detailed reports, and predictive insights powered by Sidiqi AI.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-halal-green mr-3" />
                    Financial performance tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-halal-green mr-3" />
                    Operations efficiency metrics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-halal-green mr-3" />
                    Customer satisfaction analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-halal-green mr-3" />
                    Predictive maintenance alerts
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Button className="bg-halal-gold hover:bg-halal-gold-dark text-white px-8 py-3">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  View Full Reports Dashboard
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-halal-gold border-opacity-20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1645397925426-cf18e08fc019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhc2hib2FyZCUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzU1NjQzMzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Business analytics dashboard showing performance metrics"
                  className="w-full h-80 lg:h-96 object-cover"
                />
              </div>
              
              {/* Floating notification */}
              <div className="absolute -bottom-4 -left-4 bg-halal-green text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <div>
                    <div className="text-sm font-medium">Performance Up</div>
                    <div className="text-xs opacity-90">+15% this month</div>
                  </div>
                </div>
              </div>
              
              {/* Business indicator */}
              <div className="absolute -top-4 -right-4 bg-halal-gold text-white p-3 rounded-full shadow-lg">
                <Building className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Operations Footer */}
      <div className="bg-halal-green text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-lg font-medium">Secure Franchise Portal</span>
            <Shield className="h-6 w-6" />
          </div>
          <p className="text-sm opacity-75">
            This is a private business management portal for authorized franchise owners and managers only.
          </p>
        </div>
      </div>
    </div>
  );
}