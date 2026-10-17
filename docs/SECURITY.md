# Security and deployment checklist

## Implemented safeguards

- Password hashing using `scrypt` with a random salt; plaintext legacy passwords upgraded on login.
- Sessions signed with an environment-provided secret, stored in an HTTP-only, SameSite=Lax cookie, and marked Secure on HTTPS production.
- Server-side access controls on all protected API routes; role and ownership looked up from PostgreSQL.
- Public registration cannot request the `admin` role.
- API request validation via Zod; parameterized SQL and safe generic error responses.
- Private Pusher channels bound to the authenticated session user.
- Duplicate applications restricted by server queries and a unique constraint in the fresh schema.
- `postgres` passwords and `SESSION_SECRET` excluded from Git; example environment file contains placeholders.

## Required before deploying to the public internet

1. **Upgrade dependencies:** The inherited Next.js 14.2.3 release is outdated. Upgrade Next.js, React and other packages to compatible, patched releases, regenerate the lockfile, and retest.
2. **Rate limiting:** Add IP/account rate limits for login, registration, and mutation endpoints, and account lockout protections.
3. **CSRF and origin controls:** Audit all state-changing routes; SameSite cookies reduce some CSRF paths but are not a complete defense against every origin/subdomain scenario.
4. **Session lifecycle:** Add server-side revocation / rotation if immediate logout everywhere or device management is required. The current HMAC session expires after seven days but cannot be centrally revoked.
5. **Database migrations:** Verify your existing schema in pgAdmin, back up your database, and create versioned migrations. `CREATE TABLE IF NOT EXISTS` does not retrofit constraints into every old table.
6. **Credentials:** Rotate secrets if the original project ZIP or `.env.local` was ever shared, especially PostgreSQL and Pusher credentials.
7. **Authentication hardening:** Add email verification, password reset, stronger password policy and MFA for admins.
8. **Observability and tests:** Add server audit logs, API integration tests against a disposable test database, accessibility scans and browser tests.
9. **Infrastructure:** Enforce HTTPS, database least-privilege accounts, backups and monitoring. Never expose PostgreSQL directly to the internet.
10. **Privacy and product claims:** Add consent, privacy policy and retention/deletion processes; admin approval is not proof of a verified background or identity.

## Existing database considerations

If old data contains un-hashed passwords, the next successful login upgrades that user's password. To remove remaining plaintext records sooner, run a user password reset process. For best security, do not preserve historic plaintext copies or place them in logs, test fixtures, or repository history.
