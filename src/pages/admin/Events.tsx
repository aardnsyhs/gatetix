import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Calendar, MapPin, MoreVertical } from "lucide-react";
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
    location: "Central Park, NY",
    status: "published",
    ticketsSold: 450,
    capacity: 1000,
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    date: "August 20, 2024",
    location: "Convention Center, SF",
    status: "draft",
    ticketsSold: 0,
    capacity: 500,
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "September 5, 2024",
    location: "Downtown, LA",
    status: "published",
    ticketsSold: 280,
    capacity: 400,
  },
];

export default function AdminEvents() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-sans font-bold text-foreground">
            Events
          </h1>
          <p className="text-muted-foreground font-body">
            Manage your events and ticket sales
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
          <Plus className="mr-2 h-4 w-4" strokeWidth={2} />
          Create Event
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
          strokeWidth={2}
        />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background text-foreground border-input"
        />
      </div>

      <div className="grid gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Link to={`/admin/events/${event.id}`}>
                      <h3 className="text-lg font-body font-medium text-card-foreground hover:text-primary transition-smooth">
                        {event.title}
                      </h3>
                    </Link>
                    <Badge
                      variant={
                        event.status === "published" ? "default" : "secondary"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" strokeWidth={2} />
                      {event.date}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" strokeWidth={2} />
                      {event.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground font-body">
                      Tickets Sold
                    </p>
                    <p className="text-lg font-body font-medium text-card-foreground">
                      {event.ticketsSold} / {event.capacity}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-transparent text-foreground hover:bg-accent"
                      >
                        <MoreVertical className="h-4 w-4" strokeWidth={2} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-popover text-popover-foreground"
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
