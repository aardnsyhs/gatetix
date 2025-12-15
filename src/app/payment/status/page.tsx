"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Ticket,
  Home,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const statusConfig = {
  success: {
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500",
    bgColor: "bg-success/10",
    title: "Pembayaran Berhasil!",
    message:
      "Tiket Anda telah dikirim ke email. Bersiaplah untuk pengalaman yang luar biasa!",
  },
  pending: {
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-warning/10",
    title: "Pembayaran Tertunda",
    message:
      "Pembayaran Anda sedang diproses. Anda akan menerima email konfirmasi segera.",
  },
  failed: {
    icon: XCircle,
    gradient: "from-red-500 to-rose-500",
    bgColor: "bg-destructive/10",
    title: "Pembayaran Gagal",
    message:
      "Terjadi masalah saat memproses pembayaran Anda. Silakan coba lagi atau gunakan metode pembayaran lain.",
  },
};

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "success";

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.success;
  const Icon = config.icon;

  return (
    <Card className="max-w-md w-full gt-card-glow animate-scale-in">
      <CardContent className="p-8 text-center">
        <div
          className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mx-auto mb-6 shadow-xl`}
        >
          <Icon className="h-12 w-12 text-white" strokeWidth={1.5} />
        </div>

        <h1 className="text-2xl font-bold mb-3">{config.title}</h1>
        <p className="text-muted-foreground mb-8">{config.message}</p>

        <div className="space-y-3">
          {status === "success" && (
            <>
              <Button
                asChild
                className="w-full gt-gradient-primary border-0 hover:opacity-90"
              >
                <Link href="/tickets">
                  <Ticket className="h-4 w-4 mr-2" />
                  Lihat Tiket Saya
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Kembali ke Beranda
                </Link>
              </Button>
            </>
          )}
          {status === "pending" && (
            <Button
              asChild
              className="w-full gt-gradient-primary border-0 hover:opacity-90"
            >
              <Link href="/orders">Lihat Status Pesanan</Link>
            </Button>
          )}
          {status === "failed" && (
            <>
              <Button className="w-full gt-gradient-primary border-0 hover:opacity-90">
                <RefreshCw className="h-4 w-4 mr-2" />
                Coba Lagi
              </Button>
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Kembali ke Beranda
                </Link>
              </Button>
            </>
          )}
        </div>

        {status === "success" && (
          <div className="mt-8 p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Konfirmasi pesanan telah dikirim ke{" "}
              <span className="font-medium text-foreground">
                budi@contoh.com
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LoadingFallback() {
  return (
    <Card className="max-w-md w-full gt-card-glow">
      <CardContent className="p-8 text-center">
        <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-6">
          <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Memuat...</h1>
        <p className="text-muted-foreground">
          Mohon tunggu sementara kami memeriksa status pembayaran Anda.
        </p>
      </CardContent>
    </Card>
  );
}

export default function PaymentStatus() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center py-12 px-4">
      <Suspense fallback={<LoadingFallback />}>
        <PaymentStatusContent />
      </Suspense>
    </div>
  );
}
