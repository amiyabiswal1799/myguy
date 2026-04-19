export type {
  AICompanion,
  Comment,
  CommentId,
  CompanionId,
  CreateCommentInput,
  CreateCompanionInput,
  CreatePostInput,
  Message,
  MessageId,
  Post,
  PostId,
  RegisterInput,
  ShoppingItem,
  StripeConfiguration,
  StripeSessionStatus,
  Timestamp,
  UpdateProfileInput,
  UserId,
  UserProfile,
} from "../backend";

export {
  PersonalityType,
  SubscriptionTier,
  UserRole,
  Variant_user_assistant,
} from "../backend";

import { PersonalityType } from "../backend";

export type NavItem = {
  to: string;
  label: string;
  icon: string;
  requiresAuth?: boolean;
  adminOnly?: boolean;
};

export type PersonalityConfig = {
  type: PersonalityType;
  label: string;
  color: string;
  bgClass: string;
  textClass: string;
  dotClass: string;
  description: string;
};

export const PERSONALITY_CONFIGS: Record<PersonalityType, PersonalityConfig> = {
  [PersonalityType.friendly]: {
    type: PersonalityType.friendly,
    label: "Friendly",
    color: "oklch(var(--personality-friendly))",
    bgClass: "bg-personality-friendly",
    textClass: "personality-friendly",
    dotClass: "bg-personality-friendly",
    description: "Warm, upbeat, and always supportive",
  },
  [PersonalityType.romantic]: {
    type: PersonalityType.romantic,
    label: "Romantic",
    color: "oklch(var(--personality-romantic))",
    bgClass: "bg-personality-romantic",
    textClass: "personality-romantic",
    dotClass: "bg-personality-romantic",
    description: "Affectionate, poetic, and emotionally deep",
  },
  [PersonalityType.mentor]: {
    type: PersonalityType.mentor,
    label: "Mentor",
    color: "oklch(var(--personality-mentor))",
    bgClass: "bg-personality-mentor",
    textClass: "personality-mentor",
    dotClass: "bg-personality-mentor",
    description: "Wise, patient, and growth-focused",
  },
  [PersonalityType.businessCoach]: {
    type: PersonalityType.businessCoach,
    label: "Business Coach",
    color: "oklch(var(--personality-business))",
    bgClass: "bg-personality-business",
    textClass: "personality-business",
    dotClass: "bg-personality-business",
    description: "Strategic, direct, and results-driven",
  },
};
