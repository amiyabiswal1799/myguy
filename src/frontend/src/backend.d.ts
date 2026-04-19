import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type PostId = bigint;
export interface CreateCommentInput {
    content: string;
}
export interface CreatePostInput {
    content: string;
}
export interface AICompanion {
    id: CompanionId;
    ownerPrincipal: UserId;
    customTraits: string;
    name: string;
    createdAt: Timestamp;
    personalityType: PersonalityType;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Post {
    id: PostId;
    content: string;
    createdAt: Timestamp;
    commentsCount: bigint;
    likesCount: bigint;
    authorPrincipal: UserId;
}
export interface RegisterInput {
    bio: string;
    name: string;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type CommentId = bigint;
export interface Comment {
    id: CommentId;
    content: string;
    createdAt: Timestamp;
    authorPrincipal: UserId;
    postId: PostId;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface CreateCompanionInput {
    customTraits: string;
    name: string;
    personalityType: PersonalityType;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface UpdateProfileInput {
    bio: string;
    name: string;
}
export type MessageId = bigint;
export interface Message {
    id: MessageId;
    content: string;
    role: Variant_user_assistant;
    companionId: CompanionId;
    timestamp: Timestamp;
}
export type CompanionId = bigint;
export interface UserProfile {
    id: UserId;
    bio: string;
    followersCount: bigint;
    name: string;
    createdAt: Timestamp;
    tier: SubscriptionTier;
    isBanned: boolean;
    isAdmin: boolean;
    followingCount: bigint;
    isFlagged: boolean;
    avatar?: ExternalBlob;
}
export enum PersonalityType {
    mentor = "mentor",
    romantic = "romantic",
    businessCoach = "businessCoach",
    friendly = "friendly"
}
export enum SubscriptionTier {
    pro = "pro",
    free = "free"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_user_assistant {
    user = "user",
    assistant = "assistant"
}
export interface backendInterface {
    adminBanUser(targetId: UserId): Promise<void>;
    adminFlagUser(targetId: UserId): Promise<void>;
    adminGetUsers(): Promise<Array<UserProfile>>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    commentPost(postId: PostId, input: CreateCommentInput): Promise<Comment>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createCompanion(input: CreateCompanionInput): Promise<AICompanion>;
    createPost(input: CreatePostInput): Promise<Post>;
    deleteCompanion(companionId: CompanionId): Promise<void>;
    followUser(target: UserId): Promise<void>;
    getAIUsageCount(): Promise<bigint>;
    getCallerUserRole(): Promise<UserRole>;
    getComments(postId: PostId): Promise<Array<Comment>>;
    getCompanion(companionId: CompanionId): Promise<AICompanion | null>;
    getCompanions(): Promise<Array<AICompanion>>;
    getFeedPosts(): Promise<Array<Post>>;
    getFollowers(userId: UserId): Promise<Array<UserId>>;
    getFollowing(userId: UserId): Promise<Array<UserId>>;
    getMessages(companionId: CompanionId): Promise<Array<Message>>;
    getPosts(authorId: UserId): Promise<Array<Post>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getSubscriptionStatus(): Promise<SubscriptionTier>;
    getUser(userId: UserId): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    likePost(postId: PostId): Promise<void>;
    registerUser(input: RegisterInput): Promise<UserProfile>;
    sendMessage(companionId: CompanionId, content: string): Promise<Message>;
    setOpenAiApiKey(apiKey: string): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    unfollowUser(target: UserId): Promise<void>;
    updateAvatar(avatar: ExternalBlob): Promise<void>;
    updateProfile(input: UpdateProfileInput): Promise<UserProfile>;
    upgradeToPro(): Promise<void>;
}
