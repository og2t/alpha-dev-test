# Alpha Dev Test

A modern Next.js scaffold with server components, GSAP animations, Supabase database and CloudFlare deployment support.

## Tech Stack

- **Next.js 15** - React framework with App Router and Server Components
- **TypeScript** - Type-safe development
- **GSAP + SplitText** - Professional-grade animation library with text animations
- **SASS** - CSS preprocessor for advanced styling (indent-based syntax)
- **Supabase** - PostgreSQL database with real-time capabilities
- **CloudFlare Pages** - Deployment platform
- **Jest** - Testing framework with comprehensive test coverage

## Quick Links

- 📖 **[Deployment Guide](./DEPLOYMENT.md)** - Complete setup and deployment instructions
- 🗄️ **[Database Schema](./supabase/schema.sql)** - Supabase table definitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)
- CloudFlare account (for deployment)

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

**📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions**

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

## CloudFlare Deployment

### Using CloudFlare Pages

1. Build for CloudFlare Pages:

```bash
npm run pages:build
```

2. Deploy to CloudFlare:

```bash
npm run pages:deploy
```

### Environment Variables

Set your environment variables in the CloudFlare dashboard:

1. Go to your Pages project
2. Navigate to Settings > Environment variables

### Automatic Deployment

Connect your GitHub repository to CloudFlare Pages for automatic deployments:

1. Log in to CloudFlare dashboard
2. Go to Pages > Create a project
3. Connect your GitHub repository
4. Set build command: `npm run pages:build`
5. Set output directory: `.vercel/output/static`

## SASS Styling

The project uses SASS (indent-based syntax) for styling. You can use:

- **Module styles**: `*.module.sass` files for component-scoped styles
- **Global styles**: `globals.sass` for app-wide styles
- **Variables, mixins, nesting**: All SASS features are supported

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run pages:build` - Build for CloudFlare Pages
- `npm run pages:deploy` - Deploy to CloudFlare Pages
- `npm run pages:dev` - Development with CloudFlare Pages
