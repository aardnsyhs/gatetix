import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, X, Ticket, HelpCircle, User } from 'lucide-react';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
              <Ticket className="h-8 w-8 text-primary" strokeWidth={2} />
              <span className="text-xl font-sans font-bold text-foreground">GateTix</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/events">
                      <NavigationMenuLink
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-body transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
                          isActive('/events') ? 'bg-accent text-accent-foreground' : 'text-foreground'
                        }`}
                      >
                        Browse Events
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/tickets">
                      <NavigationMenuLink
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-body transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                          isActive('/tickets') ? 'bg-accent text-accent-foreground' : 'text-foreground'
                        }`}
                      >
                        My Tickets
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/help">
                      <NavigationMenuLink
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-body transition-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                          isActive('/help') ? 'bg-accent text-accent-foreground' : 'text-foreground'
                        }`}
                      >
                        Help
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="ml-2 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground">
                  <User className="mr-2 h-4 w-4" strokeWidth={2} />
                  Sign In
                </Button>
              </Link>
              <Link to="/admin/dashboard">
                <Button size="sm" className="ml-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                  Organizer Portal
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-accent transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border bg-background">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/events"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-body transition-smooth hover:bg-accent hover:text-accent-foreground ${
                    isActive('/events') ? 'bg-accent text-accent-foreground' : 'text-foreground'
                  }`}
                >
                  Browse Events
                </Link>
                <Link
                  to="/tickets"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-body transition-smooth hover:bg-accent hover:text-accent-foreground ${
                    isActive('/tickets') ? 'bg-accent text-accent-foreground' : 'text-foreground'
                  }`}
                >
                  My Tickets
                </Link>
                <Link
                  to="/help"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-body transition-smooth hover:bg-accent hover:text-accent-foreground ${
                    isActive('/help') ? 'bg-accent text-accent-foreground' : 'text-foreground'
                  }`}
                >
                  Help
                </Link>
                <div className="pt-2 border-t border-border">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground">
                      <User className="mr-2 h-4 w-4" strokeWidth={2} />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full mt-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                      Organizer Portal
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} GateTix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
