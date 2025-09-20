import React, { useCallback, useMemo, useState } from "react";
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
import { MobileStickyCTA } from "./components/MobileStickyCTA";
import { Button } from "./components/ui/button";
import { login } from "./lib/api";
import { Users, Eye, ToggleLeft, ToggleRight } from "lucide-react";

type UserRole = "customer" | "employee" | "manager" | "admin" | "franchisee";
type DemoMode = "customer" | "franchise";
type Section =
  | "home"
  | "dashboard"
  | "ordering"
  | "catering"
  | "locations"
  | "contact"
  | "training"
  | "inventory"
  | "inspections";

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AppState {
  currentSection: Section;
  isLoggedIn: boolean;
  userRole: UserRole;
  demoMode: DemoMode;
  authToken: string | null;
  user: AuthUser | null;
  isAuthenticating: boolean;
  authError: string | null;
}

const roleCredentials: Record<UserRole, { email: string; password: string } | null> = {
  customer: null,
  employee: {
    email: "layla@halalmunchies.com",
    password: "employee123",
  },
  manager: {
    email: "rashid@halalmunchies.com",
    password: "manager123",
  },
  admin: {
    email: "amira@halalmunchies.com",
    password: "admin123",
  },
  franchisee: {
    email: "rashid@halalmunchies.com",
    password: "manager123",
  },
};

const normalizeRole = (role: string): UserRole => {
  const normalized = role?.toLowerCase() as UserRole;
  if (roleCredentials[normalized] !== undefined) {
    return normalized;
  }
  return "customer";
};

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentSection: "ordering",
    isLoggedIn: false,
    userRole: "customer",
    demoMode: "customer",
    authToken: null,
    user: null,
    isAuthenticating: false,
    authError: null,
  });

  const updateAppState = useCallback((updates: Partial<AppState>) => {
    setAppState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleLogout = useCallback(() => {
    updateAppState({
      authToken: null,
      user: null,
      isLoggedIn: false,
      userRole: "customer",
      currentSection: "ordering",
      demoMode: "customer",
      authError: null,
    });
  }, [updateAppState]);

  const handleLogin = useCallback(
    async (role: string) => {
      const requestedRole = normalizeRole(role);

      if (requestedRole === "customer") {
        // Reset to customer-facing experience without authentication
        updateAppState({
          authToken: null,
          user: null,
          isLoggedIn: false,
          userRole: "customer",
          currentSection: "ordering",
          demoMode: "customer",
          authError: null,
        });
        return;
      }

      const credentials = roleCredentials[requestedRole] ?? roleCredentials.admin;

      if (!credentials) {
        updateAppState({ authError: `No credentials configured for ${requestedRole}.` });
        return;
      }

      updateAppState({ isAuthenticating: true, authError: null });

      try {
        const { token, user } = await login(credentials.email, credentials.password);
        const resolvedRole = normalizeRole(user.role);
        const nextSection: Section = resolvedRole === "employee" ? "training" : "dashboard";

        updateAppState({
          authToken: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: resolvedRole,
          },
          isLoggedIn: true,
          userRole: resolvedRole,
          demoMode: "franchise",
          currentSection: nextSection,
          isAuthenticating: false,
          authError: null,
        });
      } catch (error) {
        const message =
          error instanceof Error && error.message
            ? error.message
            : "Unable to sign in. Please try again.";
        updateAppState({
          isAuthenticating: false,
          authError: message,
          demoMode: "customer",
        });
        throw error;
      }
    },
    [updateAppState]
  );

  const handleSectionChange = useCallback(
    (section: string) => {
      updateAppState({ currentSection: section as Section });
    },
    [updateAppState]
  );

  const handleOrderClick = useCallback(() => {
    handleSectionChange("ordering");
  }, [handleSectionChange]);

  const handleDemoToggle = useCallback(async () => {
    if (appState.demoMode === "customer") {
      try {
        await handleLogin("admin");
      } catch {
        // Error already surfaced via authError state
      }
    } else {
      handleLogout();
    }
  }, [appState.demoMode, handleLogin, handleLogout]);

  const shouldShowMobileCTA = appState.currentSection !== "ordering";
  const effectiveIsLoggedIn = Boolean(appState.authToken);
  const effectiveUserRole = appState.user?.role ?? appState.userRole;
  const isFranchiseView = appState.demoMode === "franchise";

  const franchiseContent = useMemo(() => {
    if (appState.isAuthenticating) {
      return (
        <div className="flex min-h-[300px] items-center justify-center text-halal-green">
          Signing in to the franchise portal...
        </div>
      );
    }

    if (!effectiveIsLoggedIn || !appState.authToken) {
      return (
        <div className="flex min-h-[300px] items-center justify-center text-center text-gray-600 px-6">
          <div>
            <p className="text-lg font-semibold text-halal-green mb-2">Franchise access required</p>
            <p className="text-sm">
              Switch to franchise demo mode and sign in as an admin, manager, or employee to view operational tools.
            </p>
          </div>
        </div>
      );
    }

    switch (appState.currentSection) {
      case "dashboard":
        return <FranchiseDashboard onSectionChange={handleSectionChange} />;
      case "training":
        return (
          <TrainingSystem
            onBackToHome={() => handleSectionChange("dashboard")}
            userRole={effectiveUserRole}
            authToken={appState.authToken}
          />
        );
      case "inventory":
        return (
          <InventoryManagement
            onBackToHome={() => handleSectionChange("dashboard")}
            authToken={appState.authToken}
          />
        );
      case "inspections":
        return (
          <InspectionManagement
            onBackToHome={() => handleSectionChange("dashboard")}
            userRole={effectiveUserRole}
            authToken={appState.authToken}
          />
        );
      default:
        return <FranchiseDashboard onSectionChange={handleSectionChange} />;
    }
  }, [
    appState.authToken,
    appState.currentSection,
    appState.isAuthenticating,
    effectiveIsLoggedIn,
    effectiveUserRole,
    handleSectionChange,
  ]);

  const customerContent = useMemo(() => {
    switch (appState.currentSection) {
      case "home":
        return <CustomerWebsite onSectionChange={handleSectionChange} />;
      case "ordering":
        return <OnlineOrdering onBackToHome={() => handleSectionChange("home")} />;
      case "catering":
        return <CateringSection onBackToHome={() => handleSectionChange("ordering")} />;
      case "locations":
        return <LocationsSection onBackToHome={() => handleSectionChange("ordering")} />;
      case "contact":
        return <ContactSection onBackToHome={() => handleSectionChange("ordering")} />;
      default:
        return <CustomerWebsite onSectionChange={handleSectionChange} />;
    }
  }, [appState.currentSection, handleSectionChange]);

  const currentView = isFranchiseView ? franchiseContent : customerContent;

  return (
    <div className="min-h-screen flex flex-col bg-white" id="app-root">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-halal-green text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      <div className="bg-halal-orange text-white py-3 px-4 shadow-md relative z-40" role="banner" aria-label="Demo mode controls">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm font-medium">
            <Eye className="h-5 w-5" aria-hidden="true" />
            <span>
              <strong>Demo Mode:</strong>{" "}
              {appState.demoMode === "customer" ? "Customer Website" : "Franchise Dashboard"}
            </span>
          </div>

          <Button
            onClick={handleDemoToggle}
            variant="outline"
            size="sm"
            className="border-2 border-white text-white hover:bg-white hover:text-halal-orange flex items-center space-x-2 font-medium px-4 py-2 transition-all duration-200 shadow-md hover:shadow-lg"
            aria-label={`Switch to ${appState.demoMode === "customer" ? "franchise dashboard" : "customer website"} view`}
            disabled={appState.isAuthenticating}
          >
            {appState.demoMode === "customer" ? (
              <>
                <Users className="h-4 w-4" aria-hidden="true" />
                <span>View Franchise Portal</span>
                <ToggleRight className="h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              <>
                <ToggleLeft className="h-4 w-4" aria-hidden="true" />
                <span>View Customer Site</span>
                <Users className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </div>

      {appState.authError && (
        <div className="bg-red-50 text-red-600 text-sm text-center py-2 px-4" role="alert">
          {appState.authError}
        </div>
      )}

      <Navigation
        currentSection={appState.currentSection}
        onSectionChange={handleSectionChange}
        isLoggedIn={effectiveIsLoggedIn}
        userRole={effectiveUserRole}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isAuthenticating={appState.isAuthenticating}
      />

      <main id="main-content" className="flex-1" role="main">
        {currentView}
      </main>

      <Footer onOrderClick={handleOrderClick} />

      {shouldShowMobileCTA && (
        <MobileStickyCTA onOrderClick={handleOrderClick} />
      )}
    </div>
  );
}
