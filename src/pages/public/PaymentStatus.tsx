import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Ticket,
  Home,
  RefreshCw,
} from "lucide-react";

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "success";

  const statusConfig = {
    success: {
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-success/10",
      title: "Payment Successful!",
      message:
        "Your tickets have been sent to your email. Get ready for an amazing experience!",
    },
    pending: {
      icon: Clock,
      gradient: "from-amber-500 to-orange-500",
      bgColor: "bg-warning/10",
      title: "Payment Pending",
      message:
        "Your payment is being processed. You will receive a confirmation email shortly.",
    },
    failed: {
      icon: XCircle,
      gradient: "from-red-500 to-rose-500",
      bgColor: "bg-destructive/10",
      title: "Payment Failed",
      message:
        "There was an issue processing your payment. Please try again or use a different payment method.",
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.success;
  const Icon = config.icon;

  return (
    <div className="bg-background min-h-screen flex items-center justify-center py-12 px-4">
      <div className="gt-card-flat max-w-md w-full p-8 text-center animate-scale-in">
        <div
          className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mx-auto mb-6 shadow-xl`}
        >
          <Icon className="h-12 w-12 text-white" strokeWidth={1.5} />
        </div>

        <h1 className="text-2xl font-bold mb-3">{config.title}</h1>
        <p className="text-muted-foreground mb-8">{config.message}</p>

        <div className="space-y-3">
          {status === "success" && (
            <>
              <Link to="/tickets">
                <button className="gt-btn-primary w-full py-3">
                  <Ticket className="h-4 w-4 mr-2" />
                  View My Tickets
                </button>
              </Link>
              <Link to="/">
                <button className="gt-btn-outline w-full py-3">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </button>
              </Link>
            </>
          )}
          {status === "pending" && (
            <Link to="/orders">
              <button className="gt-btn-primary w-full py-3">
                View Order Status
              </button>
            </Link>
          )}
          {status === "failed" && (
            <>
              <button className="gt-btn-primary w-full py-3">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </button>
              <Link to="/">
                <button className="gt-btn-outline w-full py-3">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </button>
              </Link>
            </>
          )}
        </div>

        {status === "success" && (
          <div className="mt-8 p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Order confirmation has been sent to{" "}
              <span className="font-medium text-foreground">
                john@example.com
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
