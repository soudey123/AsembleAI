# AsembleAI Website

## Overview

AsembleAI is a production-ready website for an AI consultancy and podcast brand. The application is a full-stack TypeScript project featuring a React frontend with a modern, futuristic dark theme (deep navy blue with clean white text) and an Express backend. The site showcases AI consulting services, displays podcast episodes fetched from RSS feeds, presents AI use cases, and provides a contact form. The architecture follows a client-server model with shared type definitions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **Styling**: Tailwind CSS v4 with CSS custom properties for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state and data fetching
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Typography**: Space Grotesk (headings) and Inter (body) fonts

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Development**: tsx for TypeScript execution with hot module replacement via Vite middleware
- **Build Process**: esbuild bundles server code, Vite handles client build
- **Static Serving**: Production serves pre-built static files from `dist/public`

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` defines database tables
- **Migrations**: Drizzle Kit manages schema migrations in `./migrations`
- **Current Schema**: Basic users table with id, username, password fields
- **Development Storage**: MemStorage class provides in-memory fallback for development

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # UI components (layout, ui primitives)
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities, data, query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data storage interface
│   └── vite.ts       # Vite dev middleware setup
├── shared/           # Shared TypeScript types and schemas
│   └── schema.ts     # Drizzle database schema
└── dist/             # Production build output
```

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### External Content Sources
- **RSS Feed**: Podcast episodes fetched from `https://media.rss.com/inside-asembleai/feed.xml`
- **YouTube**: Video content linked to `@asembleaiyt` channel handle

### Third-Party Libraries
- **rss-parser**: Parses podcast RSS feed for episode data
- **Framer Motion**: Animation library for React
- **Lucide React**: Icon library
- **Zod**: Schema validation for forms and API data

### Development Tools
- **Vite**: Frontend build tool with HMR
- **Replit Plugins**: Dev banner, cartographer, runtime error overlay for Replit environment
- **esbuild**: Server-side TypeScript bundling for production

### Key npm Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run db:push` - Push schema changes to database