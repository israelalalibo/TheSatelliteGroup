# Satellite Group — Deployment & Customer Handover Guide

This document outlines how to make the site **deployment-ready**, hand it over to the customer, and support them **after launch** (including how they request changes).

---

## 1. Current State (What You’re Shipping)

| Area | Status | Notes |
|------|--------|--------|
| **Frontend** | ✅ Production-ready | Next.js 14, Tailwind, responsive |
| **Products** | ✅ Static data | In `src/lib/data/products.ts` — no DB required |
| **Cart** | ✅ Client-side | Persists in `localStorage` |
| **Payments** | ⚠️ Needs config | Paystack — requires live key in env |
| **Auth (Login/Register)** | ⚠️ Demo only | Accepts any email + password `demo123` — not for real users |
| **Contact form** | ⚠️ Demo only | Shows success but does not send emails or save anywhere |
| **Quote form** | ⚠️ Demo only | Same as contact — no backend |
| **Orders** | ⚠️ Client-only | Confirmation page only; no order storage or admin view of orders |

So: the site **can be deployed and used for browsing, cart, and Paystack payments**. For **real users, contact/quote delivery, and order history**, you’ll need backend/database work (see Section 5).

---

## 2. Pre-Deployment Checklist

### 2.1 Environment Variables

Create a `.env.local` (and later set these in your hosting platform):

```env
# Required for live payments
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxx
```

- Get the **live** public key from [Paystack Dashboard](https://dashboard.paystack.com/) (API Keys).
- Never commit `.env.local` or real keys to Git.

### 2.2 Build & Test

```bash
npm ci
npm run build
npm run start
```

- Visit `http://localhost:3000`, test main flows: home, products, cart, checkout, Paystack (use test mode first if needed).
- Fix any build or runtime errors before deployment.

### 2.3 Content Check

- [ ] Replace placeholder contact info in `README.md` / Footer / Contact page (phone, email, address) with customer’s real details.
- [ ] Confirm all links (footer, header, WhatsApp) point to correct URLs/numbers.
- [ ] If using real Paystack: ensure business name, logo, and callback URL are correct in Paystack dashboard.

### 2.4 Security / Hygiene

- [ ] Remove or change demo auth (e.g. `demo123`) if you’re not adding real auth yet — or clearly document it as “demo only”.
- [ ] Ensure no test API keys or internal URLs are in the built app.
- [ ] Add `.env*.local` to `.gitignore` (Next.js usually does this by default).

---

## 3. Deployment Platform Options

The app is a **static/Node** Next.js app. No database is required for the current feature set.

### Option A: Vercel (Recommended for Next.js)

1. Push code to **GitHub** (or GitLab/Bitbucket).
2. Sign up at [vercel.com](https://vercel.com) and **Import** the repo.
3. Set env var: `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` = live key.
4. Deploy. Vercel assigns a URL (e.g. `satellite-group.vercel.app`).
5. Add **custom domain** in Vercel (e.g. `www.satelitechuksgroup.com`) and point DNS as instructed.

**Handover:** Give the customer the Vercel login (or add them as a team member) so they can see deployments and env vars (without exposing the key value if you use “sensitive” marking).

### Option B: Netlify

1. Connect repo to [Netlify](https://netlify.com).
2. Build command: `npm run build`  
   Publish directory: `.next` — but for Next.js you typically use **Netlify’s Next.js runtime** (detected automatically if you use “Next.js” as framework).
3. Set `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` in Netlify env.
4. Deploy and add custom domain in Netlify.

### Option C: Self-Hosted (VPS / VM)

1. On the server: install **Node.js 18+**.
2. Clone repo, then:
   ```bash
   npm ci --production
   npm run build
   ```
3. Set env (e.g. `export NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_...`).
4. Run with:
   ```bash
   npm run start
   ```
   Or use **PM2** for restarts: `pm2 start npm --name "satellite" -- start`.
5. Put **Nginx** (or another reverse proxy) in front, add SSL (e.g. Let’s Encrypt) and point domain to this server.

---

## 4. What to Hand Over to the Customer

### 4.1 Deliverables

- **Live site**  
  URL and (if applicable) custom domain, with Paystack in live mode if agreed.

- **Repository access**  
  - Either: **read-only** access to the Git repo (GitHub/GitLab) so they can see code and share with future devs.  
  - Or: **full ownership** (transfer repo to their org) if that’s in the contract.

- **Documentation**  
  - This file (`DEPLOYMENT_AND_HANDOVER.md`).  
  - Short **runbook**: how to redeploy (e.g. “push to `main` on Vercel”), where env vars are set, and who has access.

- **Credentials / access list** (in a secure way, e.g. password manager or secure share):  
  - Hosting (Vercel/Netlify) login or team invite.  
  - Paystack dashboard (they should own the Paystack account; you use keys they provide).  
  - Domain registrar / DNS (if you managed it).

- **Optional:**  
  - A one-page “Support & change request” process (see Section 6).

### 4.2 What the Customer Can Do Themselves (Without Code)

- **Content**  
  Right now, content is in code (e.g. `src/lib/data/products.ts`, page files). So **text or product changes = code change**. If you want them to do it without a dev, you’d need a CMS or admin panel that writes to a database or file (see Section 5).

- **Paystack**  
  They can log into Paystack to see transactions, refunds, and settings.

- **Hosting**  
  If they have Vercel/Netlify access, they can see deployments and trigger redeploys by pushing to the connected branch (if they have Git access).

---

## 5. Database & Backend (If You Add Them Later)

Today the site uses **no database**. To make it “fully” production-ready for orders, users, and contact/quote, you’d add:

### 5.1 What a Database Would Be Used For

- **Orders** — Store each checkout (customer info, items, amount, Paystack reference) so they can view in admin and fulfill.
- **Users** — Real login/register (e.g. NextAuth with a DB adapter).
- **Contact / Quote** — Save submissions and optionally send email (e.g. Resend, SendGrid) or notify Slack.

### 5.2 Suggested Stack (When You’re Ready)

- **Database:**  
  - **Vercel Postgres** or **Supabase** (Postgres) — easy with Next.js and free tiers.  
  - Or **MongoDB Atlas** if you prefer document model.

- **Backend:**  
  - Next.js **API Routes** (`src/app/api/...`) for:  
    - Creating order after Paystack success  
    - Auth (NextAuth with DB adapter)  
    - Contact/quote submission (save to DB + optional email)

- **Admin:**  
  - Simple admin pages under `/admin` (protected) to list orders and contact/quote submissions.  
  - Or use a headless CMS (e.g. Strapi, Payload) for products and pages so the customer can edit without touching code.

### 5.3 Deployment With a Database

- **Vercel + Vercel Postgres / Supabase:**  
  Add DB, get connection string, set env (e.g. `DATABASE_URL`) in Vercel, redeploy. No extra server.

- **Self-hosted:**  
  Same env; run Postgres (or MongoDB) on the same VPS or a separate one, and point `DATABASE_URL` to it.

---

## 6. Post-Deployment Support: How the Customer Requests Changes

Define a simple process and share it with the customer (e.g. in the handover email or a one-pager).

### 6.1 How They Request a Change

1. **Channel**  
   - Email to your support address, or  
   - A shared form (e.g. Typeform/Google Form) that creates a ticket or email.

2. **What they send**  
   - Short description (e.g. “Change phone number on the contact page”).  
   - Page/URL or feature name.  
   - Screenshot or example text if helpful.

3. **Your response**  
   - Confirm receipt and give a **ticket/reference number** (e.g. SG-001).  
   - Say whether it’s a small change (content/config) or a bigger one (new feature, DB work).  
   - Give a rough timeline and/or quote if you charge per change.

### 6.2 Types of Changes (Examples)

| Type | Who can do it | Typical turnaround |
|------|----------------|--------------------|
| Text/contact info, link, image | You (or them if you add CMS) | 1–2 days |
| New product or price | You (or them via CMS/admin) | 1–3 days |
| New page or section | You | 3–7 days |
| New feature (e.g. order history, real contact form) | You (backend/DB work) | 1–2 weeks |

### 6.3 Making the Change on Your Side

1. **Get the request** (email/form) and create a task (e.g. in Notion, Trello, or GitHub Issues).
2. **Branch:**  
   `git checkout -b fix/SG-001-update-phone-number`
3. **Edit code** (e.g. update Footer, `products.ts`, or env).
4. **Test locally:**  
   `npm run build && npm run start`
5. **Commit and push:**  
   `git push origin fix/SG-001-update-phone-number`
6. **Deploy:**  
   - **Vercel/Netlify:** Open a PR to `main` and merge, or push to `main`; they auto-deploy.  
   - **Self-hosted:** Pull on server, `npm ci`, `npm run build`, restart app (e.g. `pm2 restart satellite`).
7. **Reply to customer:**  
   “Change SG-001 is live. Please check [URL/page]. Let us know if you want any tweaks.”

### 6.4 If the Customer Has Devs / Wants to Edit Code

- Give them **Git repo access** (read or write, as agreed).
- Document in README:  
  - How to run locally (`npm install`, `npm run dev`).  
  - Where key content lives (e.g. `src/lib/data/products.ts`, `src/components/layout/Footer.tsx`).  
  - That env vars must be set in hosting and never committed.
- They can submit **pull requests**; you review and merge, or they merge and your CI/hosting deploys.

### 6.5 Optional: Simple SLA or Support Tiers

- **Ad-hoc:**  
  They email when they need something; you quote time/cost per request.

- **Retainer:**  
  X hours per month for small changes and fixes; anything beyond is quoted.

- **Document:**  
  “We’ll acknowledge within 24 hours and complete small content changes within 3 working days” (or whatever you agree).

---

## 7. Summary Checklist for You

**Before go-live:**

- [ ] Env: `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` set to live key on hosting.
- [ ] Build passes; smoke test (home, products, cart, checkout, Paystack).
- [ ] Contact/legal/content (phone, email, address) updated to customer’s details.
- [ ] Demo auth/contact behavior documented or replaced.

**Handover:**

- [ ] Live URL and (if any) custom domain.
- [ ] Repo access (read-only or transfer).
- [ ] This doc + short runbook (deploy, env, who has access).
- [ ] Credentials list (hosting, Paystack, domain) shared securely.
- [ ] Support process (how to request changes, where to email).

**After launch:**

- [ ] One or two small change requests handled so the process is proven.
- [ ] If you add DB/orders later: document new env vars and deploy steps.

---

**Questions or need a one-page “Support & change request” template for the customer?** You can copy Section 6 into a separate PDF or page and add your contact details and SLA.
