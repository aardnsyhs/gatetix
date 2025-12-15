"use client";

import { useState } from "react";
import {
  Save,
  Building,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomAlert } from "@/components/ui/custom-alert";

const tabs = [
  { id: "general", label: "Umum", icon: Building },
  { id: "payment", label: "Pembayaran", icon: CreditCard },
  { id: "notifications", label: "Notifikasi", icon: Bell },
  { id: "security", label: "Keamanan", icon: Shield },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [orgName, setOrgName] = useState("Organisasi Saya");
  const [orgEmail, setOrgEmail] = useState("kontak@organisasi.com");
  const [orgWebsite, setOrgWebsite] = useState("https://organisasi.com");
  const [orgDescription, setOrgDescription] = useState(
    "Perusahaan manajemen event yang mengkhususkan diri dalam festival musik dan konferensi teknologi."
  );
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showLogoSuccess, setShowLogoSuccess] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground mt-1">
          Kelola pengaturan organisasi Anda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-smooth ${
                    activeTab === tab.id
                      ? "gt-gradient-primary text-white shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="lg:col-span-3">
          {activeTab === "general" && (
            <Card className="gt-card-glow">
              <CardHeader>
                <CardTitle>Detail Organisasi</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Perbarui informasi organisasi Anda
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">Logo Organisasi</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 gt-gradient-primary rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">GT</span>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = () => setShowLogoSuccess(true);
                          input.click();
                        }}
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        Ubah Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG maksimal 2MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Nama Organisasi</Label>
                    <Input
                      id="orgName"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orgEmail">Email Kontak</Label>
                    <Input
                      id="orgEmail"
                      type="email"
                      value={orgEmail}
                      onChange={(e) => setOrgEmail(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgWebsite">Website</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-border bg-muted text-muted-foreground text-sm">
                      <Globe className="h-4 w-4" />
                    </span>
                    <Input
                      id="orgWebsite"
                      value={orgWebsite}
                      onChange={(e) => setOrgWebsite(e.target.value)}
                      className="rounded-l-none rounded-r-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgDescription">Deskripsi</Label>
                  <Textarea
                    id="orgDescription"
                    value={orgDescription}
                    onChange={(e) => setOrgDescription(e.target.value)}
                    rows={4}
                    className="rounded-xl resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <Button
                    className="gt-gradient-primary border-0 hover:opacity-90 rounded-xl"
                    onClick={() => setShowSuccessDialog(true)}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "payment" && (
            <Card className="gt-card-glow">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Pengaturan Pembayaran
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Konfigurasi gateway pembayaran dan pengaturan pencairan
                    untuk organisasi Anda.
                  </p>
                  <Button
                    className="mt-6 gt-gradient-primary border-0 hover:opacity-90 rounded-xl"
                    onClick={() => setShowComingSoon(true)}
                  >
                    Hubungkan Gateway Pembayaran
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card className="gt-card-glow">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Preferensi Notifikasi
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Kelola pengaturan email dan notifikasi push.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="gt-card-glow">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Pengaturan Keamanan
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Kelola keamanan dan kontrol akses untuk organisasi Anda.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Success Dialog */}
      <CustomAlert
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Berhasil Disimpan"
        description="Pengaturan berhasil disimpan!"
        variant="success"
      />

      {/* Logo Upload Success Dialog */}
      <CustomAlert
        open={showLogoSuccess}
        onOpenChange={setShowLogoSuccess}
        title="Logo Diupload"
        description="Logo berhasil diupload!"
        variant="success"
      />

      {/* Coming Soon Dialog */}
      <CustomAlert
        open={showComingSoon}
        onOpenChange={setShowComingSoon}
        title="Segera Hadir"
        description="Fitur ini akan segera tersedia!"
        variant="warning"
      />
    </div>
  );
}
