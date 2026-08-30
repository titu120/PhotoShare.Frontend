import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserProfile, getUserPosts } from "../services/userService";
import { followUser, unfollowUser, getFollowers, getFollowing } from "../services/followService";
import { getToken } from "../services/authService";
import UserListModal from "../components/UserListModal";

function getCurrentUserId() {
  const token = getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || payload.sub;
}

function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [modalUsers, setModalUsers] = useState([]);

  const currentUserId = getCurrentUserId();
  const isOwnProfile = id === currentUserId;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await getUserProfile(id);
        const postsData = await getUserPosts(id);
        setProfile(profileData);
        setPosts(postsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [id]);

  const handleFollowToggle = async () => {
    if (profile.isFollowedByCurrentUser) {
      await unfollowUser(id);
    } else {
      await followUser(id);
    }
    // Profile তথ্য আবার লোড করে সংখ্যা আপডেট করা
    const updated = await getUserProfile(id);
    setProfile(updated);
  };

  const openFollowersModal = async () => {
    const data = await getFollowers(id);
    setModalUsers(data);
    setShowFollowers(true);
  };

  const openFollowingModal = async () => {
    const data = await getFollowing(id);
    setModalUsers(data);
    setShowFollowing(true);
  };

  if (loading) return <div className="container"><p className="text-muted">Loading...</p></div>;
  if (!profile) return <div className="container"><p>User পাওয়া যায়নি</p></div>;

  return (
    <div className="container">
      <div className="profile-header card">
        <div className="profile-cover"></div>
        <img
          src={profile.profilePictureUrl || "https://via.placeholder.com/100"}
          alt="avatar"
          className="profile-avatar"
        />
        <h2>{profile.userName}</h2>
        <p className="text-muted">{profile.bio || "কোনো Bio নেই"}</p>

        <div className="profile-stats">
          <div>
            <strong>{posts.length}</strong>
            <span className="text-muted"> Posts</span>
          </div>
          <div onClick={openFollowersModal} className="profile-stat-clickable">
            <strong>{profile.followersCount}</strong>
            <span className="text-muted"> Followers</span>
          </div>
          <div onClick={openFollowingModal} className="profile-stat-clickable">
            <strong>{profile.followingCount}</strong>
            <span className="text-muted"> Following</span>
          </div>
        </div>

        {isOwnProfile ? (
          <Link to="/edit-profile" className="btn btn-outline">Edit Profile</Link>
        ) : (
          <button
            onClick={handleFollowToggle}
            className={`btn ${profile.isFollowedByCurrentUser ? "btn-outline" : "btn-primary"}`}
          >
            {profile.isFollowedByCurrentUser ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      <div className="profile-grid">
        {posts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id} className="profile-grid-item">
            <img src={post.imageUrl} alt="post" />
          </Link>
        ))}
      </div>

      {showFollowers && (
        <UserListModal
          title="Followers"
          users={modalUsers}
          onClose={() => setShowFollowers(false)}
        />
      )}
      {showFollowing && (
        <UserListModal
          title="Following"
          users={modalUsers}
          onClose={() => setShowFollowing(false)}
        />
      )}
    </div>
  );
}

export default ProfilePage;