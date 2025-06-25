# Promptly App

Promptly is a React application for managing field assets. It allows teams to sign up, create hubs, add assets, upload files, attach notes and manage user roles. Assets can be accessed via QR codes and users can monitor service status of supporting infrastructure.

## Prerequisites

- **Node.js** (version 18 or later recommended)
- **Vite** – installed as a dev dependency. No global installation is required.

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` in the project root and configure your Supabase credentials. At minimum define:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These values will be loaded by Vite at build time.

## Development

Start the development server with hot reloading:

```bash
npm run dev
```

Open the provided local URL in your browser to view the app.

## Production Build

To generate an optimized build for deployment run:

```bash
npm run build
```

The compiled assets will be placed in the `dist/` directory.

