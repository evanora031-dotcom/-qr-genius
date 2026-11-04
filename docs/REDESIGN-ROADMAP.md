# GetQRGenius redesign and product roadmap

## Working branch
- Branch: `feature/site-redesign`
- Production branch: `main` (unchanged)
- Site: https://getqrgenius.com/

## Current architecture observed
- React 19 + TypeScript + Vite 8
- Tailwind CSS 4
- Cloudflare Pages with Pages Functions
- Browser-side QR generation using `qrcode` and a custom canvas/SVG renderer
- Existing localized routes for English, Arabic, French, and Spanish
- Existing prerender script and localized sitemap generation
- Existing QR Studio, QR type selector, customization panel, preview/export card, and local history

## Guiding decision
Improve the existing application incrementally. Do not replace the framework or rebuild the domain/site from scratch without evidence that the current implementation blocks a requirement.

## Non-negotiable safeguards
1. Keep all work on `feature/site-redesign` until review.
2. Do not change DNS, production Cloudflare settings, secrets, or production environment variables as part of UI work.
3. Preserve existing canonical URLs and localized URL structure unless a redirect plan is documented and tested.
4. Do not claim QR content is private/client-side unless the actual code path supports that claim.
5. Do not label a decorative QR illustration as scannable or standards-compliant.
6. Test generated QR codes with independent scanners before release.
7. Do not introduce Dynamic QR, accounts, analytics collection, or billing until the product model, privacy disclosures, abuse controls, and persistence requirements are designed.

## Workstreams and acceptance criteria

### A. Baseline and quality gates
- Install dependencies with the lockfile's package manager.
- Run `npm run lint` and `npm run build` (or the repository's Bun equivalents).
- Capture current route, metadata, mobile layout, and QR generation behavior.
- Record Lighthouse and Core Web Vitals baselines.
- Verify every route and locale directly, not only through client-side navigation.

### B. Brand and UX
- Establish consistent typography, spacing, button hierarchy, form states, and accessible focus states.
- Keep the homepage action-oriented: users should reach the QR Studio in one clear action.
- Ensure navigation and language switching preserve the current page where a translation exists.
- Validate Arabic RTL layout at mobile and desktop widths.
- Keep the current useful tool pages and legal/help content.

### C. QR Studio correctness
- Replace placeholder sample payloads with the real GetQRGenius domain where appropriate.
- Ensure empty or invalid input does not silently generate a QR for an unrelated fallback URL.
- Show useful validation errors for payloads that exceed QR capacity.
- Check contrast, quiet zone, logo size, and error-correction settings.
- Independently scan test outputs from PNG, SVG, and PDF.
- Verify downloaded file contents match the visible preview.

### D. SEO and internationalization
- Preserve canonical routes and existing localized route conventions.
- Validate title, description, canonical, hreflang, robots, sitemap, and prerender output for each route.
- Inspect Search Console URL-level indexing and page experience reports before changing SEO architecture.
- Avoid thin near-duplicate pages and unsupported keyword claims.
- Add internal links between relevant tools, FAQs, and genuinely useful guides.

### E. Performance, accessibility, and security
- Set explicit image dimensions and lazy-load non-critical media.
- Avoid unnecessary client-side bundles and duplicated dependencies.
- Check keyboard navigation, labels, contrast, reduced motion, and screen-reader names.
- Review contact endpoint validation, rate limits, and abuse protection.
- Never commit API keys, tokens, private environment files, or customer data.

### F. Future product options (separate scope)
- Dynamic QR redirects and scan analytics
- User accounts and saved cloud projects
- Team/workspace features
- Subscription and billing
- Business templates for restaurants, retail, and events

These require a separate data model, retention policy, abuse/redirect safeguards, payment provider eligibility, and operational cost estimate.

## First implementation changes
- Create an isolated feature branch.
- Align the default URL QR payload and renderer fallback with `https://getqrgenius.com` rather than the unrelated `qrgenius.app` placeholder.
- Keep production deployment untouched while validation is pending.

## Release checklist
- [ ] TypeScript check passes
- [ ] Production build passes
- [ ] All 4 locales render correctly
- [ ] All existing routes return the intended page
- [ ] Static QR test matrix scans successfully on at least two independent scanner apps
- [ ] PNG/SVG/PDF exports validated
- [ ] Mobile and RTL visual QA complete
- [ ] Metadata, canonical, hreflang, sitemap, and robots validated
- [ ] Cloudflare preview checked
- [ ] Pull request reviewed before merging to `main`
