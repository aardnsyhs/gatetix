"use client";

import { useState } from "react";
import {
  ScanLine,
  CheckCircle,
  XCircle,
  Keyboard,
  Camera,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const recentCheckIns = [
  {
    id: 1,
    name: "John Doe",
    ticketType: "VIP",
    time: "6:15 PM",
    status: "success",
    ticketId: "TKT-001",
  },
  {
    id: 2,
    name: "Jane Smith",
    ticketType: "General",
    time: "6:18 PM",
    status: "success",
    ticketId: "TKT-002",
  },
  {
    id: 3,
    name: "Invalid Ticket",
    ticketType: "—",
    time: "6:20 PM",
    status: "failed",
    ticketId: "TKT-XXX",
  },
  {
    id: 4,
    name: "Bob Wilson",
    ticketType: "General",
    time: "6:22 PM",
    status: "success",
    ticketId: "TKT-003",
  },
];

export default function CheckInConsole() {
  const [ticketCode, setTicketCode] = useState("");
  const [scanResult, setScanResult] = useState<null | {
    success: boolean;
    name: string;
    ticketType: string;
  }>(null);

  const handleScan = () => {
    if (ticketCode.trim()) {
      const isValid = ticketCode.startsWith("TKT-");
      setScanResult(
        isValid
          ? { success: true, name: "John Doe", ticketType: "VIP Pass" }
          : { success: false, name: "", ticketType: "" }
      );
      setTimeout(() => setScanResult(null), 3000);
      setTicketCode("");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Check-in Console</h1>
          <p className="text-muted-foreground mt-1">
            Scan tickets or enter codes manually
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Volume2 className="h-5 w-5" />
          </Button>
          <Select defaultValue="summer">
            <SelectTrigger className="w-48 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summer">Summer Music Festival</SelectItem>
              <SelectItem value="tech">Tech Conference 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gt-card-glow overflow-hidden">
          <Tabs defaultValue="camera">
            <CardHeader className="border-b border-border pb-4">
              <TabsList className="bg-muted/50 p-1 rounded-xl">
                <TabsTrigger
                  value="camera"
                  className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </TabsTrigger>
                <TabsTrigger
                  value="manual"
                  className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
                >
                  <Keyboard className="h-4 w-4 mr-2" />
                  Manual
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="p-6">
              <TabsContent value="camera" className="mt-0">
                <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-8 border-2 border-dashed border-white/30 rounded-xl" />
                  <div className="text-center text-white/70">
                    <ScanLine
                      className="h-16 w-16 mx-auto mb-3 animate-pulse"
                      strokeWidth={1.5}
                    />
                    <p className="font-medium">Point camera at QR code</p>
                    <p className="text-sm mt-1 text-white/50">
                      Position the code within the frame
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manual" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label>Ticket Code</Label>
                  <Input
                    placeholder="Enter ticket code (e.g., TKT-001)"
                    value={ticketCode}
                    onChange={(e) =>
                      setTicketCode(e.target.value.toUpperCase())
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleScan()}
                    className="font-mono text-lg tracking-wider rounded-xl h-12"
                    autoFocus
                  />
                </div>
                <Button
                  onClick={handleScan}
                  className="w-full gt-gradient-primary border-0 hover:opacity-90 rounded-xl h-12"
                >
                  <ScanLine className="h-5 w-5 mr-2" />
                  Validate Ticket
                </Button>
              </TabsContent>

              {scanResult && (
                <div
                  className={`mt-6 p-6 rounded-2xl animate-scale-in ${
                    scanResult.success
                      ? "bg-emerald-500/10 border-2 border-emerald-500"
                      : "bg-destructive/10 border-2 border-destructive"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {scanResult.success ? (
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                        <XCircle className="h-8 w-8 text-destructive" />
                      </div>
                    )}
                    <div>
                      <p
                        className={`text-lg font-semibold ${
                          scanResult.success
                            ? "text-emerald-500"
                            : "text-destructive"
                        }`}
                      >
                        {scanResult.success ? "Valid Ticket" : "Invalid Ticket"}
                      </p>
                      {scanResult.success && (
                        <>
                          <p className="text-foreground font-medium">
                            {scanResult.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {scanResult.ticketType}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Tabs>
        </Card>

        <Card className="gt-card-glow">
          <CardHeader>
            <CardTitle>Recent Check-ins</CardTitle>
            <p className="text-sm text-muted-foreground">Last 10 scans</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentCheckIns.map((checkIn) => (
                <div
                  key={checkIn.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/30 transition-smooth"
                >
                  <div className="flex items-center gap-3">
                    {checkIn.status === "success" ? (
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                        <XCircle className="h-5 w-5 text-destructive" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{checkIn.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {checkIn.ticketId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        checkIn.ticketType === "VIP" ? "default" : "secondary"
                      }
                      className={
                        checkIn.ticketType === "VIP"
                          ? "bg-primary/10 text-primary"
                          : ""
                      }
                    >
                      {checkIn.ticketType}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {checkIn.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
