// Post loading হওয়ার সময় দেখানোর placeholder
function PostSkeleton() {
  return (
    <div className="card post-card skeleton-card">
      <div className="skeleton skeleton-avatar-row">
        <div className="skeleton-circle"></div>
        <div className="skeleton-line short"></div>
      </div>
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line short"></div>
    </div>
  );
}

export default PostSkeleton;