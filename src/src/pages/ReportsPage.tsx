import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, Download, Filter } from 'lucide-react'

export function ReportsPage() {
  const handleExportReport = (reportType: string) => {
    console.log(`Exporting ${reportType} report...`)
  }

  const revenueData = [
    { month: 'Jan', revenue: 45280, growth: '+12%' },
    { month: 'Feb', revenue: 52100, growth: '+15%' },
    { month: 'Mar', revenue: 48750, growth: '+8%' },
    { month: 'Apr', revenue: 55320, growth: '+13%' },
    { month: 'May', revenue: 58900, growth: '+18%' },
    { month: 'Jun', revenue: 62150, growth: '+22%' }
  ]

  return (
    <div className="bg-halal-cream min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-halal-green to-halal-green-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl lg:text-5xl mb-4">Business Reports</h1>
              <p className="text-lg opacity-90">
                Comprehensive analytics and insights for franchise performance
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex space-x-4">
              <Button
                onClick={() => handleExportReport('all')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-halal-green"
              >
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-halal-green"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-halal-green">$322,500</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    +15% vs last quarter
                  </Badge>
                </div>
                <DollarSign className="h-8 w-8 text-halal-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Locations</p>
                  <p className="text-2xl font-bold text-halal-green">23</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    +2 new locations
                  </Badge>
                </div>
                <Users className="h-8 w-8 text-halal-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Performance</p>
                  <p className="text-2xl font-bold text-halal-green">94%</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    +3% improvement
                  </Badge>
                </div>
                <TrendingUp className="h-8 w-8 text-halal-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Report Period</p>
                  <p className="text-lg font-semibold text-halal-green">Q2 2024</p>
                  <Badge variant="outline" className="text-gray-600 border-gray-400">
                    6 months data
                  </Badge>
                </div>
                <Calendar className="h-8 w-8 text-halal-gold" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="franchise">Franchise</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Revenue Analysis</span>
                </CardTitle>
                <CardDescription>
                  Monthly revenue trends and growth metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-halal-green bg-opacity-10 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-halal-green">{data.month}</span>
                        </div>
                        <div>
                          <p className="font-medium">${data.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Monthly Revenue</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {data.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button
                    onClick={() => handleExportReport('revenue')}
                    className="bg-halal-green hover:bg-halal-green-dark text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Revenue Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Operations Performance</CardTitle>
                <CardDescription>
                  Operational efficiency and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Detailed operations reports including inventory turnover, 
                  staff efficiency, and customer satisfaction metrics.
                </p>
                <Button
                  onClick={() => handleExportReport('operations')}
                  className="bg-halal-green hover:bg-halal-green-dark text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Operations Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality & Compliance</CardTitle>
                <CardDescription>
                  Food quality, safety inspections, and compliance tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comprehensive quality reports including inspection scores, 
                  compliance rates, and safety incident tracking.
                </p>
                <Button
                  onClick={() => handleExportReport('quality')}
                  className="bg-halal-green hover:bg-halal-green-dark text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Quality Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="franchise" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Franchise Performance</CardTitle>
                <CardDescription>
                  Individual franchise location performance and comparisons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Location-by-location performance analysis, franchise rankings, 
                  and growth opportunities assessment.
                </p>
                <Button
                  onClick={() => handleExportReport('franchise')}
                  className="bg-halal-green hover:bg-halal-green-dark text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Franchise Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}