import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  ShoppingCart,
  Users,
  ScanLine,
  Tag,
  UserCog,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  ChevronDown,
  LogOut,
  Ticket,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Calendar, label: "Events", path: "/admin/events" },
  { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
  { icon: Users, label: "Attendees", path: "/admin/attendees" },
  { icon: ScanLine, label: "Check-in", path: "/admin/check-in" },
  { icon: Tag, label: "Promo Codes", path: "/admin/promo-codes" },
  { icon: UserCog, label: "Team & Roles", path: "/admin/team" },
  { icon: FileText, label: "Audit Logs", path: "/admin/audit-logs" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`gt-sidebar fixed inset-y-0 left-0 z-50 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } lg:relative`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 gt-gradient-primary rounded-xl flex items-center justify-center">
                <Ticket className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              {sidebarOpen && (
                <span className="text-lg font-bold gt-gradient-text">
                  GateTix
                </span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="gt-icon-btn lg:flex hidden"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`gt-sidebar-item ${active ? "active" : ""} ${
                      !sidebarOpen ? "justify-center px-0" : ""
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          {sidebarOpen && (
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="gt-avatar">JD</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">
                    Admin
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="gt-navbar h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden gt-icon-btn"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search anything..."
                className="gt-input-search w-72"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="gt-icon-btn relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-smooth"
              >
                <span className="text-sm font-medium hidden sm:block">
                  My Organization
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="gt-dropdown absolute right-0 mt-2 w-56 py-2 animate-scale-in">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium">My Organization</p>
                    <p className="text-xs text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-smooth"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-smooth"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
