import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";

function CreatePostPage() {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createPost(caption, imageUrl);
      navigate("/");   // তৈরি হলে Feed এ পাঠানো
    } catch (err) {
      setError("Post তৈরি করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="page-title">নতুন Post</h1>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Image URL"
            className="form-input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <textarea
            placeholder="Caption লিখুন..."
            className="form-input"
            rows="4"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {imageUrl && (
            <img src={imageUrl} alt="preview" className="create-post-preview" />
          )}

          <button type="submit" className="btn btn-primary auth-submit">
            Post করুন
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;