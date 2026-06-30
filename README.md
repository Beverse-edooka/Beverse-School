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

Default admin (change in `.env` before production):

- Email: `admin@beverseschool.com`
- Password: `BeverseAdmin2026!`

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
