# Deployment Guide

This guide will walk you through setting up Supabase and deploying your application to CloudFlare Pages.

## Table of Contents

1. [Supabase Setup](#supabase-setup)
2. [Local Development](#local-development)
3. [CloudFlare Pages Deployment](#cloudflare-pages-deployment)
4. [Environment Variables](#environment-variables)

---

## Supabase Setup

### Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up/sign in
3. Click "New Project"

### Step 2: Create Your Project

1. **Organization**: Select or create an organization
2. **Name**: Give your project a name (e.g., "alpha-dev-test")
3. **Database Password**: Create a strong password (save this!)
4. **Region**: Choose a region close to your users
5. **Pricing Plan**: Select "Free" (perfect for this project)
6. Click "Create new project"

⏱️ **Wait 2-3 minutes** for your database to be provisioned.

### Step 3: Get Your API Credentials

Once your project is ready:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL** - Copy this
   - **anon public** key - Copy this

### Step 4: Set Up the Database Schema

1. In your Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql` from your project
4. Paste it into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)

You should see: ✅ Success. No rows returned

### Step 5: Verify the Table

1. Click **Table Editor** in the sidebar
2. You should see a table named `reversed_texts`
3. Click on it to see the structure:
   - `id` (uuid, primary key)
   - `original_text` (text)
   - `reversed_text` (text)
   - `created_at` (timestamp)

---

## Local Development

### Step 1: Install Dependencies

```bash
yarn install
```

### Step 2: Configure Environment Variables

Update your `.env` file with your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note:** These are prefixed with `NEXT_PUBLIC_` because they need to be accessible in the browser.

### Step 3: Install GSAP SplitText (Optional)

For the word flip animation to work, you need GSAP's SplitText plugin:

**Option 1: Trial version**
```bash
npm install gsap-trial
```

**Option 2: Club GreenSock membership**
- Download SplitText from your Club GreenSock account
- Follow installation instructions for npm private registry

### Step 4: Run the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 5: Test the Application

1. Type some text in the Word Reverser
2. Click "Reverse Words" to see the animation
3. After animation completes, it should save to Supabase
4. You should see "Saved to database!" message
5. Scroll down to see your reversed text in the history
6. Check your Supabase Table Editor - you should see the entry!

---

## CloudFlare Pages Deployment

### Prerequisites

- GitHub account
- Your code pushed to a GitHub repository
- CloudFlare account

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Add Supabase integration"
git push origin main
```

### Step 2: Connect to CloudFlare Pages

1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Log in to your CloudFlare account
3. Click **Pages** in the sidebar
4. Click **Create a project**
5. Click **Connect to Git**

### Step 3: Select Your Repository

1. Choose **GitHub**
2. Authorize CloudFlare to access your GitHub
3. Select your repository (`og2t/alpha-dev-test`)
4. Click **Begin setup**

### Step 4: Configure Build Settings

**Framework preset:** `Next.js`

**Build command:**
```bash
npx @cloudflare/next-on-pages
```

**Build output directory:**
```
.vercel/output/static
```

**Root directory:** (leave blank)

### Step 5: Set Environment Variables

Before clicking "Save and Deploy", add your environment variables:

Click **Add environment variable** for each:

1. **Variable name:** `NEXT_PUBLIC_SUPABASE_URL`
   **Value:** `https://your-project-id.supabase.co`

2. **Variable name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   **Value:** `your-anon-key-here`

3. **Variable name:** `AWS_REGION` (if using Lambda)
   **Value:** `us-east-1`

4. **Variable name:** `AWS_ACCESS_KEY_ID` (if using Lambda)
   **Value:** `your-access-key`

5. **Variable name:** `AWS_SECRET_ACCESS_KEY` (if using Lambda)
   **Value:** `your-secret-key`

**Important:** Set these for both **Production** and **Preview** environments.

### Step 6: Deploy

1. Click **Save and Deploy**
2. Wait 2-5 minutes for the build to complete
3. You'll see a success message with your deployment URL

### Step 7: Test Your Deployed Site

1. Click the deployment URL (something like `https://alpha-dev-test.pages.dev`)
2. Test the Word Reverser functionality
3. Check that it saves to Supabase
4. Verify the history loads correctly

---

## Environment Variables

### Required for Supabase

| Variable | Description | Where to find |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Project Settings → API |

### Required for AWS Lambda (Optional)

| Variable | Description | Where to find |
|----------|-------------|---------------|
| `AWS_REGION` | AWS region | Your AWS console |
| `AWS_ACCESS_KEY_ID` | AWS access key | IAM → Users |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | IAM → Users |

---

## Troubleshooting

### "Failed to save" message

**Check:**
1. Environment variables are set correctly in CloudFlare
2. Supabase URL and key are correct
3. Database table exists (run `schema.sql` again if needed)
4. Row Level Security policies are enabled

### "Failed to load history" message

**Check:**
1. API routes are working: visit `https://your-site.com/api/reversed-texts`
2. Should return JSON with `success: true` and an array
3. Check browser console for errors
4. Verify Supabase connection

### Build fails on CloudFlare

**Common issues:**
1. Wrong build command - should be `npx @cloudflare/next-on-pages`
2. Wrong output directory - should be `.vercel/output/static`
3. Missing dependencies - check `package.json`
4. Node version - CloudFlare uses Node 18+ by default

### GSAP SplitText not working

**Solutions:**
1. Install trial version: `npm install gsap-trial`
2. Or purchase Club GreenSock membership
3. Check browser console for import errors

---

## Update Deployment

### When you make changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

CloudFlare will automatically detect the push and redeploy! ✨

You can watch the build progress in CloudFlare Pages dashboard.

---

## Cost Estimate

### Supabase Free Tier
- ✅ 500 MB database
- ✅ 2 GB bandwidth
- ✅ 50,000 monthly active users
- ✅ Social OAuth providers

**Perfect for this project!**

### CloudFlare Pages Free Tier
- ✅ Unlimited sites
- ✅ Unlimited requests
- ✅ 500 builds per month
- ✅ Built-in SSL

**Also perfect!**

### Total Monthly Cost: $0 🎉

---

## Next Steps

Once deployed, you can:

1. **Add authentication** - Supabase makes this easy
2. **Add user profiles** - Track who created each reversal
3. **Add sharing** - Generate shareable links
4. **Add search** - Search through reversed texts
5. **Add favorites** - Let users star their favorites

Happy deploying! 🚀
