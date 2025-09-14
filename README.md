This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
<div align="center">

# Collabify

Collaborative document editor with real‑time co‑editing, comments/mentions, and organization‑aware access control. Built with Next.js App Router, Convex, Liveblocks, Clerk, and Tiptap.

</div>

## Overview

Collabify is a Google‑Docs style editor that lets teams write together in real time. It features presence avatars, inline comments and threads, mentions, a template gallery to start new docs quickly, search, export, and an adjustable page ruler with collaborative margins stored in Liveblocks Storage.

Key entities are stored in Convex with ownership and optional organization scoping. Authentication and organizations are handled by Clerk. Liveblocks powers real‑time collaboration and commenting. The editor is built on Tiptap with a rich set of extensions.

## Features

- Real‑time collaborative editing (Liveblocks + Tiptap)
- Presence avatars and colors; @mentions; Inbox notifications for threads
- Inline comments: anchored and floating threads with composer
- Template gallery with multiple starting templates
- Create, rename, delete documents; search by title
- Organization‑aware access: owner or members of the doc's organization
- Adjustable page ruler with collaborative left/right margins
- Rich formatting: headings, bold/italic/underline/strike, lists, task lists, alignment, link, highlight, color, tables, images (with resize), font family, custom font size and line height
- Export: JSON, HTML, TXT, and Print to PDF
- Experimental offline support via Liveblocks extension

## Tech Stack

- Next.js (App Router) and React 19
- TypeScript, Tailwind CSS v4, shadcn/ui (Radix primitives)
- Convex (database + serverless functions)
- Liveblocks (real‑time presence, storage, comments, inbox)
- Clerk (authentication + organizations)
- Tiptap editor with extensions: StarterKit, Underline, TaskList/TaskItem, Table, Image + resize, Link, TextAlign, Highlight, Color, FontFamily, plus custom FontSize and LineHeight extensions

## Project Structure

- `src/app/(home)`: Home page with navbar, search, templates gallery, and documents table
- `src/app/documents/[documentID]`: Document page with editor, toolbar, avatars, inbox, threads and room wiring
- `convex/`: Convex schema and server functions for documents and auth integration
- `src/app/api/liveblocks-auth/route.ts`: Server endpoint to authorize a Liveblocks session, verifying access against Convex and Clerk
- `liveblocks.config.ts`: Liveblocks TypeScript types for Presence, Storage, etc.

## Environment Variables

Create a `.env.local` in the project root and set the following:

```bash
# Convex (from `npx convex dev` or your Convex dashboard)
NEXT_PUBLIC_CONVEX_URL="https://<your-convex-deployment>.convex.cloud"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Liveblocks
LIVEBLOCKS_SECRET_KEY="sk_liveblocks_..."
```

Additionally, update Convex auth to use your Clerk instance domain in `convex/auth.config.ts`:

```ts
// convex/auth.config.ts
const authConfig = {
	providers: [
		{ domain: "https://<your>.clerk.accounts.dev", applicationID: "convex" },
	],
};
export default authConfig;
```

Clerk setup requirements:

- Create a JWT template in Clerk named `convex` and enable the claims required by Convex (user ID and organization ID). The app fetches a token via `auth().getToken({ template: "convex" })`.
- If you use organizations, enable them in Clerk; Collabify stores `organizationId` on docs at creation for org‑wide visibility.

## Local Development

1) Install dependencies

```bash
npm install
```

2) Start Convex locally (in a separate terminal)

```bash
npx convex dev
```

This will provision or link a Convex project and print a URL. Copy that URL into `NEXT_PUBLIC_CONVEX_URL` in `.env.local`.

3) Run the Next.js app

```bash
npm run dev
```

Open http://localhost:3000. Sign in with Clerk. Use the template gallery to create a document and start collaborating in multiple tabs.

## Scripts

- `npm run dev` — start Next.js in development
- `npm run build` — build for production
- `npm start` — run the production build
- `npm run lint` — run ESLint

## How it Works (High‑level)

- Room and presence: `src/app/documents/[documentID]/Room.tsx` wraps the page with `LiveblocksProvider` and `RoomProvider`. It authorizes via `/api/liveblocks-auth` and resolves users, mention suggestions, and room info via Convex and Clerk.
- Authorization: The auth route checks the Convex document for the requested room ID and allows access only if the current user is the owner or is in the same Clerk organization.
- Collaboration: The editor wires `useLiveblocksExtension` from `@liveblocks/react-tiptap` with `offlineSupport_experimental: true` and uses Liveblocks Storage for the page margins.
- Data model: `convex/schema.ts` defines a `documents` table with indexes and a search index on title. Server functions in `convex/documents.ts` implement CRUD and search with org scoping.
- UI: The toolbar and navbar expose formatting, export, print, and basic table insertions. Avatars and inbox come from Liveblocks React UI.

## Notable Capabilities and Shortcuts

- File menu: Save as JSON/HTML/Text, Print to PDF (browser print)
- Edit menu: Undo (⌘Z) / Redo (⌘Y)
- Format menu: Bold (⌘B), Italic (⌘I), Underline (⌘U), Strike (⌘S)
- Insert menu: Quick table sizes
- Ruler: Drag the chevrons to change left/right margins; double‑click to reset. Values sync in real‑time.

## Limitations / Notes

- Images are inserted via URL or local file read; there is no persistent media storage configured
- No granular per‑document sharing beyond owner/org implemented yet
- Offline support is experimental (Liveblocks flag)

## Deployment

Collabify is Vercel‑friendly. Set the same environment variables (`NEXT_PUBLIC_CONVEX_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `LIVEBLOCKS_SECRET_KEY`) in your hosting provider. Point `convex/auth.config.ts` to your production Clerk domain, and use a production Convex deployment URL.

## Commit History Highlights

- Add Liveblocks collaboration and improved error handling
- Integrate Clerk authentication and organizations
- New document templates and search functionality
- Ruler component for adjustable margins
- Font size and line height controls; text alignment; image upload/URL
- Tiptap editor with toolbar and document structure

## Acknowledgements

- [Next.js](https://nextjs.org)
- [Convex](https://www.convex.dev/)
- [Liveblocks](https://liveblocks.io/)
- [Clerk](https://clerk.com/)
- [Tiptap](https://tiptap.dev/)
- [shadcn/ui](https://ui.shadcn.com/)