# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5 application using React 19, TypeScript, and Tailwind CSS 4. The project is configured with shadcn/ui components (new-york style) for building the UI.

## Development Commands

**Start development server:**
```bash
npm run dev
```
The dev server runs with Turbopack enabled by default on http://localhost:3000

**Build for production:**
```bash
npm run build
```
Uses Next.js build with Turbopack

**Start production server:**
```bash
npm start
```

**Lint:**
```bash
npm run lint
```
Uses ESLint with Next.js core-web-vitals and TypeScript configurations

## Architecture

### Project Structure
```
src/
├── app/          # Next.js App Router pages and layouts
│   ├── layout.tsx    # Root layout with metadata (title: "Helper", lang: "ko-KR")
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles with Tailwind and design tokens
└── lib/          # Utility functions
    └── utils.ts      # cn() function for merging Tailwind classes
```

### Path Aliases
The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` → `./src/*`

shadcn/ui component aliases (configured in `components.json`):
- `@/components` → components directory
- `@/components/ui` → UI components from shadcn/ui
- `@/lib` → lib directory
- `@/lib/utils` → utility functions
- `@/hooks` → custom React hooks

### Styling

- **Tailwind CSS 4** with PostCSS
- **Design system:** Uses CSS custom properties defined in `globals.css` with an inline `@theme` block
- **Dark mode:** Custom variant configured with `@custom-variant dark (&:is(.dark *))`
- **Animations:** `tw-animate-css` package included
- **Component library:** shadcn/ui with "new-york" style, using Lucide icons

### Key Dependencies

- **UI utilities:** `class-variance-authority`, `clsx`, `tailwind-merge`
- **Icons:** `lucide-react`
- **Framework:** Next.js 15.5 with React 19

### TypeScript Configuration

- Target: ES2017
- Module resolution: bundler
- Strict mode enabled
- JSX: preserve (handled by Next.js)

## Adding shadcn/ui Components

When adding new shadcn/ui components, they should be placed in `src/components/ui/` and can be referenced using the `@/components/ui` alias.
