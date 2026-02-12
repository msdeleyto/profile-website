# Profile Website

Single-page portfolio built with **Astro**, TypeScript, and Tailwind CSS. Minimal JavaScript, snap-scroll sections, static deployment ready.

## Technology Stack

- **Astro** - Static site generator with minimal JavaScript
- **TypeScript** - Type-safe component development
- **Tailwind CSS** - Utility-first styling with custom tech theme
- **Event Delegation** - CSP-compliant interaction patterns

## Architecture

**Single Page Application** with 4 snap-scroll sections:
- Introduction
- Career (expandable experience cards)
- Skills (categorized tech stack)
- Projects (with links)

## Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Type check + build static files
npm run build

# Preview production build
npm run preview
```

## Deployment

The build process generates static files in the `dist/` folder:
- `index.html` - Main page
- `error.html` - Error page

Deploy the `dist/` folder to any static hosting service (Netlify, Vercel, Cloudflare Pages, AWS S3, etc.).

## Content Management

All content lives in TypeScript files (`src/data/`). To update content, edit the relevant data file directly.

## Styling System

**Tech Theme Design System:**
- CSS custom properties in `global.css`
- Tailwind tokens in `tailwind.config.mjs`
- Semantic color palette: `tech-*`, `accent-*`, `text-*`

## CI/CD

GitHub Actions workflows automatically:
- **PR Checks**: Type checking, security audit, build verification, and artifact upload
- **Main Branch**: Build static website and create production artifacts

All builds include `npm audit` for vulnerability scanning.
