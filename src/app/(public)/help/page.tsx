"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Mail,
  MessageCircle,
  HelpCircle,
  Ticket,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Bagaimana cara membeli tiket?",
    answer:
      "Jelajahi event, pilih event yang diinginkan, pilih jenis tiket dan jumlahnya, lalu lanjutkan ke pembayaran. Anda akan menerima tiket melalui email setelah konfirmasi pembayaran.",
    icon: Ticket,
  },
  {
    question: "Apakah bisa refund?",
    answer:
      "Kebijakan refund berbeda untuk setiap event. Silakan cek halaman event untuk informasi refund. Umumnya, refund tersedia hingga 48 jam sebelum event.",
    icon: RefreshCw,
  },
  {
    question: "Bagaimana cara mengakses tiket saya?",
    answer:
      'Setelah pembelian, tiket dikirim ke email Anda. Anda juga bisa mengaksesnya kapan saja dengan login ke akun dan mengunjungi bagian "Tiket Saya".',
    icon: Mail,
  },
  {
    question: "Metode pembayaran apa saja yang diterima?",
    answer:
      "Kami menerima transfer bank (BCA, Mandiri, BNI, BRI), kartu kredit/debit, e-wallet (GoPay, OVO, DANA, ShopeePay), dan virtual account.",
    icon: CreditCard,
  },
  {
    question: "Bisakah tiket ditransfer ke orang lain?",
    answer:
      'Ya, sebagian besar tiket bisa ditransfer. Buka detail tiket dan pilih opsi "Transfer". Penerima akan mendapat email dengan tiket mereka.',
    icon: HelpCircle,
  },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            Pusat Bantuan
          </h1>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum atau hubungi tim support kami
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari bantuan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-6 rounded-2xl bg-white text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-white/50 shadow-xl border-0"
            />
          </div>
        </div>
      </div>

      <div className="gt-container py-12">
        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8">
            Pertanyaan yang Sering Diajukan
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="gt-card-glow border-0 rounded-2xl overflow-hidden px-0"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30 transition-smooth">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <p className="text-muted-foreground pl-14">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="gt-card-glow">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl gt-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Masih Butuh Bantuan?
                </h2>
                <p className="text-muted-foreground">
                  Kirim pesan kepada kami dan kami akan membalas dalam 24 jam
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="rounded-xl"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="rounded-xl"
                      placeholder="anda@contoh.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="rounded-xl"
                    placeholder="Ada yang bisa kami bantu?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="rounded-xl resize-none"
                    placeholder="Jelaskan masalah Anda..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full gt-gradient-primary border-0 hover:opacity-90 rounded-xl py-6"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
