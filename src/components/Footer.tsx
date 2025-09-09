import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-halal-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Halal Munchies</h3>
            <p className="text-gray-300 mb-4">
              Premium halal food franchise serving authentic flavors with modern convenience.
            </p>
            <p className="text-sm text-halal-gold font-medium">
              Powered by Sidiqi AI
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-halal-gold" />
                <span className="text-sm text-gray-300">1-800-HALAL-M</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-halal-gold" />
                <span className="text-sm text-gray-300">support@halalmunchies.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-halal-gold" />
                <span className="text-sm text-gray-300">123 Main St, Franchise HQ</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-300 hover:text-halal-gold transition-colors">
                Franchise Opportunities
              </a>
              <a href="#" className="block text-sm text-gray-300 hover:text-halal-gold transition-colors">
                Support Center
              </a>
              <a href="#" className="block text-sm text-gray-300 hover:text-halal-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-sm text-gray-300 hover:text-halal-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-halal-green-light mt-8 pt-8 text-center">
          <p className="text-sm text-gray-300">
            © 2025 Halal Munchies Franchise Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
