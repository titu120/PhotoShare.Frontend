import { useState } from "react";
import { searchPosts } from "../services/postService";
import PostCard from "../components/PostCard";

function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchPosts(keyword);
    setResults(data);
    setSearched(true);
  };

  return (
    <div className="container">
      <h1 className="page-title">Search</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Caption দিয়ে খুঁজুন..."
          className="form-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">খুঁজুন</button>
      </form>

      {searched && results.length === 0 && (
        <p className="text-muted">কোনো Post পাওয়া যায়নি</p>
      )}

      {results.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default SearchPage;