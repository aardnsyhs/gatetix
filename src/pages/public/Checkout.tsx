import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
      navigate("/payment/status?status=success");
    }
  };

  const steps = [
    { num: 1, label: "Details" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Confirm" },
  ];

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="gt-container max-w-5xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((s, index) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-semibold transition-smooth ${
                    step >= s.num
                      ? "gt-gradient-primary text-white shadow-lg shadow-primary/25"
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
                  className={`w-16 sm:w-24 h-1 mx-3 rounded-full transition-smooth ${
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
            <div className="gt-card-flat p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6">
                {step === 1
                  ? "Your Details"
                  : step === 2
                  ? "Payment Information"
                  : "Review Order"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            className="gt-input pl-12"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          className="gt-input"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          className="gt-input pl-12"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="tel"
                          required
                          className="gt-input pl-12"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          className="gt-input pl-12"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            className="gt-input pl-12"
                            placeholder="MM/YY"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          CVV
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            className="gt-input pl-12"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        required
                        className="gt-input"
                        placeholder="John Doe"
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="p-5 rounded-xl bg-muted/50">
                      <h4 className="font-medium mb-3">Contact Information</h4>
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
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="gt-btn-outline flex-1 py-3"
                    >
                      Back
                    </button>
                  )}
                  <button type="submit" className="gt-btn-primary flex-1 py-3">
                    {step === 3 ? "Complete Purchase" : "Continue"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="gt-card-flat p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Ticket className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Order Summary</h3>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">{orderSummary.eventName}</h4>
                <p className="text-sm text-muted-foreground">
                  {orderSummary.ticketType} × {orderSummary.quantity}
                </p>
              </div>

              <div className="gt-divider" />

              <div className="space-y-2 mb-6">
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

              <div className="gt-divider" />

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span className="text-primary">${total}</span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="gt-input flex-1"
                  />
                  <button className="gt-btn-outline">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
