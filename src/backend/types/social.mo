import Common "common";

module {
  public type Post = {
    id : Common.PostId;
    authorPrincipal : Common.UserId;
    content : Text;
    likesCount : Nat;
    commentsCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type Comment = {
    id : Common.CommentId;
    postId : Common.PostId;
    authorPrincipal : Common.UserId;
    content : Text;
    createdAt : Common.Timestamp;
  };

  public type CreatePostInput = {
    content : Text;
  };

  public type CreateCommentInput = {
    content : Text;
  };
};
