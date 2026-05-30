# MicroPulse

Micro Survey & Embedded Feedback Widget - Weekend Build Project

## Overview

MicroPulse is a SaaS tool that lets website owners embed lightweight, one-question surveys (micro surveys) into their pages without disrupting user experience. Simply paste a script tag, and the widget appears automatically with all responses stored in your MicroPulse dashboard.

## Features

- **Magic Link Authentication** - No password required, sign in via email
- **4 Survey Types**:
  - ⭐ Star Rating (1-5)
  - 📊 NPS Score (0-10)
  - ☑️ Multiple Choice (up to 5 options)
  - 💬 Open Text (max 500 chars)
- **Embeddable Widget** - Vanilla JS, <5KB gzipped, Shadow DOM isolation
- **Real-time Analytics** - View response distribution and statistics
- **CSV Export** - Download all responses with timestamps
- **Non-intrusive** - Widget only shows once per session

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Deployment**: Vercel
- **Widget**: Vanilla JavaScript with Shadow DOM

## Local Development

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Setup

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**

   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_WIDGET_BASE_URL=http://localhost:3000
   ```

3. **Database is already set up** via Supabase MCP tools with:
   - `surveys` table with RLS policies
   - `responses` table with RLS policies

4. **Start development server**
   ```bash
   npm run dev
   ```

   App runs at http://localhost:3000

### Testing the Widget

1. Sign in to http://localhost:3000
2. Create a survey in the dashboard
3. Go to the Embed page and copy your survey ID
4. Open `test-widget.html` in a text editor
5. Replace `YOUR_SURVEY_ID` with your actual survey ID
6. Open `test-widget.html` in a browser
7. Widget should appear in bottom-right corner

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Import project in Vercel dashboard
   - Add environment variables from `.env.local`
   - Update `NEXT_PUBLIC_WIDGET_BASE_URL` to your production URL
   - Deploy

3. **Update Supabase Auth**
   - Add your Vercel domain to Supabase Auth allowed redirect URLs
   - Format: `https://your-domain.vercel.app/auth/callback`

## Project Structure

```
/app
  /(dashboard)           # Protected dashboard routes
    /dashboard          # Main dashboard
      /surveys/new      # Create survey
      /surveys/[id]
        /embed          # Embed code page
        /results        # Analytics page
  /api
    /widget/[id]        # Public API: Get survey data
    /responses          # Public API: Submit response
    /export/[id]        # Protected API: CSV export
  /auth
    /callback           # Auth callback handler
    /signout            # Sign out handler
  /login                # Login page
/lib
  /supabase             # Supabase clients
  /types.ts             # TypeScript types
/public
  /widget.js            # Embeddable widget script
```

## Key Implementation Details

### Widget Architecture
- Vanilla JS, no dependencies
- Shadow DOM for CSS isolation
- Session storage to prevent duplicate displays
- Graceful error handling (silent failures)
- <5KB gzipped

### Security
- Row Level Security (RLS) on all tables
- Magic link authentication
- Survey owners can only view their own data
- Public can submit responses (with validation)
- Rate limiting on response endpoint (TODO)

### Database Schema

**surveys**
- id (uuid, PK)
- user_id (uuid, FK to auth.users)
- title, question, type, options (jsonb), status
- RLS: users see only their surveys

**responses**
- id (uuid, PK)
- survey_id (uuid, FK to surveys)
- answer, respondent_id, page_url
- RLS: public can insert, owners can read

## MVP Checklist

- [x] Magic link login
- [x] Create surveys (4 types)
- [x] Embed code generator
- [x] Widget.js implementation
- [x] Response collection
- [x] Analytics/results page
- [x] CSV export
- [x] Loading states
- [x] Error handling
- [ ] End-to-end testing
- [ ] Production deployment
- [ ] Lighthouse performance check

## Future Enhancements (Post-MVP)

- [ ] Widget customization (colors, position)
- [ ] Delay widget appearance (data-delay attribute)
- [ ] Date range filters on results
- [ ] Advanced rate limiting with Upstash
- [ ] Survey edit after responses
- [ ] Multi-question surveys
- [ ] Response notifications
- [ ] Team collaboration

## License

MIT

---

Built as a weekend project with Claude Code
