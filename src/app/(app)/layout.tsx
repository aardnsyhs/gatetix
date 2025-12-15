"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Ticket, User, ShoppingBag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "My Tickets", path: "/tickets", icon: Ticket },
  { label: "Order History", path: "/orders", icon: ShoppingBag },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="gt-navbar">
        <nav className="gt-container">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 gt-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Ticket className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold gt-gradient-text">
                GateTix
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-smooth flex items-center gap-2 ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" className="rounded-xl">
                <User className="h-4 w-4 mr-2" />
                John Doe
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/login">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-xl"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-smooth flex items-center gap-2 ${
                        isActive(link.path)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-4 mt-2 border-t border-border space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-xl"
                  >
                    <User className="h-4 w-4 mr-2" />
                    John Doe
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start rounded-xl"
                  >
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card mt-auto">
        <div className="gt-container py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} GateTix. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
