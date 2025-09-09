import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CheckCircle, Circle, Play, Book, Clock, Users, Award } from "lucide-react";

interface TrainingProps {
  onBackToHome: () => void;
  userRole: string;
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'checklist' | 'quiz';
  category: string;
  isCompleted: boolean;
  isRequired: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface ChecklistItem {
  id: string;
  task: string;
  isCompleted: boolean;
  isRequired: boolean;
}

export function TrainingSystem({ onBackToHome, userRole }: TrainingProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set(['1', '2', '5']));
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: '1', task: 'Complete uniform fitting and receive all required items', isCompleted: true, isRequired: true },
    { id: '2', task: 'Review employee handbook and policies', isCompleted: true, isRequired: true },
    { id: '3', task: 'Complete food safety certification', isCompleted: false, isRequired: true },
    { id: '4', task: 'Shadow experienced team member for 2 shifts', isCompleted: false, isRequired: true },
    { id: '5', task: 'Learn POS system basics', isCompleted: false, isRequired: true },
    { id: '6', task: 'Complete customer service training', isCompleted: false, isRequired: false },
    { id: '7', task: 'Learn halal food handling procedures', isCompleted: false, isRequired: true },
    { id: '8', task: 'Emergency procedures walkthrough', isCompleted: false, isRequired: true }
  ]);

  const categories = [
    { id: 'all', name: 'All Training' },
    { id: 'onboarding', name: 'Onboarding' },
    { id: 'food-safety', name: 'Food Safety' },
    { id: 'customer-service', name: 'Customer Service' },
    { id: 'operations', name: 'Operations' },
    { id: 'management', name: 'Management' }
  ];

  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      title: 'Welcome to Halal Munchies',
      description: 'Introduction to our company values, mission, and halal standards',
      duration: '15 min',
      type: 'video',
      category: 'onboarding',
      isCompleted: true,
      isRequired: true,
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Food Safety Fundamentals',
      description: 'Essential food safety practices for halal food preparation',
      duration: '30 min',
      type: 'video',
      category: 'food-safety',
      isCompleted: true,
      isRequired: true,
      difficulty: 'beginner'
    },
    {
      id: '3',
      title: 'Halal Certification Requirements',
      description: 'Understanding halal standards and compliance procedures',
      duration: '20 min',
      type: 'video',
      category: 'food-safety',
      isCompleted: false,
      isRequired: true,
      difficulty: 'intermediate'
    },
    {
      id: '4',
      title: 'Customer Service Excellence',
      description: 'Providing exceptional service to our diverse customer base',
      duration: '25 min',
      type: 'video',
      category: 'customer-service',
      isCompleted: false,
      isRequired: true,
      difficulty: 'beginner'
    },
    {
      id: '5',
      title: 'POS System Training',
      description: 'Complete guide to using our point-of-sale system',
      duration: '35 min',
      type: 'video',
      category: 'operations',
      isCompleted: true,
      isRequired: true,
      difficulty: 'beginner'
    },
    {
      id: '6',
      title: 'Inventory Management Basics',
      description: 'Stock tracking, ordering, and waste reduction strategies',
      duration: '40 min',
      type: 'video',
      category: 'operations',
      isCompleted: false,
      isRequired: userRole === 'manager',
      difficulty: 'intermediate'
    },
    {
      id: '7',
      title: 'Team Leadership Skills',
      description: 'Managing staff, scheduling, and performance reviews',
      duration: '45 min',
      type: 'video',
      category: 'management',
      isCompleted: false,
      isRequired: userRole === 'manager',
      difficulty: 'advanced'
    },
    {
      id: '8',
      title: 'Food Safety Quiz',
      description: 'Test your knowledge of food safety principles',
      duration: '10 min',
      type: 'quiz',
      category: 'food-safety',
      isCompleted: false,
      isRequired: true,
      difficulty: 'intermediate'
    }
  ];

  const filteredModules = selectedCategory === 'all' 
    ? trainingModules 
    : trainingModules.filter(module => module.category === selectedCategory);

  const completedCount = trainingModules.filter(module => completedModules.has(module.id)).length;
  const totalModules = trainingModules.length;
  const progressPercentage = (completedCount / totalModules) * 100;

  const completedChecklistItems = checklistItems.filter(item => item.isCompleted).length;
  const totalChecklistItems = checklistItems.length;
  const checklistProgress = (completedChecklistItems / totalChecklistItems) * 100;

  const toggleModuleCompletion = (moduleId: string) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const toggleChecklistItem = (itemId: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'quiz': return <Award className="h-4 w-4" />;
      case 'checklist': return <CheckCircle className="h-4 w-4" />;
      default: return <Book className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-halal-cream">
      <div className="bg-halal-green text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl mb-2">Training Center</h1>
              <p className="text-lg opacity-90">SOPs & Employee Development</p>
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
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-halal-green">Training Progress</h3>
                <Book className="h-5 w-5 text-halal-gold" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span>{completedCount} / {totalModules}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-halal-green">Onboarding</h3>
                <Users className="h-5 w-5 text-halal-gold" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Checklist</span>
                  <span>{completedChecklistItems} / {totalChecklistItems}</span>
                </div>
                <Progress value={checklistProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-halal-green">Certifications</h3>
                <Award className="h-5 w-5 text-halal-gold" />
              </div>
              <div className="space-y-2">
                <Badge className="bg-halal-green text-white">Food Safety Certified</Badge>
                <Badge variant="outline" className="border-halal-gold text-halal-gold">
                  Customer Service Pending
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="training" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="training">Training Modules</TabsTrigger>
            <TabsTrigger value="checklist">Onboarding Checklist</TabsTrigger>
          </TabsList>

          <TabsContent value="training" className="space-y-6">
            {/* Category Filter */}
            <div>
              <h2 className="text-xl text-halal-green mb-4">Browse Training</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={
                      selectedCategory === category.id
                        ? "bg-halal-green text-white"
                        : "border-halal-green text-halal-green hover:bg-halal-green hover:text-white"
                    }
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Training Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map(module => (
                <Card key={module.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-halal-gold bg-opacity-10 rounded">
                          {getTypeIcon(module.type)}
                        </div>
                        {completedModules.has(module.id) && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-lg text-halal-green">
                      {module.title}
                      {module.isRequired && (
                        <Badge variant="destructive" className="ml-2 text-xs">Required</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {module.duration}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {module.type.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <Button
                      onClick={() => toggleModuleCompletion(module.id)}
                      className={
                        completedModules.has(module.id)
                          ? "w-full bg-green-500 hover:bg-green-600 text-white"
                          : "w-full bg-halal-gold hover:bg-halal-gold-dark text-white"
                      }
                    >
                      {completedModules.has(module.id) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start {module.type === 'video' ? 'Video' : module.type === 'quiz' ? 'Quiz' : 'Module'}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="checklist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-halal-green">Employee Onboarding Checklist</CardTitle>
                <CardDescription>
                  Complete all required items to finish your onboarding process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checklistItems.map(item => (
                    <div
                      key={item.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg border ${
                        item.isCompleted 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleChecklistItem(item.id)}
                        className="p-0 h-auto hover:bg-transparent"
                      >
                        {item.isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </Button>
                      
                      <div className="flex-1">
                        <p className={`${
                          item.isCompleted 
                            ? 'line-through text-gray-500' 
                            : 'text-gray-900'
                        }`}>
                          {item.task}
                        </p>
                        {item.isRequired && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-halal-cream rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-halal-green">
                      Onboarding Progress
                    </span>
                    <span className="text-sm text-gray-600">
                      {completedChecklistItems} / {totalChecklistItems} completed
                    </span>
                  </div>
                  <Progress value={checklistProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
