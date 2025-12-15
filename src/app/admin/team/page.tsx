"use client";

import { useState } from "react";
import { UserPlus, MoreVertical, Shield, Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const teamMembers = [
  {
    id: 1,
    name: "John Admin",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastActive: "2 min ago",
  },
  {
    id: 2,
    name: "Jane Manager",
    email: "jane@example.com",
    role: "Manager",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Bob Staff",
    email: "bob@example.com",
    role: "Staff",
    status: "pending",
    lastActive: "Never",
  },
  {
    id: 4,
    name: "Alice Checker",
    email: "alice@example.com",
    role: "Check-in Staff",
    status: "active",
    lastActive: "3 hours ago",
  },
];

const roles = [
  {
    name: "Admin",
    description: "Full access to all features",
    permissions: 12,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Manager",
    description: "Manage events and orders",
    permissions: 8,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Staff",
    description: "View and basic operations",
    permissions: 5,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Check-in Staff",
    description: "Check-in only access",
    permissions: 2,
    color: "from-orange-500 to-amber-500",
  },
];

export default function TeamRoles() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Team & Roles</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members and permissions
          </p>
        </div>
        <Button className="gt-gradient-primary border-0 hover:opacity-90 rounded-xl">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md rounded-xl"
          />

          <Card className="gt-card-glow">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <p className="text-sm text-muted-foreground">
                {teamMembers.length} members
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
                          <DropdownMenuItem className="rounded-lg cursor-pointer">
                            <Shield className="h-4 w-4 mr-2" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg cursor-pointer">
                            <Mail className="h-4 w-4 mr-2" />
                            Resend Invite
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
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
            <CardTitle>Roles</CardTitle>
            <p className="text-sm text-muted-foreground">Permission levels</p>
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
                  permissions
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
