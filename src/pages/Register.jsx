import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, firebaseConfigured } from '../services/firebase.js';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (!/^[A-Za-z ]{5,25}$/.test(fullName.trim())) {
      setError('Full name must be 5–25 characters and contain only letters and spaces.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!firebaseConfigured || !auth || !db) {
      setError('Firebase is not configured yet. Add your Firebase values to .env and restart the dev server.');
      return;
    }
    setBusy(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: fullName.trim() });
      await setDoc(doc(db, 'users', credential.user.uid), {
        fullName: fullName.trim(),
        email: email.trim(),
        createdAt: serverTimestamp(),
      });
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use'
        ? 'This email is already registered. Please log in.'
        : (err.message || 'Unable to register. Please try again.'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create account</h1>
        <p>Register for DEV@Deakin.</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <label htmlFor="register-name">Full name</label>
        <input id="register-name" value={fullName} onChange={e => setFullName(e.target.value)} minLength={5} maxLength={25} pattern="[A-Za-z ]{5,25}" autoComplete="name" required />
        <label htmlFor="register-email">Email</label>
        <input id="register-email" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
        <label htmlFor="register-password">Password</label>
        <input id="register-password" type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} autoComplete="new-password" required />
        <label htmlFor="register-confirm">Confirm password</label>
        <input id="register-confirm" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" required />
        <button type="submit" disabled={busy}>{busy ? 'Creating account…' : 'Register'}</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}
