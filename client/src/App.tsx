import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebSocketProvider } from "@/components/ui/websocket-provider";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import MedicationPage from "@/pages/MedicationPage";
import ProgressPage from "@/pages/ProgressPage";
import SideEffectsPage from "@/pages/SideEffectsPage";
import RemindersPage from "@/pages/RemindersPage";
import ResourcesPage from "@/pages/ResourcesPage";
import SettingsPage from "@/pages/SettingsPage";
import InjectionSitesPage from "@/pages/InjectionSitesPage";
import DoctorVisitPage from "@/pages/DoctorVisitPage";
import CommunityPage from "@/pages/CommunityPage";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { ModalProvider } from "./providers/ModalProvider";
import { useState, useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/medication" component={MedicationPage} />
      <Route path="/progress" component={ProgressPage} />
      <Route path="/side-effects" component={SideEffectsPage} />
      <Route path="/injection-sites" component={InjectionSitesPage} />
      <Route path="/doctor-visits" component={DoctorVisitPage} />
      <Route path="/community" component={CommunityPage} />
      <Route path="/reminders" component={RemindersPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/settings" component={SettingsPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  // Close sidebar when route changes
  const [location, setLocation] = useState(window.location.pathname);
  useEffect(() => {
    const handleRouteChange = () => {
      if (isSidebarOpen) {
        setSidebarOpen(false);
      }
      setLocation(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isSidebarOpen, location]);

  // For demo purposes - in a real app, this would come from authentication
  const mockUserId = 1;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WebSocketProvider userId={mockUserId}>
          <ModalProvider>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
              <Header toggleSidebar={toggleSidebar} />
              <div className="flex flex-1 relative">
                <Sidebar isOpen={isSidebarOpen} />
                <main className="flex-1 p-4 pt-20 md:pt-4 pb-4 overflow-auto">
                  <Router />
                </main>
              </div>
            </div>
            <Toaster />
          </ModalProvider>
        </WebSocketProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
