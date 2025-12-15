import { useState } from "react";
import { Calendar, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

const orders = [
  {
    id: "ORD-12345",
    eventName: "Summer Music Festival 2024",
    date: "June 1, 2024",
    tickets: 2,
    total: 107.8,
    status: "completed",
  },
  {
    id: "ORD-12346",
    eventName: "Tech Conference 2024",
    date: "June 15, 2024",
    tickets: 1,
    total: 218.9,
    status: "completed",
  },
  {
    id: "ORD-12347",
    eventName: "Food & Wine Expo",
    date: "May 20, 2024",
    tickets: 3,
    total: 115.5,
    status: "refunded",
  },
];

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null
  );

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="gt-container">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Order History</h1>
          <p className="text-muted-foreground">
            View your past ticket purchases
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block gt-card-flat overflow-hidden">
          <table className="gt-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Event</th>
                <th>Date</th>
                <th>Tickets</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="group">
                  <td className="font-mono">{order.id}</td>
                  <td className="font-medium">{order.eventName}</td>
                  <td className="text-muted-foreground">{order.date}</td>
                  <td>{order.tickets}</td>
                  <td className="font-semibold">${order.total.toFixed(2)}</td>
                  <td>
                    <span
                      className={`gt-badge ${
                        order.status === "completed"
                          ? "gt-badge-success"
                          : "gt-badge-muted"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="gt-icon-btn opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1-3</span> of{" "}
              <span className="font-medium">3</span> orders
            </p>
            <div className="flex items-center gap-2">
              <button className="gt-icon-btn" disabled>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-medium">
                1
              </button>
              <button className="gt-icon-btn" disabled>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="gt-card-flat p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-mono text-sm text-muted-foreground mb-1">
                    {order.id}
                  </p>
                  <h3 className="font-semibold">{order.eventName}</h3>
                </div>
                <span
                  className={`gt-badge ${
                    order.status === "completed"
                      ? "gt-badge-success"
                      : "gt-badge-muted"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{order.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tickets:</span>
                  <span>{order.tickets}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-semibold">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(order)}
                className="gt-btn-outline w-full"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Order Detail Drawer */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-card shadow-2xl animate-slide-up">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-semibold">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="gt-icon-btn"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-mono">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Event</p>
                  <p className="font-medium">{selectedOrder.eventName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Purchase Date
                  </p>
                  <p>{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Number of Tickets
                  </p>
                  <p>{selectedOrder.tickets}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Amount
                  </p>
                  <p className="text-xl font-bold text-primary">
                    ${selectedOrder.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <span
                    className={`gt-badge ${
                      selectedOrder.status === "completed"
                        ? "gt-badge-success"
                        : "gt-badge-muted"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
