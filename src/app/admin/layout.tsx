"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Calendar, label: "Event", path: "/admin/events" },
  { icon: ShoppingCart, label: "Pesanan", path: "/admin/orders" },
  { icon: Users, label: "Peserta", path: "/admin/attendees" },
  { icon: ScanLine, label: "Check-in", path: "/admin/check-in" },
  { icon: Tag, label: "Kode Promo", path: "/admin/promo-codes" },
  { icon: UserCog, label: "Tim & Peran", path: "/admin/team" },
  { icon: FileText, label: "Log Aktivitas", path: "/admin/audit-logs" },
  { icon: Settings, label: "Pengaturan", path: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

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
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 gt-gradient-primary rounded-xl flex items-center justify-center">
                <Ticket className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              {sidebarOpen && (
                <span className="text-lg font-bold gt-gradient-text">
                  GateTix
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:flex hidden rounded-xl"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth ${
                      active
                        ? "gt-gradient-primary text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    } ${!sidebarOpen ? "justify-center px-0" : ""}`}
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
                <div className="w-10 h-10 rounded-full gt-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                  BS
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Budi Santoso</p>
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden rounded-xl"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:block">
              <Input
                type="text"
                placeholder="Cari sesuatu..."
                className="w-72 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative rounded-xl">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-xl">
                  <span className="text-sm font-medium hidden sm:block mr-2">
                    Organisasi Saya
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuLabel>
                  <p className="font-medium">Organisasi Saya</p>
                  <p className="text-xs text-muted-foreground font-normal">
                    budi@email.com
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Pengaturan
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
