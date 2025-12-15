"use client";

import { useState } from "react";
import { Plus, Copy, MoreVertical, Edit, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CustomAlert } from "@/components/ui/custom-alert";
import { EmptyState } from "@/components/ui/empty-state";

const promoCodes = [
  {
    id: 1,
    code: "MERDEKA20",
    discount: "20%",
    type: "percentage",
    usageLimit: 100,
    used: 45,
    status: "active",
    expires: "2024-08-31",
  },
  {
    id: 2,
    code: "EARLYBIRD",
    discount: "Rp 50.000",
    type: "fixed",
    usageLimit: 50,
    used: 50,
    status: "exhausted",
    expires: "2024-07-15",
  },
  {
    id: 3,
    code: "VIP50",
    discount: "50%",
    type: "percentage",
    usageLimit: 20,
    used: 8,
    status: "active",
    expires: "2024-12-31",
  },
  {
    id: 4,
    code: "SELAMATDATANG",
    discount: "Rp 25.000",
    type: "fixed",
    usageLimit: 500,
    used: 234,
    status: "active",
    expires: "2024-12-31",
  },
];

export default function PromoCodes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<
    (typeof promoCodes)[0] | null
  >(null);
  const [newPromo, setNewPromo] = useState({
    code: "",
    discount: "",
    type: "percentage",
    usageLimit: "",
    expires: "",
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    title: "",
    description: "",
  });

  const filteredCodes = promoCodes.filter((code) =>
    code.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreatePromo = () => {
    setSuccessMessage({
      title: "Kode Promo Dibuat",
      description: `Kode promo "${newPromo.code}" berhasil dibuat!`,
    });
    setIsCreateOpen(false);
    setShowSuccessDialog(true);
    setNewPromo({
      code: "",
      discount: "",
      type: "percentage",
      usageLimit: "",
      expires: "",
    });
  };

  const handleEditPromo = () => {
    setSuccessMessage({
      title: "Kode Promo Diupdate",
      description: `Kode promo "${selectedPromo?.code}" berhasil diupdate!`,
    });
    setIsEditOpen(false);
    setSelectedPromo(null);
    setShowSuccessDialog(true);
  };

  const handleDeletePromo = () => {
    setSuccessMessage({
      title: "Kode Promo Dihapus",
      description: `Kode promo "${selectedPromo?.code}" berhasil dihapus!`,
    });
    setIsDeleteOpen(false);
    setSelectedPromo(null);
    setShowSuccessDialog(true);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500";
      case "exhausted":
        return "";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Kode Promo</h1>
          <p className="text-muted-foreground mt-1">
            Buat dan kelola kode diskon
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gt-gradient-primary border-0 hover:opacity-90 rounded-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Buat Kode
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Cari kode promo..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md rounded-xl"
      />

      {filteredCodes.length === 0 ? (
        <EmptyState
          variant="promo"
          searchQuery={searchQuery}
          onReset={() => setSearchQuery("")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCodes.map((promo) => (
            <Card key={promo.id} className="gt-card-glow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <code className="px-3 py-1.5 bg-muted rounded-lg text-sm font-mono font-semibold">
                      {promo.code}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyCode(promo.id, promo.code)}
                      className="rounded-xl h-8 w-8"
                    >
                      {copiedId === promo.id ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl h-8 w-8"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem
                        className="rounded-lg cursor-pointer"
                        onClick={() => {
                          setSelectedPromo(promo);
                          setIsEditOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="rounded-lg cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => {
                          setSelectedPromo(promo);
                          setIsDeleteOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {promo.discount}
                    </span>
                    <Badge className={getStatusStyle(promo.status)}>
                      {promo.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Penggunaan</span>
                      <span className="font-medium">
                        {promo.used} / {promo.usageLimit}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gt-gradient-primary rounded-full"
                        style={{
                          width: `${(promo.used / promo.usageLimit) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-dashed border-border">
                    <p className="text-xs text-muted-foreground">
                      Berakhir:{" "}
                      <span className="font-medium text-foreground">
                        {promo.expires}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Promo Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Kode Promo Baru</DialogTitle>
            <DialogDescription>
              Buat kode diskon untuk event Anda
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="promo-code">Kode Promo</Label>
              <Input
                id="promo-code"
                value={newPromo.code}
                onChange={(e) =>
                  setNewPromo({
                    ...newPromo,
                    code: e.target.value.toUpperCase(),
                  })
                }
                placeholder="Contoh: DISKON20"
                className="rounded-xl font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount-type">Tipe Diskon</Label>
                <Select
                  value={newPromo.type}
                  onValueChange={(v) => setNewPromo({ ...newPromo, type: v })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Persentase (%)</SelectItem>
                    <SelectItem value="fixed">Nominal (Rp)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount-value">Nilai Diskon</Label>
                <Input
                  id="discount-value"
                  type="number"
                  value={newPromo.discount}
                  onChange={(e) =>
                    setNewPromo({ ...newPromo, discount: e.target.value })
                  }
                  placeholder={newPromo.type === "percentage" ? "20" : "50000"}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usage-limit">Batas Penggunaan</Label>
                <Input
                  id="usage-limit"
                  type="number"
                  value={newPromo.usageLimit}
                  onChange={(e) =>
                    setNewPromo({ ...newPromo, usageLimit: e.target.value })
                  }
                  placeholder="100"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expires">Tanggal Berakhir</Label>
                <Input
                  id="expires"
                  type="date"
                  value={newPromo.expires}
                  onChange={(e) =>
                    setNewPromo({ ...newPromo, expires: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
              className="rounded-xl"
            >
              Batal
            </Button>
            <Button
              onClick={handleCreatePromo}
              className="gt-gradient-primary border-0 rounded-xl"
            >
              Buat Kode
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Promo Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Kode Promo</DialogTitle>
            <DialogDescription>
              Ubah detail kode promo {selectedPromo?.code}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-code">Kode Promo</Label>
              <Input
                id="edit-code"
                defaultValue={selectedPromo?.code}
                className="rounded-xl font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-limit">Batas Penggunaan</Label>
              <Input
                id="edit-limit"
                type="number"
                defaultValue={selectedPromo?.usageLimit}
                className="rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              className="rounded-xl"
            >
              Batal
            </Button>
            <Button
              onClick={handleEditPromo}
              className="gt-gradient-primary border-0 rounded-xl"
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kode Promo?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus kode promo &quot;
              {selectedPromo?.code}&quot;? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePromo}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <CustomAlert
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title={successMessage.title}
        description={successMessage.description}
        variant="success"
      />
    </div>
  );
}
