function PostCard({ post }) {
  return (
    <div className="post-card card">
      <div className="post-header">
        <img
          src={post.authorProfilePictureUrl || "https://via.placeholder.com/40"}
          alt="avatar"
          className="post-avatar"
        />
        <span className="post-author">{post.authorUsername || post.userId}</span>
      </div>

      <img src={post.imageUrl} alt="post" className="post-image" />

      <div className="post-body">
        <p className="post-caption">{post.caption}</p>
        <div className="post-stats">
          <span>❤️ {post.likeCount}</span>
          <span>💬 {post.commentCount}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;