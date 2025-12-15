"use client";

import { useState } from "react";
import {
  Download,
  Filter,
  Calendar,
  User,
  Settings,
  Trash2,
  Plus,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allAuditLogs = [
  {
    id: 1,
    action: "Event Dibuat",
    user: "Budi Admin",
    target: "Jakarta Music Festival",
    timestamp: "2024-07-10 14:30:00",
    type: "create",
    icon: Plus,
  },
  {
    id: 2,
    action: "Pesanan Direfund",
    user: "Siti Manager",
    target: "Pesanan #1234",
    timestamp: "2024-07-10 13:15:00",
    type: "update",
    icon: Edit,
  },
  {
    id: 3,
    action: "Pengguna Diundang",
    user: "Budi Admin",
    target: "ahmad@email.com",
    timestamp: "2024-07-10 11:00:00",
    type: "create",
    icon: User,
  },
  {
    id: 4,
    action: "Kode Promo Dihapus",
    user: "Siti Manager",
    target: "KODELAMA",
    timestamp: "2024-07-09 16:45:00",
    type: "delete",
    icon: Trash2,
  },
  {
    id: 5,
    action: "Pengaturan Diperbarui",
    user: "Budi Admin",
    target: "Pengaturan Pembayaran",
    timestamp: "2024-07-09 10:30:00",
    type: "update",
    icon: Settings,
  },
  {
    id: 6,
    action: "Event Dipublikasi",
    user: "Siti Manager",
    target: "Indonesia Tech Summit",
    timestamp: "2024-07-08 09:00:00",
    type: "update",
    icon: Calendar,
  },
  {
    id: 7,
    action: "Tiket Dicetak",
    user: "Ahmad Staff",
    target: "TKT-001234",
    timestamp: "2024-07-07 15:20:00",
    type: "create",
    icon: Plus,
  },
  {
    id: 8,
    action: "Peserta Check-in",
    user: "Dewi Checker",
    target: "Budi Santoso",
    timestamp: "2024-07-07 14:00:00",
    type: "update",
    icon: User,
  },
];

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [tempTypeFilter, setTempTypeFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredLogs = allAuditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const visibleLogs = filteredLogs.slice(0, visibleCount);

  const handleExportLog = () => {
    const headers = ["ID", "Aksi", "User", "Target", "Timestamp", "Tipe"];
    const csvContent = [
      headers.join(","),
      ...filteredLogs.map((log) =>
        [
          log.id,
          log.action,
          log.user,
          log.target,
          log.timestamp,
          log.type,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-log-gatetix.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredLogs.length));
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "create":
        return "bg-emerald-500/10 text-emerald-500";
      case "update":
        return "bg-blue-500/10 text-blue-500";
      case "delete":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Log Aktivitas</h1>
          <p className="text-muted-foreground mt-1">
            Lacak semua aktivitas sistem
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={handleExportLog}
        >
          <Download className="h-4 w-4 mr-2" />
          Ekspor Log
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Cari log..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 max-w-md rounded-xl"
        />
        <Button
          variant="ghost"
          className="rounded-xl"
          onClick={() => {
            setTempTypeFilter(typeFilter);
            setIsFilterOpen(true);
          }}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
          {typeFilter !== "all" && (
            <Badge
              variant="secondary"
              className="ml-2 bg-primary/10 text-primary"
            >
              1
            </Badge>
          )}
        </Button>
      </div>

      <Card className="gt-card-glow">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {visibleLogs.map((log) => {
              const Icon = log.icon;
              return (
                <div
                  key={log.id}
                  className="p-5 hover:bg-muted/30 transition-smooth"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeStyle(
                        log.type
                      )}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            by{" "}
                            <span className="text-foreground font-medium">
                              {log.user}
                            </span>{" "}
                            on{" "}
                            <span className="text-foreground">
                              {log.target}
                            </span>
                          </p>
                        </div>
                        <time className="text-sm text-muted-foreground whitespace-nowrap">
                          {log.timestamp}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {visibleCount < filteredLogs.length && (
            <div className="p-4 border-t border-border text-center">
              <Button
                variant="ghost"
                onClick={handleLoadMore}
                className="text-sm text-primary font-medium hover:underline"
              >
                Muat lebih banyak ({filteredLogs.length - visibleCount} tersisa)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Filter Log Aktivitas</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type-filter">Tipe Aktivitas</Label>
              <Select value={tempTypeFilter} onValueChange={setTempTypeFilter}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="create">Dibuat</SelectItem>
                  <SelectItem value="update">Diperbarui</SelectItem>
                  <SelectItem value="delete">Dihapus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => {
                setTempTypeFilter("all");
                setTypeFilter("all");
                setIsFilterOpen(false);
              }}
            >
              Reset
            </Button>
            <Button
              className="flex-1 gt-gradient-primary border-0 rounded-xl"
              onClick={() => {
                setTypeFilter(tempTypeFilter);
                setIsFilterOpen(false);
              }}
            >
              Terapkan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
