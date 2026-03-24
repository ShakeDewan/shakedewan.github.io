# Site Review And Rework Plan

## Purpose
This document defines the next version of `shakedewan.github.io`: what the site should do, what is currently weak or inconsistent, and how we should systematically improve the copy, UX, UI, information architecture, and technical foundation.

The goal is not a light polish. The goal is to turn the site into a sharper authority platform that helps:

- companies hire Shake into senior AI leadership or advisory roles
- clients understand where he creates leverage and why he is credible
- event organizers see a clear speaker / judge / moderator fit
- readers move from initial interest to trust through proof, clarity, and depth

## North Star
After the rework, the site should make four things obvious within 15 seconds:

1. Who Shake is
2. Why he is credible
3. What he should be hired for
4. What action the visitor should take next

## Current-State Review

### Highest-Priority Findings
1. The site currently behaves like multiple versions of the brand at once.
   `index.html` has the newer authority-focused design system, while `articles.html` and `articles.js` still use an older navigation structure, older titles, older metadata, and older rendering patterns.

2. The homepage and resume page are still too close in function.
   The homepage is selling, and the resume page is also selling, which creates overlap. The resume page should be more factual, complete, and recruiter-friendly; the homepage should be more narrative, selective, and conversion-oriented.

3. The articles section is structurally disconnected from the rest of the site.
   It uses old branding, inline styles, runtime DOM generation, and metadata that no longer matches the revised site positioning. It feels like a bolt-on rather than part of one coherent platform.

4. The site has a strong visual direction now, but not yet a full system.
   The homepage looks intentional. The rest of the site is partially migrated. That makes the whole site feel less authoritative than the homepage alone.

5. The technical architecture is too manual for the amount of positioning nuance now required.
   Repeated nav, footer, metadata, and styling patterns across static pages will keep drifting. Content updates are currently expensive and easy to make inconsistent.

### Copy Review
#### What is working
- The current homepage headline is much stronger than the previous version.
- The copy is clearer about executive leadership, ROI, and commercial seriousness.
- The newer resume and media pages are more aligned with current positioning than before.

#### What is not yet working
- The site still speaks to three audiences at once without explicitly routing them:
  employers, clients, and event organizers.
- Some phrasing is strong but broad. It signals authority, but not always enough specificity about service lines, role fit, or outcomes.
- There is not yet a single canonical career narrative that cleanly connects:
  Deloitte -> AI Forward -> fractional leadership -> Canadian Funding -> speaking / judging / thought leadership.
- The site underuses public authority proof.
  Judging, panel participation, startup ecosystem visibility, and public commentary should feel more intentional and better organized.

### UX / UI Review
#### What is working
- The current warm visual palette is more distinctive than the previous black-on-black design.
- The homepage hierarchy is clearer than before.
- CTA styling and section structure are directionally stronger.

#### What is not yet working
- Mobile navigation currently collapses by hiding nav links instead of replacing them with a usable mobile menu.
- There is no cross-page orientation pattern beyond basic nav.
  The user should always know where they are and what that page is for.
- Articles do not inherit the new design language.
- The site lacks richer interaction states:
  active navigation, current section context, stronger focus handling, and more deliberate content transitions.
- There is no visual system for case studies, talks, media appearances, or proof artifacts yet.

### Content Distribution Review
#### Current problem
Too much important material is duplicated or semi-duplicated between the homepage and resume page, while some high-value proof is buried or missing from the right place.

#### Recommended distribution
##### Homepage
- brand positioning
- most persuasive proof
- audience routing
- selected highlights only
- strongest CTA paths

##### Resume page
- chronological work history
- scoped role descriptions
- factual accomplishments
- capabilities, education, and credentials
- downloadable PDF

##### Media page
- talks
- judging / panels / ecosystem participation
- speaking topics
- organizer-facing CTA

##### Articles page
- thought leadership archive
- article cards with consistent metadata
- individual article pages with better reading experience and CTAs

##### Optional new page: Case Studies / Work
- proof of business impact
- concrete outcomes
- selective examples of delivery work

This optional page would help reduce the current pressure on both the homepage and resume page to carry too much proof.

### Technical Architecture Review
#### Current structure
- Multi-page static HTML
- One large shared CSS file
- Minimal JS
- Articles rendered dynamically in-browser from JSON + Markdown

#### Risks in the current setup
- Shared layout is duplicated across pages
- Metadata is inconsistent
- Old and new design systems can coexist accidentally
- Articles page relies on inline styles and runtime HTML creation
- Content cannot be updated from a single source of truth
- SEO, social sharing, and structured metadata are harder to maintain

#### Recommended direction
Move to a lightweight static site generator.

Recommended option: **Eleventy**

Why Eleventy fits this project:
- content-driven, not app-driven
- simple Markdown + data file workflows
- layouts, includes, and collections solve current duplication problems
- easy to keep the site fast and largely static
- good fit for GitHub Pages or Netlify deployment
- no need for a JavaScript-heavy front end

Alternative option: **Astro**

This would also work well if we want stronger component ergonomics and future extensibility, but it is more tooling than this site strictly needs right now.

## Rework Objectives

### Brand Objectives
- Position Shake as a serious AI executive and operator, not just a consultant
- Make the site feel coherent across all pages
- Strengthen authority signals without sounding inflated or vague

### Conversion Objectives
- Increase clarity for employers
- Increase trust for consulting prospects
- Increase attractiveness for event organizers
- Give every major page a clear primary CTA and a sensible secondary CTA

### Content Objectives
- Eliminate duplication that weakens the narrative
- Separate narrative copy from factual resume material
- Turn media / public visibility into a structured asset
- Make articles feel like part of one authority platform

### UX / UI Objectives
- Introduce a fully consistent cross-page design system
- Improve mobile navigation and page wayfinding
- Create more scannable information density on the resume page
- Give the articles section a first-class reading and browsing experience

### Technical Objectives
- Reduce duplication
- Centralize structured content
- Improve maintainability
- Improve metadata and SEO consistency
- Keep the site lightweight and performant

## Target Information Architecture

### Home
Purpose:
Explain the brand, route the user, prove credibility, and drive action.

Sections:
- Hero with sharper audience framing
- Outcome / proof bar
- “Who this is for” routing
- Services / roles
- Selected proof highlights
- Public authority / speaking snapshot
- Recent writing or insights preview
- Final CTA

### Resume
Purpose:
Support recruiter, employer, and due-diligence review.

Sections:
- Executive summary
- Experience timeline
- Selected accomplishments by role
- Skills / capabilities
- Education / certifications
- PDF download

### Media
Purpose:
Make it easy to book Shake for speaking, judging, events, and commentary.

Sections:
- Speaking positioning
- Recent appearances / ecosystem participation
- Topics
- Organizer-facing logistics or fit
- CTA

### Articles
Purpose:
Demonstrate thought leadership and create depth beyond homepage claims.

Sections:
- Article index
- Featured article slot
- Category / topic tags
- Individual article pages with in-article CTA and related reading

### Optional: Case Studies
Purpose:
Show proof of work without turning the resume page into a sales deck.

Sections:
- Context
- Problem
- Intervention
- Outcome
- Role played
- CTA

## Content Rules

### Homepage rules
- Only the strongest proof belongs here
- Keep chronology light
- Avoid resume-style density
- Speak in terms of outcomes, fit, and differentiation

### Resume rules
- Be factual, clear, and scannable
- Prefer specifics over positioning language
- Keep the chronology complete enough for hiring review
- Avoid repeating long-form homepage persuasion

### Media rules
- Treat public participation as a real asset class
- Make event-organizer fit obvious
- Include social proof where possible

### Articles rules
- Each article should support a clear thesis relevant to hiring, buying, or trusting Shake
- Every article page should pull the reader back toward a relationship:
  follow, contact, book, or read more

## UX / UI Plan

### Visual system
- Build one shared design language for all pages
- Define typography scale, spacing scale, card patterns, metadata treatments, and CTA hierarchy
- Introduce reusable patterns for:
  proof cards, timelines, article cards, media items, case study blocks, and CTA banners

### Navigation
- Add a real mobile navigation pattern
- Improve current-page indication
- Consider section-aware highlighting on long pages

### Reading experience
- Improve article typography and spacing
- Add reading-width constraints and better hierarchy
- Add author / date / topic metadata

### Accessibility
- Add skip link
- Audit heading order
- Improve focus states where needed
- Consider reduced-motion handling for reveal animations

## Technical Rework Plan

### Phase 1: Content modeling
Create structured sources for:
- roles
- metrics
- media appearances
- speaking topics
- articles
- SEO metadata

Suggested data files:
- `src/data/site.json`
- `src/data/roles.json`
- `src/data/metrics.json`
- `src/data/media.json`
- `src/data/navigation.json`

### Phase 2: Layout system
Create reusable layouts / includes for:
- head metadata
- nav
- footer
- CTA band
- hero variants
- cards and timeline items

### Phase 3: Page rebuild
Rebuild:
1. Homepage
2. Resume
3. Media
4. Articles index and article template
5. Optional case studies page

### Phase 4: SEO and trust layer
Add:
- consistent page titles and descriptions
- Open Graph metadata
- favicon and app icons
- canonical URLs
- structured data where useful

### Phase 5: QA
Review:
- mobile layouts
- desktop polish
- article rendering
- navigation
- broken links
- metadata output

## Recommended Execution Order

1. Finalize messaging and page roles
2. Decide whether to stay raw static or migrate to Eleventy
3. Normalize shared layout and metadata
4. Rebuild homepage and resume page together
5. Rebuild media page
6. Rebuild articles system
7. Add optional case studies page if time and content allow

## Immediate Recommendations
These are the first substantive improvements worth making after plan approval:

1. Rework the information architecture so each page has a clear job
2. Migrate the site to one consistent design system
3. Replace the current articles architecture with a first-class content template
4. Add a mobile menu and stronger navigation / page orientation
5. Add SEO metadata and favicon support across all pages
6. Create a reusable content model to stop manual drift

## Acceptance Criteria For The Rework

The rework should be considered successful when:

- the homepage clearly explains Shake’s positioning within seconds
- the resume page feels recruiter-friendly rather than redundant
- the media page looks bookable, not placeholder-like
- the articles section feels native to the site
- all pages share one coherent layout and visual language
- content updates can be made from structured sources instead of copy-pasting across files
- mobile UX is complete rather than partially hidden

## Recommendation
Proceed with a substantive site rework, not incremental patching.

The current foundation is strong enough to preserve the strategic direction, but fragmented enough that continued small edits will keep producing drift. The right next move is to treat this as a proper second version of the site:

- stronger information architecture
- cleaner content separation
- unified design system
- better technical maintainability
- clearer conversion pathways for hiring, consulting, and speaking
