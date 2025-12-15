"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Share2,
  Heart,
  Minus,
  Plus,
  Ticket,
} from "lucide-react";

export default function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const event = {
    title: "Jakarta Music Festival 2024",
    date: "15 Juli 2024",
    time: "18:00 - 23:00 WIB",
    location: "Gelora Bung Karno, Jakarta",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=600&fit=crop",
    description:
      "Bergabunglah dalam malam musik yang tak terlupakan dengan penampilan artis-artis top dari seluruh Indonesia. Nikmati berbagai panggung, area kuliner, dan atmosfer yang akan membuat Anda ingin kembali lagi.",
    tickets: [
      {
        id: 1,
        name: "Regular",
        price: 150000,
        available: 150,
        description: "Akses ke semua area umum",
      },
      {
        id: 2,
        name: "VIP",
        price: 500000,
        available: 50,
        description: "Akses lounge VIP + minuman gratis",
      },
      {
        id: 3,
        name: "Premium",
        price: 1500000,
        available: 20,
        description: "Baris depan + meet & greet",
      },
    ],
    lineup: ["Tulus", "Raisa", "Hindia", "Pamungkas"],
    venue: {
      name: "Stadion Utama GBK",
      address: "Jl. Pintu Satu Senayan, Jakarta Pusat 10270",
      capacity: 5000,
    },
    attendees: 450,
  };

  const [selectedTicket, setSelectedTicket] = useState(event.tickets[0]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = ticketQuantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setTicketQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-80 sm:h-96">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="gt-card-glow">
              <CardContent className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge>Musik</Badge>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {event.attendees} peserta
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                      {event.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                    <TabsTrigger value="lineup">Lineup</TabsTrigger>
                    <TabsTrigger value="venue">Lokasi</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Tentang Event Ini
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </TabsContent>
                  <TabsContent value="lineup" className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Artis Tampil</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.lineup.map((artist, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <p className="font-medium">{artist}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="venue" className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Informasi Lokasi
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">{event.venue.name}</p>
                        <p className="text-muted-foreground">
                          {event.venue.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-5 w-5" />
                        <span>
                          Kapasitas: {event.venue.capacity.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-64 bg-muted rounded-xl flex items-center justify-center">
                        <span className="text-muted-foreground">
                          Peta lokasi
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Selector Sidebar */}
          <div className="lg:col-span-1">
            <Card className="gt-card-glow sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Ticket className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Pilih Tiket</h3>
                </div>

                <div className="space-y-3 mb-6">
                  {event.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedTicket.id === ticket.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium">{ticket.name}</p>
                        <p className="font-bold text-primary">
                          Rp {ticket.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {ticket.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {ticket.available} tersedia
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">
                    Jumlah
                  </label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={ticketQuantity <= 1}
                      className="rounded-xl"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-12 text-center">
                      {ticketQuantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                      disabled={ticketQuantity >= 10}
                      className="rounded-xl"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border-t border-dashed pt-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      Rp{" "}
                      {(selectedTicket.price * ticketQuantity).toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Biaya Layanan</span>
                    <span>
                      Rp{" "}
                      {Math.round(
                        selectedTicket.price * ticketQuantity * 0.1
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">
                      Rp{" "}
                      {Math.round(
                        selectedTicket.price * ticketQuantity * 1.1
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <Link href={`/checkout/${slug}`}>
                  <Button
                    className="w-full gt-gradient-primary border-0 hover:opacity-90 rounded-xl"
                    size="lg"
                  >
                    Lanjut ke Pembayaran
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
