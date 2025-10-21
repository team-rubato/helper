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
Uses Next.js build with Turbopack. The `prebuild` script automatically runs tests before building.

**Start production server:**
```bash
npm start
```

**Lint:**
```bash
npm run lint
```
Uses ESLint with Next.js core-web-vitals and TypeScript configurations

**Test:**
```bash
npm run test
```
Uses Vitest for unit testing. Tests run automatically before every build via the `prebuild` script.

## Architecture

### Application Layout

The application uses a **sidebar-based layout** with the following structure:

- **Root Layout** (`src/app/layout.tsx`): Wraps all pages with `SidebarProvider`, includes `AppSidebar` component and `Toaster` for notifications
- **Sidebar Navigation**: Collapsible icon sidebar using shadcn/ui's Sidebar component (variant="inset", collapsible="icon")
- **Default Route**: Root path (`/`) redirects to `/trading` (configured in `next.config.ts`)

### Project Structure
```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx          # Root layout with SidebarProvider and Toaster
│   ├── trading/            # Trading section pages
│   │   ├── page.tsx        # Trading kanban board
│   │   └── akform/         # AK Form page
│   ├── procurement/        # Procurement section pages
│   └── globals.css         # Global styles with Tailwind and design tokens
├── components/
│   ├── app-sidebar/        # Unified sidebar component
│   │   ├── index.tsx       # Complete sidebar (Header + Content in one file)
│   │   ├── constants.ts    # Menu data (MENU, GNB_MENU, MenuType, MenuKey)
│   │   ├── utils.ts        # Helper functions (getMenu, isMenuKey)
│   │   └── utils.test.ts   # Unit tests for sidebar utilities
│   └── ui/                 # shadcn/ui components
└── lib/                    # Utility functions
    └── utils.ts            # cn() function for merging Tailwind classes
```

### Navigation System

The sidebar implements a **unified navigation architecture** where GNB (Global Navigation Bar) and LNB (Local Navigation Bar) are combined in a single component:

**Menu Data Structure (`constants.ts`):**
- `MenuType`: Type definition for menu objects
  ```typescript
  {
    id: string;
    icon: LucideIcon;
    title: string;
    url: string;
    lnb: Array<{ id, icon, title, url }>;
  }
  ```
- `TRADING` / `PROCUREMENT`: Team menu objects with embedded LNB arrays
- `MENU`: Object mapping team keys (`"trading" | "procurement"`) to menu data
- `MenuKey`: Type alias for `keyof typeof MENU`
- `GNB_MENU`: Derived array of GNB items (without `lnb` field) for header dropdown
- `NOT_FOUND`: Fallback menu for invalid segments

**Sidebar Component (`index.tsx`):**
Single-file implementation combining header and content:

1. **Header Section** (lines 36-67):
   - Dropdown trigger shows current team icon and title
   - Calls `getMenu(segment)` to determine current team
   - Dropdown content maps over `GNB_MENU` for team selection links

2. **Content Section** (lines 68-89):
   - Maps over `menu.lnb` array to render local navigation items
   - Each LNB item is a link with icon and title

**Utility Functions (`utils.ts`):**
- `isMenuKey(segment)`: Type guard checking if segment is a valid `MenuKey`
  - Returns `segment is MenuKey` for type narrowing
  - Pattern: `if (isMenuKey(segment)) { MENU[segment] }` is type-safe
- `getMenu(segment)`: Returns menu object for given segment
  - Returns `MENU[segment]` if valid, otherwise `NOT_FOUND`
  - Always returns complete `MenuType` with `lnb` array

**Testing (`utils.test.ts`):**
- Comprehensive tests for `isMenuKey` and `getMenu`
- Tests cover: type guards, valid/invalid segments, fallback behavior

**Key Architectural Decision:**
This unified approach (single component with inline header/content) differs from the previous modular approach (separate header/ and content/ directories). The current design prioritizes simplicity and co-location of related logic.

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
- **Data tables:** `@tanstack/react-table`
- **Theme:** `next-themes` for dark/light mode support
- **Notifications:** `sonner` for toast messages
- **Testing:** `vitest` for unit tests
- **Radix UI primitives:** `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-tooltip`

### Available shadcn/ui Components

The following shadcn/ui components are already installed in `src/components/ui/`:
- `button`, `dropdown-menu`, `input`, `separator`, `sheet`, `sidebar`, `skeleton`, `sonner`, `table`, `textarea`, `tooltip`

**Notifications:** The app uses `sonner` for toast notifications. A `<Toaster richColors />` is included in the root layout.

### TypeScript Configuration

- Target: ES2017
- Module resolution: bundler
- Strict mode enabled
- JSX: preserve (handled by Next.js)

## Adding shadcn/ui Components

When adding new shadcn/ui components, they should be placed in `src/components/ui/` and can be referenced using the `@/components/ui` alias.

## Git Commit Convention

This project follows **Conventional Commits** specification. All commit messages must be written in Korean for subject and body.

### Pre-commit Checklist

**IMPORTANT:** Before creating any commit, you MUST run the following commands and ensure they pass:

1. **Run lint:**
   ```bash
   npm run lint
   ```
   Ensure there are no linting errors.

2. **Run build:**
   ```bash
   npm run build
   ```
   This will automatically run tests first (via `prebuild` script), then build the project.
   Ensure both tests and build complete successfully without errors.

3. **Only proceed with commit if both checks pass.**

**Note:** The `prebuild` script automatically runs `vitest run` before every build to ensure all tests pass.

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 동작에 영향 없음)
- `refactor`: 코드 리팩토링 (기능 변경 없음)
- `test`: 테스트 추가 또는 수정
- `chore`: 빌드 작업, 패키지 매니저 설정 등
- `perf`: 성능 개선

### Scope (optional)
변경된 범위를 나타냅니다 (예: `sidebar`, `ui`, `api`, `config`)

### Examples
```
feat(auth): 사용자 인증 기능 추가

JWT 토큰 기반 인증 시스템을 구현했습니다.
- 로그인/로그아웃 기능
- 토큰 갱신 로직

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

```
fix(ui): 다크모드 토글 버튼 오류 수정

다크모드 전환 시 색상이 제대로 적용되지 않던 문제를 해결했습니다.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

```
docs: README에 설치 가이드 추가

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```
