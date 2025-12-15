import { useState } from "react";
import { Download, Eye, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    event: "Summer Music Festival",
    tickets: 2,
    amount: 147,
    status: "completed",
    date: "2024-07-10",
    time: "14:30",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    event: "Tech Conference",
    tickets: 1,
    amount: 199,
    status: "completed",
    date: "2024-07-09",
    time: "09:15",
  },
  {
    id: "ORD-003",
    customer: "Bob Wilson",
    email: "bob@example.com",
    event: "Food & Wine Expo",
    tickets: 3,
    amount: 105,
    status: "pending",
    date: "2024-07-08",
    time: "16:45",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    event: "Summer Music Festival",
    tickets: 4,
    amount: 588,
    status: "refunded",
    date: "2024-07-07",
    time: "11:20",
  },
  {
    id: "ORD-005",
    customer: "Charlie Davis",
    email: "charlie@example.com",
    event: "Tech Conference",
    tickets: 2,
    amount: 398,
    status: "completed",
    date: "2024-07-06",
    time: "13:00",
  },
];

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "gt-badge-success";
      case "pending":
        return "gt-badge-warning";
      case "refunded":
        return "gt-badge-danger";
      default:
        return "gt-badge-muted";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all ticket orders
          </p>
        </div>
        <button className="gt-btn-outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="gt-input-search flex-1 max-w-md"
        />
        <button className="gt-btn-ghost">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Orders Table */}
      <div className="gt-card-flat overflow-hidden">
        <div className="overflow-x-auto">
          <table className="gt-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Event</th>
                <th>Tickets</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group">
                  <td>
                    <span className="font-mono text-sm font-medium">
                      {order.id}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="gt-avatar text-xs">
                        {order.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{order.event}</td>
                  <td>
                    <span className="gt-badge gt-badge-primary">
                      {order.tickets} tickets
                    </span>
                  </td>
                  <td>
                    <span className="font-semibold">${order.amount}</span>
                  </td>
                  <td>
                    <span
                      className={`gt-badge ${getStatusStyle(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm">{order.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.time}
                      </p>
                    </div>
                  </td>
                  <td>
                    <button className="gt-icon-btn opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1-5</span> of{" "}
            <span className="font-medium">24</span> orders
          </p>
          <div className="flex items-center gap-2">
            <button className="gt-icon-btn" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-medium">
              1
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-muted text-sm font-medium transition-smooth">
              2
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-muted text-sm font-medium transition-smooth">
              3
            </button>
            <button className="gt-icon-btn">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
