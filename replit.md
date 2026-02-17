# AMFarmer Tax Services Website

## Overview
A modern, premium tax services website for AMFarmer Tax Services. Built with plain HTML, CSS, and vanilla JavaScript. Mobile-first responsive design with a navy/red/gold/white color palette.

## Project Structure
```
/
├── index.html          # Home page
├── services.html       # Services page
├── about.html          # About page
├── contact.html        # Contact page (multi-step appointment form)
├── privacy.html        # Privacy Policy page
├── server.js           # Static file server (Node.js)
├── assets/
│   ├── css/
│   │   └── styles.css  # Main stylesheet
│   ├── js/
│   │   └── main.js     # JavaScript (nav, FAQ accordion, multi-step form)
│   └── img/
│       ├── branding-1.png  # Brand image
│       └── branding-2.jpg  # Logo image
└── replit.md           # Project documentation
```

## Tech Stack
- Plain HTML5, CSS3, vanilla JavaScript
- Node.js static file server
- Google Fonts (Playfair Display + Inter)

## Running
- `node server.js` serves the site on port 5000

## Key Features
- Mobile-first responsive design
- Sticky navigation with mobile hamburger menu
- FAQ accordion
- Multi-step appointment request form (3 steps: Info, Service Details, Contact Preferences)
  - Step 1: Name, email, phone
  - Step 2: Client type, service needed, message
  - Step 3: Preferred contact method, best time to reach you
  - Confirmation summary after submit
  - No backend: console.log only
- Proper disclaimers for refund advances
- Footer disclaimer on all pages: "not tax advice"
- Privacy policy with form data collection details and deletion rights
- SEO meta tags and OpenGraph tags
- Accessibility: semantic HTML, aria labels, focus states

## Compliance Rules
- Never guarantee refunds, speed, acceptance, or outcomes
- Refund Advance mentions always include third-party lender / eligibility disclaimer
- Footer disclaimer on every page
- Timing claims use qualifiers ("typically," "depending on complexity")

## Business Info
- Owner: Alida Miles Farmer
- Phone: 336-782-2551
- Email: amftaxsvcs@amfarmertax.com
- Address: 5660 Byrd Rd, Burlington, NC 27217
