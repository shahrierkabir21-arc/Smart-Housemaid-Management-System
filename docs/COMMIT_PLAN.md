# Modular Git commit guide

The redesign was built as a sequence of meaningful commits, not arbitrary file-count changes. Each commit represents a distinct improvement so reviewers can follow the project evolution. Patch filenames are numbered and preserve the correct dependency order. The original code used Windows-style CRLF in several files, so **`--keep-cr` is required** when replaying the patches.

## Option A — replay the ready-made commits on your original Git repository

1. Back up your current working tree, then ensure `git status` is clean and the base source corresponds to the original `housemaid-app.zip`.
2. Extract `housemaid-module-patches.zip` somewhere on your computer.
3. From the **root of your original repository**, apply the patches in order:

   **Git Bash (Windows), Linux or macOS:**

   ```bash
   git am --keep-cr /path/to/housemaid-module-patches/*.patch
   ```

   **PowerShell:**

   ```powershell
   Get-ChildItem 'C:\path\to\housemaid-module-patches\*.patch' | Sort-Object Name | ForEach-Object { git am --keep-cr $_.FullName }
   ```

   If you have already manually changed some of these same files, conflicts can occur. Resolve each conflict, stage the resolved files and run `git am --continue`; or run `git am --abort` to cancel.
4. Configure your `.env.local` locally and test the application.
5. Push the resulting real code changes: `git push origin HEAD` (assuming your branch is already tracking the desired remote branch).

**Note:** Patch commits have the transparent author `AI-assisted project update`. They are actual code changes. Feel free to inspect/rework them before pushing. This is not an artificially backdated or fabricated development history.

## Option B — use the complete updated source ZIP

Unzip `housemaid-modernized.zip` into a new directory, inspect the files, then copy changes into your repository incrementally using the commit topics below. Do **not** blindly copy `.env.local`, `.git`, `node_modules` or `.next` from the old ZIP.

## Commit topics

1. `refactor(core): add domain types, security foundations, validation and schema`
2. `feat(auth): secure login, registration, session and logout endpoints`
3. `feat(jobs-api): protect job mutations and scope employer listings`
4. `feat(users-api): enforce profile ownership and protect housemaid information`
5. `feat(applications): scope requests and secure private notification channels`
6. `feat(ui): add reusable icon, status, feedback and authentication components`
7. `style(design-system): introduce responsive premium visual foundation and accessible forms`
8. `feat(marketing): redesign responsive navigation, homepage and site footer`
9. `feat(auth-ui): redesign registration and sign-in with inline validation`
10. `feat(directory): responsive searchable job and housemaid listings`
11. `feat(details): polished job and housemaid detail views with safe applications`
12. `feat(admin): management dashboard with review queues, metrics and guarded actions`
13. `feat(dashboards): job-posting employer dashboard and housemaid application tracking`
14. `feat(profile): secure self-service profile page and account summary`
15. `fix(workflows): prevent duplicate emails and require descriptions for profile review`
16. `test(core): cover password hashing, migration compatibility and formatting`
17. `docs(project): document setup, architecture, security and modular commits`
18. `test(validation): cover registration roles and moderated job schemas`
19. `docs(repository): explain patch replay and publish complete source tree`

For manual commits, stage only the files relevant to the topic. Avoid making many meaningless commits solely to increase the count. Use tests and a clean history to demonstrate real progress.
