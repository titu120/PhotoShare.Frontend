import { useState } from "react";
import { Link } from "react-router-dom";
import { toggleLike } from "../services/likeService";
import { timeAgo } from "../utils/timeAgo";
import { useToast } from "../context/ToastContext";

function PostCard({ post }) {
  const [liked, setLiked] = useState(post.isLikedByCurrentUser || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const { showToast } = useToast();

  const handleLikeClick = async () => {
    try {
      const result = await toggleLike(post.id);
      setLiked(result.liked);
      setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1));
      showToast(result.liked ? "Like দেওয়া হয়েছে" : "Unlike করা হয়েছে");
    } catch (err) {
      console.error("Like দিতে সমস্যা হয়েছে", err);
    }
  };

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

      <Link to={`/posts/${post.id}`}>
        <img src={post.imageUrl} alt="post" className="post-image" />
      </Link>

      <div className="post-body">
        <p className="post-caption">{post.caption}</p>

        <div className="post-actions">
          <button onClick={handleLikeClick} className={`like-btn ${liked ? "liked" : ""}`}>
            {liked ? "❤️" : "🤍"} {likeCount}
          </button>
          <Link to={`/posts/${post.id}`} className="comment-btn">
            💬 {post.commentCount || 0}
          </Link>
        </div>

        <p className="text-muted post-time">{timeAgo(post.createdAt)}</p>
      </div>
    </div>
  );
}

export default PostCard;