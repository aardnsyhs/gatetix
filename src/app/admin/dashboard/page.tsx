"use client";

import {
  DollarSign,
  Ticket,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Pendapatan",
    value: "Rp 576.000.000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Tiket Terjual",
    value: "1.234",
    change: "+8.2%",
    trend: "up",
    icon: Ticket,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Total Peserta",
    value: "892",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Tingkat Check-in",
    value: "72%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    color: "from-orange-500 to-amber-500",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Budi Santoso",
    event: "Jakarta Music Festival",
    amount: "Rp 450.000",
    status: "completed",
    time: "2 menit lalu",
  },
  {
    id: "ORD-002",
    customer: "Siti Rahayu",
    event: "Tech Summit",
    amount: "Rp 1.000.000",
    status: "completed",
    time: "15 menit lalu",
  },
  {
    id: "ORD-003",
    customer: "Ahmad Wijaya",
    event: "Festival Kuliner",
    amount: "Rp 150.000",
    status: "pending",
    time: "1 jam lalu",
  },
  {
    id: "ORD-004",
    customer: "Dewi Lestari",
    event: "Jakarta Music Festival",
    amount: "Rp 900.000",
    status: "completed",
    time: "2 jam lalu",
  },
];

const upcomingEvents = [
  {
    name: "Jakarta Music Festival",
    date: "15 Jul",
    sold: 450,
    capacity: 1000,
    revenue: "Rp 67.500.000",
  },
  {
    name: "Indonesia Tech Summit",
    date: "20 Ags",
    sold: 280,
    capacity: 500,
    revenue: "Rp 140.000.000",
  },
  {
    name: "Festival Kuliner Nusantara",
    date: "5 Sep",
    sold: 180,
    capacity: 400,
    revenue: "Rp 13.500.000",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Selamat datang! Berikut ringkasan hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="gt-card-glow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <div
                      className={`flex items-center gap-1 mt-2 text-sm ${
                        stat.trend === "up"
                          ? "text-emerald-500"
                          : "text-destructive"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span className="font-medium">{stat.change}</span>
                      <span className="text-muted-foreground">
                        vs minggu lalu
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 gt-card-glow">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pesanan Terbaru</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pembelian tiket terbaru
              </p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/30 transition-smooth"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full gt-gradient-primary flex items-center justify-center text-white text-xs font-medium">
                      {order.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.event}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.amount}</p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          order.status === "completed" ? "default" : "secondary"
                        }
                        className={
                          order.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-amber-500/10 text-amber-500"
                        }
                      >
                        {order.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {order.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <button
                type="button"
                className="text-sm text-primary font-medium hover:underline"
              >
                Lihat semua pesanan →
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="gt-card-glow">
          <CardHeader>
            <CardTitle>Event Mendatang</CardTitle>
            <p className="text-sm text-muted-foreground">
              Event yang akan datang
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {event.revenue}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tiket terjual</span>
                    <span className="font-medium">
                      {event.sold} / {event.capacity}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gt-gradient-primary rounded-full transition-all"
                      style={{
                        width: `${(event.sold / event.capacity) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
