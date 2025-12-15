import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, UserPlus } from "lucide-react";
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
    avatar: "JA",
  },
  {
    id: 2,
    name: "Jane Manager",
    email: "jane@example.com",
    role: "Manager",
    status: "active",
    avatar: "JM",
  },
  {
    id: 3,
    name: "Bob Staff",
    email: "bob@example.com",
    role: "Staff",
    status: "pending",
    avatar: "BS",
  },
];

const roles = [
  {
    name: "Admin",
    description: "Full access to all features",
    permissions: 12,
  },
  { name: "Manager", description: "Manage events and orders", permissions: 8 },
  { name: "Staff", description: "Check-in and view attendees", permissions: 4 },
];

export default function TeamRoles() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-sans font-bold text-foreground">
            Team & Roles
          </h1>
          <p className="text-muted-foreground font-body">
            Manage team members and permissions
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
          <UserPlus className="mr-2 h-4 w-4" strokeWidth={2} />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              strokeWidth={2}
            />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background text-foreground border-input"
            />
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-body font-medium">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-body font-medium text-foreground">
                        {member.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        member.status === "active" ? "default" : "secondary"
                      }
                    >
                      {member.role}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-transparent text-foreground hover:bg-accent"
                        >
                          <MoreVertical className="h-4 w-4" strokeWidth={2} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-popover text-popover-foreground"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Roles */}
        <Card className="bg-card border-border h-fit">
          <CardHeader>
            <CardTitle className="text-card-foreground">Roles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {roles.map((role) => (
              <div key={role.name} className="p-3 rounded-lg bg-muted">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-body font-medium text-foreground">
                    {role.name}
                  </p>
                  <Badge variant="outline">
                    {role.permissions} permissions
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
