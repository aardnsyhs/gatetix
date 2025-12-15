import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Mail, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I purchase tickets?',
    answer: 'Browse events, select your desired event, choose ticket type and quantity, then proceed to checkout. You will receive your tickets via email after payment confirmation.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Refund policies vary by event. Please check the specific event page for refund information. Generally, refunds are available up to 48 hours before the event.',
  },
  {
    question: 'How do I access my tickets?',
    answer: 'After purchase, tickets are sent to your email. You can also access them anytime by logging into your account and visiting the "My Tickets" section.',
  },
  {
    question: 'What if I lose my ticket?',
    answer: 'Don\'t worry! You can always access your tickets from your account. Simply log in and go to "My Tickets" to view and download them again.',
  },
  {
    question: 'Can I transfer my ticket to someone else?',
    answer: 'Yes, most tickets can be transferred. Go to your ticket details and select the "Transfer" option. The recipient will receive an email with their ticket.',
  },
];

export default function HelpCenter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-background min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-sans font-bold mb-4 text-foreground">Help Center</h1>
          <p className="text-lg text-muted-foreground font-body">Find answers to common questions or contact our support team</p>
        </div>

        {/* Search */}
        <Card className="mb-12 bg-card border-border">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" strokeWidth={2} />
              <Input
                type="text"
                placeholder="Search for help..."
                className="pl-12 bg-background text-foreground border-input"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-sans font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-body font-medium text-card-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Form */}
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" strokeWidth={2} />
              <h2 className="text-2xl font-sans font-bold mb-2 text-card-foreground">Still Need Help?</h2>
              <p className="text-muted-foreground font-body">Send us a message and we'll get back to you within 24 hours</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background text-foreground border-input"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background text-foreground border-input"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="text-foreground">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-background text-foreground border-input"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-background text-foreground border-input"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                <Mail className="mr-2 h-4 w-4" strokeWidth={2} />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
