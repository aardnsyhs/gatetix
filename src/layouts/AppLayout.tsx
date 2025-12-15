import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Ticket,
  ShoppingBag,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "My Tickets", path: "/tickets", icon: Ticket },
  { label: "Orders", path: "/orders", icon: ShoppingBag },
];

export default function AppLayout() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <header className="gt-navbar">
        <nav className="gt-container">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 gt-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Ticket className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold gt-gradient-text">
                GateTix
              </span>
            </Link>

            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-smooth ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{link.label}</span>
                  </Link>
                );
              })}

              {/* User Menu */}
              <div className="relative ml-2">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-smooth"
                >
                  <div className="gt-avatar w-8 h-8 text-xs">JD</div>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="gt-dropdown absolute right-0 mt-2 w-48 py-2 animate-scale-in">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium">John Doe</p>
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
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
