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
    title: "Total Revenue",
    value: "$38,400",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Tickets Sold",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: Ticket,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Total Attendees",
    value: "892",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Check-in Rate",
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
    customer: "Sarah Wilson",
    event: "Summer Festival",
    amount: "$147",
    status: "completed",
    time: "2 min ago",
  },
  {
    id: "ORD-002",
    customer: "Mike Johnson",
    event: "Tech Conference",
    amount: "$299",
    status: "completed",
    time: "15 min ago",
  },
  {
    id: "ORD-003",
    customer: "Emily Davis",
    event: "Food Expo",
    amount: "$75",
    status: "pending",
    time: "1 hour ago",
  },
  {
    id: "ORD-004",
    customer: "James Brown",
    event: "Summer Festival",
    amount: "$294",
    status: "completed",
    time: "2 hours ago",
  },
];

const upcomingEvents = [
  {
    name: "Summer Music Festival",
    date: "Jul 15",
    sold: 450,
    capacity: 1000,
    revenue: "$22,050",
  },
  {
    name: "Tech Conference 2024",
    date: "Aug 20",
    sold: 280,
    capacity: 500,
    revenue: "$55,720",
  },
  {
    name: "Food & Wine Expo",
    date: "Sep 5",
    sold: 180,
    capacity: 400,
    revenue: "$6,300",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening today.
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
                        vs last week
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
              <CardTitle>Recent Orders</CardTitle>
              <p className="text-sm text-muted-foreground">
                Latest ticket purchases
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
              <button className="text-sm text-primary font-medium hover:underline">
                View all orders →
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="gt-card-glow">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <p className="text-sm text-muted-foreground">Your next events</p>
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
                    <span className="text-muted-foreground">Tickets sold</span>
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
