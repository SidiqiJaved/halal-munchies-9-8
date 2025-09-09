import { Button } from "./ui/button";
import { ShoppingCart, BookOpen, Package, ClipboardCheck, LogIn, Menu, X, Home, MapPin, MessageCircle, BarChart3, LogOut } from "lucide-react";
import { useState } from "react";

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
  onLogout 
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Customer-facing navigation items
  const customerNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ordering', label: 'Online Ordering', icon: ShoppingCart },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  // Franchise dashboard navigation items
  const franchiseNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'inspections', label: 'Inspections', icon: ClipboardCheck },
    { id: 'training', label: 'Training', icon: BookOpen },
    { id: 'inventory', label: 'Inventory', icon: Package },
  ];

  const handleLogin = () => {
    // Simple role selection for demo
    const role = window.prompt('Select role: customer, employee, manager, admin, franchisee') || 'customer';
    onLogin(role);
  };

  // Determine which navigation items to show based on login status and role
  const getNavItems = () => {
    if (isLoggedIn && (userRole === 'admin' || userRole === 'franchisee' || userRole === 'manager')) {
      return franchiseNavItems;
    }
    return customerNavItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-halal-white shadow-lg border-b-3 border-halal-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-halal-red">Halal Munchies</h1>
              <p className="text-xs text-halal-orange">Powered by Sidiqi AI</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? "default" : "ghost"}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 ${
                    currentSection === item.id 
                      ? "bg-halal-orange text-white hover:bg-halal-orange-dark" 
                      : "text-halal-red hover:bg-halal-cream"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Button>
              );
            })}
            
            <div className="ml-4 pl-4 border-l border-halal-orange">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-halal-red font-medium">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </span>
                  <Button 
                    variant="outline"
                    onClick={onLogout}
                    className="border-halal-red text-halal-red hover:bg-halal-red hover:text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleLogin}
                  className="bg-halal-orange text-white hover:bg-halal-orange-dark"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-halal-red"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? "default" : "ghost"}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full justify-start flex items-center space-x-2 ${
                    currentSection === item.id 
                      ? "bg-halal-orange text-white" 
                      : "text-halal-red hover:bg-halal-cream"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Button>
              );
            })}
            
            <div className="pt-4 border-t border-halal-orange">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <p className="text-sm text-halal-red px-3 font-medium">
                    Logged in as: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </p>
                  <Button 
                    variant="outline"
                    onClick={onLogout}
                    className="w-full border-halal-red text-halal-red hover:bg-halal-red hover:text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-halal-orange text-white hover:bg-halal-orange-dark"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}