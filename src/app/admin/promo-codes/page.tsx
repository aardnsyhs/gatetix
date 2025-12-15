"use client";

import { useState } from "react";
import { Plus, Copy, MoreVertical, Edit, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const promoCodes = [
  {
    id: 1,
    code: "SUMMER20",
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
    discount: "$10",
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
    code: "WELCOME",
    discount: "$5",
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

  const filteredCodes = promoCodes.filter((code) =>
    code.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
          <h1 className="text-2xl sm:text-3xl font-bold">Promo Codes</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage discount codes
          </p>
        </div>
        <Button className="gt-gradient-primary border-0 hover:opacity-90 rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Create Code
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Search promo codes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md rounded-xl"
      />

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
                    <DropdownMenuItem className="rounded-lg cursor-pointer">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
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
                    <span className="text-muted-foreground">Usage</span>
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
                    Expires:{" "}
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
    </div>
  );
}
