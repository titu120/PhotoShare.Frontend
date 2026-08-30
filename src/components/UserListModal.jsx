import { Link } from "react-router-dom";

function UserListModal({ title, users, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <div className="modal-body">
          {users.length === 0 && <p className="text-muted">কেউ নেই</p>}

          {users.map((u) => (
            <Link
              to={`/profile/${u.id}`}
              key={u.id}
              className="modal-user-item"
              onClick={onClose}
            >
              <img
                src={u.profilePictureUrl || "https://via.placeholder.com/36"}
                alt="avatar"
                className="post-avatar"
              />
              <span>{u.userName}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserListModal;