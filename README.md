# Samanyu Portfolio

An immersive, story-first developer portfolio built with Next.js App Router, Tailwind CSS, Framer Motion, and React Three Fiber. The homepage behaves like a guided journey through live GitHub work instead of a static grid of cards.

## Highlights

- GitHub-powered repository ingestion with a resilient local snapshot fallback
- Cinematic hero section with a 3D scene and motion-led introduction
- Story-based project chapters with dedicated deep-dive pages
- Interactive skill orbit derived from the repository graph
- SEO metadata, dynamic OG images, sitemap, and robots support
- Vercel-friendly setup with cached GitHub fetches

## Stack

- Next.js 14 App Router
- Tailwind CSS
- Framer Motion
- React Three Fiber / Three.js
- TypeScript

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file:

```bash
cp .env.example .env.local
```

3. Start the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Environment variables

- `GITHUB_USERNAME`
  Defaults to `Samanyu-dev`. Change it if you want to point the experience at a different public profile.

- `GITHUB_TOKEN`
  Optional, but recommended for Vercel so GitHub API rate limits are less likely to affect production fetches.

- `NEXT_PUBLIC_SITE_URL`
  Used for canonical metadata, OG routes, robots, and sitemap output.

The app fetches public repositories at runtime with `revalidate` caching. If GitHub is unavailable during local builds, it falls back to a checked-in snapshot so the site still builds cleanly.

## GitHub data model

The portfolio does not render raw repository rows directly. Instead it:

1. Fetches the profile and repository list from GitHub.
2. Enriches repositories with language and topic signals.
3. Applies repo-specific overrides where descriptions are thin or missing.
4. Derives categories such as featured, experimental, and utilities.
5. Builds narrative fields used by the chapter UI and deep-dive pages.

## Build and verification

Run a production build with:

```bash
npm run build
```

## Deploying to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables from `.env.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy.

### Recommended Vercel envs

- `GITHUB_TOKEN`
- `GITHUB_USERNAME`
- `NEXT_PUBLIC_SITE_URL`

## Project structure

- `src/app`
  App Router routes, metadata routes, sitemap, robots, and deep-dive pages.

- `src/components/portfolio`
  The narrative homepage and project detail experiences.

- `src/components/three`
  3D hero scene and lazy canvas loaders.

- `src/lib/portfolio-data.ts`
  GitHub fetching, fallback snapshot logic, categorization, and narrative derivation.

- `src/data`
  Snapshot data and repo-level storytelling overrides.

## Notes

- Only public repositories are surfaced by default in the live portfolio experience.
- If you intentionally want to include private repository metadata in a deployment, do it carefully with a token and only if you are comfortable exposing that information publicly.
