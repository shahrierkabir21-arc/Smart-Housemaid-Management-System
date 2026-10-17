# Complete source folder structure

This tree includes all tracked source files of the modernized project. Build output, local secrets and dependencies are intentionally excluded.

```text
housemaid-modernized/
    ├── app/
    │   ├── api/
    │   │   ├── applications/
    │   │   │   ├── [id]/
    │   │   │   │   ├── status/
    │   │   │   │   │   └── route.ts
    │   │   │   │   └── route.ts
    │   │   │   ├── admin/
    │   │   │   │   └── route.ts
    │   │   │   ├── employer/
    │   │   │   │   └── route.ts
    │   │   │   ├── my-applications/
    │   │   │   │   └── route.ts
    │   │   │   └── route.ts
    │   │   ├── auth/
    │   │   │   ├── login/
    │   │   │   │   └── route.ts
    │   │   │   ├── logout/
    │   │   │   │   └── route.ts
    │   │   │   ├── me/
    │   │   │   │   └── route.ts
    │   │   │   └── register/
    │   │   │       └── route.ts
    │   │   ├── jobs/
    │   │   │   ├── [id]/
    │   │   │   │   ├── status/
    │   │   │   │   │   └── route.ts
    │   │   │   │   └── route.ts
    │   │   │   ├── admin/
    │   │   │   │   └── route.ts
    │   │   │   ├── mine/
    │   │   │   │   └── route.ts
    │   │   │   └── route.ts
    │   │   ├── maids/
    │   │   │   ├── [id]/
    │   │   │   │   └── route.ts
    │   │   │   └── route.ts
    │   │   ├── pusher/
    │   │   │   └── auth/
    │   │   │       └── route.ts
    │   │   └── users/
    │   │       ├── [id]/
    │   │       │   ├── status/
    │   │       │   │   └── route.ts
    │   │       │   └── route.ts
    │   │       └── route.ts
    │   ├── dashboard/
    │   │   ├── admin/
    │   │   │   └── page.tsx
    │   │   ├── employer/
    │   │   │   └── page.tsx
    │   │   └── housemaid/
    │   │       └── page.tsx
    │   ├── jobs/
    │   │   ├── [id]/
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── login/
    │   │   └── page.tsx
    │   ├── maids/
    │   │   ├── [id]/
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── profile/
    │   │   └── page.tsx
    │   ├── register/
    │   │   └── page.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── loading.tsx
    │   ├── not-found.tsx
    │   └── page.tsx
    ├── components/
    │   ├── ui/
    │   │   ├── Icon.tsx
    │   │   └── index.tsx
    │   ├── AuthAside.tsx
    │   ├── AuthProvider.tsx
    │   ├── DashboardShell.tsx
    │   ├── Footer.tsx
    │   ├── JobCard.tsx
    │   ├── MaidCard.tsx
    │   ├── Navbar.tsx
    │   ├── Notification.tsx
    │   └── RequireAuth.tsx
    ├── database/
    │   └── schema.sql
    ├── docs/
    │   ├── ARCHITECTURE.md
    │   ├── COMMIT_PLAN.md
    │   ├── FOLDER_STRUCTURE.md
    │   └── SECURITY.md
    ├── lib/
    │   ├── api.ts
    │   ├── format.ts
    │   ├── password.ts
    │   ├── pusher-server.ts
    │   └── session.ts
    ├── public/
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── tests/
    │   ├── core.test.mjs
    │   └── validation.test.mjs
    ├── types/
    │   └── index.ts
    ├── utils/
    │   ├── axiosInstance.ts
    │   ├── db.ts
    │   ├── pusher.ts
    │   └── schemas.ts
    ├── .env.example
    ├── .gitignore
    ├── global.d.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    ├── tailwind.config.js
    └── tsconfig.json
```
