# Copilot Instructions for Profile Website

## Project Overview
Single-page portfolio built with **Astro 4.0**, TypeScript, and Tailwind CSS. Minimal JavaScript, snap-scroll sections, static deployment ready.

**⚠️ Security**: This is public. Never commit secrets. Use `.env` (gitignored) and GitHub Secrets for CI/CD.

## Architecture

### Single Page Structure
- **One page** (`src/pages/index.astro`) with 4 snap-scroll sections: Introduction, Career, Skills, Projects
- **Visual navigation**: Fixed scroll indicator dots track active section
- **Content source**: All data in TypeScript files (`src/data/`) - no CMS, no markdown content

### Component System (src/components/)
**Core Layout:**
- `PageSection.astro` - Snap-scroll wrapper (handles `data-section` attribute for observers)
- `Section.astro` - Content container (simplified, no props needed)

**UI Components:**
- `Text.astro` - Typography with variants: `h1`, `h2`, `h3`, `body` (required `variant` prop)
- `Tag.astro` - Tech stack badges (no props)
- `Link.astro` - Links with optional `arrow` and `external` props
- `ExperienceCard.astro` - Expandable cards with aria-controls (uses data attributes for event delegation)
- `ProjectCard.astro` - Project display with optional `link`/`github`
- `ScrollIndicator.astro` - Fixed navigation dots

**Section Pages** (`src/sections/index/`): Each wraps content in `PageSection` → `Section` → specific layout

### Interaction Pattern - Event Delegation
**Key architectural decision**: All interactive elements use data attributes + event delegation, not inline handlers.

```typescript
// src/scripts/experienceCards.ts
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-experience-toggle]');
  // Single listener handles all cards
});
```

**Why**: CSP-compliant, testable, single listener per feature (not per element).

**Components using this**:
- `ExperienceCard.astro`: `data-experience-toggle={cardId}` + `aria-expanded`
- `ScrollIndicator.astro`: `data-scroll-to={index}` for navigation

### Consolidated Intersection Observer
**Critical pattern**: Single observer handles both animations AND navigation tracking.

```typescript
// src/scripts/scrollAnimation.ts - exports initScrollObserver()
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    animationCallback(entry);    // Fade-in animations
    navigationCallback(entry);   // Update active dot
  });
}, { threshold: [0.2, 0.5] });
```

**Why**: Avoid duplicate observers. One observer, multiple callbacks.

**⚠️ Don't create new observers** for section tracking - extend the callback array in `scrollAnimation.ts`.

### Styling Architecture

**Tech Theme Design System** (`src/styles/global.css`):
```css
/* CSS Custom Properties (root level) */
--expandable-max-height: 1000px;
--scroll-dot-size: 10px;
--section-translate-y: 30px;

/* Semantic classes (tech-prefixed) */
.tech-card, .tech-tag, .tech-link, .tech-link-arrow
.tech-h1, .tech-h2, .tech-h3, .tech-text
.status-active, .status-inactive
```

**Tailwind Tokens** (`tailwind.config.mjs`):
```javascript
colors: {
  tech: { bg, surface, border, hover },
  accent: { primary, secondary, success },
  text: { primary, secondary, muted, dim }
}
```

**⚠️ Use Tailwind tokens in classes**: `bg-tech-surface` NOT CSS class names like `bg-tech-card`.

## Data Management

**All content in `src/data/`** (TypeScript, not markdown):
- `introduction.ts` - Name + description
- `career.ts` - Experience array with interface `Experience`
- `skills.ts` - Object with category keys
- `projects.ts` - Project array with interface `Project`

**To add content**: Edit these files directly. No API, no database.

## Development Workflows

```bash
npm run dev      # localhost:4321
npm run build    # Runs astro check (type safety) + build static files
npm run preview  # Test prod build locally
```

**Type Checking**: `astro check` runs on build. Fix all errors before committing.

**Build Output**: Static files generated in `dist/` folder ready for deployment.

## Common Patterns

### Creating Components
```astro
---
interface Props {
  required: string;
  optional?: boolean;
}
const { required, optional = false } = Astro.props;
---
```

**Props with defaults MUST be optional** (`?:` in interface).

### Adding Sections
1. Create data in `src/data/`
2. Create section in `src/sections/index/`
3. Import in `src/pages/index.astro`
4. Update `<ScrollIndicator sections={[...]}` array

### Using Text Component
```astro
<Text variant="h2">Career</Text>  <!-- variant required -->
<Text variant="body" class="mt-4">Description</Text>  <!-- class optional -->
```

### CSS Variables Over Magic Numbers
```css
/* ✅ Good */
max-height: var(--expandable-max-height);

/* ❌ Bad */
max-height: 1000px;
```

## Known Limitations
- Section names in `ScrollIndicator` are hardcoded (manual sync required)
- No dark mode toggle (single theme)
- Single page only (no routing)
- `location` in Experience is required but displays conditionally (historical)

## CI/CD
- **PR Checks**: Type check + security audit + build verification + artifact upload
- **Main Branch**: Build static website and create production artifacts
- **Security**: `npm audit` runs on all builds to detect vulnerabilities

## File You Might See But Shouldn't Use
- `src/components/TechSection.astro` - **Unused duplicate**, ignore it
- Any reference to blog posts or content collections - infrastructure exists but no content
  - `text.*` - Text hierarchy from primary to dim
- Mono font stack configured for tech aesthetic

### TypeScript Config
- Extends Astro strict preset
- No custom overrides needed for typical changes

## Best Practices
- **TypeScript**: Always define interfaces for component props (required for Astro type checking)
- **Props destructuring**: Destructure `Astro.props` immediately in frontmatter with defaults
- **Conditional rendering**: Use optional chaining: `{link && <a href={link}>...`
- **Responsive layout**: Mobile-first with `md:` breakpoint (768px)
- **Spacing system**: Consistent vertical rhythm with `mb-4`, `mb-8`, `mb-16`
- **Color usage**: 
  - Use Tailwind color tokens: `bg-tech-surface`, `text-text-primary`, `border-tech-border`
  - NOT the CSS class names directly (e.g., don't use `bg-tech-card`)
- **Component composition**: Build complex layouts by composing small reusable components
- **Animation**: Sections fade in on scroll via Intersection Observer
- **Icons**: Use inline SVG for icons (see expand icon in ExperienceCard)

## Known Technical Debt
- Inline onclick handlers in ExperienceCard and ScrollIndicator (should migrate to external event handlers)
- Duplicate Intersection Observer logic (scrollAnimation.ts and ScrollIndicator.astro)
- Magic numbers in CSS (should use CSS custom properties)
- Some placeholder content in introduction.tsype checking)
- Destructure Astro.props immediately in frontmatter
- Use optional chaining for conditional content (`{link && <a href={link}>...`)
- Responsive grids: `grid grid-cols-1 md:grid-cols-2` pattern throughout
- Consistent spacing: `mb-4`, `mb-8`, `mb-16` for vertical rhythm
