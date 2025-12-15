import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Music, Utensils, Briefcase, Heart, Calendar, MapPin } from 'lucide-react';

const categories = [
  { icon: Music, label: 'Music', color: 'text-primary' },
  { icon: Utensils, label: 'Food & Drink', color: 'text-success' },
  { icon: Briefcase, label: 'Business', color: 'text-info' },
  { icon: Heart, label: 'Community', color: 'text-destructive' },
];

const trendingEvents = [
  {
    id: 1,
    title: 'Summer Music Festival 2024',
    date: 'July 15, 2024',
    location: 'Central Park, NY',
    image: 'https://placehold.co/600x400',
    price: 'From $49',
    slug: 'summer-music-festival-2024',
  },
  {
    id: 2,
    title: 'Tech Conference 2024',
    date: 'August 20, 2024',
    location: 'Convention Center, SF',
    image: 'https://placehold.co/600x400',
    price: 'From $199',
    slug: 'tech-conference-2024',
  },
  {
    id: 3,
    title: 'Food & Wine Expo',
    date: 'September 5, 2024',
    location: 'Downtown, LA',
    image: 'https://placehold.co/600x400',
    price: 'From $35',
    slug: 'food-wine-expo',
  },
  {
    id: 4,
    title: 'Art Gallery Opening',
    date: 'October 10, 2024',
    location: 'Museum District, Chicago',
    image: 'https://placehold.co/600x400',
    price: 'Free',
    slug: 'art-gallery-opening',
  },
];

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-1 text-white py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://c.animaapp.com/mj6oj6ie1RUCbo/img/ai_1.png"
            alt="event banner gradient"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white">
              Discover Amazing Events Near You
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-white/90 font-body">
              Find and book tickets to concerts, conferences, festivals, and more
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search for events..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-input bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Link to="/events">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground">
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-center mb-12 text-foreground">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.label} to="/events">
                  <Card className="transition-smooth hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-card border-border">
                    <CardContent className="flex flex-col items-center justify-center p-8">
                      <Icon className={`h-12 w-12 mb-4 ${category.color}`} strokeWidth={2} />
                      <h3 className="text-lg font-body font-medium text-center text-card-foreground">{category.label}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Events */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-foreground">Trending Events</h2>
            <Link to="/events">
              <Button variant="outline" className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.slug}`}>
                <Card className="overflow-hidden transition-smooth hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-card border-border">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-lg font-body font-medium mb-2 text-card-foreground">{event.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2" strokeWidth={2} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-2" strokeWidth={2} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-2 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-sans font-bold mb-6 text-white">
            Ready to Create Your Own Event?
          </h2>
          <p className="text-lg mb-8 text-white/90 font-body max-w-2xl mx-auto">
            Join thousands of organizers using GateTix to manage their events and sell tickets
          </p>
          <Link to="/admin/dashboard">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 hover:text-primary">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
