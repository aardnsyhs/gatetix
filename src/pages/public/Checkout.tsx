import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard } from 'lucide-react';

export default function Checkout() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [promoCode, setPromoCode] = useState('');

  const orderSummary = {
    eventName: 'Summer Music Festival 2024',
    ticketType: 'General Admission',
    quantity: 2,
    price: 49,
    serviceFee: 9.8,
  };

  const total = (orderSummary.price * orderSummary.quantity + orderSummary.serviceFee).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/payment/status?status=success');
    }
  };

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                      step >= s
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step > s ? <Check className="h-5 w-5" strokeWidth={2} /> : s}
                  </div>
                  <span className="text-xs mt-2 font-body text-foreground">
                    {s === 1 ? 'Details' : s === 2 ? 'Payment' : 'Confirm'}
                  </span>
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-2 transition-smooth ${
                      step > s ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  {step === 1 ? 'Your Details' : step === 2 ? 'Payment Information' : 'Review Order'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                          <Input id="firstName" required className="bg-background text-foreground border-input" />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                          <Input id="lastName" required className="bg-background text-foreground border-input" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-foreground">Email</Label>
                        <Input id="email" type="email" required className="bg-background text-foreground border-input" />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                        <Input id="phone" type="tel" required className="bg-background text-foreground border-input" />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div>
                        <Label htmlFor="cardNumber" className="text-foreground">Card Number</Label>
                        <div className="relative">
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="bg-background text-foreground border-input pl-10" />
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" strokeWidth={2} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-foreground">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required className="bg-background text-foreground border-input" />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                          <Input id="cvv" placeholder="123" required className="bg-background text-foreground border-input" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName" className="text-foreground">Name on Card</Label>
                        <Input id="cardName" required className="bg-background text-foreground border-input" />
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-body font-medium mb-2 text-foreground">Contact Information</h4>
                        <p className="text-sm text-muted-foreground font-body">John Doe</p>
                        <p className="text-sm text-muted-foreground font-body">john.doe@example.com</p>
                        <p className="text-sm text-muted-foreground font-body">+1 (555) 123-4567</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-body font-medium mb-2 text-foreground">Payment Method</h4>
                        <p className="text-sm text-muted-foreground font-body">Card ending in 3456</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                        className="flex-1 bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                      >
                        Back
                      </Button>
                    )}
                    <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                      {step === 3 ? 'Complete Purchase' : 'Continue'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-24">
              <CardHeader>
                <CardTitle className="text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-body font-medium mb-2 text-card-foreground">{orderSummary.eventName}</h4>
                  <p className="text-sm text-muted-foreground font-body">
                    {orderSummary.ticketType} × {orderSummary.quantity}
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-body">Subtotal</span>
                    <span className="font-body text-foreground">${(orderSummary.price * orderSummary.quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-body">Service Fee</span>
                    <span className="font-body text-foreground">${orderSummary.serviceFee.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-body font-medium">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${total}</span>
                </div>

                <div className="pt-4">
                  <Label htmlFor="promo" className="text-foreground">Promo Code</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="bg-background text-foreground border-input"
                    />
                    <Button variant="outline" className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
