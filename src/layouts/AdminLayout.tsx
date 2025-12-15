import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutDashboard, Calendar, ShoppingCart, Users, ScanLine, Tag, UserCog, FileText, Settings, Menu, X, Bell, Search, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Calendar, label: 'Events', path: '/admin/events' },
  { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
  { icon: Users, label: 'Attendees', path: '/admin/attendees' },
  { icon: ScanLine, label: 'Check-in', path: '/admin/check-in' },
  { icon: Tag, label: 'Promo Codes', path: '/admin/promo-codes' },
  { icon: UserCog, label: 'Team & Roles', path: '/admin/team' },
  { icon: FileText, label: 'Audit Logs', path: '/admin/audit-logs' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } lg:relative`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            {sidebarOpen && (
              <Link to="/admin/dashboard" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
                <span className="text-lg font-sans font-bold text-foreground">GateTix Admin</span>
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-foreground hover:bg-accent transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
            </button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-smooth ${
                        sidebarOpen ? 'px-3' : 'px-0 justify-center'
                      } ${
                        active
                          ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                          : 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : ''}`} strokeWidth={2} />
                      {sidebarOpen && <span className="text-sm font-body">{item.label}</span>}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-foreground hover:bg-accent transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" strokeWidth={2} />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground">
                <Bell className="h-5 w-5" strokeWidth={2} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground">
                    <span className="text-sm font-body">My Organization</span>
                    <ChevronDown className="ml-2 h-4 w-4" strokeWidth={2} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover text-popover-foreground">
                  <DropdownMenuLabel className="text-foreground">Organizations</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">My Organization</DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">Switch Organization</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive hover:bg-destructive hover:text-destructive-foreground cursor-pointer">Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
