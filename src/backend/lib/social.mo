import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Common "../types/common";
import Types "../types/social";
import UserTypes "../types/users";

module {
  // ── helpers ──────────────────────────────────────────────────────────

  func requireNotBanned(
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Principal,
  ) {
    switch (users.get(caller)) {
      case (?u) {
        if (u.isBanned) Runtime.trap("Banned users cannot perform this action");
      };
      case null { Runtime.trap("User not registered") };
    };
  };

  // Compare two posts by createdAt descending (most recent first).
  func comparePostDesc(a : Types.Post, b : Types.Post) : { #less; #equal; #greater } {
    Int.compare(b.createdAt, a.createdAt);
  };

  // ── public functions ──────────────────────────────────────────────────

  public func createPost(
    posts : Map.Map<Common.PostId, Types.Post>,
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    nextId : { var value : Nat },
    caller : Principal,
    input : Types.CreatePostInput,
  ) : Types.Post {
    requireNotBanned(users, caller);
    let len = input.content.size();
    if (len < 1 or len > 280) {
      Runtime.trap("Post content must be between 1 and 280 characters");
    };
    let id = nextId.value;
    nextId.value += 1;
    let post : Types.Post = {
      id;
      authorPrincipal = caller;
      content = input.content;
      likesCount = 0;
      commentsCount = 0;
      createdAt = Time.now();
    };
    posts.add(id, post);
    post;
  };

  public func getPosts(
    posts : Map.Map<Common.PostId, Types.Post>,
    authorId : Common.UserId,
  ) : [Types.Post] {
    let result = List.empty<Types.Post>();
    for ((_, post) in posts.entries()) {
      if (Principal.equal(post.authorPrincipal, authorId)) {
        result.add(post);
      };
    };
    result.sortInPlace(comparePostDesc);
    result.toArray();
  };

  public func getFeedPosts(
    posts : Map.Map<Common.PostId, Types.Post>,
    follows : Map.Map<Common.UserId, Set.Set<Common.UserId>>,
    caller : Principal,
  ) : [Types.Post] {
    // Collect the set of users the caller follows.
    let followedSet : Set.Set<Principal> = switch (follows.get(caller)) {
      case (?s) s;
      case null Set.empty<Principal>();
    };
    // Gather posts from followed users.
    let result = List.empty<Types.Post>();
    for ((_, post) in posts.entries()) {
      if (followedSet.contains(post.authorPrincipal)) {
        result.add(post);
      };
    };
    result.sortInPlace(comparePostDesc);
    // Take at most 50.
    result.sliceToArray(0, 50);
  };

  public func likePost(
    posts : Map.Map<Common.PostId, Types.Post>,
    postLikes : Map.Map<Common.PostId, Set.Set<Principal>>,
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    caller : Principal,
    postId : Common.PostId,
  ) : () {
    requireNotBanned(users, caller);
    let post = switch (posts.get(postId)) {
      case (?p) p;
      case null Runtime.trap("Post not found");
    };
    // Get or create the likes set for this post.
    let likes : Set.Set<Principal> = switch (postLikes.get(postId)) {
      case (?s) s;
      case null {
        let s = Set.empty<Principal>();
        postLikes.add(postId, s);
        s;
      };
    };
    let alreadyLiked = likes.contains(caller);
    if (alreadyLiked) {
      // Unlike
      likes.remove(caller);
      posts.add(postId, { post with likesCount = Nat.sub(post.likesCount, 1) });
    } else {
      // Like
      likes.add(caller);
      posts.add(postId, { post with likesCount = post.likesCount + 1 });
    };
  };

  public func commentPost(
    posts : Map.Map<Common.PostId, Types.Post>,
    comments : Map.Map<Common.PostId, List.List<Types.Comment>>,
    users : Map.Map<Common.UserId, UserTypes.UserProfile>,
    nextId : { var value : Nat },
    caller : Principal,
    postId : Common.PostId,
    input : Types.CreateCommentInput,
  ) : Types.Comment {
    requireNotBanned(users, caller);
    if (input.content.size() < 1) {
      Runtime.trap("Comment content cannot be empty");
    };
    let post = switch (posts.get(postId)) {
      case (?p) p;
      case null Runtime.trap("Post not found");
    };
    let id = nextId.value;
    nextId.value += 1;
    let comment : Types.Comment = {
      id;
      postId;
      authorPrincipal = caller;
      content = input.content;
      createdAt = Time.now();
    };
    // Get or create the comment list for this post.
    let postComments : List.List<Types.Comment> = switch (comments.get(postId)) {
      case (?l) l;
      case null {
        let l = List.empty<Types.Comment>();
        comments.add(postId, l);
        l;
      };
    };
    postComments.add(comment);
    posts.add(postId, { post with commentsCount = post.commentsCount + 1 });
    comment;
  };

  public func getComments(
    comments : Map.Map<Common.PostId, List.List<Types.Comment>>,
    postId : Common.PostId,
  ) : [Types.Comment] {
    switch (comments.get(postId)) {
      case (?list) {
        let sorted = list.sort(func(a : Types.Comment, b : Types.Comment) : { #less; #equal; #greater } {
          Int.compare(a.createdAt, b.createdAt)
        });
        sorted.toArray();
      };
      case null [];
    };
  };
};
