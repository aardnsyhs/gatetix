"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  CreditCard,
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  Ticket,
} from "lucide-react";

export default function Checkout() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [promoCode, setPromoCode] = useState("");

  const orderSummary = {
    eventName: "Summer Music Festival 2024",
    ticketType: "General Admission",
    quantity: 2,
    price: 49,
    serviceFee: 9.8,
  };
  const total = (
    orderSummary.price * orderSummary.quantity +
    orderSummary.serviceFee
  ).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/payment/status?status=success");
    }
  };

  const steps = [
    { num: 1, label: "Details" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Confirm" },
  ];

  return (
    <div className="min-h-screen bg-background py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((s, index) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-semibold transition-all ${
                    step >= s.num
                      ? "gt-gradient-primary text-white shadow-lg"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                </div>
                <span
                  className={`text-sm mt-2 font-medium ${
                    step >= s.num ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 sm:w-24 h-1 mx-3 rounded-full transition-all ${
                    step > s.num ? "gt-gradient-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="gt-card-glow">
              <CardHeader>
                <CardTitle>
                  {step === 1
                    ? "Your Details"
                    : step === 2
                    ? "Payment Information"
                    : "Review Order"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="firstName"
                              required
                              className="pl-10"
                              placeholder="John"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required placeholder="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            required
                            className="pl-10"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            required
                            className="pl-10"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cardNumber"
                            required
                            className="pl-10"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="expiry"
                              required
                              className="pl-10"
                              placeholder="MM/YY"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="cvv"
                              required
                              className="pl-10"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" required placeholder="John Doe" />
                      </div>
                    </>
                  )}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="p-5 rounded-xl bg-muted/50">
                        <h4 className="font-medium mb-3">
                          Contact Information
                        </h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>John Doe</p>
                          <p>john.doe@example.com</p>
                          <p>+1 (555) 123-4567</p>
                        </div>
                      </div>
                      <div className="p-5 rounded-xl bg-muted/50">
                        <h4 className="font-medium mb-3">Payment Method</h4>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded" />
                          <span className="text-sm text-muted-foreground">
                            Card ending in 3456
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-4 pt-4">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                        className="flex-1 rounded-xl"
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className="flex-1 gt-gradient-primary border-0 hover:opacity-90 rounded-xl"
                    >
                      {step === 3 ? "Complete Purchase" : "Continue"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="gt-card-glow sticky top-24">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-primary" />
                  <CardTitle>Order Summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{orderSummary.eventName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {orderSummary.ticketType} × {orderSummary.quantity}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      ${(orderSummary.price * orderSummary.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>${orderSummary.serviceFee.toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total}</span>
                </div>
                <div className="pt-4">
                  <Label htmlFor="promo">Promo Code</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="rounded-xl"
                    />
                    <Button variant="outline" className="rounded-xl">
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
