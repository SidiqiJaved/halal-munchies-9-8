import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { CheckCircle, XCircle, Clock, Calendar as CalendarIcon, AlertTriangle, FileText, Eye } from "lucide-react";
import { Progress } from "./ui/progress";

interface InspectionProps {
  onBackToHome: () => void;
  userRole: string;
  authToken?: string | null;
}

interface Inspection {
  id: string;
  type: string;
  status: 'pending' | 'in-progress' | 'passed' | 'failed' | 'scheduled';
  date: string;
  inspector: string;
  location: string;
  score?: number;
  maxScore: number;
  issues: string[];
  notes: string;
  nextInspectionDate?: string;
}

export function InspectionManagement({ onBackToHome, userRole }: InspectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);

  const inspections: Inspection[] = [
    {
      id: '1',
      type: 'Food Safety',
      status: 'passed',
      date: '2025-01-15',
      inspector: 'Sarah Johnson',
      location: 'Main Street Location',
      score: 92,
      maxScore: 100,
      issues: [],
      notes: 'Excellent compliance with halal standards and food safety protocols.',
      nextInspectionDate: '2025-04-15'
    },
    {
      id: '2',
      type: 'Halal Certification',
      status: 'passed',
      date: '2025-01-10',
      inspector: 'Ahmad Rahman',
      location: 'Downtown Location',
      score: 88,
      maxScore: 100,
      issues: ['Minor labeling inconsistency'],
      notes: 'Overall good compliance. Address labeling issue by next inspection.',
      nextInspectionDate: '2025-07-10'
    },
    {
      id: '3',
      type: 'Health Department',
      status: 'failed',
      date: '2025-01-08',
      inspector: 'Mike Thompson',
      location: 'Mall Location',
      score: 68,
      maxScore: 100,
      issues: [
        'Temperature control issues in refrigeration unit',
        'Improper hand washing station setup',
        'Missing food safety certificates for 2 employees'
      ],
      notes: 'Critical violations found. Re-inspection required within 30 days.',
      nextInspectionDate: '2025-02-07'
    },
    {
      id: '4',
      type: 'Fire Safety',
      status: 'in-progress',
      date: '2025-01-19',
      inspector: 'Fire Dept. Inspector',
      location: 'Main Street Location',
      maxScore: 100,
      issues: [],
      notes: 'Inspection currently in progress.',
    },
    {
      id: '5',
      type: 'Food Safety',
      status: 'scheduled',
      date: '2025-01-25',
      inspector: 'Sarah Johnson',
      location: 'Airport Location',
      maxScore: 100,
      issues: [],
      notes: 'Quarterly food safety inspection scheduled.',
    },
    {
      id: '6',
      type: 'Halal Certification',
      status: 'pending',
      date: '2025-01-22',
      inspector: 'Ahmad Rahman',
      location: 'Downtown Location',
      maxScore: 100,
      issues: [],
      notes: 'Follow-up inspection for previous violations.',
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'scheduled':
        return <CalendarIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalInspections = inspections.length;
  const passedInspections = inspections.filter(i => i.status === 'passed').length;
  const failedInspections = inspections.filter(i => i.status === 'failed').length;
  const pendingInspections = inspections.filter(i => i.status === 'pending' || i.status === 'scheduled').length;

  const averageScore = inspections
    .filter(i => i.score)
    .reduce((acc, i) => acc + (i.score || 0), 0) / inspections.filter(i => i.score).length;

  // Access control check
  if (userRole !== 'admin' && userRole !== 'franchisee') {
    return (
      <div className="min-h-screen bg-halal-cream flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
            <p className="text-gray-600 mb-6">
              This section is only available to administrators and franchise owners.
            </p>
            <Button onClick={onBackToHome} className="bg-halal-green hover:bg-halal-green-dark text-white">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-halal-cream">
      <div className="bg-halal-green text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl mb-2">Inspection & Quality Management</h1>
              <p className="text-lg opacity-90">Monitor food safety and compliance across all locations</p>
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
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Inspections</p>
                  <p className="text-2xl font-bold text-halal-green">{totalInspections}</p>
                </div>
                <FileText className="h-8 w-8 text-halal-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{passedInspections}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{failedInspections}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-halal-green">{averageScore.toFixed(1)}</p>
                </div>
                <div className="text-halal-gold">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Inspection Status</TabsTrigger>
            <TabsTrigger value="calendar">Inspection Calendar</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Recent Inspections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-halal-green">Recent Inspections</CardTitle>
                <CardDescription>
                  Latest inspection results across all franchise locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inspections.map(inspection => (
                    <div key={inspection.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(inspection.status)}
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{inspection.type}</h4>
                            <Badge className={getStatusColor(inspection.status)}>
                              {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{inspection.location}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(inspection.date).toLocaleDateString()} • Inspector: {inspection.inspector}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {inspection.score !== undefined && (
                          <div className="mb-2">
                            <span className="text-lg font-bold text-halal-green">
                              {inspection.score}/{inspection.maxScore}
                            </span>
                          </div>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedInspection(inspection)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-2">
                                {getStatusIcon(inspection.status)}
                                <span>{inspection.type} Inspection</span>
                              </DialogTitle>
                              <DialogDescription>
                                {inspection.location} • {new Date(inspection.date).toLocaleDateString()}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Inspection Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span>Inspector:</span>
                                      <span>{inspection.inspector}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Date:</span>
                                      <span>{new Date(inspection.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Status:</span>
                                      <Badge className={getStatusColor(inspection.status)}>
                                        {inspection.status}
                                      </Badge>
                                    </div>
                                    {inspection.nextInspectionDate && (
                                      <div className="flex justify-between">
                                        <span>Next Inspection:</span>
                                        <span>{new Date(inspection.nextInspectionDate).toLocaleDateString()}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {inspection.score !== undefined && (
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Score</h4>
                                    <div className="text-center">
                                      <div className="text-3xl font-bold text-halal-green mb-2">
                                        {inspection.score}/{inspection.maxScore}
                                      </div>
                                      <Progress 
                                        value={(inspection.score / inspection.maxScore) * 100} 
                                        className="h-3"
                                      />
                                      <p className="text-sm text-gray-500 mt-2">
                                        {((inspection.score / inspection.maxScore) * 100).toFixed(1)}% compliance
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              {inspection.issues.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                                    Issues Found
                                  </h4>
                                  <ul className="space-y-1">
                                    {inspection.issues.map((issue, index) => (
                                      <li key={index} className="text-sm text-red-600 flex items-start">
                                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        {issue}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Inspector Notes</h4>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                  {inspection.notes}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-halal-green">Inspection Calendar</CardTitle>
                    <CardDescription>
                      View scheduled and upcoming inspections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-halal-green">Upcoming Inspections</CardTitle>
                    <CardDescription>
                      Scheduled inspections for the next 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inspections
                        .filter(i => i.status === 'scheduled' || i.status === 'pending')
                        .map(inspection => (
                          <div key={inspection.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-halal-gold bg-opacity-10 rounded">
                                <CalendarIcon className="h-5 w-5 text-halal-gold" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{inspection.type}</h4>
                                <p className="text-sm text-gray-600">{inspection.location}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(inspection.date).toLocaleDateString()} • {inspection.inspector}
                                </p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(inspection.status)}>
                              {inspection.status}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-halal-green">Action Required</CardTitle>
                    <CardDescription>
                      Inspections that need immediate attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inspections
                        .filter(i => i.status === 'failed')
                        .map(inspection => (
                          <div key={inspection.id} className="flex items-center justify-between p-4 border-2 border-red-200 rounded-lg bg-red-50">
                            <div className="flex items-center space-x-4">
                              <XCircle className="h-6 w-6 text-red-500" />
                              <div>
                                <h4 className="font-medium text-red-900">{inspection.type}</h4>
                                <p className="text-sm text-red-700">{inspection.location}</p>
                                <p className="text-xs text-red-600">
                                  Re-inspection due: {inspection.nextInspectionDate && new Date(inspection.nextInspectionDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                              Schedule Re-inspection
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-halal-green">Compliance Overview</CardTitle>
                  <CardDescription>
                    Overall compliance rates across all locations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Food Safety Compliance</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Halal Certification</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Health Department</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Fire Safety</span>
                        <span>95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-halal-green">Location Performance</CardTitle>
                  <CardDescription>
                    Average scores by franchise location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <span className="font-medium">Main Street Location</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-green-600">92</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                      <span className="font-medium">Downtown Location</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-yellow-600">88</span>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                      <span className="font-medium">Mall Location</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-red-600">68</span>
                        <XCircle className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <span className="font-medium">Airport Location</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-blue-600">Pending</span>
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-halal-green">Export Reports</CardTitle>
                <CardDescription>
                  Generate detailed reports for compliance documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-halal-green hover:bg-halal-green-dark text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Monthly Summary
                  </Button>
                  <Button className="bg-halal-gold hover:bg-halal-gold-dark text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Compliance Report
                  </Button>
                  <Button variant="outline" className="border-halal-green text-halal-green hover:bg-halal-green hover:text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Custom Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
