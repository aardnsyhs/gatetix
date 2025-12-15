import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Calendar, Eye } from 'lucide-react';

const orders = [
  {
    id: 'ORD-12345',
    eventName: 'Summer Music Festival 2024',
    date: 'June 1, 2024',
    tickets: 2,
    total: 107.80,
    status: 'completed',
  },
  {
    id: 'ORD-12346',
    eventName: 'Tech Conference 2024',
    date: 'June 15, 2024',
    tickets: 1,
    total: 218.90,
    status: 'completed',
  },
  {
    id: 'ORD-12347',
    eventName: 'Food & Wine Expo',
    date: 'May 20, 2024',
    tickets: 3,
    total: 115.50,
    status: 'refunded',
  },
];

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-sans font-bold mb-4 text-foreground">Order History</h1>
          <p className="text-lg text-muted-foreground font-body">View your past ticket purchases</p>
        </div>

        {/* Desktop Table */}
        <Card className="hidden md:block bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-foreground">Order ID</TableHead>
                  <TableHead className="text-foreground">Event</TableHead>
                  <TableHead className="text-foreground">Date</TableHead>
                  <TableHead className="text-foreground">Tickets</TableHead>
                  <TableHead className="text-foreground">Total</TableHead>
                  <TableHead className="text-foreground">Status</TableHead>
                  <TableHead className="text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50 cursor-pointer transition-smooth">
                    <TableCell className="font-mono text-sm text-foreground">{order.id}</TableCell>
                    <TableCell className="font-body text-foreground">{order.eventName}</TableCell>
                    <TableCell className="text-muted-foreground font-body">{order.date}</TableCell>
                    <TableCell className="text-foreground font-body">{order.tickets}</TableCell>
                    <TableCell className="font-body text-foreground">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={order.status === 'completed' ? 'default' : 'secondary'}
                        className={order.status === 'completed' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}
                      >
                        {order.status === 'completed' ? 'Completed' : 'Refunded'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <Eye className="h-4 w-4" strokeWidth={2} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-mono text-sm text-muted-foreground mb-1">{order.id}</p>
                    <h3 className="font-body font-medium text-card-foreground">{order.eventName}</h3>
                  </div>
                  <Badge
                    variant={order.status === 'completed' ? 'default' : 'secondary'}
                    className={order.status === 'completed' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}
                  >
                    {order.status === 'completed' ? 'Completed' : 'Refunded'}
                  </Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" strokeWidth={2} />
                    <span className="font-body">{order.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-body">Tickets:</span>
                    <span className="text-foreground font-body">{order.tickets}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-body">Total:</span>
                    <span className="font-body font-medium text-foreground">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(order)}
                  className="w-full bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Detail Drawer */}
        <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <SheetContent className="bg-popover text-popover-foreground">
            <SheetHeader>
              <SheetTitle className="text-foreground">Order Details</SheetTitle>
            </SheetHeader>
            {selectedOrder && (
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground font-body mb-1">Order ID</p>
                  <p className="font-mono text-foreground">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body mb-1">Event</p>
                  <p className="font-body text-foreground">{selectedOrder.eventName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body mb-1">Purchase Date</p>
                  <p className="font-body text-foreground">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body mb-1">Number of Tickets</p>
                  <p className="font-body text-foreground">{selectedOrder.tickets}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body mb-1">Total Amount</p>
                  <p className="text-lg font-body font-medium text-primary">${selectedOrder.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body mb-1">Status</p>
                  <Badge
                    variant={selectedOrder.status === 'completed' ? 'default' : 'secondary'}
                    className={selectedOrder.status === 'completed' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}
                  >
                    {selectedOrder.status === 'completed' ? 'Completed' : 'Refunded'}
                  </Badge>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
