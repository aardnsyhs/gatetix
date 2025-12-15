import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Copy, MoreVertical } from "lucide-react";
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
];

export default function PromoCodes() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCodes = promoCodes.filter((code) =>
    code.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "exhausted":
        return "secondary";
      case "expired":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-sans font-bold text-foreground">
            Promo Codes
          </h1>
          <p className="text-muted-foreground font-body">
            Create and manage discount codes
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
          <Plus className="mr-2 h-4 w-4" strokeWidth={2} />
          Create Code
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
          strokeWidth={2}
        />
        <Input
          placeholder="Search promo codes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background text-foreground border-input"
        />
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Code</TableHead>
                <TableHead className="text-muted-foreground">
                  Discount
                </TableHead>
                <TableHead className="text-muted-foreground">Usage</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Expires</TableHead>
                <TableHead className="text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCodes.map((promo) => (
                <TableRow key={promo.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-muted rounded text-sm font-mono text-foreground">
                        {promo.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 bg-transparent text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="h-3 w-3" strokeWidth={2} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {promo.discount}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {promo.used} / {promo.usageLimit}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(promo.status)}>
                      {promo.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {promo.expires}
                  </TableCell>
                  <TableCell>
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
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Deactivate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
