import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../services/postService";
import { getPostComments, createComment, deleteComment } from "../services/commentService";
import { toggleLike } from "../services/likeService";
import { timeAgo } from "../utils/timeAgo";
import { getToken } from "../services/authService";

function getCurrentUserId() {
  const token = getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || payload.sub;
}

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentUserId = getCurrentUserId();

  useEffect(() => {
    const loadData = async () => {
      try {
        const postData = await getPostById(id);
        const commentsData = await getPostComments(id);
        setPost(postData);
        setComments(commentsData);
        setLiked(postData.isLikedByCurrentUser);
        setLikeCount(postData.likeCount);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleLikeClick = async () => {
    const result = await toggleLike(id);
    setLiked(result.liked);
    setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const created = await createComment(id, newComment);
    setComments((prev) => [...prev, created]);
    setNewComment("");
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  if (loading) return <div className="container"><p className="text-muted">Loading...</p></div>;
  if (!post) return <div className="container"><p>Post পাওয়া যায়নি</p></div>;

  return (
    <div className="container">
      <div className="card post-detail-card">
        <img src={post.imageUrl} alt="post" className="post-image" />
        <div className="post-body">
          <p className="post-caption">{post.caption}</p>
          <button onClick={handleLikeClick} className={`like-btn ${liked ? "liked" : ""}`}>
            {liked ? "❤️" : "🤍"} {likeCount}
          </button>
          <p className="text-muted post-time">{timeAgo(post.createdAt)}</p>

          {/* শুধু নিজের Post হলে Edit বাটন দেখাবে */}
          {post.userId === currentUserId && (
            <Link to={`/posts/${post.id}/edit`} className="btn btn-outline edit-post-btn">
              Edit করুন
            </Link>
          )}
        </div>
      </div>

      <div className="comments-section">
        <h3>মন্তব্যসমূহ</h3>

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="একটা মন্তব্য লিখুন..."
            className="form-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Post</button>
        </form>

        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <img
              src={c.profilePictureUrl || "https://via.placeholder.com/32"}
              alt="avatar"
              className="comment-avatar"
            />
            <div className="comment-content">
              <span className="comment-username">{c.username}</span>
              <p>{c.content}</p>
              <span className="text-muted">{timeAgo(c.createdAt)}</span>
            </div>
            {c.userId === currentUserId && (
              <button onClick={() => handleDeleteComment(c.id)} className="comment-delete-btn">
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostDetailPage;