import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CustomerWebsite } from "@/components/CustomerWebsite";
import { FranchiseDashboard } from "@/components/FranchiseDashboard";
import { OnlineOrdering } from "@/components/OnlineOrdering";
import { CateringSection } from "@/components/CateringSection";
import { LocationsSection } from "@/components/LocationsSection";
import { ContactSection } from "@/components/ContactSection";
import { TrainingSystem } from "@/components/TrainingSystem";
import { InventoryManagement } from "@/components/InventoryManagement";
import { InspectionManagement } from "@/components/InspectionManagement";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
          <LocationsSection
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
      {/* Demo Toggle Banner */}
      <div className="bg-halal-gold text-white py-3 px-4 text-center relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <Eye className="h-4 w-4" />
            <span>
              Demo Mode:{" "}
              {demoMode === "customer"
                ? "Customer Website"
                : "Franchise Dashboard"}
            </span>
          </div>

          <Button
            onClick={handleDemoToggle}
            variant="outline"
            size="sm"
            className="border-white text-white hover:bg-white hover:text-halal-gold flex items-center space-x-2"
          >
            {demoMode === "customer" ? (
              <>
                <Users className="h-4 w-4" />
                <span>View Franchise Dashboard</span>
                <ToggleLeft className="h-4 w-4" />
              </>
            ) : (
              <>
                <Users className="h-4 w-4" />
                <span>View Customer Website</span>
                <ToggleRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <div className="text-sm opacity-75">
            Switch between user experiences
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