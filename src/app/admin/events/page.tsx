"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Calendar,
  MapPin,
  MoreVertical,
  Users,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const events = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    date: "July 15, 2024",
    time: "6:00 PM",
    location: "Central Park, NY",
    status: "published",
    ticketsSold: 450,
    capacity: 1000,
    revenue: "$22,050",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    date: "August 20, 2024",
    time: "9:00 AM",
    location: "Convention Center, SF",
    status: "draft",
    ticketsSold: 0,
    capacity: 500,
    revenue: "$0",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "September 5, 2024",
    time: "12:00 PM",
    location: "Downtown, LA",
    status: "published",
    ticketsSold: 280,
    capacity: 400,
    revenue: "$9,800",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop",
  },
];

export default function AdminEvents() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage your events and ticket sales
          </p>
        </div>
        <Button className="gt-gradient-primary border-0 hover:opacity-90 rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 max-w-md rounded-xl"
        />
        <Tabs defaultValue="all">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="all"
              className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="published"
              className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
            >
              Published
            </TabsTrigger>
            <TabsTrigger
              value="draft"
              className="rounded-lg data-[state=active]:gt-gradient-primary data-[state=active]:text-white"
            >
              Draft
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="gt-card-glow overflow-hidden group">
            {/* Event Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 right-3">
                <Badge
                  variant={
                    event.status === "published" ? "default" : "secondary"
                  }
                  className={
                    event.status === "published"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : ""
                  }
                >
                  {event.status}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold text-lg line-clamp-1">
                  {event.title}
                </h3>
              </div>
            </div>

            {/* Event Details */}
            <CardContent className="p-5">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between py-3 border-t border-dashed border-border">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-semibold">{event.ticketsSold}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      / {event.capacity}
                    </span>
                  </span>
                </div>
                <span className="font-semibold text-primary">
                  {event.revenue}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                <div
                  className="h-full gt-gradient-primary rounded-full"
                  style={{
                    width: `${(event.ticketsSold / event.capacity) * 100}%`,
                  }}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <Button
                  asChild
                  className="flex-1 gt-gradient-primary border-0 hover:opacity-90 rounded-xl text-sm"
                >
                  <Link href={`/admin/events/${event.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem className="rounded-lg cursor-pointer">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
