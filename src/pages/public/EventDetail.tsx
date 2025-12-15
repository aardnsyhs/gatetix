import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Users, Share2, Heart, Minus, Plus } from 'lucide-react';

export default function EventDetail() {
  const { slug } = useParams();
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const event = {
    title: 'Summer Music Festival 2024',
    date: 'July 15, 2024',
    time: '6:00 PM - 11:00 PM',
    location: 'Central Park, New York, NY',
    image: 'https://c.animaapp.com/mj6oj6ie1RUCbo/img/ai_1.png',
    description: 'Join us for an unforgettable evening of live music featuring top artists from around the world. Experience multiple stages, food vendors, and an electric atmosphere.',
    tickets: [
      { id: 1, name: 'General Admission', price: 49, available: 150 },
      { id: 2, name: 'VIP Pass', price: 149, available: 50 },
      { id: 3, name: 'Premium Package', price: 299, available: 20 },
    ],
    lineup: ['Artist One', 'Artist Two', 'Artist Three', 'Artist Four'],
    venue: {
      name: 'Central Park Main Stage',
      address: '123 Park Avenue, New York, NY 10001',
      capacity: 5000,
    },
  };

  const [selectedTicket, setSelectedTicket] = useState(event.tickets[0]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = ticketQuantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setTicketQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-96 bg-gradient-1">
        <img
          src={event.image}
          alt="event banner gradient"
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border mb-8">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-sans font-bold mb-4 text-card-foreground">
                      {event.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" strokeWidth={2} />
                        <span className="font-body">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" strokeWidth={2} />
                        <span className="font-body">{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" strokeWidth={2} />
                        <span className="font-body">{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
                      <Share2 className="h-4 w-4" strokeWidth={2} />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
                      <Heart className="h-4 w-4" strokeWidth={2} />
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start bg-muted">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="lineup" className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground">
                      Lineup
                    </TabsTrigger>
                    <TabsTrigger value="venue" className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground">
                      Venue
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-6">
                    <h3 className="text-xl font-sans font-medium mb-4 text-card-foreground">About This Event</h3>
                    <p className="text-muted-foreground font-body leading-relaxed">{event.description}</p>
                  </TabsContent>
                  <TabsContent value="lineup" className="mt-6">
                    <h3 className="text-xl font-sans font-medium mb-4 text-card-foreground">Featured Artists</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {event.lineup.map((artist, index) => (
                        <Card key={index} className="bg-muted border-border">
                          <CardContent className="p-4">
                            <p className="font-body font-medium text-card-foreground">{artist}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="venue" className="mt-6">
                    <h3 className="text-xl font-sans font-medium mb-4 text-card-foreground">Venue Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-body font-medium text-card-foreground">{event.venue.name}</p>
                        <p className="text-muted-foreground font-body">{event.venue.address}</p>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-5 w-5 mr-2" strokeWidth={2} />
                        <span className="font-body">Capacity: {event.venue.capacity.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-64 bg-muted rounded-lg">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841!2d-73.9654!3d40.7829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ2JzU4LjQiTiA3M8KwNTcnNTUuNCJX!5e0!3m2!1sen!2sus!4v1234567890&key=YOUR_API_KEY"
                          width="100%"
                            height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Selector Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-sans font-medium mb-6 text-card-foreground">Select Tickets</h3>
                <div className="space-y-4 mb-6">
                  {event.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                        selectedTicket.id === ticket.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-background hover:border-primary/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-body font-medium text-card-foreground">{ticket.name}</p>
                          <p className="text-sm text-muted-foreground font-body">{ticket.available} available</p>
                        </div>
                        <p className="text-lg font-body font-medium text-primary">${ticket.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-body font-medium mb-2 text-foreground">Quantity</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={ticketQuantity <= 1}
                      className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                    >
                      <Minus className="h-4 w-4" strokeWidth={2} />
                    </Button>
                    <span className="text-lg font-body font-medium text-foreground w-12 text-center">{ticketQuantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={ticketQuantity >= 10}
                      className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground font-body">Subtotal</span>
                    <span className="font-body font-medium text-foreground">${(selectedTicket.price * ticketQuantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground font-body">Service Fee</span>
                    <span className="font-body font-medium text-foreground">${(selectedTicket.price * ticketQuantity * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-body font-medium pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">${(selectedTicket.price * ticketQuantity * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <Link to={`/checkout/${slug}`}>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                    Continue to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
