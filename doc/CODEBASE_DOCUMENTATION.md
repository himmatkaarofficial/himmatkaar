# HimmatKaar — Complete Codebase Documentation

> **Last Updated:** September 2026  
> **Version:** 0.1.0  
> **Domain:** [himmatkaar.org](https://himmatkaar.org)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Design System](#3-design-system)
4. [Project Structure](#4-project-structure)
5. [Environment Variables](#5-environment-variables)
6. [Application Pages (Public)](#6-application-pages-public)
7. [Admin Dashboard](#7-admin-dashboard)
8. [Components Reference](#8-components-reference)
9. [API Routes](#9-api-routes)
10. [Database Schema](#10-database-schema)
11. [Authentication System](#11-authentication-system)
12. [Supabase Storage](#12-supabase-storage)
13. [Configuration Files](#13-configuration-files)
14. [Getting Started (Local Development)](#14-getting-started-local-development)
15. [Deployment](#15-deployment)

---

## 1. Project Overview

**HimmatKaar** (ہمت کار) is Faisalabad's premier youth empowerment platform. It serves the youth of Faisalabad and surrounding regions in Pakistan, with the mission of cultivating the next generation of leaders through mentorship, skill development, and community engagement.

### Mission
> *"To cultivate a strong resource pool to support young innovators and change-makers across Pakistan, helping them transform their ideas into impactful initiatives that benefit their communities."*

### Key Programs
| Program | Description |
|---|---|
| **LaunchPad** | A 12-week cohort (6 weeks training + 6 weeks internship), limited to 25 students |
| **Technical Workshops** | Skill-building sessions for career readiness |
| **Networking Events** | Connecting youth with mentors and industry leaders |
| **Fellowship** | Comprehensive fellowship program with mentorship |

### Impact Stats
- **1,000+** Youth Empowered
- **50+** Events Hosted
- **1+** Years of Operation
- **20+** Staff Members

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.1.6 |
| **Language** | TypeScript | ^5 |
| **UI Styling** | Tailwind CSS | ^4 |
| **Animations** | Framer Motion | ^12.35.0 |
| **Carousel** | Embla Carousel React | ^8.6.0 |
| **Icons** | Lucide React | ^0.577.0 |
| **Rich Text Editor** | TipTap | ^3.22.4 |
| **Backend / DB** | Supabase | ^2.99.2 |
| **ORM** | Prisma Client | ^7.4.2 |
| **Auth** | Supabase Auth + NextAuth | ^4.24.13 |
| **Password Hashing** | bcryptjs | ^3.0.3 |
| **Runtime** | React | 19.2.3 |

### Dev Dependencies
- `prisma` — Database schema management
- `@tailwindcss/postcss` — Tailwind PostCSS plugin
- `eslint` / `eslint-config-next` — Code linting
- `@types/*` — TypeScript type definitions

---

## 3. Design System

### Brand Colors (CSS Variables)

All colors are defined as CSS custom properties in `app/globals.css`.

| Variable | Hex | Usage |
|---|---|---|
| `--color-courage-green` | `#1A6B3C` | Primary brand color, CTAs, active states |
| `--color-courage-gold` | `#F3AE29` | Accent highlights |
| `--color-off-white` | `#F4F1EB` | Page backgrounds, cards |
| `--color-mint-tint` | `#A8D5B5` | Subtle green tints |
| `--color-deep-sapphire` | `#2C3E6B` | Deep accent color |
| `--color-deep-navy` | `#1A1A2E` | Dark text, dark backgrounds |
| `--background` | `#FFFFFF` | Main body background |
| `--foreground` | `#1A1A2E` | Main body text |

### Typography

Three Google Fonts are loaded globally via `next/font`:

| Font | CSS Variable | Usage |
|---|---|---|
| **Playfair Display** | `--font-display` | Headings, titles |
| **Montserrat** | `--font-body` | Body text, UI elements |
| **Noto Nastaliq Urdu** | `--font-urdu` | Urdu language text (ہمت کار) |

### Font Sizes (Tokens)
- `--font-size-hero`: `64px`
- `--font-size-h1`: `40px`
- `--font-size-h2`: `28px`
- `--font-size-body-large`: `18px`

### Spacing (Section Padding)
- Desktop: `--spacing-section-desktop: 112px`
- Mobile: `--spacing-section-mobile: 80px`

### CSS Animations

| Class | Effect |
|---|---|
| `.animate-fade-in-left` | Slides in from left |
| `.animate-fade-in-right` | Slides in from right |
| `.animate-marquee` | Infinite horizontal scroll (30s loop) |
| `.scrollbar-hide` | Hides scrollbars across browsers |

### Role Color Coding
| Role | Color |
|---|---|
| Admin | Red `#dc2626` |
| Coordinator | Blue `#2563eb` |
| Student | Green `#3a8a4d` |

---

## 4. Project Structure

```
himmatkaar/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, metadata, HTML shell)
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles & design tokens
│   ├── favicon.ico               # Site favicon
│   ├── manifest.json             # Web App Manifest (PWA metadata)
│   │
│   ├── about/page.tsx            # About Himmatkaar
│   ├── ambassadors/page.tsx      # Campus Ambassadors listing
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Dynamic blog post (SSG/SSR)
│   ├── contact/page.tsx          # Contact form page
│   ├── cookie-policy/page.tsx    # Cookie Policy
│   ├── core-team/page.tsx        # Core Team dedicated page
│   ├── events/
│   │   ├── page.tsx              # All events listing
│   │   └── upcoming/page.tsx     # Upcoming events filter view
│   ├── fellowship/page.tsx       # Fellowship program details
│   ├── impact/page.tsx           # Impact statistics page
│   ├── launchpad/page.tsx        # LaunchPad program details
│   ├── login/page.tsx            # Admin login page
│   ├── networking-events/page.tsx # Networking Events program
│   ├── privacy/page.tsx          # Privacy Policy
│   ├── register/page.tsx         # Legacy register → redirects to /signup
│   ├── signup/page.tsx           # Sign up page
│   ├── team/page.tsx             # Full team page
│   ├── technical-workshops/page.tsx # Technical Workshops program
│   ├── terms/page.tsx            # Terms of Service
│   ├── testimonials/page.tsx     # Testimonials/Success Stories
│   ├── button-demo/page.tsx      # UI button component demo
│   │
│   ├── api/                      # Next.js API Route Handlers
│   │   ├── ambassadors/route.ts  # GET/POST/PUT/DELETE ambassadors
│   │   ├── blog/route.ts         # GET/POST blog posts
│   │   ├── contact/route.ts      # POST contact form submissions
│   │   ├── events/route.ts       # GET/POST/PUT/DELETE events
│   │   ├── newsletter/route.ts   # POST newsletter subscriptions
│   │   ├── team/route.ts         # GET/POST/PUT/DELETE team members
│   │   ├── upload/route.ts       # POST file uploads to Supabase Storage
│   │   └── admin/route.ts        # Admin-specific operations
│   │
│   └── dashboard/
│       └── admin/                # Admin-only dashboard
│           ├── page.tsx          # Admin dashboard home (analytics overview)
│           ├── events/page.tsx   # Event management page
│           ├── team/page.tsx     # Team management page
│           ├── ambassadors/page.tsx # Ambassadors management page
│           ├── blog/page.tsx     # Blog post management page
│           └── messages/page.tsx # Contact message inbox
│
├── components/                   # Shared React components
│   ├── Navbar.tsx                # Main navigation bar (public)
│   ├── Footer.tsx                # Site footer
│   ├── AdminLayout.tsx           # Admin dashboard shell (sidebar + header)
│   ├── DashboardLayout.tsx       # Generic dashboard wrapper
│   ├── AdminEventsManager.tsx    # Full CRUD events management UI
│   ├── AdminBlogManager.tsx      # Full CRUD blog management + rich text
│   ├── AdminTeamManager.tsx      # Full CRUD team management UI
│   ├── AdminAmbassadorsManager.tsx # Full CRUD ambassadors management UI
│   ├── ContactForm.tsx           # Public contact/inquiry form
│   ├── EventsSection.tsx         # Home page dynamic events block
│   ├── NewsletterForm.tsx        # Email newsletter signup form
│   ├── RichTextEditor.tsx        # TipTap-based WYSIWYG editor
│   ├── TestimonialCarousel.tsx   # Embla-powered testimonial slider
│   │
│   ├── sections/                 # Home page section components
│   │   ├── HeroSection.tsx       # Hero with image carousel & CTAs
│   │   ├── AboutSection.tsx      # About Himmatkaar blurb with stats
│   │   ├── ProgramTracksSection.tsx # 3 program track cards
│   │   ├── OfferingsSection.tsx  # 6 offerings grid
│   │   ├── StatsBar.tsx          # Animated counter stats
│   │   ├── EventsSection.tsx     # Upcoming events feed
│   │   ├── TestimonialsSection.tsx # Testimonials carousel
│   │   ├── NewsletterSection.tsx # Newsletter signup section
│   │   ├── PartnerMarquee.tsx    # Scrolling partner logos
│   │   └── index.ts              # Barrel export
│   │
│   └── ui/                       # Atomic UI primitives
│       ├── Card.tsx              # Base card component
│       ├── EventCard.tsx         # Event card display
│       ├── FormInput.tsx         # Styled input field
│       ├── OfferingCard.tsx      # Offering card display
│       ├── TrackCard.tsx         # Program track card
│       ├── PrimaryButton.tsx     # Primary green CTA button
│       ├── SecondaryButton.tsx   # Secondary outlined button
│       └── index.ts              # Barrel export
│
├── lib/                          # Shared utility libraries
│   ├── supabase.ts               # Supabase client instances + type interfaces
│   └── auth.ts                   # Auth helpers (signIn, signOut, getUser, etc.)
│
├── supabase/                     # Database configuration & migrations
│   ├── setup.sql                 # Full schema setup (tables, RLS, triggers)
│   ├── storage-policies.sql      # Storage bucket RLS policies
│   ├── STORAGE_SETUP.md          # Human-readable storage setup guide
│   └── migrations/               # Version-controlled schema migrations
│       └── 20260327_create_profiles_and_admin_role_support.sql
│
├── public/                       # Static assets served directly
│   ├── himmatkaar-logo.jpg       # Brand logo
│   ├── about-hero.jpg            # About page hero image
│   ├── home-page-carosel/        # 1.jpg – 5.jpeg (hero carousel images)
│   ├── partners/                 # partner1.png, partner2.png
│   └── team/                     # Team member photos
│
├── doc/                          # Documentation files
├── .env.example                  # Environment variable template
├── next.config.ts                # Next.js configuration (image domains)
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript compiler settings
├── eslint.config.mjs             # ESLint rules
└── package.json                  # Dependencies & scripts
```

---

## 5. Environment Variables

Create a `.env.local` file (copy from `.env.example`):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...your-service-role-key

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=HimmatKaar

# Admin Access Control (Optional)
NEXT_PUBLIC_ADMIN_EMAILS=admin@himmatkaar.org,another@himmatkaar.org
```

### Variable Details

| Variable | Visibility | Description | Where to Get |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public (client) | Supabase project URL | Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public (client) | Anonymous key (respects RLS) | Dashboard → Settings → API → `anon public` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret (server only)** | Bypasses RLS — admin ops | Dashboard → Settings → API → `service_role secret` |
| `NEXT_PUBLIC_APP_URL` | Public | Base URL of your deployment | Set to your domain in production |
| `NEXT_PUBLIC_APP_NAME` | Public | Display name of the app | `HimmatKaar` |
| `NEXT_PUBLIC_ADMIN_EMAILS` | Public | Comma-separated admin email allowlist | Set manually |

> **WARNING:** NEVER commit `.env.local` to version control. It is listed in `.gitignore`.

---

## 6. Application Pages (Public)

### Home Page — `/`
**File:** `app/page.tsx`

The home page is a `"use client"` component that assembles all landing page sections. Data is passed as props to section components.

**Sections rendered (in order):**
1. `<Navbar />` — Fixed navigation header
2. `<HeroSection />` — Hero with 5-image Embla carousel, headline, CTAs
3. `<PartnerMarquee />` — Auto-scrolling partner logos
4. `<AboutSection />` — Platform description + mini stats
5. `<ProgramTracksSection />` — LaunchPad, Technical Workshops, Networking Events
6. `<OfferingsSection />` — 6 offering cards (Branding, Communication, Corporate Readiness, etc.)
7. `<StatsBar />` — Animated counters (1+ yrs, 1000+ students, 10+ events, 20+ staff)
8. **LaunchPad Feature Section** — Inline section with glassmorphism stats cards
9. `<EventsSection />` — Live events from API
10. `<TestimonialsSection />` — Testimonial carousel
11. `<NewsletterSection />` — Email signup
12. `<Footer />` — Site footer

**LaunchPad Application Link:**
`https://docs.google.com/forms/d/e/1FAIpQLSdLfYvAZc0W6J53bdxLtlJCSv-uM40bJG22C9POuPZVa56BlQ/viewform`

---

### About Page — `/about`
Himmatkaar's mission, vision, and core values.

### Team Page — `/team`
Core team members with photos, roles, bios, and LinkedIn links. Data fetched from `/api/team`.

### Ambassadors Page — `/ambassadors`
Full listing of campus ambassadors across Pakistan. Data fetched from `/api/ambassadors`.

### LaunchPad Page — `/launchpad`
Detailed breakdown of the 12-week flagship program:
- 6 weeks intensive training with expert mentors
- Weekly one-on-one mentorship sessions
- 6 weeks hands-on industry internship
- Limited to 25 students per cohort

### Events Pages
| Route | Description |
|---|---|
| `/events` | All events (past + upcoming) |
| `/events/upcoming` | Filtered to upcoming events only |

Data fetched live from `/api/events`.

### Blog
| Route | Description |
|---|---|
| `/blog` | Blog post listing with category filters |
| `/blog/[slug]` | Individual blog post (dynamic route, SSR) |

Blog content stored in Supabase `blog_posts` table with rich HTML content via TipTap.

### Contact Page — `/contact`
Public inquiry form that submits to `/api/contact`. Fields: name, email, subject, message.

### Auth Pages
| Route | Description |
|---|---|
| `/login` | Admin login (email + password via Supabase Auth) |
| `/signup` | New user registration |
| `/register` | Legacy route, redirects to `/signup` |

### Legal Pages
| Route | Description |
|---|---|
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/cookie-policy` | Cookie Policy |

---

## 7. Admin Dashboard

**Access:** `/dashboard/admin` — Protected; only users with `role: 'admin'` in the `profiles` table can access.

### Dashboard Home — `/dashboard/admin`
**File:** `app/dashboard/admin/page.tsx`

Overview analytics panel. Uses `AdminLayout` for the sidebar + top header shell.

### Admin Sidebar Navigation
Managed by `components/AdminLayout.tsx`

| Sidebar Item | Route | Component Used |
|---|---|---|
| Dashboard | `/dashboard/admin` | Overview stats |
| Events | `/dashboard/admin/events` | `AdminEventsManager` |
| Team | `/dashboard/admin/team` | `AdminTeamManager` |
| Ambassadors | `/dashboard/admin/ambassadors` | `AdminAmbassadorsManager` |
| Blog | `/dashboard/admin/blog` | `AdminBlogManager` |
| Messages | `/dashboard/admin/messages` | Contact inbox |

### Events Management — `/dashboard/admin/events`
Full CRUD interface via `AdminEventsManager`:
- List all events with status filter
- Create new event (title, description, date, time, location, type, capacity, image upload)
- Edit existing event in modal
- Delete event with confirmation dialog
- Image upload to `event-images` Supabase bucket

### Team Management — `/dashboard/admin/team`
Full CRUD via `AdminTeamManager`:
- List team members sorted by `display_order`
- Add/edit/delete team member (name, role, bio, LinkedIn URL, photo)
- Image upload to `team-images` Supabase bucket

### Ambassadors Management — `/dashboard/admin/ambassadors`
Full CRUD via `AdminAmbassadorsManager`:
- List all ambassadors
- Add/edit/delete ambassadors (name, university, city, bio, LinkedIn URL, photo)
- Image upload to `ambassador-images` Supabase bucket

### Blog Management — `/dashboard/admin/blog`
Full CRUD via `AdminBlogManager`:
- Rich text editor powered by **TipTap** (headings, bold, italic, lists, blockquotes, links, images)
- Fields: slug, title, excerpt, author, date, read time, category, cover image, content, publish toggle
- List all blog posts with publish/draft status toggle

### Messages — `/dashboard/admin/messages`
Inbox view of contact form submissions received via `/api/contact`.

---

## 8. Components Reference

### `Navbar.tsx`
- Fixed, blur-glass header (`backdrop-blur-xl`, `bg-white/95`)
- Scroll-aware shadow (triggers at `scrollY > 10`)
- **Desktop:** Hover-activated dropdown menus
- **Mobile:** Framer Motion animated slide-down menu
- Navigation groups:
  - **About Us:** About Himmatkaar, Our Team, Ambassadors
  - **Programme:** Launchpad, Technical Workshops, Networking Events
  - **Happenings:** Upcoming Events, Events, Blog
- CTAs: Login + "Apply Now" green button

### `Footer.tsx`
Public site footer with links, contact info, and social media.

### `AdminLayout.tsx`
Persistent shell for all admin dashboard pages:
- 280px sidebar with logo, nav links, logout button
- Top header bar with page title, search input, notification bell, admin avatar

### `RichTextEditor.tsx`
TipTap WYSIWYG editor, dynamically imported (`ssr: false`) to avoid hydration issues. Supports:
- Bold, Italic, Headings (H1–H3)
- Bullet & ordered lists
- Blockquotes
- Links (with URL input)
- Image insertion
- Placeholder text

### `ContactForm.tsx`
Public contact form — posts to `/api/contact`.

### `NewsletterForm.tsx`
Email subscription form — posts to `/api/newsletter`.

### `TestimonialCarousel.tsx`
Embla Carousel-powered testimonial slider.

### Section Components (`components/sections/`)

| Component | Purpose |
|---|---|
| `HeroSection.tsx` | Hero with Embla image carousel, animated text, dual CTAs |
| `AboutSection.tsx` | About blurb, image, and 2-stat mini dashboard |
| `ProgramTracksSection.tsx` | 3 track cards |
| `OfferingsSection.tsx` | 6 offering cards with icons |
| `StatsBar.tsx` | Animated count-up stat bar |
| `EventsSection.tsx` | Events from API with skeleton loading |
| `TestimonialsSection.tsx` | Carousel wrapper section |
| `NewsletterSection.tsx` | Section wrapper for newsletter form |
| `PartnerMarquee.tsx` | Auto-scrolling partner logos strip |

### UI Primitives (`components/ui/`)

| Component | Description |
|---|---|
| `Card.tsx` | Base card with shadow and rounded corners |
| `EventCard.tsx` | Event display card (date, location, capacity, status badge) |
| `FormInput.tsx` | Styled input with label and error state |
| `OfferingCard.tsx` | Icon + title + description card |
| `TrackCard.tsx` | Program track card |
| `PrimaryButton.tsx` | Green filled CTA button |
| `SecondaryButton.tsx` | Outlined secondary button |

---

## 9. API Routes

All routes are in `app/api/`. They use the Next.js App Router `route.ts` convention.

### `GET /api/events`
Fetches events from Supabase `events` table.
- **Query params:** `limit` (default: 10), `status` (`upcoming` | `past` | `all`)
- **Returns:** `{ events: Event[] }`

### `POST /api/events`
Creates a new event. Requires authenticated session.

### `PUT /api/events`
Updates an existing event by `id`.

### `DELETE /api/events`
Deletes an event by `id`.

---

### `GET /api/team`
Fetches all team members ordered by `display_order`.

### `POST/PUT/DELETE /api/team`
CRUD for `team_members` table (authenticated only).

---

### `GET /api/ambassadors`
Fetches all ambassadors ordered by `display_order`.

### `POST/PUT/DELETE /api/ambassadors`
CRUD for `ambassadors` table (authenticated only).

---

### `GET /api/blog`
Fetches blog posts. Add `?published=true` for public view.

### `POST/PUT/DELETE /api/blog`
CRUD for blog posts (admin only).

---

### `POST /api/contact`
Saves a contact form submission to Supabase.
- **Body:** `{ name, email, subject, message }`

### `POST /api/newsletter`
Saves an email to the newsletter subscribers list.
- **Body:** `{ email }`

### `POST /api/upload`
Uploads a file to a Supabase Storage bucket.
- **Body:** `FormData` with `file` (image) and `type` (`event` | `team` | `ambassador` | `blog`)
- **Returns:** `{ url: string }` — Public URL of uploaded file
- Validates: images only, max 5MB, generates unique filename

**Usage Example:**
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('type', 'team'); // 'event' | 'team' | 'ambassador' | 'blog'

const res = await fetch('/api/upload', { method: 'POST', body: formData });
const { url } = await res.json();
```

---

## 10. Database Schema

Managed in `supabase/setup.sql`. All tables use **Row Level Security (RLS)**.

### `profiles`
Mirrors `auth.users`. Auto-created via trigger on signup.

| Column | Type | Default | Notes |
|---|---|---|---|
| `id` | UUID (PK) | — | References `auth.users(id)` |
| `email` | TEXT (unique) | — | User email |
| `full_name` | TEXT | NULL | Optional |
| `role` | TEXT | `'student'` | `'student'` / `'coordinator'` / `'admin'` |
| `status` | TEXT | `'active'` | `'active'` / `'inactive'` / `'pending'` |
| `created_at` | TIMESTAMPTZ | NOW() | — |
| `updated_at` | TIMESTAMPTZ | NOW() | Auto-updated |

**RLS:** Users can read/update their own profile only.

### `events`

| Column | Type | Default | Notes |
|---|---|---|---|
| `id` | UUID (PK) | `gen_random_uuid()` | — |
| `title` | VARCHAR(255) | — | Required |
| `description` | TEXT | NULL | — |
| `date` | DATE | — | Required |
| `time` | VARCHAR(50) | NULL | e.g. `"09:00 AM"` |
| `location` | VARCHAR(255) | NULL | — |
| `type` | VARCHAR(100) | NULL | Summit, Workshop, etc. |
| `capacity` | INTEGER | 0 | Max attendees |
| `registered` | INTEGER | 0 | Current registrations |
| `status` | VARCHAR(50) | `'upcoming'` | `'upcoming'` / `'past'` / `'cancelled'` |
| `image` | TEXT | NULL | URL or path |
| `created_at` | TIMESTAMPTZ | NOW() | — |
| `updated_at` | TIMESTAMPTZ | NOW() | Auto-updated |

**RLS:** Public read; authenticated write.

### `team_members`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | `gen_random_uuid()` |
| `name` | VARCHAR(255) | Required |
| `role` | VARCHAR(255) | Required |
| `bio` | TEXT | NULL |
| `image` | TEXT | NULL |
| `linkedin_url` | TEXT | NULL |
| `display_order` | INTEGER | Default 0 |

**RLS:** Public read; authenticated write.

### `ambassadors`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | `gen_random_uuid()` |
| `name` | VARCHAR(255) | Required |
| `role` | VARCHAR(255) | Default: `'Campus Ambassador'` |
| `university` | VARCHAR(255) | Required |
| `city` | VARCHAR(255) | NULL |
| `bio` | TEXT | NULL |
| `image` | TEXT | NULL |
| `linkedin_url` | TEXT | NULL |
| `display_order` | INTEGER | Default 0 |

**RLS:** Public read; authenticated write.

### `blog_posts`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | — |
| `slug` | TEXT (unique) | URL-friendly identifier |
| `title` | TEXT | — |
| `excerpt` | TEXT | Short summary |
| `author` | TEXT | — |
| `date` | TEXT | Publication date |
| `read_time` | TEXT | e.g. `"5 min read"` |
| `image` | TEXT | Cover image URL |
| `category` | TEXT | e.g. `"Leadership"` |
| `content` | TEXT | HTML from TipTap editor |
| `published` | BOOLEAN | `true` = visible publicly |

### Database Triggers
| Trigger | Table | Purpose |
|---|---|---|
| `on_auth_user_created_profile` | `auth.users` | Auto-creates `profiles` row on signup |
| `update_events_updated_at` | `events` | Refreshes `updated_at` on update |
| `update_profiles_updated_at` | `profiles` | Refreshes `updated_at` on update |
| `update_team_members_updated_at` | `team_members` | Refreshes `updated_at` on update |
| `update_ambassadors_updated_at` | `ambassadors` | Refreshes `updated_at` on update |

### Helper SQL Functions
```sql
-- Promote a user to admin
SELECT public.set_user_role_by_email('admin@himmatkaar.org', 'admin');
```

---

## 11. Authentication System

**Files:** `lib/auth.ts`, `lib/supabase.ts`

### Two Supabase Clients

```typescript
// Public client — respects RLS (safe for browser)
export const supabase = createClient(url, anonKey, {
  auth: { persistSession: true, autoRefreshToken: true }
});

// Admin client — bypasses RLS (server-side only)
export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: { persistSession: false }
});
```

### Login Flow

1. User submits email + password on `/login`
2. `signIn()` calls `supabase.auth.signInWithPassword()`
3. Looks up / creates a `profiles` row via `upsert`
4. Checks admin access via **two mechanisms:**
   - `profile.role === 'admin'` (database role check)
   - Email in `NEXT_PUBLIC_ADMIN_EMAILS` env var allowlist
5. If neither → signs out immediately and throws error
6. Sets auth cookies (`sb-access-token`, `sb-refresh-token`) for server-side access

### Exported Auth Functions

| Function | Description |
|---|---|
| `signIn(email, password)` | Signs in, validates admin, sets cookies |
| `signOut()` | Clears Supabase session + auth cookies |
| `getCurrentUser()` | Returns current `auth.User` |
| `getSession()` | Returns current session |
| `isAuthenticated()` | Returns `true` if a session exists |

### Promoting a User to Admin

**Option A — SQL (recommended):**
```sql
-- Run in Supabase SQL Editor after user registers
SELECT public.set_user_role_by_email('admin@himmatkaar.org', 'admin');
```

**Option B — Environment Variable:**
```env
NEXT_PUBLIC_ADMIN_EMAILS=admin@himmatkaar.org
```

---

## 12. Supabase Storage

Three public storage buckets are used for image uploads.

| Bucket | Purpose | Used By |
|---|---|---|
| `event-images` | Event cover images | Admin Events Manager |
| `team-images` | Team member photos | Admin Team Manager |
| `ambassador-images` | Ambassador profile photos | Admin Ambassadors Manager |

### Bucket Configuration
- **Visibility:** Public (read access for everyone)
- **Max File Size:** 5 MB
- **Allowed MIME Types:** `image/jpeg`, `image/jpg`, `image/png`, `image/webp`

### Storage Policies Required (per bucket)

| Policy | Operation | Target Role |
|---|---|---|
| Public read access | SELECT | `public` |
| Authenticated users can upload | INSERT | `authenticated` |
| Authenticated users can update | UPDATE | `authenticated` |
| Authenticated users can delete | DELETE | `authenticated` |

See `supabase/STORAGE_SETUP.md` for step-by-step setup instructions.

---

## 13. Configuration Files

### `next.config.ts`
Configures allowed external image domains for `next/image`:
- `images.unsplash.com` — Demo/placeholder images
- `xgllvdqudjdwybvdkjow.supabase.co` — Hardcoded Supabase storage domain
- Dynamic Supabase hostname from `NEXT_PUBLIC_SUPABASE_URL`

### `tailwind.config.ts`
Tailwind v4 configuration with typography plugin.

### `postcss.config.mjs`
Uses `@tailwindcss/postcss` plugin for CSS processing.

### `tsconfig.json`
TypeScript config with `@/*` path alias pointing to project root.

### `app/manifest.json`
PWA manifest — app name, icons, theme color `#1A6B3C`.

---

## 14. Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm
- A Supabase project (free tier works fine)

### Setup Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd himmatkaar

# 2. Install dependencies
npm install

# 3. Set up environment variables
copy .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Set up the database
# In Supabase Dashboard → SQL Editor, run:
# supabase/setup.sql            (tables, RLS, triggers)
# supabase/storage-policies.sql (storage bucket policies)

# 5. Create storage buckets
# In Supabase Dashboard → Storage:
# Create: event-images, team-images, ambassador-images (all public)

# 6. Create your admin user
# Register at /signup, then run in SQL Editor:
# SELECT public.set_user_role_by_email('your@email.com', 'admin');

# 7. Start the development server
npm run dev

# 8. Open the app
# Public site:    http://localhost:3000
# Admin login:    http://localhost:3000/login
# Admin panel:    http://localhost:3000/dashboard/admin
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Next.js) |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint code linting |

---

## 15. Deployment

### Recommended: Vercel

1. Push code to GitHub / GitLab
2. Import project on [vercel.com](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Next.js

### Production Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
NEXT_PUBLIC_APP_URL=https://himmatkaar.org
NEXT_PUBLIC_APP_NAME=HimmatKaar
NEXT_PUBLIC_ADMIN_EMAILS=admin@himmatkaar.org
```

### Post-Deployment Checklist

- [ ] All environment variables configured in hosting platform
- [ ] Supabase schema applied (`setup.sql`)
- [ ] Storage buckets created with correct RLS policies
- [ ] Admin user created and promoted via `set_user_role_by_email()`
- [ ] `NEXT_PUBLIC_APP_URL` set to production domain
- [ ] Login tested at `/login`
- [ ] Image upload tested from Admin Dashboard
- [ ] Public pages verified (home, events, blog, team, ambassadors)

---

*Built with love for HimmatKaar Fellowship Program — Faisalabad, Pakistan*
