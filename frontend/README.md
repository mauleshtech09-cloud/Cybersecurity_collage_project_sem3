# PhishGuard AI - Frontend Application

This directory contains the core Next.js 16 App Router application for the **PhishGuard AI** cybersecurity SaaS platform.

## 🛠️ Tech Stack
- **Framework**: Next.js 16.2 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 with custom dark glassmorphism design tokens
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Data Integration**: Live OpenSheet API polling (10s auto-refresh) + Make.com webhook AI scanning

## 📦 Available Scripts

In this directory (`frontend/`), you can run:

### `npm run dev`
Runs the application in development mode with Turbopack fast refresh.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Creates an optimized production bundle in the `.next` folder.
This is automatically invoked during Netlify deployments.

### `npm run start`
Starts the Next.js production server locally after running `npm run build`.

### `npm run lint`
Runs ESLint to check code quality and adherence to Next.js rules.
