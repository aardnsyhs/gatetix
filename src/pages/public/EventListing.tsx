import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Filter } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Summer Music Festival 2024',
    date: 'July 15, 2024',
    location: 'Central Park, NY',
    category: 'Music',
    image: 'https://placehold.co/600x400',
    price: 'From $49',
    slug: 'summer-music-festival-2024',
  },
  {
    id: 2,
    title: 'Tech Conference 2024',
    date: 'August 20, 2024',
    location: 'Convention Center, SF',
    category: 'Business',
    image: 'https://placehold.co/600x400',
    price: 'From $199',
    slug: 'tech-conference-2024',
  },
  {
    id: 3,
    title: 'Food & Wine Expo',
    date: 'September 5, 2024',
    location: 'Downtown, LA',
    category: 'Food & Drink',
    image: 'https://placehold.co/600x400',
    price: 'From $35',
    slug: 'food-wine-expo',
  },
  {
    id: 4,
    title: 'Art Gallery Opening',
    date: 'October 10, 2024',
    location: 'Museum District, Chicago',
    category: 'Community',
    image: 'https://placehold.co/600x400',
    price: 'Free',
    slug: 'art-gallery-opening',
  },
  {
    id: 5,
    title: 'Jazz Night Live',
    date: 'November 12, 2024',
    location: 'Blue Note, NYC',
    category: 'Music',
    image: 'https://placehold.co/600x400',
    price: 'From $65',
    slug: 'jazz-night-live',
  },
  {
    id: 6,
    title: 'Startup Pitch Competition',
    date: 'December 1, 2024',
    location: 'Tech Hub, Austin',
    category: 'Business',
    image: 'https://placehold.co/600x400',
    price: 'From $25',
    slug: 'startup-pitch-competition',
  },
];

export default function EventListing() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-sans font-bold mb-4 text-foreground">Browse Events</h1>
          <p className="text-lg text-muted-foreground font-body">Discover amazing events happening near you</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-card border border-border rounded-lg">
          <div className="flex-1">
            <label className="block text-sm font-body font-medium mb-2 text-foreground">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full bg-background text-foreground border-input">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="all" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">All Categories</SelectItem>
                <SelectItem value="Music" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">Music</SelectItem>
                <SelectItem value="Business" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">Business</SelectItem>
                <SelectItem value="Food & Drink" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">Food & Drink</SelectItem>
                <SelectItem value="Community" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">Community</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-body font-medium mb-2 text-foreground">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full bg-background text-foreground border-input">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="date" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">Date</SelectItem>
                <SelectItem value="price" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">Price</SelectItem>
                <SelectItem value="popularity" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground font-body">
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </p>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((event) => (
            <Link key={event.id} to={`/events/${event.slug}`}>
              <Card className="overflow-hidden transition-smooth hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-card border-border h-full">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-body rounded-full bg-primary/10 text-primary">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-body font-medium mb-3 text-card-foreground">{event.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" strokeWidth={2} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-2" strokeWidth={2} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-lg font-body font-medium text-primary">{event.price}</span>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button variant="outline" disabled className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
            Previous
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">1</Button>
          <Button variant="outline" className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">2</Button>
          <Button variant="outline" className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">3</Button>
          <Button variant="outline" className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
