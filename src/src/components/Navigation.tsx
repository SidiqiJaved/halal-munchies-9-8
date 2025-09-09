import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Home,
  ShoppingCart,
  MapPin,
  Phone,
  LogIn,
  LogOut,
  LayoutDashboard,
  ClipboardCheck,
  GraduationCap,
  Package,
  BarChart3,
  Menu,
  X,
  Utensils,
  Navigation2,
  Gift,
  Shield,
} from "lucide-react";

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isLoggedIn: boolean;
  userRole: string;
  onLogin: (role: string) => void;
  onLogout: () => void;
}

export function Navigation({
  currentSection,
  onSectionChange,
  isLoggedIn,
  userRole,
  onLogin,
  onLogout,
}: NavigationProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  const handleLogin = () => {
    onLogin(loginCredentials.role);
    setIsLoginOpen(false);
    setLoginCredentials({ email: "", password: "", role: "customer" });
  };

  // Check if user is in franchise mode
  const isFranchiseMode = isLoggedIn && (userRole === "admin" || userRole === "franchisee" || userRole === "manager");

  const customerNavItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "menu", label: "Menu", icon: Utensils },
    { id: "ordering", label: "Online Ordering", icon: ShoppingCart },
    { id: "locations", label: "Location Finder", icon: Navigation2 },
    { id: "rewards", label: "Rewards", icon: Gift },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  const franchiseNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inspections", label: "Inspections", icon: ClipboardCheck },
    { id: "training", label: "Training", icon: GraduationCap },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "compliance", label: "Compliance", icon: Shield },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ];

  const navItems = isFranchiseMode ? franchiseNavItems : customerNavItems;

  return (
    <nav className="bg-halal-green text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-halal-gold rounded-full p-2">
              <span className="text-halal-green font-bold text-xl">HM</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Halal Munchies</h1>
              <p className="text-xs text-halal-gold">
                {isFranchiseMode ? "Franchise Portal" : "Authentic Halal Cuisine"}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    currentSection === item.id
                      ? "bg-halal-gold text-halal-green"
                      : "hover:bg-halal-green-light"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Login/Logout */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  Welcome, {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </span>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-halal-green"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white text-white hover:bg-white hover:text-halal-green"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Login to Halal Munchies</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="role">Login As</Label>
                      <Select
                        value={loginCredentials.role}
                        onValueChange={(value) =>
                          setLoginCredentials({ ...loginCredentials, role: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="admin">Franchise Admin</SelectItem>
                          <SelectItem value="franchisee">Franchise Owner</SelectItem>
                          <SelectItem value="manager">Store Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginCredentials.email}
                        onChange={(e) =>
                          setLoginCredentials({
                            ...loginCredentials,
                            email: e.target.value,
                          })
                        }
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginCredentials.password}
                        onChange={(e) =>
                          setLoginCredentials({
                            ...loginCredentials,
                            password: e.target.value,
                          })
                        }
                        placeholder="Enter your password"
                      />
                    </div>
                    <Button onClick={handleLogin} className="w-full bg-halal-green hover:bg-halal-green-dark">
                      Login
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md transition-colors ${
                      currentSection === item.id
                        ? "bg-halal-gold text-halal-green"
                        : "hover:bg-halal-green-light"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {/* Mobile Login/Logout */}
              <div className="pt-2 border-t border-halal-green-light">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 rounded-md hover:bg-halal-green-light"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 rounded-md hover:bg-halal-green-light"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}