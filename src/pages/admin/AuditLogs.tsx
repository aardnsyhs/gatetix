import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter } from "lucide-react";

const auditLogs = [
  {
    id: 1,
    action: "Event Created",
    user: "John Admin",
    target: "Summer Music Festival",
    timestamp: "2024-07-10 14:30:00",
    type: "create",
  },
  {
    id: 2,
    action: "Order Refunded",
    user: "Jane Manager",
    target: "Order #1234",
    timestamp: "2024-07-10 13:15:00",
    type: "update",
  },
  {
    id: 3,
    action: "User Invited",
    user: "John Admin",
    target: "bob@example.com",
    timestamp: "2024-07-10 11:00:00",
    type: "create",
  },
  {
    id: 4,
    action: "Promo Code Deleted",
    user: "Jane Manager",
    target: "OLDCODE",
    timestamp: "2024-07-09 16:45:00",
    type: "delete",
  },
  {
    id: 5,
    action: "Settings Updated",
    user: "John Admin",
    target: "Payment Settings",
    timestamp: "2024-07-09 10:30:00",
    type: "update",
  },
];

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "create":
        return "default";
      case "update":
        return "secondary";
      case "delete":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-sans font-bold text-foreground">
            Audit Logs
          </h1>
          <p className="text-muted-foreground font-body">
            Track all system activities
          </p>
        </div>
        <Button
          variant="outline"
          className="bg-background text-foreground border-border hover:bg-accent"
        >
          <Download className="mr-2 h-4 w-4" strokeWidth={2} />
          Export Logs
        </Button>
      </div>

      <div className="flex gap-2 max-w-md">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
            strokeWidth={2}
          />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background text-foreground border-input"
          />
        </div>
        <Button
          variant="outline"
          className="bg-background text-foreground border-border hover:bg-accent"
        >
          <Filter className="h-4 w-4" strokeWidth={2} />
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-body font-medium text-foreground">
                        {log.action}
                      </span>
                      <Badge variant={getTypeVariant(log.type)}>
                        {log.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      by <span className="text-foreground">{log.user}</span> on{" "}
                      <span className="text-foreground">{log.target}</span>
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {log.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
