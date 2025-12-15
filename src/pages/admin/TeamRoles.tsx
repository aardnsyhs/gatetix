import { useState } from "react";
import { UserPlus, MoreVertical, Shield, Mail, Trash2 } from "lucide-react";

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
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Team & Roles</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members and permissions
          </p>
        </div>
        <button className="gt-btn-primary">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-2 space-y-4">
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gt-input-search max-w-md"
          />

          <div className="gt-card-flat">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold">Team Members</h2>
              <p className="text-sm text-muted-foreground">
                {teamMembers.length} members
              </p>
            </div>
            <div className="divide-y divide-border">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/30 transition-smooth"
                >
                  <div className="flex items-center gap-4">
                    <div className="gt-avatar">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.status === "pending" && (
                          <span className="gt-badge gt-badge-warning">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="gt-badge gt-badge-primary">
                        {member.role}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {member.lastActive}
                      </p>
                    </div>
                    <div className="relative">
                      <button
                        className="gt-icon-btn"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === member.id ? null : member.id
                          )
                        }
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {activeMenu === member.id && (
                        <div className="gt-dropdown absolute right-0 top-full mt-1 w-44 py-1 animate-scale-in z-10">
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted transition-smooth">
                            <Shield className="h-4 w-4" />
                            Change Role
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted transition-smooth">
                            <Mail className="h-4 w-4" />
                            Resend Invite
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-smooth">
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="gt-card-flat h-fit">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold">Roles</h2>
            <p className="text-sm text-muted-foreground">Permission levels</p>
          </div>
          <div className="p-4 space-y-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
