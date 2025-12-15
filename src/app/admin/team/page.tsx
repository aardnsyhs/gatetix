"use client";

import { useState } from "react";
import { UserPlus, MoreVertical, Shield, Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const teamMembers = [
  {
    id: 1,
    name: "Budi Admin",
    email: "budi@email.com",
    role: "Admin",
    status: "active",
    lastActive: "2 menit lalu",
  },
  {
    id: 2,
    name: "Siti Manager",
    email: "siti@email.com",
    role: "Manager",
    status: "active",
    lastActive: "1 jam lalu",
  },
  {
    id: 3,
    name: "Ahmad Staff",
    email: "ahmad@email.com",
    role: "Staff",
    status: "pending",
    lastActive: "Belum pernah",
  },
  {
    id: 4,
    name: "Dewi Checker",
    email: "dewi@email.com",
    role: "Staff Check-in",
    status: "active",
    lastActive: "3 jam lalu",
  },
];

const roles = [
  {
    name: "Admin",
    description: "Akses penuh ke semua fitur",
    permissions: 12,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Manager",
    description: "Kelola event dan pesanan",
    permissions: 8,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Staff",
    description: "Lihat dan operasi dasar",
    permissions: 5,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Staff Check-in",
    description: "Akses check-in saja",
    permissions: 2,
    color: "from-orange-500 to-amber-500",
  },
];

export default function TeamRoles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<
    (typeof teamMembers)[0] | null
  >(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Staff");

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = () => {
    alert(`Undangan berhasil dikirim ke ${inviteEmail} sebagai ${inviteRole}!`);
    setIsInviteOpen(false);
    setInviteEmail("");
    setInviteRole("Staff");
  };

  const handleChangeRole = () => {
    alert(`Peran ${selectedMember?.name} berhasil diubah!`);
    setIsRoleOpen(false);
    setSelectedMember(null);
  };

  const handleResendInvite = (member: (typeof teamMembers)[0]) => {
    alert(`Undangan berhasil dikirim ulang ke ${member.email}!`);
  };

  const handleDelete = () => {
    alert(`${selectedMember?.name} berhasil dihapus dari tim!`);
    setIsDeleteOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Tim & Peran</h1>
          <p className="text-muted-foreground mt-1">
            Kelola anggota tim dan izin akses
          </p>
        </div>
        <Button
          onClick={() => setIsInviteOpen(true)}
          className="gt-gradient-primary border-0 hover:opacity-90 rounded-xl"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Undang Anggota
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Input
            type="text"
            placeholder="Cari anggota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md rounded-xl"
          />

          <Card className="gt-card-glow">
            <CardHeader>
              <CardTitle>Anggota Tim</CardTitle>
              <p className="text-sm text-muted-foreground">
                {teamMembers.length} anggota
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 flex items-center justify-between hover:bg-muted/30 transition-smooth"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full gt-gradient-primary flex items-center justify-center text-white text-xs font-medium">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{member.name}</p>
                          {member.status === "pending" && (
                            <Badge
                              variant="secondary"
                              className="bg-amber-500/10 text-amber-500"
                            >
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <Badge className="bg-primary/10 text-primary">
                          {member.role}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {member.lastActive}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="rounded-xl w-44"
                        >
                          <DropdownMenuItem
                            className="rounded-lg cursor-pointer"
                            onClick={() => {
                              setSelectedMember(member);
                              setIsRoleOpen(true);
                            }}
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            Ubah Peran
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-lg cursor-pointer"
                            onClick={() => handleResendInvite(member)}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Kirim Ulang Undangan
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-lg cursor-pointer text-destructive focus:text-destructive"
                            onClick={() => {
                              setSelectedMember(member);
                              setIsDeleteOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="gt-card-glow h-fit">
          <CardHeader>
            <CardTitle>Peran</CardTitle>
            <p className="text-sm text-muted-foreground">Tingkat izin akses</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.name}
                className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${role.color}`}
                  />
                  <p className="font-medium">{role.name}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {role.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {role.permissions}
                  </span>{" "}
                  izin
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Invite Member Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Undang Anggota Baru</DialogTitle>
            <DialogDescription>
              Kirim undangan ke email untuk bergabung dengan tim
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="email@contoh.com"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-role">Peran</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Staff Check-in">Staff Check-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsInviteOpen(false)}
              className="rounded-xl"
            >
              Batal
            </Button>
            <Button
              onClick={handleInvite}
              className="gt-gradient-primary border-0 rounded-xl"
            >
              <Mail className="h-4 w-4 mr-2" />
              Kirim Undangan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog open={isRoleOpen} onOpenChange={setIsRoleOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Ubah Peran</DialogTitle>
            <DialogDescription>
              Ubah peran untuk {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Peran Baru</Label>
              <Select defaultValue={selectedMember?.role}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Staff Check-in">Staff Check-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRoleOpen(false)}
              className="rounded-xl"
            >
              Batal
            </Button>
            <Button
              onClick={handleChangeRole}
              className="gt-gradient-primary border-0 rounded-xl"
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Anggota?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus {selectedMember?.name} dari tim?
              Mereka tidak akan bisa mengakses dashboard lagi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
