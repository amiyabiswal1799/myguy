import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  Home,
  MessageCircle,
  Settings,
  Shield,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { SubscriptionTier } from "../lib/types";
import { SubscriptionBadge } from "./SubscriptionBadge";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  ocid: string;
  collapsed?: boolean;
}

function NavLink({ to, icon, label, ocid, collapsed }: NavLinkProps) {
  const state = useRouterState();
  const isActive =
    state.location.pathname === to ||
    state.location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      data-ocid={ocid}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth group",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
        collapsed && "justify-center px-2",
      )}
      title={collapsed ? label : undefined}
    >
      <span className={cn("flex-shrink-0 w-5 h-5", isActive && "text-primary")}>
        {icon}
      </span>
      {!collapsed && <span className="truncate">{label}</span>}
      {!collapsed && isActive && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
      )}
    </Link>
  );
}

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const { isAuthenticated, logout } = useAuth();
  const { profile } = useProfile();
  const tier = profile?.tier ?? SubscriptionTier.free;
  const isAdmin = profile?.isAdmin ?? false;

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-card border-r border-border",
        collapsed ? "w-16" : "w-60",
      )}
      data-ocid="sidebar.panel"
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-border",
          collapsed && "justify-center px-2",
        )}
      >
        <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            MyGuy
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav
        className="flex-1 overflow-y-auto py-4 px-2 space-y-1"
        aria-label="Main navigation"
      >
        <NavLink
          to="/feed"
          icon={<Home className="w-5 h-5" />}
          label="Home"
          ocid="nav.home_link"
          collapsed={collapsed}
        />
        <NavLink
          to="/companions"
          icon={<Bot className="w-5 h-5" />}
          label="My Guy"
          ocid="nav.companions_link"
          collapsed={collapsed}
        />
        <NavLink
          to="/chat"
          icon={<MessageCircle className="w-5 h-5" />}
          label="Chat"
          ocid="nav.chat_link"
          collapsed={collapsed}
        />
        <NavLink
          to="/profile"
          icon={<User className="w-5 h-5" />}
          label="Profile"
          ocid="nav.profile_link"
          collapsed={collapsed}
        />

        {/* Divider */}
        <div className="my-2 border-t border-border" />

        <NavLink
          to="/pricing"
          icon={<Zap className="w-5 h-5" />}
          label="Upgrade"
          ocid="nav.upgrade_link"
          collapsed={collapsed}
        />

        {isAdmin && (
          <NavLink
            to="/admin"
            icon={<Shield className="w-5 h-5" />}
            label="Admin"
            ocid="nav.admin_link"
            collapsed={collapsed}
          />
        )}
      </nav>

      {/* User section */}
      {isAuthenticated && (
        <div className={cn("border-t border-border px-2 py-3")}>
          {!collapsed && profile && (
            <div className="px-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-8 w-8 rounded-full bg-secondary flex-shrink-0 overflow-hidden">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar.getDirectURL()}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{profile.name}</p>
                  <SubscriptionBadge tier={tier} size="sm" />
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={logout}
            data-ocid="nav.logout_button"
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth",
              collapsed && "justify-center px-2",
            )}
            title={collapsed ? "Settings" : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>
      )}
    </aside>
  );
}
