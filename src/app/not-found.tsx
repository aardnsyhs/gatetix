"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-[150px] sm:text-[200px] font-bold gt-gradient-text leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full gt-gradient-primary opacity-20 blur-3xl" />
          </div>
        </div>

        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
          <Search className="h-10 w-10 text-muted-foreground" />
        </div>

        {/* Text */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan
          kembali ke halaman utama atau cari event yang Anda inginkan.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <Button asChild className="gt-gradient-primary border-0 rounded-xl">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Ke Beranda
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Atau kunjungi halaman populer:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild variant="ghost" size="sm" className="rounded-xl">
              <Link href="/events">Jelajahi Event</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="rounded-xl">
              <Link href="/help">Pusat Bantuan</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="rounded-xl">
              <Link href="/login">Masuk</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
