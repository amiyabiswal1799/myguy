import type { Backend } from "../backend";
import type {
  AICompanion,
  Comment,
  CompanionId,
  CreateCommentInput,
  CreateCompanionInput,
  CreatePostInput,
  ExternalBlob,
  Message,
  Post,
  PostId,
  RegisterInput,
  ShoppingItem,
  StripeConfiguration,
  StripeSessionStatus,
  SubscriptionTier,
  UpdateProfileInput,
  UserId,
  UserProfile,
} from "../backend";

/**
 * Thin typed wrappers around the auto-generated bindgen actor.
 */

export async function registerUser(actor: Backend, input: RegisterInput): Promise<UserProfile> {
  return actor.registerUser(input);
}

export async function getUser(actor: Backend, userId: UserId): Promise<UserProfile | null> {
  return actor.getUser(userId);
}

export async function updateProfile(actor: Backend, input: UpdateProfileInput): Promise<UserProfile> {
  return actor.updateProfile(input);
}

export async function updateAvatar(actor: Backend, avatar: ExternalBlob): Promise<void> {
  return actor.updateAvatar(avatar);
}

export async function followUser(actor: Backend, target: UserId): Promise<void> {
  return actor.followUser(target);
}

export async function unfollowUser(actor: Backend, target: UserId): Promise<void> {
  return actor.unfollowUser(target);
}

export async function getFollowers(actor: Backend, userId: UserId): Promise<UserId[]> {
  return actor.getFollowers(userId);
}

export async function getFollowing(actor: Backend, userId: UserId): Promise<UserId[]> {
  return actor.getFollowing(userId);
}

export async function getSubscriptionStatus(actor: Backend): Promise<SubscriptionTier> {
  return actor.getSubscriptionStatus();
}

export async function upgradeToPro(actor: Backend): Promise<void> {
  return actor.upgradeToPro();
}

export async function createCompanion(actor: Backend, input: CreateCompanionInput): Promise<AICompanion> {
  return actor.createCompanion(input);
}

export async function getCompanion(actor: Backend, companionId: CompanionId): Promise<AICompanion | null> {
  return actor.getCompanion(companionId);
}

export async function getCompanions(actor: Backend): Promise<AICompanion[]> {
  return actor.getCompanions();
}

export async function deleteCompanion(actor: Backend, companionId: CompanionId): Promise<void> {
  return actor.deleteCompanion(companionId);
}

export async function sendMessage(actor: Backend, companionId: CompanionId, content: string): Promise<Message> {
  return actor.sendMessage(companionId, content);
}

export async function getMessages(actor: Backend, companionId: CompanionId): Promise<Message[]> {
  return actor.getMessages(companionId);
}

export async function getAIUsageCount(actor: Backend): Promise<bigint> {
  return actor.getAIUsageCount();
}

export async function createPost(actor: Backend, input: CreatePostInput): Promise<Post> {
  return actor.createPost(input);
}

export async function getPosts(actor: Backend, authorId: UserId): Promise<Post[]> {
  return actor.getPosts(authorId);
}

export async function getFeedPosts(actor: Backend): Promise<Post[]> {
  return actor.getFeedPosts();
}

export async function likePost(actor: Backend, postId: PostId): Promise<void> {
  return actor.likePost(postId);
}

export async function commentPost(actor: Backend, postId: PostId, input: CreateCommentInput): Promise<Comment> {
  return actor.commentPost(postId, input);
}

export async function getComments(actor: Backend, postId: PostId): Promise<Comment[]> {
  return actor.getComments(postId);
}

export async function adminGetUsers(actor: Backend): Promise<UserProfile[]> {
  return actor.adminGetUsers();
}

export async function adminFlagUser(actor: Backend, targetId: UserId): Promise<void> {
  return actor.adminFlagUser(targetId);
}

export async function adminBanUser(actor: Backend, targetId: UserId): Promise<void> {
  return actor.adminBanUser(targetId);
}

export async function isStripeConfigured(actor: Backend): Promise<boolean> {
  return actor.isStripeConfigured();
}

export async function setStripeConfiguration(actor: Backend, config: StripeConfiguration): Promise<void> {
  return actor.setStripeConfiguration(config);
}

export async function createCheckoutSession(
  actor: Backend,
  items: ShoppingItem[],
  successUrl: string,
  cancelUrl: string
): Promise<string> {
  return actor.createCheckoutSession(items, successUrl, cancelUrl);
}

export async function getStripeSessionStatus(actor: Backend, sessionId: string): Promise<StripeSessionStatus> {
  return actor.getStripeSessionStatus(sessionId);
}

export async function setOpenAiApiKey(actor: Backend, apiKey: string): Promise<void> {
  return actor.setOpenAiApiKey(apiKey);
}

export async function isCallerAdmin(actor: Backend): Promise<boolean> {
  return actor.isCallerAdmin();
}
