import { useState } from "react";
import { Plus, Copy, MoreVertical, Edit, Trash2, Check } from "lucide-react";

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
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

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
        return "gt-badge-success";
      case "exhausted":
        return "gt-badge-muted";
      case "expired":
        return "gt-badge-danger";
      default:
        return "gt-badge-muted";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Promo Codes</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage discount codes
          </p>
        </div>
        <button className="gt-btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Code
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search promo codes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="gt-input-search max-w-md"
      />

      {/* Promo Codes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCodes.map((promo) => (
          <div key={promo.id} className="gt-card-flat p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <code className="px-3 py-1.5 bg-muted rounded-lg text-sm font-mono font-semibold">
                  {promo.code}
                </code>
                <button
                  onClick={() => copyCode(promo.id, promo.code)}
                  className="gt-icon-btn"
                >
                  {copiedId === promo.id ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="relative">
                <button
                  className="gt-icon-btn"
                  onClick={() =>
                    setActiveMenu(activeMenu === promo.id ? null : promo.id)
                  }
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                {activeMenu === promo.id && (
                  <div className="gt-dropdown absolute right-0 top-full mt-1 w-36 py-1 animate-scale-in z-10">
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted transition-smooth">
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-smooth">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {promo.discount}
                </span>
                <span className={`gt-badge ${getStatusStyle(promo.status)}`}>
                  {promo.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Usage</span>
                  <span className="font-medium">
                    {promo.used} / {promo.usageLimit}
                  </span>
                </div>
                <div className="gt-progress">
                  <div
                    className="gt-progress-bar"
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
          </div>
        ))}
      </div>
    </div>
  );
}
