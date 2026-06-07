# Dranreb Jay Arzadon — Portfolio

A premium personal portfolio website with a deep space aesthetic, built with Next.js and Tailwind CSS.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3
- **Language:** JavaScript
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css       # Global styles, design tokens, utility classes
│   ├── layout.js         # Root layout + SEO metadata
│   └── page.js           # Page entry — composes all sections
├── components/
│   ├── CursorEffect.jsx  # Custom cursor glow (desktop only)
│   ├── StarField.jsx     # Canvas star animation background
│   ├── Navbar.jsx        # Fixed nav with scroll detection + active links
│   ├── Hero.jsx          # Full-height hero with typewriter + orbital avatar
│   ├── About.jsx         # Bio, stats, tech stack skill cards
│   ├── Projects.jsx      # Project cards + fullscreen lightbox gallery
│   ├── Contact.jsx       # Contact info + validated contact form
│   └── Footer.jsx        # Social links, copyright, back-to-top
├── public/
│   └── resume.pdf        # Replace with actual resume
├── tailwind.config.js    # Custom design tokens + animations
└── next.config.js        # Next.js config with image optimisation
```

## Deployment (Vercel)

1. Push this project to a GitHub repository
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click **Deploy**
4. Update `your-domain.vercel.app` in `app/layout.js` and `public/robots.txt` after deploy

## Customisation Checklist

- [ ] Replace `public/resume.pdf` with your actual resume
- [ ] Add your profile photo: swap the placeholder in `components/Hero.jsx` with `<Image src="/photo.jpg" ... />`
- [ ] Add real project screenshots to `public/images/projects/`
- [ ] Update GitHub/LinkedIn/social hrefs in `Hero.jsx`, `Footer.jsx`, `Contact.jsx`
- [ ] Replace `yourusername` in the GitHub CTA in `Projects.jsx`
- [ ] Update the Vercel URL in `layout.js` openGraph and `public/robots.txt`