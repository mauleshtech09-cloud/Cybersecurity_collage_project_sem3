# PhishGuard AI - Enterprise Cybersecurity SaaS Platform

PhishGuard AI is an AI-powered phishing detection and live threat intelligence SaaS dashboard built with React, Next.js 16, Recharts, Framer Motion, and real-time Google Sheets backend synchronization.

## 🏛️ Repository Architecture

This repository is organized cleanly for production stability and CI/CD pipelines (e.g., Netlify):

```
├── frontend/             # Core Next.js 16 App Router application
│   ├── src/
│   │   ├── app/          # App router pages and layouts
│   │   ├── components/   # Interactive SOC components (DashboardPreview, ThreatResults, etc.)
│   │   ├── animations/   # Framer motion transition presets
│   │   └── utils/        # Helper functions and severity coloring
│   ├── public/           # Static web assets
│   └── package.json      # Frontend package configuration and dependencies
├── netlify.toml          # Production deployment build instructions for Netlify
├── AGENTS.md             # Development guidelines and agent rules
└── README.md             # Project documentation
```

### Why is there no root `package.json`?
To eliminate multi-lockfile conflicts, build root misdetection, and conflicting Node environments, all npm packages and scripts reside exclusively inside the `frontend/` directory. The root directory is configured purely as the Git repository and deployment wrapper.

---

## 🚀 Quickstart & Local Development

1. **Navigate to the application directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser. The dashboard will automatically sync live threat data every 10 seconds.

---

## 🌐 Production Deployment (Netlify)

This repository includes a production-tested `netlify.toml` at the root that configures Netlify to build cleanly from the `frontend/` subdirectory.

### Automated Netlify Setup:
1. Connect your Git repository to **Netlify**.
2. Netlify will automatically read `netlify.toml` and apply the following build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/.next`
   - **Node Version**: `20`
3. Click **Deploy Site**!

---

## 🛡️ Key Features
- **Real-Time Threat Intelligence**: Continuously streams and synchronizes security logs via OpenSheet API.
- **Dynamic SOC Analytics**: Interactive Recharts visualizations including Threat Severity distribution, Top Brand Impersonation metrics, and real-time KPIs.
- **AI Phishing Analysis**: Deep automated inspection of suspicious URLs, sender reputation, social engineering markers, and malware indicators.
- **Glassmorphism UI**: State-of-the-art dark theme aesthetics powered by Tailwind CSS and Framer Motion micro-interactions.
