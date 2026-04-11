import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, FileText, XCircle } from "lucide-react";

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link:
          "text-primary underline-offset-4 hover:underline",
        applied:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        interview:
          "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        offer:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        rejected:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

const STATUS_CONFIG = {
  Applied: { variant: "applied", Icon: FileText },
  Interview: { variant: "interview", Icon: Clock },
  Offer: { variant: "offer", Icon: CheckCircle2 },
  Rejected: { variant: "rejected", Icon: XCircle }
}

function StatusBadge({ status }) {
  const { variant, Icon } = STATUS_CONFIG[status] || STATUS_CONFIG['Applied'];

  return (
    <Badge variant={variant}>
      <Icon size={12} className="mr-1" />
      {status}
    </Badge>
  );
}

export { Badge, badgeVariants, StatusBadge }
