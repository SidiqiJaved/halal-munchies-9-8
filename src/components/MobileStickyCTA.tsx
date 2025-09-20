import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface MobileStickyCTAProps {
  onOrderClick: () => void;
  isVisible?: boolean;
}

export function MobileStickyCTA({ onOrderClick, isVisible = true }: MobileStickyCTAProps) {
  if (!isVisible) return null;

  return (
    <div 
      className="md:hidden fixed inset-x-0 z-50 bg-white border-t border-gray-200 shadow-md"
      style={{ bottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="px-4 py-3">
        <Button 
          onClick={onOrderClick}
          className="w-full bg-halal-orange hover:bg-halal-orange-dark text-white px-8 py-3 font-medium shadow-lg"
          aria-label="Order Online"
        >
          <ShoppingCart className="h-4 w-4 mr-2" aria-hidden="true" />
          Order Online
        </Button>
      </div>
    </div>
  );
}
