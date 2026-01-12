# Andi Izzat Portfolio

[![Deploy](https://github.com/iashari/Andi-Izzat-Shafran-ashari-Portofolio26/actions/workflows/deploy.yml/badge.svg)](https://github.com/iashari/Andi-Izzat-Shafran-ashari-Portofolio26/actions/workflows/deploy.yml)

A modern, performant portfolio website built with Next.js 16, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (CI/CD with GitHub Actions)
- **Performance:** Optimized for 100 PageSpeed scores

## Features

- Responsive design (mobile-first)
- Dark/Light theme support
- SEO optimized with OpenGraph images
- Blog with MDX support
- Project showcase
- Contact form
- GitHub stats integration
- Spotify integration

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CI/CD Pipeline

This project uses GitHub Actions for automated deployments:

- **Production:** Automatically deploys on push to `main`
- **Preview:** Creates preview deployments for pull requests
- **Manual:** Can be triggered manually via workflow dispatch

### Setup Secrets

Add these secrets to your GitHub repository:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | From `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | From `.vercel/project.json` |

## License

MIT
