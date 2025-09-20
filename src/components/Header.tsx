import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  className?: string;
}

export function Header({ className = "" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`bg-white border-b border-gray-200 ${className}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Name Header
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
              aria-current="page"
            >
              Home
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Services
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="default"
              className="bg-halal-green hover:bg-halal-green-dark text-white px-6 py-2 text-sm font-medium transition-colors duration-200"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-2 pt-2 pb-3 space-y-1" aria-label="Mobile navigation">
              <a 
                href="#" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                aria-current="page"
              >
                Home
              </a>
              <a 
                href="#" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                About
              </a>
              <a 
                href="#" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Services
              </a>
              <a 
                href="#" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                Contact
              </a>
              <div className="pt-2">
                <Button 
                  variant="default"
                  className="w-full bg-halal-green hover:bg-halal-green-dark text-white px-6 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
