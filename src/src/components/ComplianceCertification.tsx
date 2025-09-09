import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Shield, 
  FileCheck, 
  Users, 
  MapPin, 
  Calendar, 
  Download, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Award,
  Star,
  Leaf
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ComplianceCertificationProps {
  onBackToHome: () => void;
  userRole: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  status: 'active' | 'expiring' | 'expired';
  certificateUrl: string;
  description: string;
  coverageArea: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  experience: string;
  certifications: string[];
  image: string;
  bio: string;
}

interface Supplier {
  id: string;
  name: string;
  type: string;
  location: string;
  certifications: string[];
  since: string;
  description: string;
  isVerified: boolean;
}

export function ComplianceCertification({ onBackToHome, userRole }: ComplianceCertificationProps) {
  const [selectedTab, setSelectedTab] = useState("certifications");

  // Access control check
  if (userRole !== 'admin' && userRole !== 'franchisee') {
    return (
      <div className="min-h-screen bg-halal-cream flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
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

  const certifications: Certification[] = [
    {
      id: "1",
      name: "Halal Food Authority Certification",
      issuer: "Islamic Food and Nutrition Council of America (IFANCA)",
      issuedDate: "2024-01-15",
      expiryDate: "2025-01-15",
      status: "active",
      certificateUrl: "/certificates/halal-ifanca-2024.pdf",
      description: "Comprehensive halal certification covering all food preparation, sourcing, and handling processes",
      coverageArea: "All US Locations"
    },
    {
      id: "2",
      name: "Islamic Society of North America (ISNA) Halal Certification",
      issuer: "ISNA Halal Certification Agency",
      issuedDate: "2024-02-01",
      expiryDate: "2025-02-01",
      status: "active",
      certificateUrl: "/certificates/isna-halal-2024.pdf",
      description: "Secondary halal certification ensuring compliance with ISNA standards",
      coverageArea: "North American Operations"
    },
    {
      id: "3",
      name: "Food Safety Modernization Act (FSMA) Compliance",
      issuer: "U.S. Food and Drug Administration",
      issuedDate: "2024-03-10",
      expiryDate: "2025-03-10",
      status: "active",
      certificateUrl: "/certificates/fsma-2024.pdf",
      description: "Compliance with federal food safety regulations and preventive controls",
      coverageArea: "All US Operations"
    },
    {
      id: "4",
      name: "Organic Food Certification",
      issuer: "USDA National Organic Program",
      issuedDate: "2023-12-01",
      expiryDate: "2024-12-01",
      status: "expiring",
      certificateUrl: "/certificates/usda-organic-2023.pdf",
      description: "Certification for organic ingredients and preparation methods",
      coverageArea: "Select Menu Items"
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Ahmed Hassan",
      position: "Chief Halal Officer & Head Chef",
      experience: "15+ years",
      certifications: ["IFANCA Halal Inspector", "ServSafe Food Safety", "Culinary Arts Degree"],
      image: "https://images.unsplash.com/photo-1578366941741-9e517759c620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwdGVhbSUyMHByb2Zlc3Npb25hbCUyMGtpdGNoZW4lMjBzdGFmZnxlbnwxfHx8fDE3NTcwODk0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Ahmed oversees all halal compliance across our franchise network. With extensive experience in Middle Eastern and South Asian cuisine, he ensures every dish meets the highest halal standards while delivering authentic flavors."
    },
    {
      id: "2",
      name: "Fatima Al-Zahra",
      position: "Quality Assurance Director",
      experience: "12+ years",
      certifications: ["ISO 22000 Lead Auditor", "HACCP Certified", "Halal Quality Control"],
      image: "https://images.unsplash.com/photo-1578366941741-9e517759c620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwdGVhbSUyMHByb2Zlc3Npb25hbCUyMGtpdGNoZW4lMjBzdGFmZnxlbnwxfHx8fDE3NTcwODk0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Fatima leads our quality assurance program, implementing rigorous testing and monitoring procedures to maintain consistent halal standards across all locations."
    },
    {
      id: "3",
      name: "Omar Ibrahim",
      position: "Supply Chain Manager",
      experience: "10+ years",
      certifications: ["Certified Supply Chain Professional", "Halal Sourcing Expert"],
      image: "https://images.unsplash.com/photo-1578366941741-9e517759c620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwdGVhbSUyMHByb2Zlc3Npb25hbCUyMGtpdGNoZW4lMjBzdGFmZnxlbnwxfHx8fDE3NTcwODk0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Omar manages relationships with our certified halal suppliers and ensures all ingredients meet our strict halal requirements from source to table."
    }
  ];

  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "Crescent Foods",
      type: "Meat & Poultry Supplier",
      location: "Chicago, IL",
      certifications: ["IFANCA Certified", "ISNA Approved", "USDA Inspected"],
      since: "2020",
      description: "Premium halal meat and poultry supplier with nationwide distribution and strict quality controls.",
      isVerified: true
    },
    {
      id: "2",
      name: "Salam Spices International",
      type: "Spice & Seasoning Supplier",
      location: "Brooklyn, NY",
      certifications: ["Halal Certified", "Organic Certified", "Non-GMO Verified"],
      since: "2019",
      description: "Authentic Middle Eastern and South Asian spices sourced directly from certified organic farms.",
      isVerified: true
    },
    {
      id: "3",
      name: "Zaytoon Produce Co.",
      type: "Fresh Produce Supplier",
      location: "Fresno, CA",
      certifications: ["Organic Certified", "Fair Trade Certified"],
      since: "2021",
      description: "Fresh vegetables, fruits, and herbs with emphasis on Middle Eastern specialty items.",
      isVerified: true
    },
    {
      id: "4",
      name: "Al-Noor Dairy Products",
      type: "Dairy & Cheese Supplier",
      location: "Wisconsin",
      certifications: ["Halal Certified", "USDA Organic", "Grade A"],
      since: "2022",
      description: "Halal-certified dairy products including specialty Middle Eastern cheeses and yogurts.",
      isVerified: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'expiring':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Expiring Soon</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Expired</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-halal-cream">
      <div className="bg-halal-green text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl mb-2">Compliance & Certification</h1>
              <p className="text-lg opacity-90">Building trust through transparency and verified standards</p>
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
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-halal-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-halal-green">{certifications.filter(c => c.status === 'active').length}</div>
              <p className="text-sm text-gray-600">Active Certifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-halal-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-halal-green">{teamMembers.length}</div>
              <p className="text-sm text-gray-600">Certified Team Members</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-halal-green">{suppliers.length}</div>
              <p className="text-sm text-gray-600">Verified Suppliers</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-halal-green">100%</div>
              <p className="text-sm text-gray-600">Compliance Rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="certifications">Halal Certifications</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="sourcing">Sourcing Standards</TabsTrigger>
          </TabsList>

          <TabsContent value="certifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-halal-green flex items-center">
                  <FileCheck className="h-5 w-5 mr-2" />
                  Current Certifications
                </CardTitle>
                <CardDescription>
                  All active and upcoming certifications ensuring halal compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <Card key={cert.id} className="border-l-4 border-l-halal-green">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-halal-green mb-1">{cert.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">Issued by: {cert.issuer}</p>
                            <p className="text-sm text-gray-700">{cert.description}</p>
                          </div>
                          {getStatusBadge(cert.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span>Issued</span>
                            </div>
                            <div className="font-medium">{new Date(cert.issuedDate).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span>Expires</span>
                            </div>
                            <div className="font-medium">{new Date(cert.expiryDate).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <MapPin className="h-4 w-4" />
                              <span>Coverage</span>
                            </div>
                            <div className="font-medium">{cert.coverageArea}</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-halal-green text-halal-green hover:bg-halal-green hover:text-white"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download Certificate
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Verify Online
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-halal-green flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Our Certified Team
                </CardTitle>
                <CardDescription>
                  Meet the experts ensuring halal compliance across our operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {teamMembers.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-6">
                        <div className="flex space-x-4">
                          <ImageWithFallback
                            src={member.image}
                            alt={member.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-halal-green">{member.name}</h3>
                            <p className="text-sm text-gray-600 mb-1">{member.position}</p>
                            <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
                              <Star className="h-4 w-4" />
                              <span>{member.experience} experience</span>
                            </div>
                            
                            <p className="text-sm text-gray-700 mb-4">{member.bio}</p>
                            
                            <div>
                              <p className="text-sm font-medium text-gray-900 mb-2">Certifications:</p>
                              <div className="flex flex-wrap gap-1">
                                {member.certifications.map((cert, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sourcing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-halal-green flex items-center">
                    <Leaf className="h-5 w-5 mr-2" />
                    Sourcing Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">100% Halal Certified Suppliers</h4>
                        <p className="text-sm text-gray-600">All meat and poultry sourced from certified halal facilities</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">No Cross-Contamination</h4>
                        <p className="text-sm text-gray-600">Separate supply chains and storage for halal products</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Regular Audits</h4>
                        <p className="text-sm text-gray-600">Quarterly inspections of all supplier facilities</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Organic When Possible</h4>
                        <p className="text-sm text-gray-600">Priority given to organic and sustainable sources</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-halal-green">Certified Suppliers</CardTitle>
                  <CardDescription>
                    Our network of verified halal suppliers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suppliers.map((supplier) => (
                      <div key={supplier.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 flex items-center">
                              {supplier.name}
                              {supplier.isVerified && (
                                <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">{supplier.type}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Since {supplier.since}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{supplier.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{supplier.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {supplier.certifications.map((cert, index) => (
                            <Badge key={index} className="text-xs bg-halal-gold text-halal-green">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}