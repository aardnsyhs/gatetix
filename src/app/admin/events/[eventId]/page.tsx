"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EventDetailAdmin({
  params,
}: {
  params: { eventId: string };
}) {
  const event = {
    id: params.eventId,
    title: "Summer Music Festival 2024",
    date: "July 15, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "Central Park, New York, NY",
    status: "published",
    ticketsSold: 450,
    capacity: 1000,
    revenue: "$22,050",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=600&fit=crop",
    description:
      "Join us for an unforgettable evening of live music featuring top artists from around the world.",
    tickets: [
      { name: "General Admission", price: 49, sold: 350, capacity: 800 },
      { name: "VIP Pass", price: 149, sold: 80, capacity: 150 },
      { name: "Premium Package", price: 299, sold: 20, capacity: 50 },
    ],
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className="rounded-xl">
            <Link href="/admin/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{event.title}</h1>
              <Badge
                className={
                  event.status === "published"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : ""
                }
              >
                {event.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              {event.date} • {event.time}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            className="rounded-xl text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tickets Sold</p>
                <p className="text-2xl font-bold">{event.ticketsSold}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">{event.revenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="text-2xl font-bold">{event.capacity}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gt-card-glow">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fill Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round((event.ticketsSold / event.capacity) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger
            value="overview"
            className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="tickets"
            className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
          >
            Tickets
          </TabsTrigger>
          <TabsTrigger
            value="attendees"
            className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
          >
            Attendees
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 gt-card-glow">
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">{event.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gt-card-glow">
              <CardHeader>
                <CardTitle>Sales Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-primary">
                    {Math.round((event.ticketsSold / event.capacity) * 100)}%
                  </p>
                  <p className="text-muted-foreground">of tickets sold</p>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gt-gradient-primary rounded-full"
                    style={{
                      width: `${(event.ticketsSold / event.capacity) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {event.ticketsSold} sold
                  </span>
                  <span className="text-muted-foreground">
                    {event.capacity - event.ticketsSold} remaining
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets">
          <Card className="gt-card-glow">
            <CardHeader>
              <CardTitle>Ticket Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted/30 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{ticket.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${ticket.price} per ticket
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {ticket.sold} / {ticket.capacity}
                    </p>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full gt-gradient-primary rounded-full"
                        style={{
                          width: `${(ticket.sold / ticket.capacity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendees">
          <Card className="gt-card-glow">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Attendee List</h3>
              <p className="text-muted-foreground mb-4">
                View and manage all attendees for this event
              </p>
              <Button
                asChild
                className="gt-gradient-primary border-0 hover:opacity-90 rounded-xl"
              >
                <Link href="/admin/attendees">View All Attendees</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
