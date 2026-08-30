import { useState, useEffect } from "react";
import { getFeed } from "../services/postService";
import PostCard from "../components/PostCard";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  // Feed আনার function
  const loadFeed = async (pageNumber) => {
    try {
      setLoading(true);
      const data = await getFeed(pageNumber, 10);
      if (pageNumber === 1) {
        setPosts(data);
      } else {
        setPosts((prev) => [...prev, ...data]);   // আগের posts এর সাথে নতুনগুলো জোড়া
      }
    } catch (err) {
      setError("Feed লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  // Page প্রথমবার Load হলে Feed আনা হচ্ছে
  useEffect(() => {
    loadFeed(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadFeed(nextPage);
  };

  return (
    <div className="container">
      <h1 className="page-title">Feed</h1>

      {error && <p className="auth-error">{error}</p>}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {loading && <p className="text-muted">Loading...</p>}

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