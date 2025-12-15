import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScanLine, CheckCircle, XCircle, Search } from "lucide-react";

const recentCheckIns = [
  {
    id: 1,
    name: "John Doe",
    ticketType: "VIP",
    time: "6:15 PM",
    status: "success",
  },
  {
    id: 2,
    name: "Jane Smith",
    ticketType: "General",
    time: "6:18 PM",
    status: "success",
  },
  {
    id: 3,
    name: "Invalid Ticket",
    ticketType: "-",
    time: "6:20 PM",
    status: "failed",
  },
];

export default function CheckInConsole() {
  const [ticketCode, setTicketCode] = useState("");
  const [scanResult, setScanResult] = useState<null | {
    success: boolean;
    message: string;
  }>(null);

  const handleScan = () => {
    if (ticketCode.trim()) {
      setScanResult({
        success: true,
        message: `Ticket ${ticketCode} validated successfully!`,
      });
      setTicketCode("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sans font-bold text-foreground">
          Check-in Console
        </h1>
        <p className="text-muted-foreground font-body">
          Scan tickets or enter codes manually
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-card-foreground">
              <ScanLine className="mr-2 h-5 w-5" strokeWidth={2} />
              Ticket Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter ticket code..."
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value)}
                className="bg-background text-foreground border-input"
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
              />
              <Button
                onClick={handleScan}
                className="bg-primary text-primary-foreground hover:bg-secondary"
              >
                <Search className="h-4 w-4" strokeWidth={2} />
              </Button>
            </div>

            {scanResult && (
              <div
                className={`p-4 rounded-lg ${
                  scanResult.success
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                <div className="flex items-center">
                  {scanResult.success ? (
                    <CheckCircle className="mr-2 h-5 w-5" />
                  ) : (
                    <XCircle className="mr-2 h-5 w-5" />
                  )}
                  <span className="font-body">{scanResult.message}</span>
                </div>
              </div>
            )}

            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <ScanLine className="h-16 w-16 mx-auto mb-2" strokeWidth={1} />
                <p className="font-body">Camera scanner area</p>
                <p className="text-sm">Point camera at QR code</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Check-ins */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Recent Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCheckIns.map((checkIn) => (
                <div
                  key={checkIn.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted"
                >
                  <div className="flex items-center gap-3">
                    {checkIn.status === "success" ? (
                      <CheckCircle
                        className="h-5 w-5 text-success"
                        strokeWidth={2}
                      />
                    ) : (
                      <XCircle
                        className="h-5 w-5 text-destructive"
                        strokeWidth={2}
                      />
                    )}
                    <div>
                      <p className="font-body font-medium text-foreground">
                        {checkIn.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {checkIn.time}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      checkIn.status === "success" ? "default" : "destructive"
                    }
                  >
                    {checkIn.ticketType}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
