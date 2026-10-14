# DEV@Deakin — SIT313 P4

## What is included
- Original uploaded homepage components are copied into `src/components/` unchanged, with the original `Navbar.jsx` also retained as `Navbar.original.jsx`.
- React Router routes for Home, Login and Register.
- Firebase Authentication and Firestore profile storage.
- Form validation and `.env.example`.

## Run locally
1. Install Node.js (use a current LTS version).
2. Copy `.env.example` to `.env` and enter the Firebase web-app configuration.
3. In Firebase Console, enable Authentication > Sign-in method > Email/Password and create a Cloud Firestore database.
4. In a terminal opened in this folder run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL printed by Vite.

## Important
- Do not commit `.env`; it is ignored by Git.
- The original uploaded components refer to image files under `public/images/`. Copy your original `public/images` folder into this project to restore those images.
- Registration creates an Authentication account and stores only name/email/timestamp in Firestore. Passwords are handled by Firebase Authentication, not written to Firestore.
- Newsletter form retains the original alert-based subscription behavior; it does not persist subscriptions to a backend.
