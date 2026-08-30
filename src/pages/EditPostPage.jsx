import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost, deletePost } from "../services/postService";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      const post = await getPostById(id);
      setCaption(post.caption);
    };
    loadPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, caption);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError("Update করতে সমস্যা হয়েছে");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate("/");
    } catch (err) {
      setError("Delete করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="page-title">Post Edit করুন</h1>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleUpdate} className="auth-form">
          <textarea
            className="form-input"
            rows="4"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button type="submit" className="btn btn-primary auth-submit">
            Update করুন
          </button>
        </form>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="btn btn-outline delete-post-btn"
        >
          Post মুছে ফেলুন
        </button>

        {showDeleteConfirm && (
          <div className="confirm-popup">
            <p>আপনি কি নিশ্চিত এই Post মুছে ফেলতে চান?</p>
            <div className="confirm-actions">
              <button onClick={handleDelete} className="btn btn-primary">
                হ্যাঁ, মুছে ফেলুন
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-outline"
              >
                বাতিল
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPostPage;