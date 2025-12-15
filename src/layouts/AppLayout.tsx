import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Ticket, ShoppingBag, User } from 'lucide-react';

export default function AppLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
              <Ticket className="h-6 w-6 text-primary" strokeWidth={2} />
              <span className="text-lg font-sans font-bold text-foreground">GateTix</span>
            </Link>

            <div className="flex items-center space-x-1">
              <Link to="/tickets">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`bg-transparent hover:bg-accent hover:text-accent-foreground ${
                    isActive('/tickets') ? 'bg-accent text-accent-foreground' : 'text-foreground'
                  }`}
                >
                  <Ticket className="mr-2 h-4 w-4" strokeWidth={2} />
                  My Tickets
                </Button>
              </Link>
              <Link to="/orders">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`bg-transparent hover:bg-accent hover:text-accent-foreground ${
                    isActive('/orders') ? 'bg-accent text-accent-foreground' : 'text-foreground'
                  }`}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" strokeWidth={2} />
                  Orders
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground">
                <User className="h-4 w-4" strokeWidth={2} />
              </Button>
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
