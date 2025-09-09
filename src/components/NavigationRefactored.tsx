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

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
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
  const customerNavItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ordering', label: 'Online Ordering', icon: ShoppingCart },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  // Franchise dashboard navigation items
  const franchiseNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'inspections', label: 'Inspections', icon: ClipboardCheck },
    { id: 'training', label: 'Training', icon: BookOpen },
    { id: 'inventory', label: 'Inventory', icon: Package },
  ];

  const handleLogin = () => {
    const role = window.prompt('Select role: customer, employee, manager, admin, franchisee') || 'customer';
    onLogin(role);
  };

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Determine which navigation items to show based on login status and role
  const getNavItems = (): NavItem[] => {
    if (isLoggedIn && (userRole === 'admin' || userRole === 'franchisee' || userRole === 'manager')) {
      return franchiseNavItems;
    }
    return customerNavItems;
  };

  const navItems = getNavItems();

  return (
    <nav 
      className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-halal-green">
              Halal Munchies
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-1" role="menubar">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <li key={item.id} role="none">
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-200
                        ${isActive 
                          ? "bg-halal-green text-white shadow-sm" 
                          : "text-gray-700 hover:text-halal-green hover:bg-gray-50"
                        }
                      `}
                      role="menuitem"
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Button>
                  </li>
                );
              })}
            </ul>
            
            {/* Auth Section */}
            <div className="ml-8 pl-8 border-l border-gray-200">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 font-medium" aria-label="Current user role">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </span>
                  <Button 
                    variant="outline"
                    onClick={handleLogout}
                    className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-colors duration-200"
                    aria-label="Sign out"
                  >
                    <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleLogin}
                  className="bg-halal-green text-white hover:bg-halal-green-dark transition-colors duration-200"
                  aria-label="Sign in"
                >
                  <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
                  Login
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-halal-green"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <nav className="px-2 pt-2 pb-3 space-y-1" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      w-full justify-start flex items-center space-x-3 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200
                      ${isActive 
                        ? "bg-halal-green text-white" 
                        : "text-gray-700 hover:text-halal-green hover:bg-gray-50"
                      }
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </nav>
            
            {/* Mobile Auth Section */}
            <div className="px-2 pt-4 pb-3 border-t border-gray-200">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 px-3 font-medium">
                    Signed in as: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </p>
                  <Button 
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-halal-green text-white hover:bg-halal-green-dark transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
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
