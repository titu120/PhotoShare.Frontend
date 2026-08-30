import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateMyProfile } from "../services/userService";
import { getToken } from "../services/authService";

function getCurrentUserId() {
  const token = getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || payload.sub;
}

function EditProfilePage() {
  const [bio, setBio] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getUserProfile(currentUserId);
      setBio(profile.bio || "");
      setProfilePictureUrl(profile.profilePictureUrl || "");
    };
    loadProfile();
  }, [currentUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMyProfile(bio, profilePictureUrl);
      navigate(`/profile/${currentUserId}`);
    } catch (err) {
      setError("Update করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="page-title">Profile Edit করুন</h1>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="text-muted">Profile Picture URL</label>
          <input
            type="text"
            className="form-input"
            value={profilePictureUrl}
            onChange={(e) => setProfilePictureUrl(e.target.value)}
          />

          <label className="text-muted">Bio</label>
          <textarea
            className="form-input"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button type="submit" className="btn btn-primary auth-submit">
            Save করুন
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;