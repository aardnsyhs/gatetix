import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import AppLayout from "@/layouts/AppLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Public Pages
import LandingPage from "@/pages/public/LandingPage";
import EventListing from "@/pages/public/EventListing";
import EventDetail from "@/pages/public/EventDetail";
import Checkout from "@/pages/public/Checkout";
import PaymentStatus from "@/pages/public/PaymentStatus";
import HelpCenter from "@/pages/public/HelpCenter";

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// User Pages
import MyTickets from "@/pages/app/MyTickets";
import TicketDetail from "@/pages/app/TicketDetail";
import OrderHistory from "@/pages/app/OrderHistory";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminEvents from "@/pages/admin/Events";
import AdminEventDetail from "@/pages/admin/EventDetail";
import AdminOrders from "@/pages/admin/Orders";
import AdminAttendees from "@/pages/admin/Attendees";
import CheckInConsole from "@/pages/admin/CheckInConsole";
import PromoCodes from "@/pages/admin/PromoCodes";
import TeamRoles from "@/pages/admin/TeamRoles";
import AuditLogs from "@/pages/admin/AuditLogs";
import Settings from "@/pages/admin/Settings";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/events" element={<EventListing />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/help" element={<HelpCenter />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Checkout (standalone) */}
          <Route path="/checkout/:eventId" element={<Checkout />} />
          <Route path="/payment/status" element={<PaymentStatus />} />

          {/* User App Routes */}
          <Route element={<AppLayout />}>
            <Route path="/tickets" element={<MyTickets />} />
            <Route path="/tickets/:ticketId" element={<TicketDetail />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="events/:eventId" element={<AdminEventDetail />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="attendees" element={<AdminAttendees />} />
            <Route path="check-in" element={<CheckInConsole />} />
            <Route path="promo-codes" element={<PromoCodes />} />
            <Route path="team" element={<TeamRoles />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
