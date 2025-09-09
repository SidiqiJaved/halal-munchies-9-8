import { useState } from "react";
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
import { MenuPreview } from "./src/components/MenuPreview";
import { LocationFinder } from "./src/components/LocationFinder";
import { LoyaltyRewards } from "./src/components/LoyaltyRewards";
import { ComplianceCertification } from "./src/components/ComplianceCertification";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/button";
import {
  Users,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("customer");
  const [demoMode, setDemoMode] = useState<
    "customer" | "franchise"
  >("customer");

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    if (
      role === "admin" ||
      role === "franchisee" ||
      role === "manager"
    ) {
      setCurrentSection("dashboard");
      setDemoMode("franchise");
    } else {
      setCurrentSection("home");
      setDemoMode("customer");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("customer");
    setCurrentSection("home");
    setDemoMode("customer");
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const handleDemoToggle = () => {
    const newMode =
      demoMode === "customer" ? "franchise" : "customer";
    setDemoMode(newMode);

    if (newMode === "franchise") {
      setIsLoggedIn(true);
      setUserRole("admin");
      setCurrentSection("dashboard");
    } else {
      setIsLoggedIn(false);
      setUserRole("customer");
      setCurrentSection("home");
    }
  };

  const renderCurrentSection = () => {
    // If in franchise demo mode or logged in as franchise owner/admin
    if (
      demoMode === "franchise" ||
      (isLoggedIn &&
        (userRole === "admin" ||
          userRole === "franchisee" ||
          userRole === "manager"))
    ) {
      switch (currentSection) {
        case "dashboard":
          return (
            <FranchiseDashboard
              onSectionChange={handleSectionChange}
            />
          );

        case "training":
          return (
            <TrainingSystem
              onBackToHome={() =>
                setCurrentSection("dashboard")
              }
              userRole={userRole}
            />
          );

        case "inventory":
          return (
            <InventoryManagement
              onBackToHome={() =>
                setCurrentSection("dashboard")
              }
            />
          );

        case "inspections":
          return (
            <InspectionManagement
              onBackToHome={() =>
                setCurrentSection("dashboard")
              }
              userRole={userRole}
            />
          );

        case "compliance":
          return (
            <ComplianceCertification
              onBackToHome={() =>
                setCurrentSection("dashboard")
              }
              userRole={userRole}
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

    // Customer-facing website sections
    switch (currentSection) {
      case "menu":
        return (
          <MenuPreview
            onBackToHome={() => setCurrentSection("home")}
          />
        );

      case "ordering":
        return (
          <OnlineOrdering
            onBackToHome={() => setCurrentSection("home")}
          />
        );

      case "catering":
        return (
          <CateringSection
            onBackToHome={() => setCurrentSection("home")}
          />
        );

      case "locations":
        return (
          <LocationFinder
            onBackToHome={() => setCurrentSection("home")}
          />
        );

      case "rewards":
        return (
          <LoyaltyRewards
            onBackToHome={() => setCurrentSection("home")}
          />
        );

      case "contact":
        return (
          <ContactSection
            onBackToHome={() => setCurrentSection("home")}
          />
        );

      case "home":
      default:
        return (
          <CustomerWebsite
            onSectionChange={handleSectionChange}
          />
        );
    }
  };

  // Determine if we should show as logged in (either real login or demo mode)
  const effectiveIsLoggedIn =
    isLoggedIn || demoMode === "franchise";
  const effectiveUserRole =
    demoMode === "franchise" ? "admin" : userRole;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Demo Toggle Banner - Always Visible */}
      <div className="bg-halal-orange text-white py-4 px-4 shadow-lg border-b-2 border-halal-orange-dark relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm font-medium">
            <Eye className="h-5 w-5" />
            <span>
              <strong>Demo Mode:</strong>{" "}
              {demoMode === "customer"
                ? "Customer Website"
                : "Franchise Dashboard"}
            </span>
          </div>

          <Button
            onClick={handleDemoToggle}
            variant="outline"
            size="sm"
            className="border-2 border-white text-white hover:bg-white hover:text-halal-orange flex items-center space-x-2 font-medium px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {demoMode === "customer" ? (
              <>
                <Users className="h-4 w-4" />
                <span>View Franchise Dashboard</span>
                <ToggleLeft className="h-5 w-5" />
              </>
            ) : (
              <>
                <Users className="h-4 w-4" />
                <span>View Customer Website</span>
                <ToggleRight className="h-5 w-5" />
              </>
            )}
          </Button>

          <div className="text-sm opacity-90 font-medium hidden sm:block">
            Switch between user experiences
          </div>
          <div className="text-xs opacity-90 font-medium sm:hidden">
            Toggle view
          </div>
        </div>
      </div>

      <Navigation
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        isLoggedIn={effectiveIsLoggedIn}
        userRole={effectiveUserRole}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <main className="flex-1">{renderCurrentSection()}</main>

      <Footer />
    </div>
  );
}