import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Ticket, Users, TrendingUp, Activity } from "lucide-react";

const salesData = [
  { date: "Mon", sales: 4200 },
  { date: "Tue", sales: 3800 },
  { date: "Wed", sales: 5100 },
  { date: "Thu", sales: 4600 },
  { date: "Fri", sales: 6200 },
  { date: "Sat", sales: 7800 },
  { date: "Sun", sales: 6500 },
];

const recentActivity = [
  {
    id: 1,
    type: "check-in",
    description: "John Doe checked in at Gate A",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "order",
    description: "New order #1234 - 3 tickets",
    time: "5 minutes ago",
  },
  {
    id: 3,
    type: "check-in",
    description: "Jane Smith checked in at Gate B",
    time: "8 minutes ago",
  },
  {
    id: 4,
    type: "order",
    description: "New order #1235 - 1 ticket",
    time: "12 minutes ago",
  },
];

const stats = [
  {
    title: "Total Revenue",
    value: "$38,400",
    icon: DollarSign,
    change: "+12.5%",
  },
  { title: "Tickets Sold", value: "1,234", icon: Ticket, change: "+8.2%" },
  { title: "Total Attendees", value: "892", icon: Users, change: "+15.3%" },
  { title: "Check-in Rate", value: "72%", icon: TrendingUp, change: "+5.1%" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sans font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground font-body">
          Welcome back! Here's what's happening with your events.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-body text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-sans font-bold text-card-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-success font-body">
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Weekly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Activity className="h-12 w-12 mx-auto mb-2" strokeWidth={2} />
                <p className="font-body">Sales chart visualization</p>
                <p className="text-sm">
                  Install recharts for full chart support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 mt-2 rounded-full ${
                      activity.type === "check-in" ? "bg-success" : "bg-primary"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-card-foreground font-body">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
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
