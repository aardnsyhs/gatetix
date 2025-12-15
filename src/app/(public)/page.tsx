"use client";

import Link from "next/link";
import {
  Search,
  Music,
  Utensils,
  Briefcase,
  Heart,
  Calendar,
  MapPin,
  ArrowRight,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = [
  { icon: Music, label: "Music", color: "from-purple-500 to-pink-500" },
  {
    icon: Utensils,
    label: "Food & Drink",
    color: "from-orange-500 to-amber-500",
  },
  { icon: Briefcase, label: "Business", color: "from-blue-500 to-cyan-500" },
  { icon: Heart, label: "Community", color: "from-rose-500 to-red-500" },
];

const trendingEvents = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    date: "July 15, 2024",
    location: "Central Park, NY",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
    price: "From $49",
    slug: "summer-music-festival-2024",
    attendees: 450,
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    date: "August 20, 2024",
    location: "Convention Center, SF",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    price: "From $199",
    slug: "tech-conference-2024",
    attendees: 280,
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "September 5, 2024",
    location: "Downtown, LA",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    price: "From $35",
    slug: "food-wine-expo",
    attendees: 180,
  },
  {
    id: 4,
    title: "Art Gallery Opening",
    date: "October 10, 2024",
    location: "Museum District, Chicago",
    image:
      "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400&h=300&fit=crop",
    price: "Free",
    slug: "art-gallery-opening",
    attendees: 120,
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant Tickets",
    description: "Get your tickets delivered instantly to your email",
  },
  {
    icon: Users,
    title: "Easy Check-in",
    description: "Seamless QR code scanning for quick entry",
  },
  {
    icon: Star,
    title: "Best Events",
    description: "Curated selection of top events near you",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gt-gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920')] bg-cover bg-center opacity-20" />
        <div className="gt-container relative z-10 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="bg-white/10 backdrop-blur-sm text-white/90 mb-6 px-4 py-2"
            >
              <Star className="h-4 w-4 mr-2" />
              Trusted by 10,000+ event organizers
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Amazing<span className="block">Events Near You</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Find and book tickets to concerts, conferences, festivals, and
              more. Your next unforgettable experience is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for events, artists, venues..."
                  className="w-full pl-12 pr-4 py-6 rounded-2xl bg-white text-foreground placeholder:text-muted-foreground border-0 shadow-xl h-14"
                />
              </div>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-2xl shadow-xl h-14 px-8"
              >
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="gt-section">
        <div className="gt-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore events across different categories and find what interests
              you
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.label} href="/events" className="group">
                  <Card className="gt-card-glow hover:scale-[1.02] transition-all">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div
                        className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon
                          className="h-8 w-8 text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="font-semibold">{category.label}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Events */}
      <section className="gt-section bg-muted/30">
        <div className="gt-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Trending Events
              </h2>
              <p className="text-muted-foreground">
                Don&apos;t miss out on the hottest events
              </p>
            </div>
            <Link
              href="/events"
              className="text-primary font-medium hover:underline flex items-center gap-1"
            >
              View all events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.slug}`}>
                <Card className="gt-card-glow overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-white/20 backdrop-blur-sm text-white border-0"
                      >
                        {event.attendees} attending
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-border">
                      <span className="font-bold text-primary">
                        {event.price}
                      </span>
                      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        Get tickets →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="gt-section">
        <div className="gt-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl gt-gradient-primary flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gt-section">
        <div className="gt-container">
          <div className="gt-gradient-hero rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920')] bg-cover bg-center opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Create Your Own Event?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of organizers using GateTix to manage their
                events and sell tickets effortlessly.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-2xl shadow-xl h-14 px-8"
              >
                <Link href="/admin/dashboard">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
