import React, { useState } from "react";
import { Navigation } from "./components/Navigation";
import { CustomerWebsite } from "./components/CustomerWebsite";
import { FranchiseDashboard } from "./components/FranchiseDashboard";
import { OnlineOrdering } from "./components/OnlineOrdering";
import { CateringSection } from "./components/CateringSection";
import { LocationsSection } from "./components/LocationsSection";
import { ContactSection } from "./components/ContactSection";
import { TrainingSystem } from "./components/TrainingSystem";
import { InventoryManagement } from "./components/InventoryManagement";
import { InspectionManagement } from "./components/InspectionManagement";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/button";
import {
  Users,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

type UserRole = "customer" | "employee" | "manager" | "admin" | "franchisee";
type DemoMode = "customer" | "franchise";
type Section = "home" | "dashboard" | "ordering" | "catering" | "locations" | "contact" | "training" | "inventory" | "inspections";

interface AppState {
  currentSection: Section;
  isLoggedIn: boolean;
  userRole: UserRole;
  demoMode: DemoMode;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentSection: "home",
    isLoggedIn: false,
    userRole: "customer",
    demoMode: "customer"
  });

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const handleLogin = (role: string) => {
    const newState: Partial<AppState> = {
      isLoggedIn: true,
      userRole: role as UserRole,
    };

    if (role === "admin" || role === "franchisee" || role === "manager") {
      newState.currentSection = "dashboard";
      newState.demoMode = "franchise";
    } else {
      newState.currentSection = "home";
      newState.demoMode = "customer";
    }

    updateAppState(newState);
  };

  const handleLogout = () => {
    updateAppState({
      isLoggedIn: false,
      userRole: "customer",
      currentSection: "home",
      demoMode: "customer"
    });
  };

  const handleSectionChange = (section: string) => {
    updateAppState({ currentSection: section as Section });
  };

  const handleDemoToggle = () => {
    const newMode: DemoMode = appState.demoMode === "customer" ? "franchise" : "customer";
    
    const newState: Partial<AppState> = {
      demoMode: newMode,
    };

    if (newMode === "franchise") {
      newState.isLoggedIn = true;
      newState.userRole = "admin";
      newState.currentSection = "dashboard";
    } else {
      newState.isLoggedIn = false;
      newState.userRole = "customer";
      newState.currentSection = "home";
    }

    updateAppState(newState);
  };

  // Determine effective auth state for demo mode
  const effectiveIsLoggedIn = appState.isLoggedIn || appState.demoMode === "franchise";
  const effectiveUserRole = appState.demoMode === "franchise" ? "admin" : appState.userRole;

  const renderCurrentSection = (): React.ReactElement => {
    // Franchise/Admin sections
    if (
      appState.demoMode === "franchise" ||
      (appState.isLoggedIn && ["admin", "franchisee", "manager"].includes(appState.userRole))
    ) {
      switch (appState.currentSection) {
        case "dashboard":
          return (
            <FranchiseDashboard
              onSectionChange={handleSectionChange}
            />
          );
        case "training":
          return (
            <TrainingSystem
              onBackToHome={() => handleSectionChange("dashboard")}
              userRole={appState.userRole}
            />
          );
        case "inventory":
          return (
            <InventoryManagement
              onBackToHome={() => handleSectionChange("dashboard")}
            />
          );
        case "inspections":
          return (
            <InspectionManagement
              onBackToHome={() => handleSectionChange("dashboard")}
              userRole={appState.userRole}
            />
          );
        default:
          return (
            <FranchiseDashboard
              onSectionChange={handleSectionChange}
            />
          );
      }
    }

    // Customer sections
    switch (appState.currentSection) {
      case "home":
        return <CustomerWebsite onSectionChange={handleSectionChange} />;
      case "ordering":
        return <OnlineOrdering onBackToHome={() => handleSectionChange("home")} />;
      case "catering":
        return <CateringSection onBackToHome={() => handleSectionChange("home")} />;
      case "locations":
        return <LocationsSection onBackToHome={() => handleSectionChange("home")} />;
      case "contact":
        return <ContactSection onBackToHome={() => handleSectionChange("home")} />;
      default:
        return <CustomerWebsite onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" id="app-root">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-halal-green text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Demo Toggle Banner */}
      <div 
        className="bg-halal-orange text-white py-3 px-4 shadow-md relative z-40"
        role="banner"
        aria-label="Demo mode controls"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm font-medium">
            <Eye className="h-5 w-5" aria-hidden="true" />
            <span>
              <strong>Demo Mode:</strong>{" "}
              {appState.demoMode === "customer"
                ? "Customer Website"
                : "Franchise Dashboard"}
            </span>
          </div>

          <Button
            onClick={handleDemoToggle}
            variant="outline"
            size="sm"
            className="border-2 border-white text-white hover:bg-white hover:text-halal-orange flex items-center space-x-2 font-medium px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg"
            aria-label={`Switch to ${appState.demoMode === "customer" ? "franchise dashboard" : "customer website"} view`}
          >
            {appState.demoMode === "customer" ? (
              <>
                <Users className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">View Franchise Dashboard</span>
                <span className="sm:hidden">Franchise</span>
                <ToggleLeft className="h-5 w-5" aria-hidden="true" />
              </>
            ) : (
              <>
                <Users className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">View Customer Website</span>
                <span className="sm:hidden">Customer</span>
                <ToggleRight className="h-5 w-5" aria-hidden="true" />
              </>
            )}
          </Button>

          <div className="text-sm opacity-90 font-medium hidden md:block">
            Switch between user experiences
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <Navigation
        currentSection={appState.currentSection}
        onSectionChange={handleSectionChange}
        isLoggedIn={effectiveIsLoggedIn}
        userRole={effectiveUserRole}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main 
        id="main-content" 
        className="flex-1"
        role="main"
        tabIndex={-1}
      >
        {renderCurrentSection()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
