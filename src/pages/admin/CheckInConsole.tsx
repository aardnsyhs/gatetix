import { useState } from "react";
import {
  ScanLine,
  CheckCircle,
  XCircle,
  Keyboard,
  Camera,
  Volume2,
} from "lucide-react";

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
  const [mode, setMode] = useState<"camera" | "manual">("camera");

  const handleScan = () => {
    if (ticketCode.trim()) {
      // Simulate scan result
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Check-in Console</h1>
          <p className="text-muted-foreground mt-1">
            Scan tickets or enter codes manually
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="gt-icon-btn">
            <Volume2 className="h-5 w-5" />
          </button>
          <select className="gt-input py-2 w-48">
            <option>Summer Music Festival</option>
            <option>Tech Conference 2024</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <div className="gt-card-flat overflow-hidden">
          {/* Mode Toggle */}
          <div className="p-4 border-b border-border">
            <div className="gt-tabs inline-flex">
              <button
                className={`gt-tab ${mode === "camera" ? "active" : ""}`}
                onClick={() => setMode("camera")}
              >
                <Camera className="h-4 w-4 mr-2 inline" />
                Camera
              </button>
              <button
                className={`gt-tab ${mode === "manual" ? "active" : ""}`}
                onClick={() => setMode("manual")}
              >
                <Keyboard className="h-4 w-4 mr-2 inline" />
                Manual
              </button>
            </div>
          </div>

          <div className="p-6">
            {mode === "camera" ? (
              /* Camera Scanner */
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
            ) : (
              /* Manual Entry */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ticket Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ticket code (e.g., TKT-001)"
                    value={ticketCode}
                    onChange={(e) =>
                      setTicketCode(e.target.value.toUpperCase())
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleScan()}
                    className="gt-input font-mono text-lg tracking-wider"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleScan}
                  className="gt-btn-primary w-full py-3"
                >
                  <ScanLine className="h-5 w-5 mr-2" />
                  Validate Ticket
                </button>
              </div>
            )}

            {/* Scan Result */}
            {scanResult && (
              <div
                className={`mt-6 p-6 rounded-2xl animate-scale-in ${
                  scanResult.success
                    ? "bg-success/10 border-2 border-success"
                    : "bg-destructive/10 border-2 border-destructive"
                }`}
              >
                <div className="flex items-center gap-4">
                  {scanResult.success ? (
                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                      <XCircle className="h-8 w-8 text-destructive" />
                    </div>
                  )}
                  <div>
                    <p
                      className={`text-lg font-semibold ${
                        scanResult.success ? "text-success" : "text-destructive"
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
          </div>
        </div>

        {/* Recent Check-ins */}
        <div className="gt-card-flat">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold">Recent Check-ins</h2>
            <p className="text-sm text-muted-foreground">Last 10 scans</p>
          </div>
          <div className="divide-y divide-border">
            {recentCheckIns.map((checkIn) => (
              <div
                key={checkIn.id}
                className="p-4 flex items-center justify-between hover:bg-muted/30 transition-smooth"
              >
                <div className="flex items-center gap-3">
                  {checkIn.status === "success" ? (
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-success" />
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
                  <span
                    className={`gt-badge ${
                      checkIn.ticketType === "VIP"
                        ? "gt-badge-primary"
                        : "gt-badge-muted"
                    }`}
                  >
                    {checkIn.ticketType}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {checkIn.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
