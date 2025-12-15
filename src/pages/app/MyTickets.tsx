import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, MapPin, QrCode, Download } from 'lucide-react';

const tickets = [
  {
    id: 'TKT-001',
    eventName: 'Summer Music Festival 2024',
    date: 'July 15, 2024',
    time: '6:00 PM',
    location: 'Central Park, NY',
    ticketType: 'General Admission',
    status: 'active',
    qrCode: 'https://placehold.co/300x300',
  },
  {
    id: 'TKT-002',
    eventName: 'Tech Conference 2024',
    date: 'August 20, 2024',
    time: '9:00 AM',
    location: 'Convention Center, SF',
    ticketType: 'VIP Pass',
    status: 'active',
    qrCode: 'https://placehold.co/300x300',
  },
  {
    id: 'TKT-003',
    eventName: 'Food & Wine Expo',
    date: 'June 5, 2024',
    time: '12:00 PM',
    location: 'Downtown, LA',
    ticketType: 'General Admission',
    status: 'used',
    qrCode: 'https://placehold.co/300x300',
  },
];

export default function MyTickets() {
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'used'>('all');

  const filteredTickets = filter === 'all' ? tickets : tickets.filter(t => t.status === filter);

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-sans font-bold mb-4 text-foreground">My Tickets</h1>
          <p className="text-lg text-muted-foreground font-body">View and manage your event tickets</p>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground' : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground' : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'}
          >
            Active
          </Button>
          <Button
            variant={filter === 'used' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('used')}
            className={filter === 'used' ? 'bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground' : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'}
          >
            Used
          </Button>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="bg-card border-border overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-body font-medium mb-2 text-card-foreground">{ticket.eventName}</h3>
                    <Badge
                      variant={ticket.status === 'active' ? 'default' : 'secondary'}
                      className={ticket.status === 'active' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}
                    >
                      {ticket.status === 'active' ? 'Active' : 'Used'}
                    </Badge>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" strokeWidth={2} />
                    <span className="font-body">{ticket.date} at {ticket.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" strokeWidth={2} />
                    <span className="font-body">{ticket.location}</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-body">
                    <span className="font-medium text-foreground">Type:</span> {ticket.ticketType}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTicket(ticket)}
                    className="flex-1 bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                  >
                    <QrCode className="mr-2 h-4 w-4" strokeWidth={2} />
                    Show QR
                  </Button>
                  <Link to={`/tickets/${ticket.id}`} className="flex-1">
                    <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* QR Code Modal */}
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="bg-popover text-popover-foreground">
            <DialogHeader>
              <DialogTitle className="text-foreground">{selectedTicket?.eventName}</DialogTitle>
            </DialogHeader>
            <div className="text-center py-6">
              <div className="bg-white p-6 rounded-lg inline-block mb-4">
                <img
                  src={selectedTicket?.qrCode}
                  alt="Ticket QR Code"
                  className="w-64 h-64"
                  loading="lazy"
                />
              </div>
              <p className="text-sm text-muted-foreground font-body mb-4">
                Show this QR code at the venue entrance
              </p>
              <p className="text-xs font-mono text-muted-foreground">{selectedTicket?.id}</p>
              <Button variant="outline" className="mt-4 bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
                <Download className="mr-2 h-4 w-4" strokeWidth={2} />
                Download Ticket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
