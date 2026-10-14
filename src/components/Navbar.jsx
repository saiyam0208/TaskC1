import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext.jsx";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const displayName =
    user?.displayName ||
    (user?.email?.toLowerCase().startsWith("saiyam")
      ? "Saiyam Sharma"
      : user?.email?.split("@")[0]) ||
    "User";

  async function handleLogout() {
    try {
      await logout();
      setProfileOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  function scrollToSection(section) {
    setProfileOpen(false);

    if (window.location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 250);
    } else {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim().toLowerCase();
    if (!query) return;

    if (query.includes("post")) {
      navigate("/post");
      return;
    }

    const section = query.includes("article")
      ? "articles"
      : query.includes("tutorial") || query.includes("skill")
        ? "tutorials"
        : query.includes("gallery") || query.includes("photo")
          ? "gallery"
          : query.includes("work") || query.includes("portfolio")
            ? "work"
            : "about";

    scrollToSection(section);
  }

  const navigationItems = [
    { label: "About Me", id: "about" },
    { label: "My Work", id: "work" },
    { label: "Articles", id: "articles" },
    { label: "Tutorials", id: "tutorials" },
    { label: "Gallery", id: "gallery" },
  ];

  return (
    <header className="site-navbar">
      <div className="site-navbar-inner">
        <Link to="/" className="site-brand">
          <span>DEV</span>@Deakin
        </Link>

        <nav className="site-nav-links" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <form className="site-search" onSubmit={handleSearch}>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search articles..."
            aria-label="Search website"
          />
        </form>

        <button
          type="button"
          className="site-post-button"
          onClick={() => navigate("/post")}
        >
          <span aria-hidden="true">＋</span> Post
        </button>

        {!loading &&
          (user ? (
            <div className="site-profile">
              <button
                type="button"
                className="site-profile-button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
              >
                <span className="site-avatar">
                  {displayName.charAt(0).toUpperCase()}
                </span>

                <span className="site-profile-name">{displayName}</span>
                <span className="site-profile-arrow">⌄</span>
              </button>

              {profileOpen && (
                <div className="site-profile-dropdown">
                  <strong>{displayName}</strong>
                  <p>{user.email}</p>
                  <button type="button" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="site-signin-button">
              Sign In
            </Link>
          ))}
      </div>
    </header>
  );
}