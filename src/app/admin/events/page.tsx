"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Calendar,
  MapPin,
  MoreVertical,
  Users,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const events = [
  {
    id: 1,
    title: "Jakarta Music Festival 2024",
    date: "15 Juli 2024",
    time: "18:00 WIB",
    location: "Gelora Bung Karno, Jakarta",
    status: "published",
    ticketsSold: 450,
    capacity: 1000,
    revenue: "Rp 67.500.000",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Indonesia Tech Summit 2024",
    date: "20 Agustus 2024",
    time: "09:00 WIB",
    location: "ICE BSD, Tangerang",
    status: "draft",
    ticketsSold: 0,
    capacity: 500,
    revenue: "Rp 0",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Festival Kuliner Nusantara",
    date: "5 September 2024",
    time: "12:00 WIB",
    location: "Senayan Park, Jakarta",
    status: "published",
    ticketsSold: 280,
    capacity: 400,
    revenue: "Rp 21.000.000",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop",
  },
];

export default function AdminEvents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(
    null
  );
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
  });

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateEvent = () => {
    // Simulasi create event
    alert(`Event "${newEvent.title}" berhasil dibuat!`);
    setIsCreateOpen(false);
    setNewEvent({ title: "", date: "", time: "", location: "", capacity: "" });
  };

  const handleEditEvent = () => {
    alert(`Event "${selectedEvent?.title}" berhasil diupdate!`);
    setIsEditOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    alert(`Event "${selectedEvent?.title}" berhasil dihapus!`);
    setIsDeleteOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Event</h1>
          <p className="text-muted-foreground mt-1">
            Kelola event dan penjualan tiket Anda
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gt-gradient-primary border-0 hover:opacity-90 rounded-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Buat Event
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Cari event..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 max-w-md rounded-xl"
        />
        <Tabs defaultValue="all">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="all"
              className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
            >
              Semua
            </TabsTrigger>
            <TabsTrigger
              value="published"
              className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
            >
              Dipublikasi
            </TabsTrigger>
            <TabsTrigger
              value="draft"
              className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
            >
              Draf
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="gt-card-glow overflow-hidden group">
            {/* Event Image */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 right-3">
                <Badge
                  variant={
                    event.status === "published" ? "default" : "secondary"
                  }
                  className={
                    event.status === "published"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : ""
                  }
                >
                  {event.status}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold text-lg line-clamp-1">
                  {event.title}
                </h3>
              </div>
            </div>

            {/* Event Details */}
            <CardContent className="p-5">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between py-3 border-t border-dashed border-border">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-semibold">{event.ticketsSold}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      / {event.capacity}
                    </span>
                  </span>
                </div>
                <span className="font-semibold text-primary">
                  {event.revenue}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                <div
                  className="h-full gt-gradient-primary rounded-full"
                  style={{
                    width: `${(event.ticketsSold / event.capacity) * 100}%`,
                  }}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <Button
                  asChild
                  className="flex-1 gt-gradient-primary border-0 hover:opacity-90 rounded-xl text-sm"
                >
                  <Link href={`/admin/events/${event.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem
                      className="rounded-lg cursor-pointer"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-lg cursor-pointer text-destructive focus:text-destructive"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsDeleteOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Event Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Event Baru</DialogTitle>
            <DialogDescription>
              Isi detail event yang ingin Anda buat
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Nama Event</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="Masukkan nama event"
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Waktu</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                placeholder="Masukkan lokasi event"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Kapasitas</Label>
              <Input
                id="capacity"
                type="number"
                value={newEvent.capacity}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, capacity: e.target.value })
                }
                placeholder="Jumlah maksimal peserta"
                className="rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
              className="rounded-xl"
            >
              Batal
            </Button>
            <Button
              onClick={handleCreateEvent}
              className="gt-gradient-primary border-0 rounded-xl"
            >
              Buat Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Ubah detail event {selectedEvent?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Nama Event</Label>
              <Input
                id="edit-title"
                defaultValue={selectedEvent?.title}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Lokasi</Label>
              <Input
                id="edit-location"
                defaultValue={selectedEvent?.location}
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
              onClick={handleEditEvent}
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
              Apakah Anda yakin ingin menghapus event &quot;
              {selectedEvent?.title}&quot;? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
