"use client";

import { useState } from "react";
import {
  Download,
  CheckCircle,
  XCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { CustomAlert } from "@/components/ui/custom-alert";
import { EmptyState } from "@/components/ui/empty-state";
const attendees = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi@email.com",
    event: "Jakarta Music Festival",
    ticketType: "VIP",
    checkedIn: true,
    checkInTime: "18:15",
    gate: "Gate A",
  },
  {
    id: 2,
    name: "Siti Rahayu",
    email: "siti@email.com",
    event: "Jakarta Music Festival",
    ticketType: "Regular",
    checkedIn: true,
    checkInTime: "18:30",
    gate: "Gate B",
  },
  {
    id: 3,
    name: "Ahmad Wijaya",
    email: "ahmad@email.com",
    event: "Jakarta Music Festival",
    ticketType: "Regular",
    checkedIn: false,
    checkInTime: null,
    gate: null,
  },
  {
    id: 4,
    name: "Dewi Lestari",
    email: "dewi@email.com",
    event: "Jakarta Music Festival",
    ticketType: "VIP",
    checkedIn: false,
    checkInTime: null,
    gate: null,
  },
  {
    id: 5,
    name: "Rudi Hermawan",
    email: "rudi@email.com",
    event: "Jakarta Music Festival",
    ticketType: "Regular",
    checkedIn: true,
    checkInTime: "19:00",
    gate: "Gate A",
  },
];

export default function AdminAttendees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const checkedInCount = attendees.filter((a) => a.checkedIn).length;

  const handleExport = () => {
    const headers = [
      "Nama",
      "Email",
      "Event",
      "Jenis Tiket",
      "Status",
      "Waktu Check-in",
      "Gate",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredAttendees.map((a) =>
        [
          a.name,
          a.email,
          a.event,
          a.ticketType,
          a.checkedIn ? "Sudah Masuk" : "Belum Masuk",
          a.checkInTime || "-",
          a.gate || "-",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "peserta-gatetix.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSendEmail = () => {
    setIsEmailOpen(false);
    setShowEmailSuccess(true);
    setEmailSubject("");
    setEmailMessage("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Peserta</h1>
          <p className="text-muted-foreground mt-1">
            Lihat dan kelola peserta event
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="rounded-xl"
            onClick={() => setIsEmailOpen(true)}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Semua
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Ekspor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Peserta</p>
            <p className="text-3xl font-bold mt-1">{attendees.length}</p>
          </CardContent>
        </Card>
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Sudah Check-in</p>
            <p className="text-3xl font-bold mt-1 text-emerald-500">
              {checkedInCount}
            </p>
          </CardContent>
        </Card>
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Tingkat Check-in</p>
            <p className="text-3xl font-bold mt-1">
              {Math.round((checkedInCount / attendees.length) * 100)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Input
        type="text"
        placeholder="Cari peserta..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md rounded-xl"
      />

      {filteredAttendees.length === 0 ? (
        <Card className="gt-card-glow">
          <EmptyState
            variant="attendees"
            searchQuery={searchQuery}
            onReset={() => setSearchQuery("")}
          />
        </Card>
      ) : (
        <Card className="gt-card-glow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Peserta</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Jenis Tiket</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Waktu Check-in</TableHead>
                <TableHead>Gate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gt-gradient-primary flex items-center justify-center text-white text-xs font-medium">
                        {attendee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{attendee.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {attendee.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{attendee.event}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        attendee.ticketType === "VIP" ? "default" : "secondary"
                      }
                      className={
                        attendee.ticketType === "VIP"
                          ? "bg-primary/10 text-primary"
                          : ""
                      }
                    >
                      {attendee.ticketType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {attendee.checkedIn ? (
                      <span className="flex items-center gap-1.5 text-emerald-500">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Sudah Masuk</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm">Belum Masuk</span>
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {attendee.checkInTime || "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {attendee.gate || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Menampilkan <span className="font-medium">1-5</span> dari{" "}
              <span className="font-medium">5</span> peserta
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
      )}

      {/* Email Dialog */}
      <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Kirim Email ke Semua Peserta</DialogTitle>
            <DialogDescription>
              Email akan dikirim ke {attendees.length} peserta
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email-subject">Subjek</Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Masukkan subjek email"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-message">Pesan</Label>
              <Textarea
                id="email-message"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                placeholder="Tulis pesan Anda..."
                rows={5}
                className="rounded-xl resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEmailOpen(false)}
              className="rounded-xl"
            >
              Batal
            </Button>
            <Button
              onClick={handleSendEmail}
              className="gt-gradient-primary border-0 rounded-xl"
            >
              <Mail className="h-4 w-4 mr-2" />
              Kirim Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Success Dialog */}
      <CustomAlert
        open={showEmailSuccess}
        onOpenChange={setShowEmailSuccess}
        title="Email Terkirim"
        description={`Email berhasil dikirim ke ${attendees.length} peserta!`}
        variant="success"
      />
    </div>
  );
}
