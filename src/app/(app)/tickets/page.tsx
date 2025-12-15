"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tickets = [
  {
    id: "TKT-001",
    eventName: "Jakarta Music Festival 2024",
    date: "15 Juli 2024",
    time: "18:00 WIB",
    location: "Gelora Bung Karno, Jakarta",
    ticketType: "Regular",
    status: "active",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-001",
  },
  {
    id: "TKT-002",
    eventName: "Indonesia Tech Summit 2024",
    date: "20 Agustus 2024",
    time: "09:00 WIB",
    location: "ICE BSD, Tangerang",
    ticketType: "VIP Pass",
    status: "active",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-002",
  },
  {
    id: "TKT-003",
    eventName: "Festival Kuliner Nusantara",
    date: "5 Juni 2024",
    time: "12:00 WIB",
    location: "Senayan City, Jakarta",
    ticketType: "Regular",
    status: "used",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-003",
  },
];

export default function MyTickets() {
  const [selectedTicket, setSelectedTicket] = useState<
    (typeof tickets)[0] | null
  >(null);
  const [filter, setFilter] = useState<"all" | "active" | "used">("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredTickets =
    filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="gt-container">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Tiket Saya</h1>
          <p className="text-muted-foreground">
            Lihat dan kelola tiket event Anda
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as typeof filter)}
          className="mb-8"
        >
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="all"
              className="rounded-lg capitalize data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
            >
              Semua
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="rounded-lg capitalize data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
            >
              Aktif
            </TabsTrigger>
            <TabsTrigger
              value="used"
              className="rounded-lg capitalize data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
            >
              Terpakai
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="gt-card-glow gt-ticket-card overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {ticket.eventName}
                    </h3>
                    <Badge
                      variant={
                        ticket.status === "active" ? "default" : "secondary"
                      }
                      className={
                        ticket.status === "active"
                          ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                          : ""
                      }
                    >
                      {ticket.status === "active" ? "Aktif" : "Terpakai"}
                    </Badge>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    {ticket.id}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {ticket.date} at {ticket.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{ticket.location}</span>
                  </div>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Tipe:</span>{" "}
                    <span className="font-medium">{ticket.ticketType}</span>
                  </p>
                </div>

                <div className="h-px bg-border my-4" />

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTicket(ticket)}
                    className="flex-1 rounded-xl"
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Lihat QR
                  </Button>
                  <Button
                    asChild
                    className="flex-1 gt-gradient-primary border-0 hover:opacity-90 rounded-xl"
                  >
                    <Link href={`/tickets/${ticket.id}`}>Lihat Detail</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* QR Code Modal */}
        <Dialog
          open={!!selectedTicket}
          onOpenChange={() => setSelectedTicket(null)}
        >
          <DialogContent className="sm:max-w-sm gt-card-glow">
            <DialogHeader>
              <DialogTitle>{selectedTicket?.eventName}</DialogTitle>
            </DialogHeader>
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl mb-6 relative aspect-square">
                <Image
                  src={selectedTicket?.qrCode || ""}
                  alt="Ticket QR Code"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Tunjukkan kode QR ini di pintu masuk venue
              </p>
              <p className="text-xs font-mono text-muted-foreground mb-6">
                {selectedTicket?.id}
              </p>
              <Button variant="outline" className="w-full rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Unduh Tiket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
