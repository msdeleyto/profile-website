# Copilot Instructions for Profile Website

## Project Overview
Static personal profile website built with **Astro 4.0** for content-first performance. Ships minimal JavaScript, leverages static site generation, and deploys via multi-stage Docker build to nginx.

**⚠️ Security Note**: This is a public repository. Never commit secrets, API keys, or credentials. Use `.env` files (already in `.gitignore`) and GitHub Secrets for CI/CD workflows.

## Architecture & Key Patterns

### Content Collections (Content System)
- Blog posts live in `src/content/blog/*.md` with frontmatter validation via Zod schema in `src/content/config.ts`
- Schema enforces: `title`, `description`, `pubDate` (Date), `author` (default), `tags` (array)
- Access via `getCollection('blog')` in page components (see `src/pages/blog/index.astro`)
- Dynamic routes use `getStaticPaths()` to generate pages at build time (see `src/pages/blog/[slug].astro`)

### Component Architecture
- **Layout wrapper**: `src/layouts/Layout.astro` - single layout for all pages, includes Header/Footer and SEO meta tags
- **Reusable components**: All in `src/components/` (Header, Footer, ProjectCard)
- **Component props**: Use TypeScript interfaces in frontmatter for type safety (see ProjectCard example)
- **Routing**: File-based in `src/pages/` - `index.astro` (home), `professional.astro`, `personal.astro`, `blog/` directory

### Styling Conventions
- **Tailwind utility-first**: All styling via Tailwind classes, no custom CSS except global base in `src/styles/global.css`
- **Dark mode**: Use `dark:` prefix for dark mode variants (implemented throughout)
- **Common patterns**: 
  - Container: `container mx-auto px-4`
  - Cards: `bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700`
  - Links: `text-blue-600 dark:text-blue-400 hover:underline`
- **Prose styling**: Blog content uses Tailwind Typography with customized dark mode prose classes (see `[slug].astro`)

### Current Path Highlighting
Navigation uses `Astro.url.pathname` comparison with `class:list` directive for active state styling (see `Header.astro`)

## Development Workflows

### Local Development
```bash
npm run dev        # Dev server on localhost:4321
npm run build      # Type-check with astro check, then build to dist/
npm run preview    # Preview production build locally
```

### Docker Deployment
- **Multi-stage build**: Node builder → nginx production image
- **Build artifacts**: `dist/` directory copied to `/usr/share/nginx/html`
- **Nginx config**: Custom `nginx.conf` with gzip, static asset caching, HTML fallback routing
- **Ports**: Container exposes 80, docker-compose maps to 3000
- **Command**: `docker-compose up --build` (rebuilds image and starts container)

## Customizing Site Content

### Update Personal Branding
1. **Name & Links**: Update in `src/components/Header.astro` (logo text) and `src/components/Footer.astro` (social links)
2. **Bio & Skills**: Edit `src/pages/index.astro` - hero section, skills lists, contact email
3. **Site metadata**: Change `site` URL in `astro.config.mjs` for production domain
4. **Colors**: Modify `tailwind.config.mjs` theme to customize blue accent colors (currently `blue-600/400`)
5. **Favicon**: Replace `public/favicon.svg` with your own logo

### Environment Variables (if needed)
```typescript
// Access in .astro files:
const apiKey = import.meta.env.PUBLIC_API_KEY;  // Exposed to client
const secret = import.meta.env.SECRET_KEY;      // Server-only

// Create .env file (already gitignored):
PUBLIC_API_KEY=xxx
SECRET_KEY=yyy
```

## Adding Content

### New Blog Posts
1. Create `src/content/blog/your-post.md`
2. Add required frontmatter (copy from existing posts):
   ```yaml
   ---
   title: "Post Title"
   description: "Brief description"
   pubDate: 2026-01-04
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write content in markdown below frontmatter
4. Posts auto-appear on `/blog` index sorted by date descending

### New Projects
Edit `professional.astro` or `personal.astro`, add to `projects` array:
```javascript
{
  title: "Project Name",
  description: "Description text",
  technologies: ["Tech1", "Tech2"],
  link: "https://...",  // optional
  github: "https://...", // optional
}
```

### New Pages
Create `.astro` file in `src/pages/`, wrap in `<Layout>`, auto-routes by filename
Testing Strategy

### Type Checking (Current)
```bash
npm run build  # Runs `astro check` + build - catches TypeScript/prop errors
```

### Recommended Testing Stack (Industry Standard for Astro)
```bash
# Unit/Component Testing
npm install -D vitest @vitest/ui
npm install -D @astrojs/test-utils  # For testing Astro components

# E2E Testing (recommended for static sites)
npm install -D @playwright/test     # Industry standard for E2E
# OR
npm install -D cypress             # Alternative with great DX
```

**Testing Priorities for Static Sites**:
1. Type checking (already in place via `astro check`)
2. E2E tests for critical user flows (navigation, blog post rendering)
3. Visual regression tests if design consistency is critical
4. Unit tests only for complex logic/utilities (Astro components render at build time)

## CI/CD Workflows

### GitHub Actions
Two workflows are configured:

**1. PR Checks** ([`.github/workflows/pr-checks.yml`](.github/workflows/pr-checks.yml))
- Runs on every pull request to `main`
- Executes type checking (`astro check`)
- Builds Docker image
- Runs smoke test (starts container, curls homepage)
- Does not push to ECR

**2. Deploy to ECR** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))
- Runs on push to `main` branch
- Performs all PR checks
- Authenticates with AWS
- Pushes to Amazon ECR with commit SHA and `latest` tags

**Required GitHub Secrets** (Settings → Secrets → Actions):
- `AWS_ACCESS_KEY_ID`: IAM user access key with ECR permissions
- `AWS_SECRET_ACCESS_KEY`: IAM user secret key
- `AWS_REGION`: AWS region for ECR (e.g., `us-east-1`)

### Build Performance
- Current build: ~30-60s (including Docker multi-stage)
- `node_modules` cached via `actions/cache` in Node.js setup
- Multi-stage Docker build keeps final image <50MB

## Configuration Files

### Astro Config (`astro.config.mjs`)
- Minimal config: Tailwind integration, static output mode
- Update `site` URL for production deployment (used for sitemap/canonical URLs)

### Tailwind Config (`tailwind.config.mjs`)
- Content paths configured for all Astro file types
- Extend `theme` for custom colors/spacing (currently uses defaults)

### TypeScript Config
- Extends Astro strict preset
- No custom overrides needed for typical changes

## Docker Optimization Notes
- `.dockerignore` excludes `node_modules`, `dist`, logs to reduce context size
- Nginx serves static files efficiently with 1-year cache headers for assets
- HTML files use fallback routing (`try_files $uri $uri/ $uri.html`) for clean URLs

## Common Patterns to Follow
- TypeScript interfaces for component props (required for Astro type checking)
- Destructure Astro.props immediately in frontmatter
- Use optional chaining for conditional content (`{link && <a href={link}>...`)
- Responsive grids: `grid grid-cols-1 md:grid-cols-2` pattern throughout
- Consistent spacing: `mb-4`, `mb-8`, `mb-16` for vertical rhythm
