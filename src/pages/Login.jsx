
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth, firebaseConfigured } from "../services/firebase.js";
import { useAuth } from "../components/authContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <h1>You are signed in</h1>
          <p>Welcome back, {user.displayName || "Saiyam Sharma"}!</p>
          <button type="button" onClick={() => navigate("/")}>
            Go to home
          </button>
        </div>
      </section>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!firebaseConfigured || !auth) {
      setError(
        "Firebase is not configured. Check your .env file and restart the dev server."
      );
      return;
    }

    setBusy(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Set the display name for an existing Saiyam account if missing.
      if (
        !credential.user.displayName &&
        credential.user.email?.toLowerCase().startsWith("saiyam")
      ) {
        await updateProfile(credential.user, {
          displayName: "Saiyam Sharma",
        });
      }

      navigate("/");
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError(
          "Email or password is incorrect. Please try again or register."
        );
      } else {
        setError(err.message || "Unable to sign in. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Sign in to your DEV@Deakin account.</p>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={busy}>
          {busy ? "Signing in..." : "Login"}
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </section>
  );
}
