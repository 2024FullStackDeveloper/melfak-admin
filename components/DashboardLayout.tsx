"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/Sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useLocalizer from "@/hooks/useLocalizer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isRtl } = useLocalizer();
  // const router = useRouter();
  // const { isAuthenticated } = useAuthState();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.replace("/");
  //   }
  // }, [isAuthenticated, router]);

  return (
    <div className="flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isRtl={isRtl}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger />
        <SheetContent side={isRtl ? "right" : "left"} className="p-0 w-72">
          <Sidebar
            collapsed={false}
            onToggle={() => setMobileMenuOpen(false)}
            isRtl={isRtl}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-1 flex-col overflow-hidden transition-all duration-300",
          // LTR: left margin, RTL: right margin
          isRtl ? "lg:mr-72" : "lg:ml-72",
          sidebarCollapsed && (isRtl ? "lg:mr-20" : "lg:ml-20")
        )}
      >
        <DashboardHeader onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto  p-4 lg:p-6 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
