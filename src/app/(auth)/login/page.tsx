"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Ticket, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/tickets");
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 gt-gradient-primary rounded-xl flex items-center justify-center">
              <Ticket className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold gt-gradient-text">GateTix</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">Selamat Datang Kembali</h1>
          <p className="text-muted-foreground mb-8">
            Masuk ke akun Anda untuk melanjutkan
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="anda@contoh.com"
                  required
                  className="pl-12 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Kata Sandi</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Lupa kata sandi?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  className="pl-12 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Ingat saya
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full gt-gradient-primary border-0 hover:opacity-90 rounded-xl h-12"
            >
              Masuk
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 gt-gradient-hero" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920')",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Event seru menanti Anda</h2>
            <p className="text-white/80 text-lg max-w-md">
              Temukan event menarik, pesan tiket dengan mudah, dan ciptakan
              kenangan tak terlupakan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
