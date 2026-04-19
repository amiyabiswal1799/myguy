import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/social";
import UserTypes "../types/users";
import SocialLib "../lib/social";

mixin (
  accessControlState : AccessControl.AccessControlState,
  posts : Map.Map<Common.PostId, Types.Post>,
  comments : Map.Map<Common.PostId, List.List<Types.Comment>>,
  postLikes : Map.Map<Common.PostId, Set.Set<Common.UserId>>,
  follows : Map.Map<Common.UserId, Set.Set<Common.UserId>>,
  users : Map.Map<Common.UserId, UserTypes.UserProfile>,
  nextPostId : { var value : Nat },
  nextCommentId : { var value : Nat },
) {
  public shared ({ caller }) func createPost(input : Types.CreatePostInput) : async Types.Post {
    SocialLib.createPost(posts, users, nextPostId, caller, input);
  };

  public query func getPosts(authorId : Common.UserId) : async [Types.Post] {
    SocialLib.getPosts(posts, authorId);
  };

  public query ({ caller }) func getFeedPosts() : async [Types.Post] {
    SocialLib.getFeedPosts(posts, follows, caller);
  };

  public shared ({ caller }) func likePost(postId : Common.PostId) : async () {
    SocialLib.likePost(posts, postLikes, users, caller, postId);
  };

  public shared ({ caller }) func commentPost(postId : Common.PostId, input : Types.CreateCommentInput) : async Types.Comment {
    SocialLib.commentPost(posts, comments, users, nextCommentId, caller, postId, input);
  };

  public query func getComments(postId : Common.PostId) : async [Types.Comment] {
    SocialLib.getComments(comments, postId);
  };
};
