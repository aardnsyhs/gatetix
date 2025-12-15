"use client";

import { useState } from "react";
import { Download, Eye, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    event: "Summer Music Festival",
    tickets: 2,
    amount: 147,
    status: "completed",
    date: "2024-07-10",
    time: "14:30",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    event: "Tech Conference",
    tickets: 1,
    amount: 199,
    status: "completed",
    date: "2024-07-09",
    time: "09:15",
  },
  {
    id: "ORD-003",
    customer: "Bob Wilson",
    email: "bob@example.com",
    event: "Food & Wine Expo",
    tickets: 3,
    amount: 105,
    status: "pending",
    date: "2024-07-08",
    time: "16:45",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    event: "Summer Music Festival",
    tickets: 4,
    amount: 588,
    status: "refunded",
    date: "2024-07-07",
    time: "11:20",
  },
  {
    id: "ORD-005",
    customer: "Charlie Davis",
    email: "charlie@example.com",
    event: "Tech Conference",
    tickets: 2,
    amount: 398,
    status: "completed",
    date: "2024-07-06",
    time: "13:00",
  },
];

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500";
      case "pending":
        return "bg-amber-500/10 text-amber-500";
      case "refunded":
        return "bg-red-500/10 text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all ticket orders
          </p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 max-w-md rounded-xl"
        />
        <Button variant="ghost" className="rounded-xl">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <Card className="gt-card-glow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Tickets</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="group">
                <TableCell>
                  <span className="font-mono text-sm font-medium">
                    {order.id}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gt-gradient-primary flex items-center justify-center text-white text-xs font-medium">
                      {order.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{order.event}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {order.tickets} tickets
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">${order.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusStyle(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{order.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.time}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1-5</span> of{" "}
            <span className="font-medium">24</span> orders
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
            <Button variant="ghost" size="icon" className="rounded-xl">
              2
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl">
              3
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
