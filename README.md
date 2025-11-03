# Alpha Dev Test

A modern Next.js scaffold with server components, GSAP animations, AWS Lambda integration, and CloudFlare deployment support.

## Tech Stack

- **Next.js 15** - React framework with App Router and Server Components
- **TypeScript** - Type-safe development
- **GSAP** - Professional-grade animation library
- **SASS** - CSS preprocessor for advanced styling
- **AWS Lambda** - Serverless function integration
- **CloudFlare Pages** - Deployment platform

## Project Structure

```
alpha-dev-test/
├── app/                      # Next.js App Router directory
│   ├── api/                 # API routes
│   │   └── lambda/         # Lambda invocation endpoint
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Home page
│   ├── page.module.sass    # Home page styles
│   └── globals.sass        # Global styles
├── components/              # React components
│   ├── AnimatedHero.tsx    # GSAP animated hero component
│   └── AnimatedHero.module.sass
├── hooks/                   # Custom React hooks
│   └── useLambda.ts        # Hook for Lambda invocations
├── lib/                     # Utility libraries
│   └── aws-lambda.ts       # AWS Lambda integration utilities
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── wrangler.toml           # CloudFlare deployment config
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- AWS account (for Lambda integration)
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

Edit `.env` and add your AWS credentials:

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
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

## AWS Lambda Integration

### Server-Side Usage

Use the Lambda utility in server components or API routes:

```typescript
import { invokeLambda } from '@/lib/aws-lambda';

const result = await invokeLambda({
  functionName: 'your-function-name',
  payload: { key: 'value' },
});
```

### Client-Side Usage

Use the `useLambda` hook in client components:

```typescript
'use client';

import { useLambda } from '@/hooks/useLambda';

function MyComponent() {
  const { invoke, loading, error, data } = useLambda({
    functionName: 'your-function-name',
    onSuccess: (data) => console.log('Success:', data),
    onError: (error) => console.error('Error:', error),
  });

  const handleClick = () => {
    invoke({ key: 'value' });
  };

  return <button onClick={handleClick}>Invoke Lambda</button>;
}
```

### API Route

The project includes a Lambda invocation API route at `/api/lambda`:

```bash
# POST request
curl -X POST http://localhost:3000/api/lambda \
  -H "Content-Type: application/json" \
  -d '{"functionName": "your-function", "payload": {"key": "value"}}'
```

## GSAP Animations

The project includes an example animated hero component using GSAP. To create your own animations:

```typescript
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedComponent() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, elementRef);

    return () => ctx.revert();
  }, []);

  return <div ref={elementRef}>Animated content</div>;
}
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

Example:

```sass
// styles.module.sass
$primary-color: #667eea

.container
  background: $primary-color

  .title
    font-size: 2rem

    &:hover
      opacity: 0.8
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run pages:build` - Build for CloudFlare Pages
- `npm run pages:deploy` - Deploy to CloudFlare Pages
- `npm run pages:dev` - Development with CloudFlare Pages

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [CloudFlare Pages](https://developers.cloudflare.com/pages/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [SASS Documentation](https://sass-lang.com/documentation/)

## License

MIT
