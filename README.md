# Wordsmith Inc

Wordsmith Inc has a world-leading business idea: To reverse words in sentences. The order of letters
is reversed and the original order in the sentence is retained.

## Tech Stack

- **Next.js 15** - React framework with App Router and Server Components
- **TypeScript** - Type-safe development
- **GSAP + SplitText** - Professional-grade animation library with text animations
- **SASS** - CSS preprocessor for advanced styling (indent-based syntax)
- **Supabase** - PostgreSQL database with real-time capabilities
- **CloudFlare Pages** - Deployment platform
- **Jest** - Testing framework with comprehensive test coverage
- **Playwright** - E2E testing framework

## Quick Links

- 🗄️ **[Database Schema](./supabase/schema.sql)** - Supabase table definitions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- Supabase account

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your app.

### Building for Production

```bash
npm run build
npm start
```

## SASS Styling

The project uses SASS (indent-based syntax) for styling. You can use:

- **Module styles**: `*.module.sass` files for component-scoped styles
- **Global styles**: `globals.sass` for app-wide styles

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

- `npm run lint` - Run ESLint
- `npm run test:e2e` - Run E2E tests
