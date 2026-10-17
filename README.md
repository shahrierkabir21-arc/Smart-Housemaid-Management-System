# SmartHousemaid

A responsive household recruitment platform built with Next.js App Router, TypeScript, Tailwind CSS, and PostgreSQL. Housemaids can discover approved jobs, employers can submit opportunities, and administrators moderate listings and applications.

> **Project status:** Development-ready starter. Before public production deployment, complete the security and deployment checklist in `docs/SECURITY.md`, upgrade aging dependencies, and run integration tests against your own PostgreSQL database.

## Features

- Responsive landing page, sticky navigation, mobile menu, and reusable design system
- Job listing search, sorting, accessible card layouts, and detail pages
- Housemaid directory, search, and reviewed profile details
- Employer dashboard: submit jobs, view own listings and approved applications
- Housemaid dashboard: update description, see own applications, receive optional private Pusher updates
- Admin dashboard: approve/reject jobs, housemaid descriptions, and applications; manage user accounts
- Signed, HTTP-only session cookie and server-enforced role checks on every protected route
- Passwords hashed with Node.js `scrypt`; legacy plaintext passwords are upgraded on successful login
- Runtime validation with Zod; sensitive user fields never returned by public APIs

## Requirements

- Node.js 22+ recommended (used by the built-in test suite)
- npm
- PostgreSQL (local instance or hosted database)
- pgAdmin (optional, for database inspection)

## Setup

```bash
npm ci
cp .env.example .env.local
```

On Windows PowerShell use `Copy-Item .env.example .env.local` instead of `cp`.

Edit `.env.local` with your PostgreSQL credentials and a **fresh, random** `SESSION_SECRET` of at least 32 characters. Generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Create the database specified by `PG_DATABASE` in PostgreSQL. Open the pgAdmin Query Tool for that database and run `database/schema.sql` (for an existing database, back up data first and review the schema changes). The application creates or queries `users`, `jobs`, and `applications` tables.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### First admin account

For security, public registration **does not** create admin accounts. Register a normal account, then, using pgAdmin Query Tool in your trusted development database, promote that *specific* account:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-trusted-account@example.com';
```

Sign out and back in to see the admin dashboard.

## Verify

```bash
npm run typecheck
npm test
npm run build
```

`npm run build` requires a Next.js SWC binary for your operating system. On a fresh machine, `npm ci` downloads this automatically. The original upload included Windows-only SWC binaries, so builds in environments without package registry access may not be possible even if typechecking succeeds.

## Project organization

- `app/`: page routes and HTTP API handlers
- `components/`: page-level reusable components, authorization wrappers, cards and navigation
- `components/ui/`: shared icons, badges, feedback components, and UI primitives
- `lib/`: authentication/session helpers, password hashing, API errors, formatting, optional Pusher server
- `utils/`: database pool, Axios instance, validation schemas, optional Pusher client
- `types/`: shared TypeScript domain models
- `database/`: PostgreSQL setup schema
- `tests/`: Node.js unit tests
- `docs/`: architecture, security checklist and modular commit instructions

## API and authorization

| Endpoint | Operation | Access |
| --- | --- | --- |
| `/api/auth/register` | POST | Public, employer/housemaid only |
| `/api/auth/login` | POST | Public |
| `/api/auth/logout` | POST | Public (clears session) |
| `/api/auth/me` | GET | Session data or null |
| `/api/jobs` | GET / POST | Public approved jobs / Employer post |
| `/api/jobs/[id]` | GET / DELETE | Public approved job / Admin delete |
| `/api/jobs/[id]/status` | PATCH | Admin |
| `/api/jobs/admin` | GET | Admin |
| `/api/jobs/mine` | GET | Employer (own records) |
| `/api/maids`, `/api/maids/[id]` | GET | Public approved profiles (no email/phone) |
| `/api/users` | GET | Admin |
| `/api/users/[id]` | GET / PUT / DELETE | Self or admin / Housemaid self / Admin |
| `/api/users/[id]/status` | PATCH | Admin |
| `/api/applications` | POST | Housemaid (own identity from session) |
| `/api/applications/admin` | GET | Admin |
| `/api/applications/employer` | GET | Employer (own jobs only) |
| `/api/applications/my-applications` | GET | Housemaid (own records only) |
| `/api/applications/[id]` | DELETE | Admin |
| `/api/applications/[id]/status` | PATCH | Admin |
| `/api/pusher/auth` | POST | Signed-in user, their private channel only |

## Optional notifications

Set the four Pusher environment variables in `.env.local` to enable authenticated private updates. Notifications are optional; all approval statuses remain available in the dashboard even without Pusher.

## GitHub / modular updates

See `docs/COMMIT_PLAN.md` for 1-feature-per-commit workflow and a ready-to-apply patch series. Never push `.env.local`, `node_modules/`, `.next/`, passwords or database dumps.

## Quick start (Windows / Git Bash)

1. Extract this archive and open the **housemaid-ready-run** folder in VS Code.
2. Run `npm ci` to install dependencies (internet access is needed for the initial install).
3. In PowerShell, run `Copy-Item .env.example .env.local`, or use `cp .env.example .env.local` in Git Bash.
4. Update `.env.local` with **your own PostgreSQL password** and a strong random `SESSION_SECRET` (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
5. Create database **smart_housemaid** in pgAdmin and execute **database/schema.sql** from the Query Tool.
6. Run `npm run typecheck`, `npm test`, and `npm run dev`.
7. Open **http://localhost:3000**; verify the DB at **http://localhost:3000/api/health**.

Do not upload `.env.local`, PostgreSQL secrets, `node_modules`, or `.next` to GitHub.

**Note:** This is a ready-to-run development source tree, not a preconfigured database. The external PostgreSQL service must be running for registration, login, and dashboards. The project is not production-ready until dependency upgrades, authentication hardening, and live integration tests are completed.
