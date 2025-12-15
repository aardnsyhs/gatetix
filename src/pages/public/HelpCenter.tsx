import { useState } from "react";
import {
  Search,
  Mail,
  MessageCircle,
  ChevronDown,
  HelpCircle,
  Ticket,
  CreditCard,
  RefreshCw,
} from "lucide-react";

const faqs = [
  {
    question: "How do I purchase tickets?",
    answer:
      "Browse events, select your desired event, choose ticket type and quantity, then proceed to checkout. You will receive your tickets via email after payment confirmation.",
    icon: Ticket,
  },
  {
    question: "Can I get a refund?",
    answer:
      "Refund policies vary by event. Please check the specific event page for refund information. Generally, refunds are available up to 48 hours before the event.",
    icon: RefreshCw,
  },
  {
    question: "How do I access my tickets?",
    answer:
      'After purchase, tickets are sent to your email. You can also access them anytime by logging into your account and visiting the "My Tickets" section.',
    icon: Mail,
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and digital wallets like Apple Pay and Google Pay.",
    icon: CreditCard,
  },
  {
    question: "Can I transfer my ticket to someone else?",
    answer:
      'Yes, most tickets can be transferred. Go to your ticket details and select the "Transfer" option. The recipient will receive an email with their ticket.',
    icon: HelpCircle,
  },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="gt-gradient-secondary py-16">
        <div className="gt-container text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Help Center
          </h1>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Find answers to common questions or contact our support team
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl"
            />
          </div>
        </div>
      </div>

      <div className="gt-container py-12">
        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const Icon = faq.icon;
              const isOpen = openFaq === index;
              return (
                <div key={index} className="gt-card-flat overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 flex items-center gap-4 text-left hover:bg-muted/30 transition-smooth"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="flex-1 font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 animate-fade-in">
                      <p className="text-muted-foreground pl-14">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="gt-card-flat p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl gt-gradient-primary flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Still Need Help?</h2>
              <p className="text-muted-foreground">
                Send us a message and we'll get back to you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="gt-input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="gt-input"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="gt-input"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="gt-input resize-none"
                  placeholder="Describe your issue..."
                />
              </div>
              <button type="submit" className="gt-btn-primary w-full py-3">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
