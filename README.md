# Profile Website

Single-page portfolio built with **Astro**, TypeScript, and Tailwind CSS. Minimal JavaScript, snap-scroll sections, Docker deployment ready.

## Technology Stack

- **Astro** - Static site generator with minimal JavaScript
- **TypeScript** - Type-safe component development
- **Tailwind CSS** - Utility-first styling with custom tech theme
- **Docker** - Containerized deployment with Nginx
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

# Type check + build
npm run build

# Preview production build
npm run preview
```

## Docker

```bash
# Build and run (port 3000)
docker-compose up --build

# Manual build
docker build -t profile .
docker run -p 3000:80 profile
```

## Content Management

All content lives in TypeScript files (`src/data/`). To update content, edit the relevant data file directly.

## Styling System

**Tech Theme Design System:**
- CSS custom properties in `global.css`
- Tailwind tokens in `tailwind.config.mjs`
- Semantic color palette: `tech-*`, `accent-*`, `text-*`
