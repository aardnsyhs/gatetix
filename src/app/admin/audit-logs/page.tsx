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

const auditLogs = [
  {
    id: 1,
    action: "Event Created",
    user: "John Admin",
    target: "Summer Music Festival",
    timestamp: "2024-07-10 14:30:00",
    type: "create",
    icon: Plus,
  },
  {
    id: 2,
    action: "Order Refunded",
    user: "Jane Manager",
    target: "Order #1234",
    timestamp: "2024-07-10 13:15:00",
    type: "update",
    icon: Edit,
  },
  {
    id: 3,
    action: "User Invited",
    user: "John Admin",
    target: "bob@example.com",
    timestamp: "2024-07-10 11:00:00",
    type: "create",
    icon: User,
  },
  {
    id: 4,
    action: "Promo Code Deleted",
    user: "Jane Manager",
    target: "OLDCODE",
    timestamp: "2024-07-09 16:45:00",
    type: "delete",
    icon: Trash2,
  },
  {
    id: 5,
    action: "Settings Updated",
    user: "John Admin",
    target: "Payment Settings",
    timestamp: "2024-07-09 10:30:00",
    type: "update",
    icon: Settings,
  },
  {
    id: 6,
    action: "Event Published",
    user: "Jane Manager",
    target: "Tech Conference",
    timestamp: "2024-07-08 09:00:00",
    type: "update",
    icon: Calendar,
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
          <h1 className="text-2xl sm:text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">
            Track all system activities
          </p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 max-w-md rounded-xl"
        />
        <Button variant="ghost" className="rounded-xl">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <Card className="gt-card-glow">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredLogs.map((log) => {
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

          <div className="p-4 border-t border-border text-center">
            <button
              type="button"
              className="text-sm text-primary font-medium hover:underline"
            >
              Load more logs
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
