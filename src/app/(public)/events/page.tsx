"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  SlidersHorizontal,
  Search,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Jakarta Music Festival 2024",
    date: "15 Juli 2024",
    location: "Gelora Bung Karno, Jakarta",
    category: "Musik",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
    price: "Mulai Rp 150.000",
    slug: "jakarta-music-festival-2024",
    attendees: 450,
  },
  {
    id: 2,
    title: "Indonesia Tech Summit 2024",
    date: "20 Agustus 2024",
    location: "ICE BSD, Tangerang",
    category: "Bisnis",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    price: "Mulai Rp 500.000",
    slug: "indonesia-tech-summit-2024",
    attendees: 280,
  },
  {
    id: 3,
    title: "Festival Kuliner Nusantara",
    date: "5 September 2024",
    location: "Senayan Park, Jakarta",
    category: "Kuliner",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    price: "Mulai Rp 75.000",
    slug: "festival-kuliner-nusantara",
    attendees: 180,
  },
  {
    id: 4,
    title: "Pameran Seni Rupa Indonesia",
    date: "10 Oktober 2024",
    location: "Museum MACAN, Jakarta",
    category: "Komunitas",
    image:
      "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400&h=300&fit=crop",
    price: "Gratis",
    slug: "pameran-seni-rupa-indonesia",
    attendees: 120,
  },
  {
    id: 5,
    title: "Jazz Gunung Bromo 2024",
    date: "12 November 2024",
    location: "Gunung Bromo, Jawa Timur",
    category: "Musik",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop",
    price: "Mulai Rp 250.000",
    slug: "jazz-gunung-bromo-2024",
    attendees: 95,
  },
  {
    id: 6,
    title: "Startup Weekend Jakarta",
    date: "1 Desember 2024",
    location: "Block71, Jakarta",
    category: "Bisnis",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    price: "Mulai Rp 100.000",
    slug: "startup-weekend-jakarta",
    attendees: 200,
  },
];

const categories = ["Semua", "Musik", "Bisnis", "Kuliner", "Komunitas"];

export default function EventListing() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "Semua" || event.category === selectedCategory;
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="gt-gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Jelajahi Event</h1>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Temukan event-event seru yang sedang berlangsung
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
            <Input
              type="text"
              placeholder="Cari event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-2xl border-0 shadow-xl bg-white text-foreground placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category
                    ? "gt-gradient-primary border-0"
                    : ""
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="rounded-xl">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Menampilkan{" "}
          <span className="font-semibold text-foreground">
            {filteredEvents.length}
          </span>{" "}
          event
        </p>

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`}>
              <Card className="gt-card-glow overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {event.category}
                  </Badge>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/90 text-sm">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-dashed">
                    <span className="font-bold text-primary text-lg">
                      {event.price}
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      Beli tiket →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="icon" disabled className="rounded-xl">
            ←
          </Button>
          <Button size="sm" className="gt-gradient-primary border-0 rounded-xl">
            1
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            2
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            3
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl">
            →
          </Button>
        </div>
      </div>
    </div>
  );
}
