import { useState, useEffect } from "react";
import { getExploreFeed } from "../services/postService";
import PostCard from "../components/PostCard";

function ExplorePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExplore = async () => {
      try {
        const data = await getExploreFeed();
        setPosts(data);
      } catch (err) {
        setError("Explore feed লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };
    loadExplore();
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Explore</h1>

      {error && <p className="auth-error">{error}</p>}
      {loading && <p className="text-muted">Loading...</p>}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default ExplorePage;