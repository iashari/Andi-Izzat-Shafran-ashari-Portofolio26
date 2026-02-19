<div align="center">

# A. Izzat Shafran Ashari - Portfolio

[![Deploy](https://github.com/iashari/Andi-Izzat-Shafran-ashari-Portofolio26/actions/workflows/deploy.yml/badge.svg)](https://github.com/iashari/Andi-Izzat-Shafran-ashari-Portofolio26/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://vercel.com/)

A modern, high-performance portfolio website showcasing my work as a **Graphic Designer** and **Front-End Developer**. Built with cutting-edge technologies and optimized for perfect PageSpeed scores.

[**View Live Demo**](https://izzatshafran.vercel.app/) | [**Report Bug**](https://github.com/iashari/Andi-Izzat-Shafran-ashari-Portofolio26/issues) | [**Request Feature**](https://github.com/iashari/Andi-Izzat-Shafran-ashari-Portofolio26/issues)

</div>

---

## Preview

<div align="center">
  <img src="public/Screenshot/imageporto.png" alt="Portfolio Preview" width="100%" />
</div>

---

## Performance

This portfolio is optimized for exceptional performance across all metrics:

<div align="center">

| Metric | Desktop | Mobile |
|--------|:-------:|:------:|
| **Performance** | 100 | 87+ |
| **Accessibility** | 96 | 96 |
| **Best Practices** | 100 | 100 |
| **SEO** | 100 | 100 |

</div>

---

## Tech Stack

<div align="center">

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animation** | CSS Keyframes (GPU-accelerated) |
| **Blog** | MDX with next-mdx-remote |
| **Deployment** | Vercel with GitHub Actions CI/CD |
| **Icons** | Heroicons, Lucide React |

</div>

---

## Features

### Core Features
- **Responsive Design** - Mobile-first approach with seamless adaptation across all devices
- **Dark/Light Theme** - System-aware theme with smooth transitions
- **SEO Optimized** - OpenGraph images, meta tags, and semantic HTML
- **Accessibility** - WCAG compliant with keyboard navigation support

### Interactive Elements
- **Blog System** - Full MDX support for rich content creation
- **Project Showcase** - Dynamic project cards with category filtering
- **Contact Form** - Integrated contact functionality
- **GitHub Stats** - Real-time GitHub activity integration
- **Spotify Widget** - Now playing integration
- **AI Chat Widget** - Interactive assistant

### Performance Optimizations
- **Dynamic Imports** - Code splitting for faster initial load
- **Image Optimization** - Next.js Image component with lazy loading
- **GPU Animations** - Transform-based animations for smooth 60fps
- **Font Optimization** - Local fonts with preloading
- **HTTP Security Headers** - CSP, X-Frame-Options, and more

---

## AI Document Editor

A full-featured AI-powered document editor at [`/ai-editor`](https://izzatshafran.vercel.app/ai-editor), built with **Gemini 2.5 Flash** function calling and **Supabase** backend.

### Editor Features

| Category | Features |
|----------|----------|
| **AI Chat** | Gemini 2.5 Flash with 5 function calling tools (edit lines, find & replace, insert, delete, append). AI receives line-numbered document on every call and sees updated document after tool execution. |
| **Multimodal** | Upload images, PDFs, and text files for AI analysis |
| **Auth** | Supabase Auth with sign up/sign in, password strength meter, inline validation, loading states |
| **Database** | Supabase PostgreSQL with Row Level Security (RLS). Users can only access their own documents |
| **Auto-save** | 2-second debounce auto-save to Supabase |
| **Realtime** | Live document sync via Supabase Realtime |
| **Editor** | Synced line numbers, keyboard shortcuts (Ctrl+S, Ctrl+Z, Ctrl+Y, Tab), undo/redo (100 entries) |
| **Export** | Export as TXT, Markdown, HTML, or PDF |
| **File Navigator** | Create, switch between, and delete documents |
| **UI/UX** | Design aligned with portfolio (grid background, blur navbar, animations). Dark mode, toast notifications, monochrome SVG icons |

### AI Editor Tech Stack

- **AI:** Google Gemini 2.5 Flash via `@google/genai` with function calling
- **Backend:** Supabase (Auth, PostgreSQL, Realtime, RLS)
- **Panels:** `react-resizable-panels`
- **Markdown:** `react-markdown` + `remark-gfm`

### AI Editor File Structure

```
src/
  app/ai-editor/page.tsx              # Main editor page (auth, toolbar, panels)
  app/api/ai-editor/chat/route.ts     # Gemini AI API with function calling
  components/AIChat.tsx                # AI chat panel with markdown rendering
  components/DocumentEditor.tsx        # Text editor with line numbers
  hooks/useAutoSave.ts                # Auto-save debounce hook
  hooks/useRealtimeDocument.ts        # Supabase realtime subscription hook
  lib/supabaseClient.ts               # Supabase client (lazy singleton)
  lib/function-tools.ts               # Gemini function calling tool definitions
  lib/execute-function.ts             # Function call executor
```

### Supabase Database Setup

Run this SQL in the Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT DEFAULT 'Untitled Document',
  content TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own documents" ON documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own documents" ON documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON documents FOR DELETE USING (auth.uid() = user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE documents;
```

---

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iashari/Andi-Izzat-Shafran-ashari-Portofolio26.git
   cd Andi-Izzat-Shafran-ashari-Portofolio26
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file:
   ```env
   # Gemini AI (required for AI Editor)
   GEMINI_API_KEY=your_gemini_api_key

   # Supabase (required for AI Editor)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

---

## CI/CD Pipeline

This project uses **GitHub Actions** for automated deployments to Vercel:

```
Push to main → Build → Test → Deploy to Production
Pull Request → Build → Test → Deploy Preview → Comment PR with URL
```

### Pipeline Features
- **Automated Linting** - ESLint checks on every push
- **Type Checking** - TypeScript validation
- **Preview Deployments** - Automatic previews for PRs
- **PR Comments** - Auto-comment with preview URLs

### Required Secrets

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Organization ID from Vercel |
| `VERCEL_PROJECT_ID` | Project ID from Vercel |

---

## Project Structure

```
├── public/              # Static assets
│   ├── Screenshot/      # Portfolio screenshots
│   ├── Logos/          # Brand logos
│   └── project footage/ # Project images
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── ai-editor/  # AI Document Editor page
│   │   ├── blog/       # Blog pages with MDX
│   │   └── api/        # API routes (chat, ai-editor, spotify)
│   ├── components/     # Reusable React components
│   ├── context/        # React Context providers
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions & Supabase client
├── content/            # MDX blog posts
└── .github/workflows/  # GitHub Actions CI/CD
```

---

## Connect With Me

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-iashari-181717?logo=github)](https://github.com/iashari)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-A._Izzat_Shafran-0077B5?logo=linkedin)](https://www.linkedin.com/in/izzat-ashari/)
[![Instagram](https://img.shields.io/badge/Instagram-@izzat__ashari-E4405F?logo=instagram)](https://www.instagram.com/izzat_ashari/)
[![Email](https://img.shields.io/badge/Email-izzatashari@gmail.com-D14836?logo=gmail)](mailto:izzatashari@gmail.com)

</div>

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with passion by A. Izzat Shafran Ashari**

If you found this project helpful, please consider giving it a star!

</div>
