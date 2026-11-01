# Himmatkaar Platform — Comprehensive Website Documentation

Welcome to the official documentation for **Himmatkaar**, a modern, high-impact web application built to empower youth and students across Pakistan through career readiness programs, technical workshops, community leadership, and LaunchPad cohorts.

---

## 🌟 1. Executive Summary & Design System

### Design Aesthetic: **July Fund Dark Monograph**
The entire platform is built with a bespoke **Dark Monograph Design System** (Dark Green & Gold/Mint Theme):

- **Obsidian Canvas (`#0a110e`)**: Deep dark background providing cinematic contrast.
- **Deep Field Cards (`#0f231c`, `#16241e`, `#113024`)**: Harmonious dark forest green surfaces for interactive components and content cards.
- **Typography**:
  - **Headers**: Elegant serif headers (`font-portrait` / `font-serif`) for brand presence.
  - **Body & Labels**: Clean gallery sans-serif font (`font-sans-gallery`) with muted green/grey tones (`var(--color-text-muted)` / `#94a3b8`).
- **Accents & Badges**:
  - **Gold Badge (`#d97706` / `var(--color-badge-gold)`)**: Highlights featured tracks, cohort dates, and primary status tags.
  - **Mint Badge (`#a8d5b5` / `var(--color-badge-mint)`)**: Used for category labels, active indicators, and secondary tags.
- **Interactive Pill Buttons**:
  - `btn-filled-pill`: Filled gold/amber action button with smooth hover elevation.
  - `btn-ghost-pill`: Elegant outline button with translucent green hover state.

---

## 🎠 2. Dynamic Hero Background Carousels

The website features full-bleed, animated background image carousels with dark vignette overlays across key section landing pages:

1. **Home Page Hero (`/`)**: Dynamic slide transitions with call-to-action overlay.
2. **Events Page Hero (`/events` & `/events/upcoming`)**: 4 featured high-resolution event slides (`/events/event-slide-1.jpg` .. `4.jpg`).
3. **Team Page Hero (`/team` & `/core-team`)**: 4 featured team action slides (`/team-slides/team-slide-1.jpg` .. `4.jpg`).
4. **LaunchPad Hero (`/launchpad` & `/launchpad/cohort-1`)**: 5 featured workshop & fellowship slides (`/launchpad-slides/launchpad-slide-1-v2.jpg` .. `5.jpg`).

All carousels feature auto-sliding timer controls, manual previous/next arrows, and indicator dots.

---

## 🗺️ 3. Complete Application Architecture & Routes

The application consists of **37 static and dynamic routes** built with Next.js 16 App Router:

### Public Pages
- **`/` (Home)**: Hero section, About section, Impact statistics, Core tracks, Featured events, Cohorts, Testimonials, and Newsletter subscription.
- **`/about`**: Mission statement, organizational vision, value pillars, and growth history.
- **`/team`**: Core leadership team, campus ambassadors overview, and background carousel.
- **`/core-team`**: Full core team directory with pagination and filters.
- **`/ambassadors`**: Campus ambassador network across major cities in Pakistan (Lahore, Islamabad, Karachi, Faisalabad).
- **`/events`**: Event listings with category tabs, search bar, date filters, and detail modals.
- **`/events/upcoming`**: Dedicated upcoming events showcase with instant registration forms.
- **`/launchpad`**: LaunchPad Incubator & Fellowship program overview, syllabus, track comparison, and cohort application portal.
- **`/launchpad/cohort-1`**: Special Cohort-1 detail page with session schedule, mentor profiles, and interactive `SessionDetailModal`.
- **`/fellowship`**: Career fellowship track breakdown.
- **`/impact`**: Metrics, student placement statistics, partner logos, and impact stories.
- **`/technical-workshops`**: Specialized technical masterclasses and skill tracks.
- **`/networking-events`**: Community meetups and industry networking sessions.
- **`/testimonials`**: Student success stories and alumni reviews.
- **`/contact`**: Interactive inquiry form with direct backend storage in Supabase.
- **`/blog` & `/blog/[slug]`**: Articles, career guides, and news updates.
- **`/login`, `/register`, `/signup`**: User authentication portals.
- **`/privacy`, `/terms`, `/cookie-policy`**: Legal documentation pages.

### Admin Dashboard Suite (`/dashboard/admin`)
- **`/dashboard/admin`**: Executive overview stats (total events, team members, ambassadors, messages, subscribers).
- **`/dashboard/admin/events`**: Event CRUD interface (create, update date/location/seats, delete).
- **`/dashboard/admin/team`**: Team member profile management with image upload.
- **`/dashboard/admin/ambassadors`**: Campus ambassador city & role management.
- **`/dashboard/admin/messages`**: Contact form message viewer and status tracker.
- **`/dashboard/admin/blog`**: Blog article editor and publisher.

---

## 🗄️ 4. Database Schema & Backend API Integration

The application connects to **Supabase PostgreSQL** with full serverless REST API endpoints:

### Database Tables
1. **`team_members`**: Stores profile information (`name`, `role`, `bio`, `image`, `linkedin_url`, `display_order`).
2. **`ambassadors`**: Stores ambassador records (`name`, `role`, `city`, `bio`, `image`, `linkedin_url`).
3. **`events`**: Event records (`title`, `description`, `date`, `time`, `location`, `category`, `image`, `seats`).
4. **`contact_messages`**: User form submissions (`name`, `email`, `subject`, `message`, `status`).
5. **`newsletter_subscribers`**: Email subscription records (`email`, `created_at`).

### REST API Endpoints
- **`GET / POST / PUT / DELETE /api/team`**: Team management.
- **`GET / POST / PUT / DELETE /api/ambassadors`**: Ambassador management.
- **`GET / POST / PUT / DELETE /api/events`**: Events engine.
- **`POST /api/contact`**: Inbound inquiries.
- **`POST /api/newsletter`**: Newsletter subscriptions.
- **`POST /api/upload`**: Supabase storage image upload service.

### Image Fallback Architecture (`TeamCardImage.tsx`)
To ensure profile pictures never display broken icons if remote URLs fail or return 404:
- Automatic fallback mapping converts team names (`Muhammad Usman` -> `/team/founder.jpeg`, `Hafsa Faizan` -> `/team/cofounder.png`, `Wajeeh Tariq` -> `/team/creative-lead.png`).
- Integrated browser `onError` handler dynamically swaps unoptimized remote URLs with local fallback images instantly.

---

## 🛠️ 5. Technology Stack

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Language**: TypeScript
- **Styling**: Vanilla CSS + Tailwind CSS (July Fund Dark Monograph Tokens)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase PostgreSQL + Supabase JS Client
- **Storage**: Supabase Storage Buckets

---

## 🚀 6. Local Development & Deployment

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build Verification
```bash
npm run build
```
All 37 static and dynamic routes compile clean with zero TypeScript errors.

---

*Documentation maintained for Himmatkaar Web Platform.*
