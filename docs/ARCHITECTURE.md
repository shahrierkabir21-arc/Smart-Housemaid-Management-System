# Architecture

```
Browser
  ├── App Router pages (landing, listings, details, role dashboards)
  ├── AuthProvider (/api/auth/me + in-memory user state)
  └── Axios (/api/*, same-origin cookie credentials)
           │
           ▼
Next.js route handlers
  ├── Zod request validation
  ├── signed HTTP-only session -> database user lookup
  ├── server-side role / ownership authorization
  └── parameterized SQL through pg Pool
           │
           ▼
PostgreSQL (users, jobs, applications)

Optional Pusher: /api/pusher/auth authorizes private-user-{authenticatedId}.
```

## Entities

**User** has role `admin`, `employer`, or `housemaid`; housemaids submit a description for moderation, with status `Pending`/`Approved`/`Rejected`.

**Job** belongs to an employer, starts `Pending`, and is publicly listed only after approval.

**Application** belongs to a housemaid and references a job. A single housemaid may apply only once per job; reviews are managed by admins. `database/schema.sql` adds the unique `(job_id, maid_id)` constraint on a fresh database.

## Trust boundaries

- Browser state is for user experience, never for permissions.
- The `employer_id` and `maid_id` on writes come from a verified server-side session, never request JSON.
- Admin-only mutations re-check `role` against PostgreSQL on each request.
- Public maid listings omit contact information. Approval indicates moderation, not identity/background checks.
- Existing login records with plaintext passwords can be upgraded without forcing a password reset; plan to expire/reset legacy credentials before production.

## Styling organization

`app/globals.css` contains named sections for global design tokens, navigation, forms, marketing, directories, detail pages, authentication, dashboards, footer, animation and responsive breakpoints. `components/ui` hosts reusable components; `components/JobCard` and `components/MaidCard` keep directory layouts consistent.
