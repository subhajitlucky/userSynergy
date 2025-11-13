# User Manager — React CRUD Demo

User Manager is a TypeScript + React + Vite application that demonstrates a full CRUD workflow against the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) users API.  
It fulfils the assignment requirements by fetching, creating, updating, and deleting users with optimistic UI feedback, robust error states, responsive design, and React Router driven navigation.

---

## ✨ Feature Checklist

| Requirement | Status | Notes |
| ----------- | ------ | ----- |
| Fetch list of users (name, email, phone) | ✅ | `Users` page fetches on mount, mobile cards + desktop table |
| Create user via POST | ✅ | `UserForm` handles optimistic add + success messaging |
| Update user via PUT | ✅ | Inline row editing with prefilled inputs, optimistic merge/rollback |
| Delete user via DELETE | ✅ | Confirmation dialog + optimistic removal/rollback |
| React functional components & hooks | ✅ | `useState`, `useEffect`, `useCallback`, etc. throughout |
| React Router pages (Home, Users, User Detail) | ✅ | See routing in `src/App.tsx` |
| Responsive, styled UI | ✅ | Tailwind, mobile-first layout, dark/light theme toggle |
| Error handling | ✅ | Shared `ErrorAlert` component with retry support |
| Loading states | ✅ (bonus) | `Loader` component for list/detail requests |
| TypeScript usage | ✅ (bonus) | Strict `User` types & typed props |
| Code comments | ✅ | Key flows and API interactions are documented in the codebase |
| GitHub repo & live deployment | ✅ | Repo and live demo links added below |

---

## 🧱 Project Structure

```
src/
├── api/           # Fetch helpers wrapping JSONPlaceholder endpoints
├── components/    # Reusable UI (UserTable, UserForm, Loader, ErrorAlert, Navbar, etc.)
├── pages/         # Route-level screens: Home, Users, UserDetail
├── types/         # Shared TypeScript definitions (User model)
├── App.tsx        # Router + global layout
└── main.tsx       # Vite entry point
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js ≥ 18
- npm (bundled with Node)

### Install dependencies
```bash
npm install
```

### Run the dev server
```bash
npm run dev
```

The Vite server runs on <http://localhost:5173> by default.

### Build for production
```bash
npm run build
npm run preview   # optional: preview the production build locally
```

### Lint
```bash
npm run lint
```

---

## 🌐 API Endpoints

All user operations call JSONPlaceholder:

- `GET https://jsonplaceholder.typicode.com/users`
- `GET https://jsonplaceholder.typicode.com/users/:id`
- `POST https://jsonplaceholder.typicode.com/users`
- `PUT https://jsonplaceholder.typicode.com/users/:id`
- `DELETE https://jsonplaceholder.typicode.com/users/:id`

Because JSONPlaceholder is a mock API, create/update/delete requests echo the request body. The UI performs optimistic updates and rolls back when a network error occurs.

---

## 🧭 Navigation Overview

- `/` — **Home:** Project overview, feature summary, quick links, responsive hero.
- `/users` — **Users:** CRUD hub with loader, error/retry handling, create form, responsive table/cards, inline edit & delete.
- `/users/:id` — **User Detail:** Fetches individual user details with loading & error states.

---

## 🎨 UI & UX Notes

- **Responsive design:** Mobile cards and desktop table share logic but render appropriately for screen size.
- **Dark/Light theme:** Toggle persists to `localStorage` and updates Tailwind `dark` classes.
- **Optimistic UX:** Create, update, and delete mutate state immediately and gracefully recover on failure.
- **Shared feedback:** `Loader` and `ErrorAlert` components ensure consistent UI states.

---

## 🚀 Deployment Guide

1. **Build:** `npm run build`
2. **Preview locally:** `npm run preview`
3. **Deploy:**
   - **Vercel:** Import the GitHub repo, set framework to “Vite/React”, ensure `npm install && npm run build` are used.
   - **Netlify:** Connect repository, set build command `npm run build` and publish directory `dist`.
4. Update this README with:
   - GitHub repository URL
   - Live deployment URL

---

## 🔗 Links

- GitHub Repo: https://github.com/subhajitlucky/userSynergy
- Live Demo: https://usersynergy.vercel.app/

---

## 📄 License

This project is provided as part of the User Management App assignment brief. Feel free to adapt or extend it for learning purposes. 
