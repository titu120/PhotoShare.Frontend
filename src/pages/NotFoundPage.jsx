import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p className="text-muted">এই পেজটি খুঁজে পাওয়া যায়নি</p>
      <Link to="/" className="btn btn-primary">Home এ ফিরে যান</Link>
    </div>
  );
}

export default NotFoundPage;