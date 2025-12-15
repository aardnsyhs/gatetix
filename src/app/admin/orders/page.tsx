"use client";

import { useState } from "react";
import {
  Download,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const orders = [
  {
    id: "ORD-001",
    customer: "Budi Santoso",
    email: "budi@email.com",
    event: "Jakarta Music Festival",
    tickets: 2,
    amount: 450000,
    status: "completed",
    date: "2024-07-10",
    time: "14:30",
  },
  {
    id: "ORD-002",
    customer: "Siti Rahayu",
    email: "siti@email.com",
    event: "Tech Summit",
    tickets: 1,
    amount: 500000,
    status: "completed",
    date: "2024-07-09",
    time: "09:15",
  },
  {
    id: "ORD-003",
    customer: "Ahmad Wijaya",
    email: "ahmad@email.com",
    event: "Festival Kuliner",
    tickets: 3,
    amount: 225000,
    status: "pending",
    date: "2024-07-08",
    time: "16:45",
  },
  {
    id: "ORD-004",
    customer: "Dewi Lestari",
    email: "dewi@email.com",
    event: "Jakarta Music Festival",
    tickets: 4,
    amount: 1800000,
    status: "refunded",
    date: "2024-07-07",
    time: "11:20",
  },
  {
    id: "ORD-005",
    customer: "Rudi Hermawan",
    email: "rudi@email.com",
    event: "Tech Summit",
    tickets: 2,
    amount: 1000000,
    status: "completed",
    date: "2024-07-06",
    time: "13:00",
  },
];

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Pelanggan",
      "Email",
      "Event",
      "Tiket",
      "Jumlah",
      "Status",
      "Tanggal",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredOrders.map((order) =>
        [
          order.id,
          order.customer,
          order.email,
          order.event,
          order.tickets,
          order.amount,
          order.status,
          order.date,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pesanan-gatetix.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500";
      case "pending":
        return "bg-amber-500/10 text-amber-500";
      case "refunded":
        return "bg-red-500/10 text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Pesanan</h1>
          <p className="text-muted-foreground mt-1">
            Lihat dan kelola semua pesanan tiket
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={handleExportCSV}
        >
          <Download className="h-4 w-4 mr-2" />
          Ekspor CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Cari pesanan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 max-w-md rounded-xl"
        />
        <Button
          variant="ghost"
          className="rounded-xl"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
          {statusFilter !== "all" && (
            <Badge
              variant="secondary"
              className="ml-2 bg-primary/10 text-primary"
            >
              1
            </Badge>
          )}
        </Button>
      </div>

      <Card className="gt-card-glow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>ID Pesanan</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Tiket</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="group">
                <TableCell>
                  <span className="font-mono text-sm font-medium">
                    {order.id}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gt-gradient-primary flex items-center justify-center text-white text-xs font-medium">
                      {order.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{order.event}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {order.tickets} tiket
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">
                    Rp {order.amount.toLocaleString("id-ID")}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusStyle(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{order.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.time}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Menampilkan <span className="font-medium">1-5</span> dari{" "}
            <span className="font-medium">24</span> pesanan
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
            <Button variant="ghost" size="icon" className="rounded-xl">
              2
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl">
              3
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Order Detail Sheet */}
      <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <SheetContent className="gt-card-glow">
          <SheetHeader>
            <SheetTitle>Detail Pesanan</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">ID Pesanan</p>
              <p className="font-mono font-medium">{selectedOrder?.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pelanggan</p>
              <p className="font-medium">{selectedOrder?.customer}</p>
              <p className="text-sm text-muted-foreground">
                {selectedOrder?.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Event</p>
              <p className="font-medium">{selectedOrder?.event}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Jumlah Tiket</p>
              <p>{selectedOrder?.tickets} tiket</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total Pembayaran
              </p>
              <p className="text-xl font-bold text-primary">
                Rp {selectedOrder?.amount.toLocaleString("id-ID")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <Badge className={getStatusStyle(selectedOrder?.status || "")}>
                {selectedOrder?.status === "completed"
                  ? "Selesai"
                  : selectedOrder?.status === "pending"
                  ? "Tertunda"
                  : "Dikembalikan"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Tanggal & Waktu
              </p>
              <p>
                {selectedOrder?.date} • {selectedOrder?.time}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Filter Pesanan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="pending">Tertunda</SelectItem>
                  <SelectItem value="refunded">Dikembalikan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => {
                setStatusFilter("all");
                setIsFilterOpen(false);
              }}
            >
              Reset
            </Button>
            <Button
              className="flex-1 gt-gradient-primary border-0 rounded-xl"
              onClick={() => setIsFilterOpen(false)}
            >
              Terapkan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
