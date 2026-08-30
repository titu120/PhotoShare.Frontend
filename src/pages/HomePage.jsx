import { useState, useEffect } from "react";
import { getFeed, getCombinedFeed } from "../services/postService";
import { getSuggestedUsers } from "../services/followService";
import { getToken } from "../services/authService";
import PostCard from "../components/PostCard";
import PostSkeleton from "../components/Skeleton";
import { Link } from "react-router-dom";

function getCurrentUserId() {
  const token = getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || payload.sub;
}

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [showCombined, setShowCombined] = useState(false);   // Toggle state
  const [suggested, setSuggested] = useState([]);

  const currentUserId = getCurrentUserId();

  const loadFeed = async (pageNumber, combined) => {
    try {
      setLoading(true);
      const data = combined
        ? await getCombinedFeed(pageNumber, 10)
        : await getFeed(pageNumber, 10);

      if (pageNumber === 1) {
        setPosts(data);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }
    } catch (err) {
      setError("Feed লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadFeed(1, showCombined);
  }, [showCombined]);

  useEffect(() => {
    const loadSuggested = async () => {
      if (currentUserId) {
        const data = await getSuggestedUsers(currentUserId);
        setSuggested(data);
      }
    };
    loadSuggested();
  }, [currentUserId]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadFeed(nextPage, showCombined);
  };

  return (
    <div className="container">
      <div className="feed-header">
        <h1 className="page-title">Feed</h1>
        <div className="feed-toggle">
          <button
            className={!showCombined ? "toggle-active" : ""}
            onClick={() => setShowCombined(false)}
          >
            শুধু Following
          </button>
          <button
            className={showCombined ? "toggle-active" : ""}
            onClick={() => setShowCombined(true)}
          >
            আমার + Following
          </button>
        </div>
      </div>

      {suggested.length > 0 && (
        <div className="suggested-box card">
          <h4>Suggested Users</h4>
          {suggested.slice(0, 3).map((u) => (
            <Link to={`/profile/${u.id}`} key={u.id} className="suggested-user-item">
              {u.userName}
            </Link>
          ))}
        </div>
      )}

      {error && <p className="auth-error">{error}</p>}

      {loading && posts.length === 0 && (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {!loading && posts.length > 0 && (
        <button onClick={handleLoadMore} className="btn btn-outline load-more-btn">
          Load More
        </button>
      )}

      {!loading && posts.length === 0 && (
        <p className="text-muted">কোনো Post নেই। কাউকে Follow করুন!</p>
      )}
    </div>
  );
}

export default HomePage;