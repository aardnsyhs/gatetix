"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function EventDetailAdmin({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/events/jakarta-music-festival-2024`;
    if (navigator.share) {
      await navigator.share({
        title: "Jakarta Music Festival 2024",
        text: "Lihat event ini di GateTix!",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link event berhasil disalin!");
    }
  };

  const handleDelete = () => {
    alert("Event berhasil dihapus!");
    router.push("/admin/events");
  };

  const handleEdit = () => {
    alert("Event berhasil diupdate!");
    setIsEditOpen(false);
  };

  const event = {
    id: eventId,
    title: "Jakarta Music Festival 2024",
    date: "15 Juli 2024",
    time: "18:00 - 23:00 WIB",
    location: "Gelora Bung Karno, Jakarta",
    status: "published",
    ticketsSold: 450,
    capacity: 1000,
    revenue: "Rp 67.500.000",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=600&fit=crop",
    description:
      "Bergabunglah dalam malam musik yang tak terlupakan dengan penampilan artis-artis top dari seluruh Indonesia.",
    tickets: [
      { name: "Regular", price: 150000, sold: 350, capacity: 800 },
      { name: "VIP", price: 500000, sold: 80, capacity: 150 },
      { name: "Premium", price: 1500000, sold: 20, capacity: 50 },
    ],
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className="rounded-xl">
            <Link href="/admin/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{event.title}</h1>
              <Badge
                className={
                  event.status === "published"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : ""
                }
              >
                {event.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              {event.date} • {event.time}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => setIsEditOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            className="rounded-xl text-destructive hover:text-destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tiket Terjual</p>
                <p className="text-2xl font-bold">{event.ticketsSold}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendapatan</p>
                <p className="text-2xl font-bold">{event.revenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kapasitas</p>
                <p className="text-2xl font-bold">{event.capacity}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tingkat Terisi</p>
                <p className="text-2xl font-bold">
                  {Math.round((event.ticketsSold / event.capacity) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger
            value="overview"
            className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
          >
            Ringkasan
          </TabsTrigger>
          <TabsTrigger
            value="tickets"
            className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
          >
            Tiket
          </TabsTrigger>
          <TabsTrigger
            value="attendees"
            className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
          >
            Peserta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 gt-card-glow">
              <CardHeader>
                <CardTitle>Detail Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Deskripsi</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tanggal & Waktu
                    </p>
                    <p className="font-medium">{event.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lokasi</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gt-card-glow">
              <CardHeader>
                <CardTitle>Progress Penjualan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-primary">
                    {Math.round((event.ticketsSold / event.capacity) * 100)}%
                  </p>
                  <p className="text-muted-foreground">tiket terjual</p>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gt-gradient-primary rounded-full"
                    style={{
                      width: `${(event.ticketsSold / event.capacity) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {event.ticketsSold} terjual
                  </span>
                  <span className="text-muted-foreground">
                    {event.capacity - event.ticketsSold} tersisa
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets">
          <Card className="gt-card-glow">
            <CardHeader>
              <CardTitle>Jenis Tiket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted/30 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{ticket.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Rp {ticket.price.toLocaleString("id-ID")} per tiket
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {ticket.sold} / {ticket.capacity}
                    </p>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full gt-gradient-primary rounded-full"
                        style={{
                          width: `${(ticket.sold / ticket.capacity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendees">
          <Card className="gt-card-glow">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Daftar Peserta</h3>
              <p className="text-muted-foreground mb-4">
                Lihat dan kelola semua peserta untuk event ini
              </p>
              <Button
                asChild
                className="gt-gradient-primary border-0 hover:opacity-90 rounded-xl"
              >
                <Link href="/admin/attendees">Lihat Semua Peserta</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Event Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Ubah detail event {event.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Nama Event</Label>
              <Input
                id="edit-title"
                defaultValue={event.title}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Lokasi</Label>
              <Input
                id="edit-location"
                defaultValue={event.location}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-capacity">Kapasitas</Label>
              <Input
                id="edit-capacity"
                type="number"
                defaultValue={event.capacity}
                className="rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              className="rounded-xl"
            >
              Batal
            </Button>
            <Button
              onClick={handleEdit}
              className="gt-gradient-primary border-0 rounded-xl"
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Event?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus event &quot;{event.title}&quot;?
              Tindakan ini tidak dapat dibatalkan dan semua data terkait akan
              hilang.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
            >
              Hapus Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
