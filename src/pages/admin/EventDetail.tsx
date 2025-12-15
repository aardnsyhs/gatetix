import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Ticket,
  DollarSign,
  Edit,
} from "lucide-react";

export default function AdminEventDetail() {
  const { eventId } = useParams();

  const event = {
    id: eventId,
    title: "Summer Music Festival 2024",
    date: "July 15, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "Central Park, NY",
    status: "published",
    description:
      "Join us for an unforgettable evening of live music featuring top artists from around the world.",
    ticketsSold: 450,
    capacity: 1000,
    revenue: 22050,
    ticketTypes: [
      { name: "General Admission", price: 49, sold: 350, available: 500 },
      { name: "VIP", price: 149, sold: 80, available: 100 },
      { name: "Early Bird", price: 39, sold: 20, available: 0 },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/events">
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent text-foreground hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2} />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-sans font-bold text-foreground">
              {event.title}
            </h1>
            <Badge
              variant={event.status === "published" ? "default" : "secondary"}
            >
              {event.status}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" strokeWidth={2} />
              {event.date} • {event.time}
            </span>
            <span className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" strokeWidth={2} />
              {event.location}
            </span>
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
          <Edit className="mr-2 h-4 w-4" strokeWidth={2} />
          Edit Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Ticket className="h-8 w-8 text-primary" strokeWidth={2} />
              <div>
                <p className="text-sm text-muted-foreground font-body">
                  Tickets Sold
                </p>
                <p className="text-2xl font-sans font-bold text-card-foreground">
                  {event.ticketsSold} / {event.capacity}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-success" strokeWidth={2} />
              <div>
                <p className="text-sm text-muted-foreground font-body">
                  Total Revenue
                </p>
                <p className="text-2xl font-sans font-bold text-card-foreground">
                  ${event.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-info" strokeWidth={2} />
              <div>
                <p className="text-sm text-muted-foreground font-body">
                  Check-in Rate
                </p>
                <p className="text-2xl font-sans font-bold text-card-foreground">
                  0%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="bg-muted">
          <TabsTrigger value="tickets">Ticket Types</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
        </TabsList>
        <TabsContent value="tickets" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Ticket Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.ticketTypes.map((ticket, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted"
                  >
                    <div>
                      <p className="font-body font-medium text-foreground">
                        {ticket.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${ticket.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-body font-medium text-foreground">
                        {ticket.sold} sold
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {ticket.available} available
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-body">
                {event.description}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attendees" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Attendees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-body">
                No attendees yet.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
