import { Link, useLocation } from "react-router-dom";
function EditorNav() {
  const { pathname } = useLocation();
  const newPath = pathname.substring(0, pathname.lastIndexOf("/"));

  return (
    <nav className="nav nav-tabs mt-2">
      <Link
        to={newPath + "/Details"}
        className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}
      >
        Details
      </Link>
      <Link
        to={newPath + "/Questions"}
        className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}
      >
        Questions
      </Link>
    </nav>
  );
}
export default EditorNav;
