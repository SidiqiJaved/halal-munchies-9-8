import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { 
  Gift, 
  Star, 
  Users, 
  Trophy, 
  Crown, 
  Zap, 
  Heart,
  Share2,
  Calendar,
  TrendingUp,
  Sparkles,
  Clock
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoyaltyRewardsProps {
  onBackToHome: () => void;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  image: string;
  isAvailable: boolean;
  expiresAt?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export function LoyaltyRewards({ onBackToHome }: LoyaltyRewardsProps) {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  
  // Mock user data
  const [userPoints] = useState(2450);
  const [userTier] = useState("Gold");
  const [referralsCount] = useState(5);

  const rewards: Reward[] = [
    {
      id: "1",
      title: "Free Appetizer",
      description: "Get any appetizer on the house with your next order",
      pointsCost: 500,
      category: "Food",
      image: "https://images.unsplash.com/photo-1672853827236-e2ccf90761a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3lhbHR5JTIwcmV3YXJkcyUyMGNhcmQlMjBnaWZ0JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU3MDg5MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isAvailable: true
    },
    {
      id: "2",
      title: "10% Off Next Order",
      description: "Save 10% on your entire next purchase",
      pointsCost: 750,
      category: "Discount",
      image: "https://images.unsplash.com/photo-1672853827236-e2ccf90761a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3lhbHR5JTIwcmV3YXJkcyUyMGNhcmQlMjBnaWZ0JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU3MDg5MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isAvailable: true
    },
    {
      id: "3",
      title: "Free Biryani",
      description: "Complimentary chicken or vegetable biryani",
      pointsCost: 1200,
      category: "Food",
      image: "https://images.unsplash.com/photo-1672853827236-e2ccf90761a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3lhbHR5JTIwcmV3YXJkcyUyMGNhcmQlMjBnaWZ0JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU3MDg5MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isAvailable: true
    },
    {
      id: "4",
      title: "VIP Event Invitation",
      description: "Exclusive access to special tasting events",
      pointsCost: 2000,
      category: "Experience",
      image: "https://images.unsplash.com/photo-1672853827236-e2ccf90761a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3lhbHR5JTIwcmV3YXJkcyUyMGNhcmQlMjBnaWZ0JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU3MDg5MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isAvailable: false
    },
    {
      id: "5",
      title: "Free Delivery for a Month",
      description: "Unlimited free delivery for 30 days",
      pointsCost: 3000,
      category: "Service",
      image: "https://images.unsplash.com/photo-1672853827236-e2ccf90761a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3lhbHR5JTIwcmV3YXJkcyUyMGNhcmQlMjBnaWZ0JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU3MDg5MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isAvailable: false
    },
    {
      id: "6",
      title: "$25 Gift Card",
      description: "Digital gift card for future purchases",
      pointsCost: 2500,
      category: "Credit",
      image: "https://images.unsplash.com/photo-1672853827236-e2ccf90761a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3lhbHR5JTIwcmV3YXJkcyUyMGNhcmQlMjBnaWZ0JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU3MDg5MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isAvailable: true
    }
  ];

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Order",
      description: "Welcome to Halal Munchies!",
      icon: <Star className="h-6 w-6 text-halal-gold" />,
      isUnlocked: true
    },
    {
      id: "2",
      title: "Regular Customer",
      description: "Complete 10 orders",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      isUnlocked: true
    },
    {
      id: "3",
      title: "Spice Explorer",
      description: "Try 5 different spicy dishes",
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      isUnlocked: false,
      progress: 3,
      maxProgress: 5
    },
    {
      id: "4",
      title: "Social Butterfly",
      description: "Share 3 reviews on social media",
      icon: <Share2 className="h-6 w-6 text-blue-500" />,
      isUnlocked: false,
      progress: 1,
      maxProgress: 3
    },
    {
      id: "5",
      title: "Loyalty Champion",
      description: "Reach Gold tier status",
      icon: <Crown className="h-6 w-6 text-halal-gold" />,
      isUnlocked: true
    },
    {
      id: "6",
      title: "Referral Master",
      description: "Refer 10 friends successfully",
      icon: <Users className="h-6 w-6 text-green-500" />,
      isUnlocked: false,
      progress: referralsCount,
      maxProgress: 10
    }
  ];

  const handleSignup = () => {
    if (email) {
      setIsSignedUp(true);
    }
  };

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return { color: "text-amber-600", bgColor: "bg-amber-50", nextTier: "Silver", pointsNeeded: 1000 };
      case "Silver":
        return { color: "text-gray-600", bgColor: "bg-gray-50", nextTier: "Gold", pointsNeeded: 2500 };
      case "Gold":
        return { color: "text-halal-gold", bgColor: "bg-yellow-50", nextTier: "Platinum", pointsNeeded: 5000 };
      case "Platinum":
        return { color: "text-purple-600", bgColor: "bg-purple-50", nextTier: null, pointsNeeded: 0 };
      default:
        return { color: "text-gray-600", bgColor: "bg-gray-50", nextTier: "Bronze", pointsNeeded: 500 };
    }
  };

  const tierInfo = getTierInfo(userTier);

  if (!isSignedUp) {
    return (
      <div className="min-h-screen bg-halal-cream">
        <div className="bg-halal-green text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl mb-2">Loyalty & Rewards</h1>
                <p className="text-lg opacity-90">Join our loyalty program and start earning rewards</p>
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-halal-green to-halal-gold p-8 text-white text-center">
              <Gift className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Welcome to Munchies Rewards!</h2>
              <p className="text-lg opacity-90 mb-6">Earn points with every order and unlock exclusive rewards</p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold">10</div>
                  <div className="text-sm opacity-80">Points per $1</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Rewards Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">FREE</div>
                  <div className="text-sm opacity-80">Sign Up Bonus</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Sign Up Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-halal-green text-2xl">Join Munchies Rewards</CardTitle>
              <CardDescription className="text-center">
                Start earning points immediately with your first order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Code (Optional)
                </label>
                <Input
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter referral code for bonus points"
                />
              </div>

              {/* Benefits Preview */}
              <div className="bg-halal-cream p-4 rounded-lg">
                <h3 className="font-medium text-halal-green mb-3">Your Benefits Include:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-halal-gold" />
                    <span className="text-sm">100 welcome bonus points</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gift className="h-4 w-4 text-halal-gold" />
                    <span className="text-sm">Birthday rewards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-halal-gold" />
                    <span className="text-sm">Exclusive member offers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-halal-gold" />
                    <span className="text-sm">Referral bonuses</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSignup}
                disabled={!email}
                className="w-full bg-halal-green hover:bg-halal-green-dark text-white py-3"
              >
                Join Munchies Rewards - It's Free!
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By joining, you agree to receive promotional emails and SMS messages. 
                You can opt out at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-halal-cream">
      <div className="bg-halal-green text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl mb-2">My Rewards Dashboard</h1>
              <p className="text-lg opacity-90">Track your points and redeem amazing rewards</p>
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
        {/* User Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={`${tierInfo.bgColor} border-2`}>
            <CardContent className="p-6 text-center">
              <Crown className={`h-8 w-8 ${tierInfo.color} mx-auto mb-2`} />
              <div className={`text-2xl font-bold ${tierInfo.color} mb-1`}>{userTier} Member</div>
              <p className="text-sm text-gray-600">Current tier status</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-halal-green mb-1">{userPoints.toLocaleString()}</div>
              <p className="text-sm text-gray-600 mb-3">Available Points</p>
              {tierInfo.nextTier && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    {tierInfo.pointsNeeded - userPoints} more points to {tierInfo.nextTier}
                  </div>
                  <Progress 
                    value={(userPoints / tierInfo.pointsNeeded) * 100} 
                    className="h-2" 
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-halal-gold mb-1">{referralsCount}</div>
              <p className="text-sm text-gray-600">Successful Referrals</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-2 border-halal-gold text-halal-gold hover:bg-halal-gold hover:text-white"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Invite Friends
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Available Rewards */}
        <div className="mb-8">
          <h2 className="text-2xl text-halal-green mb-6">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`overflow-hidden ${!reward.isAvailable ? 'opacity-60' : ''}`}>
                <ImageWithFallback
                  src={reward.image}
                  alt={reward.title}
                  className="w-full h-32 object-cover"
                />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {reward.category}
                    </Badge>
                    <div className="text-right">
                      <div className="text-lg font-bold text-halal-green">
                        {reward.pointsCost}
                      </div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{reward.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-4">
                    {reward.description}
                  </CardDescription>
                  <Button
                    disabled={!reward.isAvailable || userPoints < reward.pointsCost}
                    className="w-full bg-halal-green hover:bg-halal-green-dark"
                  >
                    {userPoints >= reward.pointsCost ? 'Redeem Now' : 'Need More Points'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl text-halal-green mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`${achievement.isUnlocked ? 'bg-green-50 border-green-200' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${achievement.isUnlocked ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {achievement.isUnlocked ? achievement.icon : 
                        <Clock className="h-6 w-6 text-gray-400" />
                      }
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      
                      {achievement.progress !== undefined && achievement.maxProgress && !achievement.isUnlocked && (
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                            <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.maxProgress) * 100} 
                            className="h-2" 
                          />
                        </div>
                      )}
                      
                      {achievement.isUnlocked && (
                        <Badge className="bg-green-100 text-green-800">
                          <Trophy className="h-3 w-3 mr-1" />
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}