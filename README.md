# 🚀 TaskFlow — Senior Frontend Practical Test

A production-grade task manager built for the **Frontend Developer Practical Test**.
Demonstrates senior-level patterns across the modern React/Next.js ecosystem.

## ✨ Stack

| Layer            | Choice                              | Why                                          |
| ---------------- | ----------------------------------- | -------------------------------------------- |
| Framework        | **Next.js 14** (App Router)         | SSR, file routing, server components         |
| Language         | **TypeScript** (strict)             | Type safety end-to-end                       |
| State (UI)       | **Redux Toolkit**                   | UI state management                          |
| State (server)   | **TanStack Query v5**               | Caching, optimistic updates, devtools        |
| HTTP             | **Axios** + interceptors            | API client, error handling                   |
| Styling          | **Tailwind CSS** + glassmorphism    | Responsive design, theming                   |
| Notifications    | **react-hot-toast**                 | Lightweight UX feedback                      |
| Theming          | **next-themes**                     | System / light / dark                        |
| Tests            | **Jest + React Testing Library**    | Unit + integration tests                     |

## 🏗️ Architecture Highlights

- **SSR + Hydration**: `app/tasks/page.tsx` fetches tasks server-side, then hydrates into TanStack Query.
- **Optimistic Updates**: `useUpdateTask` / `useDeleteTask` mutate cache immediately; rollback on error.
- **Debounced Search**: Custom `useDebounce(value, 300)` hook drives the search filter.
- **Axios Interceptors**: Inject auth token from `localStorage`; map status codes to toasts.
- **Redux × Query Boundary**: Redux owns *UI* state (filters, selection); Query owns *server* state. No overlap.
- **Dark Mode**: Class-based via `next-themes`, no FOUC (`suppressHydrationWarning`).

## 📂 Project Structure

```
task-manager/
├── __tests__/              # Test suites (63 tests)
│   ├── components/tasks/   # Component tests
│   └── hook/               # Hook tests
├── src/
│   ├── app/                # Next.js pages (SSR)
│   ├── components/         # React components
│   │   ├── common/         # UI primitives
│   │   ├── layout/         # Header, theme toggle
│   │   └── tasks/          # Feature components
│   ├── hook/               # Custom hooks
│   ├── lib/                # API, config
│   ├── store/              # Redux + providers
│   └── types/              # TypeScript interfaces
├── test-utils.tsx          # Shared test helpers
└── README.md
```

## 🚦 Getting Started

```bash
cp .env.example .env.local
npm install
npm run dev          # http://localhost:3000
npm test             # Jest
npm run build        # Production build
```

### 🧱 Prerequisites
- Node.js 18+
- npm

### ⚙️ Installation
```bash
git clone <repo-url>
cd task-manager
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 🌐 Environment
```env
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```

## 🧪 Testing

- **Coverage**: 63 tests across 11 suites
- **Hooks**: 6 suites (debounce, filters, tasks, form, detail, item)
- **Components**: 6 suites (dashboard, detail, filters, form, item, list)

Add more by mirroring the structure under `__tests__/`.

```bash
npm test                    # Run all tests
npm test -- --coverage      # With coverage
npm test -- useTaskForm     # Specific test
```

## 🏗️ Build

```bash
npm run build   # Production build
npm run start   # Production server
npm run serve   # Custom port (3003)
```

## 📝 Notes for Reviewers

- API uses **JSONPlaceholder** (`/todos`) — mutations succeed but don't persist server-side. The optimistic cache simulates a real backend, which is the realistic senior-level pattern (your real API will persist).
- All components are **fully responsive** (mobile-first, `sm:`/`md:` breakpoints).
- All interactive elements have **`aria-label`**s and visible focus rings.
- **No prop drilling**: Redux + Query handle cross-component state.
- **No "any" leaks** in production code (a couple of safe casts in `<Select onChange>`).

## 🔮 What I'd Add Next

- Auth flow with refresh-token rotation (interceptor already prepared).
- Pagination / infinite scroll via `useInfiniteQuery`.
- Drag-and-drop reordering with `@dnd-kit`.