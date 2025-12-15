import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'success';

  const statusConfig = {
    success: {
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-success/10',
      title: 'Payment Successful!',
      message: 'Your tickets have been sent to your email.',
    },
    pending: {
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      title: 'Payment Pending',
      message: 'Your payment is being processed. You will receive a confirmation email shortly.',
    },
    failed: {
      icon: XCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      title: 'Payment Failed',
      message: 'There was an issue processing your payment. Please try again.',
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.success;
  const Icon = config.icon;

  return (
    <div className="bg-background min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full bg-card border-border">
        <CardContent className="p-8 text-center">
          <div className={`w-20 h-20 rounded-full ${config.bgColor} flex items-center justify-center mx-auto mb-6`}>
            <Icon className={`h-10 w-10 ${config.color}`} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-sans font-bold mb-4 text-card-foreground">{config.title}</h1>
          <p className="text-muted-foreground font-body mb-8">{config.message}</p>
          <div className="space-y-3">
            {status === 'success' && (
              <>
                <Link to="/tickets">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                    View My Tickets
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
                    Back to Home
                  </Button>
                </Link>
              </>
            )}
            {status === 'pending' && (
              <Link to="/orders">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                  View Order Status
                </Button>
              </Link>
            )}
            {status === 'failed' && (
              <>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                  Try Again
                </Button>
                <Link to="/">
                  <Button variant="outline" className="w-full bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
                    Back to Home
                  </Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
