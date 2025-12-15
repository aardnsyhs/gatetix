"use client";

import { useState } from "react";
import { Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const orders = [
  {
    id: "ORD-12345",
    eventName: "Jakarta Music Festival 2024",
    date: "1 Juni 2024",
    tickets: 2,
    total: 600000,
    status: "completed",
  },
  {
    id: "ORD-12346",
    eventName: "Indonesia Tech Summit 2024",
    date: "15 Juni 2024",
    tickets: 1,
    total: 1500000,
    status: "completed",
  },
  {
    id: "ORD-12347",
    eventName: "Festival Kuliner Nusantara",
    date: "20 Mei 2024",
    tickets: 3,
    total: 450000,
    status: "refunded",
  },
];

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null
  );

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="gt-container">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Riwayat Pesanan
          </h1>
          <p className="text-muted-foreground">
            Lihat riwayat pembelian tiket Anda
          </p>
        </div>

        {/* Desktop Table */}
        <Card className="hidden md:block gt-card-glow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>ID Pesanan</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Tiket</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="group">
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell className="font-medium">
                    {order.eventName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.date}
                  </TableCell>
                  <TableCell>{order.tickets}</TableCell>
                  <TableCell className="font-semibold">
                    Rp {order.total.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "completed" ? "default" : "secondary"
                      }
                      className={
                        order.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                          : ""
                      }
                    >
                      {order.status === "completed"
                        ? "Selesai"
                        : "Dikembalikan"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedOrder(order)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Menampilkan <span className="font-medium">1-3</span> dari{" "}
              <span className="font-medium">3</span> pesanan
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled
                className="rounded-xl"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="gt-gradient-primary border-0 rounded-xl"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled
                className="rounded-xl"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="gt-card-glow">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-mono text-sm text-muted-foreground mb-1">
                      {order.id}
                    </p>
                    <h3 className="font-semibold">{order.eventName}</h3>
                  </div>
                  <Badge
                    variant={
                      order.status === "completed" ? "default" : "secondary"
                    }
                    className={
                      order.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                        : ""
                    }
                  >
                    {order.status === "completed" ? "Selesai" : "Dikembalikan"}
                  </Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{order.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tiket:</span>
                    <span>{order.tickets}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-semibold">
                      Rp {order.total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(order)}
                  className="w-full rounded-xl"
                >
                  Lihat Detail
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Detail Sheet */}
        <Sheet
          open={!!selectedOrder}
          onOpenChange={() => setSelectedOrder(null)}
        >
          <SheetContent className="gt-card-glow">
            <SheetHeader>
              <SheetTitle>Detail Pesanan</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">ID Pesanan</p>
                <p className="font-mono">{selectedOrder?.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Event</p>
                <p className="font-medium">{selectedOrder?.eventName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Tanggal Pembelian
                </p>
                <p>{selectedOrder?.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Jumlah Tiket
                </p>
                <p>{selectedOrder?.tickets}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Pembayaran
                </p>
                <p className="text-xl font-bold text-primary">
                  Rp {selectedOrder?.total.toLocaleString("id-ID")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge
                  variant={
                    selectedOrder?.status === "completed"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    selectedOrder?.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                      : ""
                  }
                >
                  {selectedOrder?.status === "completed"
                    ? "Selesai"
                    : "Dikembalikan"}
                </Badge>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
