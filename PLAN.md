# Surgetech Solar — Website Product & Engineering Plan

> **Project:** Surgetech Solar  
> **Primary goal:** Build a premium, modern, conversion-focused solar-energy website that feels like a polished energy technology company rather than a generic solar installer.  
> **Core stack:** Next.js + TypeScript + Tailwind CSS + React ecosystem  
> **Execution style:** Build production-ready, responsive, accessible, SEO-friendly UI in deliberate phases.  
> **Primary brand line:** **CLEAN ENERGY. BETTER TOMORROW.**  
> **Supporting campaign line:** **SAVE MORE. SWITCH TO SOLAR.**  
> **CTA/supporting line:** **POWERING A BRIGHTER TOMORROW.**

> refer @calc.md for calculations

---

# 1. Executive Direction

Surgetech Solar already has a recognizable visual identity:

- Deep navy blue
- Solar orange
- Sustainability green
- Cyan/teal technology accents
- White/light backgrounds
- Strong geometric typography
- Circular line icons
- Curved/sweeping section shapes
- Solar imagery with sunlight and architecture
- A distinctive horse + sun + solar-panel logo
- Messaging centered around clean energy, savings, reliability, and a brighter future

The website must **evolve this existing identity**, not replace it.

The desired result is:

> **Premium renewable-energy brand + modern SaaS-style UX + strong engineering credibility + interactive solar intelligence.**

Avoid making the site look like:

- A generic WordPress solar template
- An overly dark “Tesla clone”
- A stock-photo-heavy brochure
- A page made entirely from promotional poster graphics
- An over-animated WebGL experiment
- A website where every section is a rounded card

The website should be **clean, energetic, trustworthy, spacious, technically sophisticated, and distinctly Surgetech.**

---

# 2. Brand Identity

## 2.1 Brand personality

The brand should communicate:

- Trust
- Engineering quality
- Energy
- Sustainability
- Modern technology
- Long-term support
- Financial value
- Indian market relevance
- Professionalism
- Reliability

Tone:

> **Confident, clear, knowledgeable, optimistic, human.**

Avoid:

- Excessive corporate jargon
- Fake technical claims
- Overly aggressive sales language
- Environmental guilt
- Unsupported performance guarantees
- Generic phrases such as “best solar company” unless substantiated

---

# 3. Brand Color System

Use the following as the initial web design tokens. If official brand HEX values are later supplied, replace the approximations globally through CSS variables rather than hardcoding colors throughout the application.

## Primary colors

| Token | Suggested HEX | Purpose |
|---|---|---|
| `--navy-900` | `#031D3D` | Deep backgrounds, footer, hero overlays |
| `--navy-800` | `#062B59` | Primary brand navy |
| `--navy-700` | `#0B3B73` | Secondary navy |
| `--green-600` | `#169447` | Sustainability, savings, positive states |
| `--green-500` | `#25A65A` | Hover/secondary green |
| `--orange-500` | `#F7941D` | Solar/sun/action accent |
| `--cyan-600` | `#0799B5` | Technology/interactive accent |
| `--cyan-500` | `#16AFC4` | Hover/secondary technology accent |
| `--white` | `#FFFFFF` | Main surface |
| `--surface-50` | `#F5F8F7` | Soft page background |
| `--surface-100` | `#EDF3F1` | Secondary surfaces |
| `--text` | `#09233F` | Main text |
| `--muted` | `#64748B` | Secondary text |

### Color philosophy

**Navy = trust / engineering**

**Green = savings / sustainability**

**Orange = sun / energy / action**

**Cyan = technology / data**

**White = cleanliness / openness**

Do not use orange and green equally everywhere. Navy and white should dominate; green, orange, and cyan should be accents.

---

# 4. Typography

Recommended:

- **Headings:** Manrope, Plus Jakarta Sans, or Outfit
- **Body:** Inter
- **Numbers/data:** Same family, using strong weights

Typography should be bold and contemporary.

Examples:

```text
CLEAN ENERGY.
BETTER TOMORROW.
```

```text
SAVE MORE.
SWITCH TO SOLAR.
```

Large headings can use tight tracking and large responsive sizes.

Suggested scale:

- Hero: `clamp(3.5rem, 8vw, 7rem)`
- Section heading: `clamp(2.5rem, 5vw, 4.5rem)`
- Card heading: `1.25rem–1.75rem`
- Body: `1rem–1.125rem`
- Small labels: `0.75rem–0.875rem`

Use `font-weight: 700–900` for major headings.

---

# 5. Shape Language

Carry the visual DNA from the existing Surgetech marketing designs into the web system:

- Sweeping curved section boundaries
- Pill-shaped CTAs
- Circular icon containers
- Thin technical lines
- Navy information panels
- Green outline accents
- Small orange solar accents
- Subtle cyan highlights
- Large photographic compositions
- Occasional diagonal/curved image masks

Do not make every component rounded.

Use three levels:

### Level 1 — Standard
Small radius for inputs and normal cards.

### Level 2 — Premium
Medium radius for feature cards.

### Level 3 — Brand
Large curved/pill treatments for hero panels, CTAs, calculators, and campaign sections.

---

# 6. Core Tagline Hierarchy

Do not use all taglines interchangeably.

## Primary brand statement

> **CLEAN ENERGY. BETTER TOMORROW.**

Use throughout the brand and homepage.

## Conversion campaign

> **SAVE MORE. SWITCH TO SOLAR.**

Use primarily for:

- Solar calculator
- Lead generation
- Ads/landing pages
- Savings sections

## Supporting CTA statement

> **POWERING A BRIGHTER TOMORROW.**

Use for:

- Final CTA
- Footer
- Supporting campaign sections

## Optional India-focused campaign

> **One Nation. One Sun. Endless Possibilities.**

Use selectively for campaigns and Indian-market storytelling.

---

# 7. Website Goals

The website must accomplish five things:

1. Explain Surgetech Solar's offerings clearly.
2. Build trust before asking for contact information.
3. Help visitors understand potential solar savings. refer @calc.md
4. Convert visitors into qualified leads.
5. Establish a foundation for a future customer energy dashboard.

Primary conversion:

> **Get a Solar Assessment**

Secondary conversion:

> **Calculate My Savings**

Tertiary conversion:

> **Call / WhatsApp / Email**

---

# 8. Primary User Journeys

## Journey A — Curious homeowner

Landing → Hero → Savings Calculator → Results → Solar Plan → Request Assessment

## Journey B — Business owner

Landing → Commercial Solutions → Project Examples → ROI → Request Consultation

## Journey C — Equipment buyer

Landing → Equipment → Product → Specifications → Enquiry

## Journey D — Existing customer

Landing → Customer Login → System Dashboard → Generation / Savings / Service

## Journey E — Maintenance customer

Landing → Services → Maintenance → Service Request → Contact

---

# 9. Homepage Architecture

## Section 01 — Hero

### Headline

> **CLEAN ENERGY.**  
> **BETTER TOMORROW.**

Supporting copy:

> Smart solar solutions for homes, businesses and industries — designed to generate clean energy, reduce electricity costs, and deliver dependable long-term performance.

Primary CTA:

> **Calculate My Savings**

Secondary CTA:

> **Explore Solutions**

### Visual

Use a high-quality solar installation / rooftop solar photograph.

The image should feel premium and architectural.

Avoid directly using the supplied promotional posters as the hero background.

Instead, use their visual language:

- Sunlight
- Solar panels
- Navy/green/orange curves
- Subtle energy-flow graphics
- Surgetech logo

### Hero animation

Subtle animated energy flow:

`SUN → SOLAR PANELS → INVERTER → HOME/BUSINESS → SAVINGS`

Use SVG/Motion rather than heavy WebGL initially.

---

# 10. Homepage Section 02 — Solar Savings Teaser

Headline:

> **SAVE MORE. SWITCH TO SOLAR.**

Supporting copy:

> See what your electricity bill could look like with solar. refer @calc.md

Show a simplified calculator.

Inputs: refer @calc.md

- Monthly electricity bill
- Property type
- Location

Outputs:

- Recommended system size
- Estimated annual generation
- Estimated annual savings
- Estimated payback period
- Estimated long-term savings

CTA:

> **See My Solar Potential**

This section should be visually prominent.

---

# 11. Homepage Section 03 — Solutions

Headline:

> **SOLAR SOLUTIONS BUILT AROUND YOUR ENERGY NEEDS.**

Cards:

### Solar Panels

High-efficiency solar modules selected for long-term performance.

### Solar Inverters

Reliable power conversion and system management.

### Solar Batteries

Store excess energy and improve energy independence.

### Mounting Structures

Durable mounting systems engineered for each installation.

### Solar Street Lights

Efficient solar-powered lighting solutions.

### Installation & Maintenance

Professional installation, servicing, upgrades and support.

Each card:

- Icon
- Image/illustration
- Short description
- Arrow CTA
- Hover motion

---

# 12. Homepage Section 04 — Why Surgetech

Headline:

> **MORE THAN SOLAR PANELS. A COMPLETE ENERGY SOLUTION.**

Five pillars:

### Lower Electricity Bills
Generate more of your own power and reduce grid dependence.

### Premium Quality Products
Use carefully selected components suited to the application.

### Expert Installation
Professional system design, installation and commissioning.

### Reliable After-Sales Support
Service continues beyond installation.

### Residential. Commercial. Industrial.
Solutions designed for different energy requirements.

Use large numbers only when actual verified business metrics are available.

Never invent:

- Number of installations
- Years in business
- MW installed
- Customer count
- Savings generated
- Certifications

---

# 13. Homepage Section 05 — Equipment

Headline:

> **PREMIUM COMPONENTS. ENGINEERED TO WORK TOGETHER.**

Categories:

- Solar Panels
- Inverters
- Batteries
- Mounting Structures
- Solar Street Lights
- Protection & Accessories

Features:

- Product cards
- Brand/manufacturer
- Capacity
- Efficiency
- Warranty
- Datasheet link
- Enquiry button
- Compare action

Future feature:

> **Compare Products**

---

# 14. Homepage Section 06 — How It Works

Headline:

> **FROM SUNLIGHT TO SAVINGS.**

Five steps:

### 01 — Discover
Understand energy use, property and goals.

### 02 — Design
Engineer the appropriate solar solution.

### 03 — Install
Professional installation and commissioning.

### 04 — Activate
Start generating clean energy.

### 05 — Maintain
Monitor, service and optimize the system.

Animation:

A small energy particle travels through each step as the user scrolls.

---

# 15. Homepage Section 07 — Projects

Headline:

> **POWERING REAL PLACES.**

Project categories:

- Residential
- Commercial
- Industrial

Project card should include:

- Location
- System size
- Property type
- Annual generation
- Estimated/actual savings where verified
- Installation photos
- Project duration if available

Use actual project data only.

Do not fabricate project statistics.

---

# 16. Homepage Section 08 — Services

Headline:

> **WE'RE WITH YOU BEYOND INSTALLATION.**

Services:

- Solar Installation
- On-Grid Systems
- Off-Grid Systems
- Maintenance & Support
- Periodic Servicing
- System Upgrades
- Energy Consultation
- Monitoring
- Repair / Troubleshooting

CTA:

> **Talk to a Solar Expert**

---

# 17. Homepage Section 09 — Long-Term Savings

Headline:

> **SEE THE LONG-TERM VALUE OF SOLAR.**

Large chart:

`Electricity Cost Without Solar` vs `Estimated Cost With Solar`

Controls:

- 5 years
- 10 years
- 15 years
- 20 years
- 25 years

Highlight:

> **Estimated cumulative savings**

Use Recharts or another lightweight chart library.

Do not imply financial guarantees.

Use labels such as:

- Estimated
- Indicative
- Based on provided assumptions

---

# 18. Homepage Section 10 — Testimonials

Use real testimonials only.

Structure:

> “The installation process was smooth and the team explained everything clearly.”

Then:

- Customer name
- Location
- System type/size if approved
- Optional photo

Future enhancement:

- Video testimonials

---

# 19. Homepage Section 11 — FAQ

Initial questions:

1. How much does solar installation cost?
2. How many solar panels do I need?
3. How much can solar reduce my electricity bill?
4. How long does solar installation take?
5. What happens during a power cut?
6. Do solar panels work on cloudy days?
7. How long do solar panels last?
8. How often should solar panels be serviced?
9. Is battery storage worth it?
10. What subsidy or incentives may apply?
11. How much roof space is required?
12. Can an existing solar system be upgraded?

FAQ content must be reviewed against current regulations and local utility requirements before publication.

---

# 20. Homepage Section 12 — Final CTA

Use a premium dark navy section.

Headline:

> **POWERING A BRIGHTER TOMORROW.**

Copy:

> Ready to understand what solar could do for your home or business?

Buttons:

> **Calculate My Savings**

> **Get a Solar Assessment**

Display official contact details once confirmed.

---

# 21. Solar Calculator — Core Product Feature

The calculator is a major differentiator and should be treated as a product, not a simple form.

## Inputs

### Energy

- Monthly electricity bill
- Optional monthly consumption in kWh
- Electricity tariff
- Optional annual tariff increase

### Property

- Residential
- Commercial
- Industrial
- Roof area
- Roof type
- Optional roof orientation

### Location

- State
- City
- Postal code
- Optional solar irradiation data

### Financial

- Estimated system cost
- Subsidy/incentive
- Financing option
- Down payment
- Loan duration
- Interest rate

Only show advanced financial fields in an expandable "Advanced assumptions" section.

---

# 22. Calculator Results

Display:

### Recommended System

`6.6 kW`

### Estimated Annual Generation

`9,100 kWh`

### Estimated Annual Savings

`₹92,000`

### Estimated Payback

`3.8 years`

### Estimated 25-Year Savings

`₹22.4 lakh`

### Estimated CO₂ Avoided

Calculated from an approved methodology.

All values must be clearly marked as estimates.

---

# 23. Calculator UX

Desktop:

Two-column layout.

Left:

Input controls.

Right:

Live result panel.

Mobile:

Step-by-step flow.

Example:

`1. Bill → 2. Property → 3. Location → 4. Results`

Use smooth transitions.

Do not make users fill a huge form before seeing value.

---

# 24. Calculator Calculation Engine

Build calculations as a separate pure TypeScript module.

Example conceptual model:

```text
monthlyConsumption
    ↓
annualConsumption
    ↓
locationSolarYield
    ↓
recommendedSystemSize
    ↓
annualSolarGeneration
    ↓
selfConsumption / export assumptions
    ↓
annualSavings
    ↓
netInstallationCost
    ↓
paybackPeriod
    ↓
longTermSavings
```

Do not bury calculations inside React components.

Recommended structure:

```text
/lib/solar-calculator/
  types.ts
  constants.ts
  assumptions.ts
  calculateSystemSize.ts
  calculateGeneration.ts
  calculateSavings.ts
  calculatePayback.ts
  calculateEmissions.ts
  index.ts
```

Every calculation function should have unit tests.

---

# 25. Calculator Assumption Transparency

Include a collapsible section:

> **How we calculate this**

Show:

- Assumed tariff
- Solar yield assumption
- System efficiency
- Annual degradation
- Export/self-consumption assumption
- System cost assumption
- Subsidy assumption
- Inflation/escalation assumption

The user should be able to understand why the result changes.

Never present estimates as guaranteed savings.

---

# 26. Lead Generation

After calculator results:

> **Want a more accurate solar assessment?**

Collect:

- Name
- Phone
- Email
- Location
- Property type
- Monthly bill
- Estimated system size
- Preferred contact method

Preserve calculator results when submitting.

The lead record should contain:

```text
lead
  name
  phone
  email
  location
  propertyType
  monthlyBill
  estimatedSystemSize
  estimatedAnnualSavings
  source
  createdAt
```

---

# 27. Contact Channels

The supplied brand material currently shows:

- `+91 89196 19468`
- `+91 96184 43558`
- `contact@surgetechsolar.com`

Treat these as **brand-provided reference information** and verify before final production deployment.

Primary actions:

- Call
- Email
- WhatsApp if officially configured
- Request assessment

---

# 28. Equipment Catalog

Create an extensible product model.

```ts
type SolarProduct = {
  id: string
  slug: string
  name: string
  category: ProductCategory
  manufacturer?: string
  model?: string
  wattage?: number
  capacity?: number
  efficiency?: number
  warranty?: string
  description: string
  features: string[]
  specifications: Record<string, string>
  images: string[]
  datasheetUrl?: string
  featured?: boolean
}
```

Categories:

```ts
type ProductCategory =
  | "solar-panels"
  | "inverters"
  | "batteries"
  | "mounting"
  | "street-lights"
  | "accessories"
```

---

# 29. Product Comparison

Allow users to compare 2–4 products.

Comparison fields:

- Manufacturer
- Model
- Power
- Efficiency
- Capacity
- Warranty
- Technology
- Dimensions
- Temperature coefficient
- Protection rating
- Best use case

Do not compare products based on unverified claims.

---

# 30. Projects / Case Studies

Route:

```text
/projects
/projects/[slug]
```

Project structure:

```text
Project title
Location
Property type
System size
Installation date
Project overview
Challenge
Solution
Equipment
Installation process
Results
Gallery
CTA
```

Use real project information only.

---

# 31. Services Pages

Routes:

```text
/services
/services/installation
/services/maintenance
/services/servicing
/services/upgrades
/services/consultation
/services/on-grid
/services/off-grid
```

Every service page should contain:

1. Hero
2. Problem
3. Solution
4. Process
5. Benefits
6. FAQs
7. CTA

---

# 32. Future Customer Dashboard

Do not overbuild this in phase one, but structure the application so it can be added later.

Future dashboard:

```text
Customer
  ├── Overview
  ├── System
  ├── Generation
  ├── Savings
  ├── Environmental Impact
  ├── Service Requests
  ├── Maintenance History
  ├── Warranty
  └── Documents
```

Dashboard visual language:

- Navy shell
- White cards
- Green healthy states
- Orange generation
- Cyan technical data

Example:

```text
YOUR SOLAR SYSTEM

6.6 kW
● Operating normally

TODAY
28.4 kWh

THIS MONTH
742 kWh

EST. SAVINGS
₹6,842

CO₂ AVOIDED
1.24 t
```

---

# 33. Navigation

Desktop:

```text
SURGETECH SOLAR

Solutions
Equipment
Services
Projects
Solar Calculator
About

                         Get a Quote
```

Mobile:

- Full-screen menu
- Large typography
- Clear CTA
- Persistent bottom CTA where appropriate

Possible mobile bottom bar:

```text
[ Calculate Savings ] [ Get Quote ]
```

---

# 34. Footer

Footer should contain:

### Brand

Surgetech Solar

> Clean Energy. Better Tomorrow.

### Solutions

- Residential
- Commercial
- Industrial
- Solar + Battery

### Equipment

- Panels
- Inverters
- Batteries
- Structures
- Street Lights

### Services

- Installation
- Maintenance
- Servicing
- Upgrades
- Consultation

### Company

- About
- Projects
- Contact

### Resources

- Solar Calculator
- FAQs
- Solar Guide

### Legal

- Privacy
- Terms

---

# 35. Animation System

Use **Motion** for most UI animation.

Use **GSAP** only when a sequence genuinely benefits from it.

Avoid unnecessary animation.

## Core animation primitives

Create reusable components:

```text
<Reveal />
<Stagger />
<CountUp />
<Parallax />
<MagneticButton />
<EnergyFlow />
<AnimatedNumber />
```

## Animation rules

### Entrance

Fade + translate 16–32px.

### Cards

Subtle translate/scale.

### Buttons

Arrow movement and small elevation.

### Numbers

Count up once when entering viewport.

### Charts

Animate on first viewport entry.

### Hero

Slow ambient motion.

### Energy flow

Particles move along SVG paths.

No animation should block interaction or page rendering.

---

# 36. Accessibility

Must support:

- Keyboard navigation
- Visible focus states
- Screen readers
- Semantic headings
- Accessible forms
- ARIA only when necessary
- Sufficient color contrast
- Reduced motion preference
- Large touch targets
- Error messages that are understandable

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 37. Responsive Strategy

Breakpoints should be content-driven.

Minimum targets:

- 360px mobile
- 390px mobile
- 768px tablet
- 1024px laptop
- 1280px desktop
- 1440px large desktop
- 1920px wide desktop

Never rely on desktop-only hover behavior.

All important interactions must work on touch.

---

# 38. Performance Requirements

Target:

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Optimize:

- Images with `next/image`
- Modern image formats
- Lazy loading
- Font loading
- Dynamic imports for heavy components
- Avoid unnecessary JavaScript
- Avoid giant client components
- Keep Three.js/WebGL optional and lazy-loaded

Do not load heavy animation libraries on pages that do not need them.

---

# 39. Image Direction

Use real photography where possible.

Preferred imagery:

- Rooftop solar installations
- Modern homes
- Commercial rooftops
- Industrial solar
- Engineers/technicians installing equipment
- Solar panels at sunrise/sunset
- Close-ups of engineering/equipment
- Indian locations and architecture where relevant

Avoid:

- Obviously fake AI people
- Generic western-only residential imagery if targeting India
- Low-resolution stock photos
- Images with inconsistent lighting
- Excessive images of smiling families pointing at solar panels

Brand images should feel architectural and premium.

---

# 40. Supplied Brand Artwork

The supplied Surgetech Solar promotional designs are references for:

- Logo
- Colors
- Taglines
- Icon style
- Curved shapes
- Messaging
- Solar imagery
- Brand composition

Do **not** simply place these full posters on website pages.

Instead, extract the design language and reproduce it responsively.

If the original logo files are available, use the original SVG/PNG assets rather than recreating the logo.

Recommended asset structure:

```text
/public
  /brand
    logo.svg
    logo-dark.svg
    mark.svg
    favicon.svg
    /references
  /images
    /hero
    /projects
    /equipment
    /services
```

---

# 41. Technical Stack

Recommended:

## Framework

- Next.js
- TypeScript
- App Router

## Styling

- Tailwind CSS
- CSS variables for brand tokens

## UI

- shadcn/ui where useful
- Radix primitives where required

## Animation

- Motion
- GSAP only where justified

## Charts

- Recharts

## Icons

- Lucide React

## Forms

- React Hook Form
- Zod

## State

Prefer:

- React state for local UI
- URL/search params where state should be shareable
- Server state only when necessary

Do not introduce a global state library unless there is a real requirement.

## Data

Possible future:

- PostgreSQL
- Supabase
- Prisma/Drizzle

For phase one, static typed content is acceptable.

---

# 42. Suggested Project Structure

```text
src/
  app/
    (marketing)/
      page.tsx
      solutions/
      equipment/
      services/
      projects/
      solar-calculator/
      about/
      contact/
      faq/

    (dashboard)/
      dashboard/

    api/
      leads/
      calculator/

  components/
    brand/
    navigation/
    hero/
    calculator/
    solutions/
    equipment/
    services/
    projects/
    testimonials/
    faq/
    charts/
    animations/
    forms/
    ui/

  lib/
    calculator/
      types.ts
      assumptions.ts
      calculateSystemSize.ts
      calculateGeneration.ts
      calculateSavings.ts
      calculatePayback.ts
      calculateEmissions.ts
      index.ts

    seo/
    utils/

  content/
    solutions/
    services/
    projects/
    faqs/

  types/
    product.ts
    project.ts
    lead.ts

  styles/
    globals.css
```

---

# 43. SEO Strategy

Core pages:

```text
/
/solar-calculator
/solutions
/solutions/residential
/solutions/commercial
/solutions/industrial
/equipment
/services
/projects
/about
/contact
/faq
```

Future location/service landing pages can be added when there is genuine local service coverage.

Examples:

```text
/solar-installation/[city]
/commercial-solar/[city]
/solar-maintenance/[city]
```

Only publish location pages for locations actually served.

---

# 44. Structured SEO Content

Implement:

- Metadata per route
- Open Graph images
- Twitter/X card metadata
- Canonical URLs
- Sitemap
- Robots.txt
- Organization structured data
- LocalBusiness structured data where appropriate
- Product structured data for eligible products
- FAQ structured data where appropriate

Never use fake reviews or fake business information in structured data.

---

# 45. Lead Management

The architecture should allow future integration with:

- CRM
- Email
- WhatsApp
- SMS
- Internal sales dashboard

For phase one, create a clean API boundary.

Example:

```text
POST /api/leads
```

Payload:

```json
{
  "name": "...",
  "phone": "...",
  "email": "...",
  "location": "...",
  "propertyType": "residential",
  "monthlyBill": 8500,
  "estimatedSystemSize": 5.4,
  "source": "solar-calculator"
}
```

Validate with Zod.

Never expose secrets in the client.

---

# 46. Security

Must include:

- Server-side validation
- Rate limiting on public lead endpoints
- Spam/bot protection
- Environment variables for secrets
- No API keys in client code
- Sanitized inputs
- Secure headers where appropriate
- Proper authentication before future customer dashboard access

---

# 47. Analytics

Prepare event tracking for:

```text
hero_cta_clicked
calculator_started
calculator_completed
calculator_result_viewed
lead_form_started
lead_form_submitted
phone_clicked
email_clicked
whatsapp_clicked
product_viewed
product_comparison_started
project_viewed
service_page_viewed
```

Use a privacy-conscious analytics platform.

Do not track unnecessary personal information.

---

# 48. Content Rules

All website copy should:

- Be concise
- Explain technical concepts clearly
- Lead with benefits
- Avoid exaggerated claims
- Avoid guaranteed savings
- Avoid fake statistics
- Avoid unverified certifications
- Use Indian English conventions where appropriate
- Keep headings short
- Use consistent terminology

Preferred:

> Estimated annual savings

Not:

> Guaranteed annual savings

Preferred:

> Designed for long-term performance

Not:

> Will last forever

---

# 49. Component Design Rules

Every reusable component should:

- Accept typed props
- Avoid unnecessary client-side rendering
- Be responsive
- Have accessible states
- Have consistent spacing
- Use design tokens
- Avoid hardcoded brand colors where a token exists
- Avoid duplicated animation logic

Example:

```tsx
<SolutionCard
  title="Solar Panels"
  description="..."
  icon={Sun}
  href="/equipment/solar-panels"
/>
```

---

# 50. Design Tokens

Create CSS variables:

```css
:root {
  --color-navy-900: #031d3d;
  --color-navy-800: #062b59;
  --color-navy-700: #0b3b73;

  --color-green-600: #169447;
  --color-green-500: #25a65a;

  --color-orange-500: #f7941d;

  --color-cyan-600: #0799b5;
  --color-cyan-500: #16afc4;

  --color-white: #ffffff;

  --color-surface-50: #f5f8f7;
  --color-surface-100: #edf3f1;

  --color-text: #09233f;
  --color-muted: #64748b;
}
```

Tailwind should map to these tokens.

---

# 51. Button System

Primary:

**Navy background + white text**

Hover:

**Slight navy lift + green/orange accent**

Secondary:

**White background + navy border**

Green CTA:

**Green background + white text**

Solar CTA:

**Orange accent only where the action relates strongly to solar/energy**

Example:

```text
[ Calculate My Savings → ]

[ Explore Solutions → ]

[ Get a Solar Assessment → ]
```

Do not make every button a different color.

---

# 52. Icon System

Use Lucide or custom SVGs.

Preferred visual treatment:

- Circular icon containers
- Thin stroke icons
- Navy/green/cyan/orange accents
- Consistent 1.75–2px stroke weight

Avoid mixing:

- filled icons
- cartoon icons
- random icon libraries
- emoji

---

# 53. Hero Visual System

Create reusable hero layouts:

### Hero A — Solar image

Text left, image right.

### Hero B — Dark technology

Navy background, product/energy visualization.

### Hero C — Calculator

Large calculator interface.

### Hero D — Project

Large project photograph with stats overlay.

This keeps internal pages visually consistent.

---

# 54. Recommended Animation Details

## Hero

- Logo/heading reveal
- Solar image parallax
- Energy particle path
- CTA hover

## Calculator

- Number count-up
- Result card morph
- Chart draw animation
- Slider transitions

## Solutions

- Card hover
- Icon motion
- Image zoom

## Projects

- Image reveal
- Stats count-up

## Services

- Timeline animation

## Footer

- Very subtle solar-energy motif

Keep motion calm and premium.

---

# 55. What NOT to Do

Do not:

- Use huge full-screen WebGL everywhere
- Use excessive glassmorphism
- Use neon green on dark backgrounds everywhere
- Make every card heavily rounded
- Put promotional posters directly into page sections
- Use fake company statistics
- Use fake customer testimonials
- Make unsupported savings claims
- Create dozens of unnecessary dependencies
- Build every component as a client component
- Sacrifice performance for animation
- Hide important contact information
- Force users through long forms
- Use animations that make text hard to read
- Make mobile an afterthought

---

# 56. Development Phases

## Phase 0 — Foundation

- Initialize Next.js
- TypeScript
- Tailwind
- Design tokens
- Font setup
- ESLint
- Prettier
- Component conventions
- Folder structure
- SEO foundation

## Phase 1 — Design System

Build:

- Logo
- Typography
- Buttons
- Inputs
- Cards
- Badges
- Section headers
- Navigation
- Footer
- Icon system
- Animation primitives

Do this before building all pages.

## Phase 2 — Homepage

Build:

1. Navigation
2. Hero
3. Savings teaser
4. Solutions
5. Why Surgetech
6. Equipment
7. How it works
8. Projects
9. Services
10. Long-term savings
11. Testimonials
12. FAQ
13. Final CTA
14. Footer

## Phase 3 — Solar Calculator

Build:

- Input system
- Calculation engine
- Results
- Charts
- Assumptions
- Lead capture
- Mobile flow
- Tests

## Phase 4 — Internal Pages

Build:

- Solutions
- Equipment
- Services
- Projects
- About
- Contact
- FAQ

## Phase 5 — SEO & Conversion

- Metadata
- Structured data
- Sitemap
- Analytics
- Lead tracking
- Performance optimization
- Conversion events

## Phase 6 — Customer Platform Preparation

Prepare database/auth architecture and dashboard foundations without blocking the marketing launch.

---

# 57. Testing Requirements

## Unit tests

Calculator:

- System size
- Generation
- Savings
- Payback
- Degradation
- Emissions

## Component tests

- Forms
- Calculator controls
- Navigation
- Product comparison

## E2E

Test:

1. Homepage load
2. Calculator flow
3. Calculator result
4. Lead submission
5. Mobile navigation
6. Product page
7. Project page
8. Contact flow

---

# 58. Definition of Done

A page is not complete until:

- Desktop works
- Tablet works
- Mobile works
- Keyboard navigation works
- Loading states exist where needed
- Error states exist
- Empty states exist
- Images are optimized
- Metadata exists
- No console errors
- No TypeScript errors
- No ESLint errors
- Animations respect reduced motion
- Lighthouse is acceptable
- Content is reviewed
- CTA is clear

---

# 59. Quality Bar

The final website should feel comparable to a modern premium technology/energy company.

It should have:

- Strong visual hierarchy
- Excellent spacing
- Intentional typography
- High-quality imagery
- Smooth but restrained motion
- Fast loading
- Strong mobile UX
- Clear conversion paths
- Useful interactive calculator
- Excellent information architecture
- Consistent brand identity

The user should feel:

> “This company understands energy and engineering.”

not:

> “This is another solar installer website.”

---

# 60. Antigravity Execution Instructions

## Important

Do not attempt to generate the entire application in one giant implementation pass.

Execute in milestones.

### Milestone 1

Build the design system and shell.

Deliver:

- App shell
- Navbar
- Footer
- Brand tokens
- Typography
- Buttons
- Cards
- Responsive container
- Animation primitives

Then verify visually.

### Milestone 2

Build homepage hero + first three sections.

Verify:

- Responsive layout
- Visual hierarchy
- Brand consistency
- Animation performance

### Milestone 3

Complete homepage.

Verify:

- All sections
- Mobile behavior
- CTA flow
- Accessibility

### Milestone 4

Build calculator engine first.

Write tests.

Then build calculator UI around the tested engine.

### Milestone 5

Build internal pages.

### Milestone 6

Add SEO, analytics, lead capture and optimization.

---

# 61. Antigravity Design Review Checklist

Before considering the design finished, review:

### Brand

- [ ] Surgetech logo is correctly represented
- [ ] Navy is dominant
- [ ] Green represents sustainability/savings
- [ ] Orange represents solar/energy
- [ ] Cyan represents technology/data
- [ ] Taglines are used consistently

### Visual

- [ ] No generic template appearance
- [ ] No excessive rounded cards
- [ ] Curved Surgetech visual language is present
- [ ] Photography is premium
- [ ] Typography is bold and modern
- [ ] Whitespace is generous
- [ ] Sections have visual rhythm

### UX

- [ ] Calculator is easy to find
- [ ] Get Quote CTA is always accessible
- [ ] Mobile navigation is excellent
- [ ] Forms are short
- [ ] Error states are clear
- [ ] Calculator explains assumptions

### Technical

- [ ] TypeScript strict mode
- [ ] Responsive
- [ ] Accessible
- [ ] SEO-ready
- [ ] Optimized images
- [ ] No unnecessary client components
- [ ] No console errors
- [ ] Calculator unit tests
- [ ] Lighthouse reviewed

---

# 62. Future Features

After launch, consider:

- Customer login
- Solar monitoring dashboard
- Real-time generation data
- Savings history
- Service tickets
- Maintenance reminders
- Warranty tracking
- Installation documents
- CRM integration
- WhatsApp lead automation
- Online consultation booking
- Product comparison
- Solar financing calculator
- Subsidy estimator
- Roof/panel layout estimator
- Solar proposal PDF generator
- Location-based solar yield estimation
- AI-assisted solar consultation

---

# 63. Final Product Vision

Surgetech Solar should eventually become more than a company website.

The long-term platform can be:

```text
                    SURGETECH SOLAR
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
       DISCOVER         PURCHASE          SERVICE
          │                │                │
          ▼                ▼                ▼
       CALCULATOR       EQUIPMENT        DASHBOARD
          │                │                │
          ▼                ▼                ▼
       ASSESSMENT       INSTALLATION      MONITORING
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                    ENERGY PARTNER
```

The website is the first layer.

The eventual goal is to make Surgetech the customer's **digital energy partner** from first solar calculation through installation, monitoring, maintenance and upgrades.

---

# 64. Final Design Statement

The design should feel like:

> **Surgetech's existing Indian solar identity, rebuilt for the modern web.**

Use:

**Navy** for trust.

**Green** for sustainability and savings.

**Orange** for the sun and energy.

**Cyan** for technology.

**White** for clarity.

Use the existing curved shapes and icon language as recognizable brand motifs.

Pair that with:

- premium photography
- large typography
- clean layouts
- subtle energy animations
- interactive charts
- a genuinely useful solar calculator
- transparent assumptions
- strong project storytelling
- clear lead generation

The end result should be **modern without losing the Surgetech identity**.

---

# 65. First Implementation Command

When starting development, begin with:

1. Inspect the existing repository.
2. Identify whether a Next.js app already exists.
3. Preserve existing functionality unless it conflicts with this specification.
4. Install only required dependencies.
5. Create the design token system.
6. Build the global typography and spacing system.
7. Build the navigation and footer.
8. Create the reusable UI primitives.
9. Build the homepage hero.
10. Stop and visually review before continuing.
11. Continue section-by-section.
12. Build and test the calculator engine separately.
13. Integrate calculator UI.
14. Complete internal pages.
15. Run accessibility, TypeScript, lint and production-build checks.
16. Perform a final desktop/tablet/mobile visual pass.

**Do not mark the project complete simply because the application compiles.**

The visual quality, responsiveness, usability, accessibility, performance and conversion experience are all part of the definition of done.

---

# End State

The completed Surgetech Solar website should communicate one simple idea immediately:

> **Clean energy can be practical, financially valuable, professionally engineered, and built for a better tomorrow.**

**SURGETECH SOLAR**  
**CLEAN ENERGY. BETTER TOMORROW.**
