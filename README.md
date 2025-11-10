# Alpha Dev Test

A modern Next.js scaffold with server components, GSAP animations, Supabase database, AWS Lambda integration, and CloudFlare deployment support.

## Tech Stack

- **Next.js 15** - React framework with App Router and Server Components
- **TypeScript** - Type-safe development
- **GSAP + SplitText** - Professional-grade animation library with text animations
- **SASS** - CSS preprocessor for advanced styling (indent-based syntax)
- **Supabase** - PostgreSQL database with real-time capabilities
- **AWS Lambda** - Serverless function integration (optional)
- **CloudFlare Pages** - Deployment platform
- **Jest** - Testing framework with comprehensive test coverage

## Quick Links

- 📖 **[Deployment Guide](./DEPLOYMENT.md)** - Complete setup and deployment instructions
- 🗄️ **[Database Schema](./supabase/schema.sql)** - Supabase table definitions

## Project Structure

```
alpha-dev-test/
├── app/                      # Next.js App Router directory
│   ├── api/                 # API routes
│   │   ├── lambda/         # Lambda invocation endpoint
│   │   └── reversed-texts/ # Supabase CRUD endpoints
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Home page
│   ├── page.module.sass    # Home page styles
│   └── globals.sass        # Global styles
├── components/              # React components
│   ├── AnimatedHero.tsx           # GSAP animated hero component
│   ├── WordReverser.tsx           # Text reversal with animations
│   ├── ReversedTextHistory.tsx    # History display component
│   └── *.module.sass              # Component styles
├── hooks/                   # Custom React hooks
│   └── useLambda.ts        # Hook for Lambda invocations
├── lib/                     # Utility libraries
│   ├── aws-lambda.ts       # AWS Lambda integration utilities
│   ├── supabase.ts         # Supabase client and helpers
│   ├── text-utils.ts       # Text manipulation functions
│   └── text-utils.test.ts  # Jest tests
├── supabase/                # Supabase configuration
│   └── schema.sql          # Database schema
├── next.config.ts          # Next.js configuration
├── jest.config.ts          # Jest configuration
├── tsconfig.json           # TypeScript configuration
├── wrangler.toml           # CloudFlare deployment config
├── DEPLOYMENT.md           # Deployment guide
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)
- AWS account (optional, for Lambda integration)
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

# AWS (optional)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
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
3. Add your AWS credentials and other secrets

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
