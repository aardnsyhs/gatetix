import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Clock, User, Download, Share2, ArrowLeft } from 'lucide-react';

export default function TicketDetail() {
  const { ticketId } = useParams();

  const ticket = {
    id: ticketId,
    eventName: 'Summer Music Festival 2024',
    date: 'July 15, 2024',
    time: '6:00 PM - 11:00 PM',
    location: 'Central Park, New York, NY',
    venue: 'Main Stage Area',
    ticketType: 'General Admission',
    price: 49.00,
    purchaseDate: 'June 1, 2024',
    orderNumber: 'ORD-12345',
    status: 'active',
    qrCode: 'https://placehold.co/400x400',
    holder: 'John Doe',
    email: 'john.doe@example.com',
  };

  const statusHistory = [
    { date: 'June 1, 2024', status: 'Purchased', description: 'Ticket purchased successfully' },
    { date: 'June 1, 2024', status: 'Confirmed', description: 'Payment confirmed' },
    { date: 'June 2, 2024', status: 'Sent', description: 'Ticket sent to email' },
  ];

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link to="/tickets">
          <Button variant="ghost" className="mb-6 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
            Back to Tickets
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2 text-card-foreground">{ticket.eventName}</CardTitle>
                    <Badge
                      variant="default"
                      className="bg-success text-success-foreground"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
                      <Share2 className="h-4 w-4" strokeWidth={2} />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
                      <Download className="h-4 w-4" strokeWidth={2} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-primary mt-0.5" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">Date</p>
                      <p className="text-sm text-muted-foreground font-body">{ticket.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-primary mt-0.5" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">Time</p>
                      <p className="text-sm text-muted-foreground font-body">{ticket.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground font-body">{ticket.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-3 text-primary mt-0.5" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">Ticket Holder</p>
                      <p className="text-sm text-muted-foreground font-body">{ticket.holder}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-body font-medium mb-4 text-card-foreground">Ticket Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground font-body">Ticket ID</span>
                      <span className="text-sm font-mono text-foreground">{ticket.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground font-body">Ticket Type</span>
                      <span className="text-sm text-foreground font-body">{ticket.ticketType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground font-body">Price</span>
                      <span className="text-sm text-foreground font-body">${ticket.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground font-body">Order Number</span>
                      <span className="text-sm font-mono text-foreground">{ticket.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground font-body">Purchase Date</span>
                      <span className="text-sm text-foreground font-body">{ticket.purchaseDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Status History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusHistory.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        {index < statusHistory.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-body font-medium text-card-foreground">{item.status}</p>
                        <p className="text-sm text-muted-foreground font-body">{item.description}</p>
                        <p className="text-xs text-muted-foreground font-body mt-1">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* QR Code Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-24">
              <CardHeader>
                <CardTitle className="text-center text-foreground">Your Ticket</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-white p-6 rounded-lg mb-4">
                  <img
                    src={ticket.qrCode}
                    alt="Ticket QR Code"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-muted-foreground font-body mb-4">
                  Show this QR code at the venue entrance
                </p>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                  <Download className="mr-2 h-4 w-4" strokeWidth={2} />
                  Download Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
