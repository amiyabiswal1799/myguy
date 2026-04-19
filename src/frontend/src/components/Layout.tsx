import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block flex-shrink-0">
        <Sidebar collapsed={false} />
      </div>

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            role="button"
            tabIndex={0}
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSidebarOpen(false);
            }}
          />
          <div className="fixed inset-y-0 left-0 z-50 md:hidden">
            <Sidebar collapsed={false} />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        {isMobile && (
          <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border md:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              data-ocid="nav.mobile_menu_button"
              className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-smooth"
              aria-label="Open navigation"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <span className="font-display font-bold text-base">MyGuy</span>
            <div className="w-9" />
          </div>
        )}

        {/* Scrollable content area */}
        <main
          className={cn("flex-1 overflow-y-auto bg-background", className)}
          data-ocid="main.content"
        >
          {children}
        </main>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
