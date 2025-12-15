import {
  Search,
  FileX,
  Users,
  Calendar,
  Receipt,
  Tag,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateVariant =
  | "search"
  | "events"
  | "orders"
  | "attendees"
  | "promo"
  | "logs"
  | "team"
  | "faq";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  searchQuery?: string;
  onReset?: () => void;
  showResetButton?: boolean;
}

const variantConfig: Record<
  EmptyStateVariant,
  { icon: typeof Search; defaultTitle: string; defaultDescription: string }
> = {
  search: {
    icon: Search,
    defaultTitle: "Tidak Ditemukan",
    defaultDescription: "Tidak ada hasil yang sesuai dengan pencarian Anda.",
  },
  events: {
    icon: Calendar,
    defaultTitle: "Event Tidak Ditemukan",
    defaultDescription:
      "Tidak ada event yang sesuai dengan pencarian atau filter Anda.",
  },
  orders: {
    icon: Receipt,
    defaultTitle: "Pesanan Tidak Ditemukan",
    defaultDescription:
      "Tidak ada pesanan yang sesuai dengan pencarian atau filter Anda.",
  },
  attendees: {
    icon: Users,
    defaultTitle: "Peserta Tidak Ditemukan",
    defaultDescription: "Tidak ada peserta yang sesuai dengan pencarian Anda.",
  },
  promo: {
    icon: Tag,
    defaultTitle: "Kode Promo Tidak Ditemukan",
    defaultDescription:
      "Tidak ada kode promo yang sesuai dengan pencarian Anda.",
  },
  logs: {
    icon: FileText,
    defaultTitle: "Log Tidak Ditemukan",
    defaultDescription:
      "Tidak ada log yang sesuai dengan pencarian atau filter Anda.",
  },
  team: {
    icon: Users,
    defaultTitle: "Anggota Tidak Ditemukan",
    defaultDescription:
      "Tidak ada anggota tim yang sesuai dengan pencarian Anda.",
  },
  faq: {
    icon: FileX,
    defaultTitle: "FAQ Tidak Ditemukan",
    defaultDescription:
      "Tidak ada pertanyaan yang sesuai dengan pencarian Anda.",
  },
};

export function EmptyState({
  variant = "search",
  title,
  description,
  searchQuery,
  onReset,
  showResetButton = true,
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">
        {title || config.defaultTitle}
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-4 text-sm">
        {description || config.defaultDescription}
        {searchQuery && (
          <span className="block mt-1">
            Kata kunci:{" "}
            <span className="font-medium">&quot;{searchQuery}&quot;</span>
          </span>
        )}
      </p>
      {showResetButton && onReset && (
        <Button variant="outline" onClick={onReset} className="rounded-xl">
          Reset Pencarian
        </Button>
      )}
    </div>
  );
}
