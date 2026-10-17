# SmartHousemaid — Windows-এ রান করার ধাপ

প্রজেক্টের সব frontend, backend, API, CSS, reusable components, PostgreSQL schema ও tests এই folder-এ আছে। `node_modules`, `.next` এবং ব্যক্তিগত `.env.local` ইচ্ছাকৃতভাবে দেওয়া হয়নি।

1. ZIP Extract → `housemaid-ready-run` folder VS Code-এ Open Folder।
2. Terminal: `npm ci`
3. PowerShell: `Copy-Item .env.example .env.local` (Git Bash: `cp .env.example .env.local`)
4. `.env.local`-এ PostgreSQL-এর নিজের password বসাও এবং এই command দিয়ে `SESSION_SECRET` তৈরি করো:

   `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

5. pgAdmin → Databases → Create Database → `smart_housemaid`।
6. `smart_housemaid` → Query Tool → `database/schema.sql`-এর SQL Execute।
7. Terminal: `npm run typecheck` তারপর `npm test`, এরপর `npm run dev`।
8. Browser: http://localhost:3000 এবং DB health: http://localhost:3000/api/health
9. Trusted admin তৈরি করতে আগে normal user register করো, এরপর pgAdmin-এ `UPDATE users SET role='admin' WHERE email='your-trusted-email@example.com';` চালাও। এরপর sign out/sign in।
10. Production build যাচাই: `npm run build`।

`README.md`-তে বিস্তারিত setup এবং `docs/SECURITY.md`-তে production-এর আগে করণীয় আছে।

GitHub-এ push করার আগে `git status` এবং `git diff --cached` দেখে বাস্তবে যে পরিবর্তন করেছ সেই অনুযায়ী commit করো।
