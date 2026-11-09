# NEXUS.3D — 3D Animated Project Showcase & Privacy-First Platform

A high-performance, futuristic 3D WebGL interactive project showcase platform built with **Next.js 14**, **Three.js**, **TypeScript**, and **Tailwind CSS**. 

Engineered with built-in **GDPR (Art. 17)** and **CCPA** data compliance, including dedicated **Terms & Conditions**, **Privacy Policy**, and a **Self-Service Delete User Data Portal**.

---

## 🌟 Key Features

### 1. 🪐 Interactive 3D WebGL Landing Page (`/`)
- **Interactive Three.js Core**: 
  - Dynamic rotating wireframe icosahedron with inner reflective polyhedrons.
  - Orbiting holographic rings and data satellite nodes.
  - 1,600+ interactive particle starfield with dual cyan & violet spectrum lighting.
  - Real-time mouse tracking and parallax camera physics.
  - **Live HUD Controls**: Wireframe/Solid toggles, rotation speed controller, color preset cycles (Cyan, Neon Purple, Matrix Green).
- **Interactive 3D Project Showcase**:
  - Filterable by domain: *3D Web & WebGL*, *AI & Machine Learning*, *Developer Tools*, *Cloud & Distributed Systems*.
  - Instant live keyword search.
  - **3D Tilt Cards**: Gyroscope-inspired mouse tilt physics (`rotateX`, `rotateY`, dynamic sheen reflection).
  - **Deep-Dive Specifications Modal**: Inspect polygon count, draw calls, shader pipelines, architecture breakdown, and live demos.
- **Project Submission Engine**:
  - Form for creators to submit their 3D web applications with data collection consent acknowledgement and confetti celebration.
- **Client-Side GPU Benchmark**:
  - Real-time local WebGL diagnostics inspecting GPU vendor, renderer strings, and framerate stability.

---

### 2. 📜 Terms & Conditions (`/terms`)
- Transparent legal clauses customized for an interactive showcase collecting user submissions and telemetry:
  - Intellectual property rights (creators retain 100% ownership).
  - Explicit user data collection & processing agreement.
  - WebGL 2.0 device compatibility disclaimer.
  - Acceptable use policies (prohibiting malicious shaders or payload injections).
  - Table of contents with search-within-clauses and quick links to erasure.

---

### 3. 🔒 Privacy Policy (`/privacy`)
- Fully compliant with **GDPR (Regulation EU 2016/679)** and **CCPA**:
  - **Categories of Collected Data**: Project submission metadata, GPU capability profiles, session preferences, and frame rate metrics.
  - **Lawful Basis**: Explicit consent, legitimate interest (crash prevention), and legal accountability.
  - **Zero Third-Party Data Selling**: No data brokers or cross-site tracking.
  - **Statutory Rights**: Clear explanations of the Right to Access, Right to Rectification, and Right to Erasure ("Right to be Forgotten").

---

### 4. 🗑️ Delete User Data Portal (`/deleteuserdata` & `/delete-user-data`)
- **Step 1: Instant Client Browser Storage Wipe**:
  - One-click purge of local `localStorage`, `sessionStorage`, browser cookies, and WebGL shader cache on the active device.
- **Step 2: Official Server Erasure Request**:
  - Email lookup with verification confirmation.
  - Configurable scope: *Complete Purge*, *Telemetry Only*, or *Submissions Only*.
  - Instant integration with `/api/delete-user-data`.
  - **Cryptographic Deletion Receipt**: Issues an official verification tracking code (e.g. `DEL-2026-X`) and downloadable JSON certificate.
- **Step 3: Real-Time Audit Tracker**:
  - Allows users to enter their Ticket ID to verify real-time purge status across production databases and backup rotators.

---

### 5. 🛡️ Interactive Cookie & Telemetry Banner
- Slide-in glassmorphic consent modal allowing users to:
  - Accept all telemetry.
  - Limit to essential engine cookies.
  - Fine-tune granular switches for WebGL performance logs vs. interaction analytics.
  - Re-configurable at any time from the universal footer.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended, verified on v24.4)
- npm (v9+ recommended, verified on v11.7)

### Installation
Dependencies are already configured and installed in this workspace:
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Run Production Server
```bash
npm run build
npm start
```

---

## 📁 Project Architecture

```
itsw/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── src/
    ├── app/
    │   ├── layout.tsx                # Universal Root Layout with Navbar & Footer
    │   ├── globals.css               # Cyberpunk styling, glassmorphism, 3D grids
    │   ├── page.tsx                  # 3D Animated Showcase Landing Page
    │   ├── terms/
    │   │   └── page.tsx              # Terms & Conditions Page
    │   ├── privacy/
    │   │   └── page.tsx              # Privacy Policy Page (GDPR/CCPA compliant)
    │   ├── deleteuserdata/
    │   │   └── page.tsx              # Self-Service Delete User Data Portal
    │   ├── delete-user-data/
    │   │   └── page.tsx              # Hyphenated route alias
    │   └── api/
    │       └── delete-user-data/
    │           └── route.ts          # API Route for processing & tracking erasures
    ├── components/
    │   ├── Navbar.tsx                # Glassmorphic top navigation bar
    │   ├── Footer.tsx                # Comprehensive footer with legal & DPO links
    │   ├── Hero3DScene.tsx           # Three.js 3D WebGL interactive canvas core
    │   ├── ProjectCard3D.tsx         # Interactive 3D tilt project card
    │   ├── ProjectModal.tsx          # Deep-dive 3D engine specs & architecture modal
    │   ├── SubmitProjectModal.tsx    # Project submission modal with consent checkbox
    │   └── CookieConsent.tsx         # User telemetry & cookie banner
    └── data/
        └── projectsData.ts           # Showcase project repository & technical specs
```

---

## ⚖️ Compliance Standards Implemented
- **GDPR Article 17**: Right to Erasure ("Right to be Forgotten")
- **CCPA Section 1798.105**: Consumers' Right to Request Deletion
- **Zero Fingerprinting**: GPU profiles are restricted from canvas pixel extraction
- **Downloadable Proof of Deletion**: JSON cryptographic certificate format provided to the data subject upon request.

