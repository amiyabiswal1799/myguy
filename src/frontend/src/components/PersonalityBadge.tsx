import { cn } from "@/lib/utils";
import { PERSONALITY_CONFIGS, type PersonalityType } from "../lib/types";

interface PersonalityBadgeProps {
  type: PersonalityType;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

export function PersonalityBadge({
  type,
  size = "md",
  showLabel = true,
  className,
}: PersonalityBadgeProps) {
  const config = PERSONALITY_CONFIGS[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-body font-medium",
        size === "sm" ? "text-xs" : "text-sm",
        className,
      )}
    >
      <span
        className={cn(
          "rounded-full flex-shrink-0",
          config.dotClass,
          size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2",
        )}
        style={{ backgroundColor: config.color }}
      />
      {showLabel && <span style={{ color: config.color }}>{config.label}</span>}
    </span>
  );
}

interface PersonalityCardBadgeProps {
  type: PersonalityType;
  className?: string;
}

export function PersonalityCardBadge({
  type,
  className,
}: PersonalityCardBadgeProps) {
  const config = PERSONALITY_CONFIGS[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border",
        className,
      )}
      style={{
        color: config.color,
        borderColor: `${config.color}40`,
        backgroundColor: `${config.color}15`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}
