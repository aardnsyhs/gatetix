"use client";

import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AlertVariant = "success" | "error" | "warning" | "info";

interface CustomAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  variant?: AlertVariant;
  actionLabel?: string;
}

const variantConfig = {
  success: {
    icon: CheckCircle2,
    bgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
};

export function CustomAlert({
  open,
  onOpenChange,
  title,
  description,
  variant = "success",
  actionLabel = "Tutup",
}: CustomAlertProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div
            className={`mx-auto w-12 h-12 rounded-full ${config.bgColor} flex items-center justify-center mb-2`}
          >
            <Icon className={`h-6 w-6 ${config.iconColor}`} />
          </div>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction className="gt-gradient-primary border-0 rounded-xl">
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
