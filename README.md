# Beverse School

India's first diagnostic leadership finishing school — production marketing site built from the **Final V1** prototype.

## Quick start

```bash
npm install
npm run db:setup   # create SQLite DB + seed admin
npm run dev
```

- **Website:** http://localhost:3000  
- **Admin:** http://localhost:3000/admin  

Default admin uses values from your `.env` file:

- `ADMIN_EMAIL` (default: `admin@beverseschool.com`)
- `ADMIN_PASSWORD` (you set this — must be 8+ characters)

After changing `.env`, run `npm run db:seed` or just log in once (credentials auto-sync from `.env`).

Login URLs: `/admin` or `/admin/login`

### Supabase (recommended for production)

**Yes — Supabase is a good fit** for Beverse School:

| Need | Supabase feature |
|------|------------------|
| Database | Postgres (replace SQLite `DATABASE_URL` with Supabase connection string) |
| Mentor photos | Storage bucket `mentor-photos` |
| User auth (optional later) | Supabase Auth instead of custom JWT |
| Admin | Keep current admin panel; store admin in Postgres |

**Local dev:** keep SQLite (current setup).  
**Production:** create a Supabase project → run `supabase/schema.sql` in SQL Editor → set `DATABASE_URL` to the pooler URL → `npm run db:seed`.

Prisma works with both — only `DATABASE_URL` changes.

## Features

- Pixel-faithful Flux Dark UI with animated mesh, tilt cards, magnetic CTAs, scroll reveals
- Uniform glass cards across How it works, Gap, Opportunity, Who it is for, Mentors
- Hero mentor avatars + Mentors section driven by admin-managed data (dummy placeholders when empty)
- Secured user login/register (JWT session cookies)
- Apply / waitlist flow with 25-seat batch cap and automatic next cohort
- Admin panel: mentors CRUD with photo upload, waitlist view, batch email notifications

## Environment

Copy `.env.example` to `.env`:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | SQLite path (`file:./dev.db`) |
| `SESSION_SECRET` | JWT signing secret |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Initial admin seed |
| `SMTP_*` | Optional email (logs to console if unset) |

## Scripts

```bash
npm run dev          # development
npm run build        # production build
npm run db:push      # apply schema
npm run db:seed      # seed admin + Cohort 1
```

## Project structure

```
src/
  app/              # pages + API routes
  components/       # sections, modals, admin UI
  lib/              # db, auth, content, mentors
prisma/schema.prisma
public/images/      # logos
reference/          # Final V1.html prototype
```

## Deploy

1. Set production env vars (`SESSION_SECRET`, `ADMIN_PASSWORD`, SMTP)
2. Run `npm run db:setup` on the server or use a hosted Postgres + update `DATABASE_URL`
3. Deploy to Vercel and connect `beverseschool.com`
