import { cn } from "@/lib/utils";
import { SubscriptionTier } from "../lib/types";

interface SubscriptionBadgeProps {
  tier: SubscriptionTier;
  size?: "sm" | "md";
  className?: string;
}

export function SubscriptionBadge({
  tier,
  size = "sm",
  className,
}: SubscriptionBadgeProps) {
  const isPro = tier === SubscriptionTier.pro;

  return (
    <span
      className={cn(
        "inline-flex items-center font-display font-semibold rounded-full tracking-wide",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        isPro
          ? "bg-primary/20 text-primary border border-primary/40"
          : "bg-muted text-muted-foreground border border-border",
        className,
      )}
      data-ocid="subscription.badge"
    >
      {isPro ? "PRO" : "FREE"}
    </span>
  );
}
