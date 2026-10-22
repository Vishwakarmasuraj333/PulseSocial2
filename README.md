<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Vishwakarmasuraj333/PulseSocial2/main/apps/frontend/public/logo.svg">
    <img alt="PulseSocial Logo" src="https://raw.githubusercontent.com/Vishwakarmasuraj333/PulseSocial2/main/apps/frontend/public/logo.svg" width="96"/>
  </picture>
</p>

<h1 align="center">PulseSocial</h1>

<p align="center">
  <strong>Next-Generation Enterprise Social Media Command Center &amp; Autonomous Publishing Platform</strong><br>
  <em>Schedule, automate, publish, and analyze content across 38+ social networks with AI Content Copilot.</em>
</p>

<p align="center">
  <a href="https://github.com/Vishwakarmasuraj333/PulseSocial2/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-AGPL%203.0-10b981.svg" alt="License: AGPL-3.0">
  </a>
  <a href="https://github.com/Vishwakarmasuraj333/PulseSocial2">
    <img src="https://img.shields.io/badge/Platform-PulseSocial%20v2.0-0ea5e9.svg" alt="Platform Version">
  </a>
  <a href="https://github.com/Vishwakarmasuraj333">
    <img src="https://img.shields.io/badge/Architect-Suraj%20Vishwakarma-8b5cf6.svg" alt="Lead Architect">
  </a>
  <a href="https://github.com/Vishwakarmasuraj333/PulseSocial2">
    <img src="https://img.shields.io/badge/Organization-Pulse%20Media%20Global-f59e0b.svg" alt="Organization">
  </a>
  <img src="https://img.shields.io/badge/Connectors-38%2B%20Networks-emerald.svg" alt="38+ Networks">
</p>

---

## 🌟 Overview

**PulseSocial** is a unified, high-performance social media command center engineered by **Suraj Vishwakarma** and **Pulse Media Global**. Inspired by Buffer and Hootsuite, it is designed for creators, marketing agencies, and global brands to schedule, publish, analyze, and automate their digital footprint across **38+ social platforms**.

PulseSocial combines **temporal workflow execution**, **Redis BullMQ queuing**, **Prisma ORM multi-tenant database isolation**, and **autonomous AI agents** (OpenAI GPT-4o / Claude 3.5) into a state-of-the-art SaaS platform.

---

## ⚡ Key Highlights

### 🛡️ Enterprise Admin Command Center (`/admin`)
* **Real-Time Platform Governance**: Full visibility into active tenants, connected channels, and published posts with live KPI metrics.
* **Tenant & Organization Management (CRUD)**:
  * Live search and filtering by subscription plan (*Enterprise Agency, Autopilot Pro, Team, Community*).
  * Interactive modal to create and provision new client tenants.
  * Instant status toggle (*Active / Suspended*) and one-click workspace impersonation.
* **38+ Social Connectors Health Matrix**:
  * Live API latency ping tester (e.g. `142ms - HTTP 200 OK`).
  * Per-platform maintenance mode switches.
* **Deep System Diagnostics**:
  * Real-time automated health checks across PostgreSQL, Redis BullMQ, Temporal Workflow Engine, Cloudflare R2 Edge, and AI Copilot.
* **Broadcast Announcements & Gatekeeper**:
  * Publish real-time alert banners across all client dashboards.
  * Toggle public registrations on or off with a single click.
* **Audit Reporting**: Export platform health and tenant directory as downloadable `.json` reports.

### 🔐 Modern Authentication & Onboarding (`/auth/login` & `/auth`)
* **Seamless Tab Navigation**: Smooth switching between **`[ 🔐 Sign In ]`** and **`[ ✨ Create Account ]`**.
* **Password Show/Hide**: Built-in eye toggle (`👁️` / `👁️‍🗨️`) on password inputs.
* **One-Click Quick Credentials**:
  * ⚡ **SuperAdmin**: `admin@pulsesocial.com` / `admin123456`
  * 🚀 **Creator/Agency**: `creator@pulsesocial.com` / `pulse@pass2026`
* **🚀 Instant Demo SuperAdmin Mode**:
  * Instant 1-click preview mode allowing immediate exploration of the platform and Admin Hub without local database configuration.
* **Password Strength Meter**: 3-stage visual security meter (*Weak 🔴 / Medium 🟡 / Strong 🟢*) during registration.
* **Remember Me**: Persistent 30-day session cookies.

### 📅 Multi-Network Publishing & Calendar
* Visual drag-and-drop editorial calendar.
* Support for single posts, thread storms, carousels, reels, and video clips.
* Dynamic timezone normalization per organization.
* First-comment automation, link shorteners, and UTM campaign tagging.

### 🤖 Autonomous AI Content Copilot
* Generate engaging hooks, threads, caption variations, and hashtags with GPT-4o & Claude 3.5.
* Automated tone switching: Professional, Viral Creator, Agency, or Casual.
* Repurpose long-form content into multi-platform snippets.

---

## 🔌 Supported Social Networks (38+ Connectors)

| Category | Supported Platforms |
| :--- | :--- |
| **Social & Microblogging** | X / Twitter (v2 API), Instagram (Graph API), Facebook Pages & Groups, Threads, Bluesky (AT Protocol), Mastodon |
| **Video & Short-form** | YouTube (Data API v3 & Shorts), TikTok (Content Posting API), Kick |
| **Professional & Publishing** | LinkedIn (Community & Page API), Pinterest (v5 API), Medium, WordPress, Dribbble |
| **Community & Messaging** | Telegram (Bot API), Discord (Webhooks), Reddit (OAuth2), Skool Community Bridge, Slack |
| **Decentralized & Web3** | Farcaster (Warpcast / Neynar), Nostr |

---

## 🛠️ Architecture & Tech Stack

```
                          ┌─────────────────────────────────────┐
                          │     Next.js 16 Web Application      │
                          │   (Tailwind CSS, SWR, React Hook)   │
                          └──────────────────┬──────────────────┘
                                             │ HTTP / REST / SSE
                          ┌──────────────────▼──────────────────┐
                          │         NestJS Backend API          │
                          │   (Auth, RBAC, Admin, Public API)   │
                          └──────┬───────────┬───────────┬──────┘
                                 │           │           │
            ┌────────────────────▼──┐ ┌──────▼──────┐ ┌──▼───────────────────┐
            │ PostgreSQL Multi-Tenant│ │ Redis Queue │ │  Temporal Orchestrator │
            │      Prisma ORM       │ │   BullMQ    │ │   Durable Workflows   │
            └───────────────────────┘ └─────────────┘ └───────────────────────┘
```

* **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS, SWR, Mantine UI.
* **Backend**: NestJS, TypeScript, Express, Class-Validator, Passport JWT.
* **Database & ORM**: PostgreSQL with Prisma ORM (multi-tenant schema isolation).
* **Job Queue & Scheduling**: Redis 7, BullMQ, Temporal Workflow Engine.
* **Media & Edge Storage**: Cloudflare R2 / S3-compatible object storage.
* **AI Engine**: LangChain, OpenAI GPT-4o, Anthropic Claude 3.5.
* **Monorepo Manager**: PNPM Workspaces.

---

## 🚀 Quick Start

### 1. Prerequisites
* **Node.js**: `v20.x` or `v22.x`
* **Package Manager**: `pnpm` (v10.6+)
* **Database**: PostgreSQL 15+
* **Cache**: Redis 6+

### 2. Clone Repository
```bash
git clone https://github.com/Vishwakarmasuraj333/PulseSocial2.git
cd PulseSocial2
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Configure Environment Variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

Ensure the key variables are configured:
```env
# Required
DATABASE_URL="postgresql://postgres:password@localhost:5432/pulsesocial"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-ultra-secure-jwt-secret-key"

# URLs
FRONTEND_URL="http://localhost:4200"
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
BACKEND_INTERNAL_URL="http://localhost:3000"

# Admin Configuration
ADMIN_EMAIL="admin@pulsesocial.com"
```

### 5. Setup Database
```bash
pnpm run prisma-db-push
```

### 6. Run Development Servers

**Run Frontend:**
```bash
pnpm run dev:frontend
# Access at: http://localhost:4200
```

**Run Full Stack (Frontend + Backend + Orchestrator):**
```bash
pnpm run dev
```

---

## 🖥️ Platform Navigation & Endpoints

| Portal | Local URL | Access Level | Description |
| :--- | :--- | :--- | :--- |
| **Landing Page** | `http://localhost:4200` | Public | Platform overview, features showcase, and pricing |
| **Sign In** | `http://localhost:4200/auth/login` | Public | Account authentication with demo autofill |
| **Sign Up** | `http://localhost:4200/auth` | Public | Workspace registration and onboarding |
| **Admin Command Center** | `http://localhost:4200/admin` | SuperAdmin | Tenant management, connector diagnostics, system health |
| **Backend API** | `http://localhost:3000` | Authenticated | REST API endpoints and Swagger documentation |
| **Swagger API Docs** | `http://localhost:3000/api` | Developers | Interactive OpenAPI / Swagger interface |

---

## 🔒 Security & Data Governance

* **Zero Password Storage**: Social channel authentication strictly uses official OAuth2 flows; passwords for connected channels are never requested or stored.
* **Encrypted Token Vault**: All OAuth refresh and access tokens are secured with AES-256 encryption at rest.
* **Tenant Isolation**: Multi-tenant database boundaries enforced through organization-level Prisma query scopes.
* **Role-Based Access Control (RBAC)**: Fine-grained permissions for `SUPERADMIN`, `ADMIN`, `EDITOR`, and `VIEWER`.

---

## 👨‍💻 Author & Maintainer

* **Lead Architect**: [Suraj Vishwakarma](https://github.com/Vishwakarmasuraj333)
* **Organization**: Pulse Media Global
* **Repository**: [https://github.com/Vishwakarmasuraj333/PulseSocial2](https://github.com/Vishwakarmasuraj333/PulseSocial2)

---

## 📜 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See the [LICENSE](LICENSE) file for full details.

Developed with ❤️ by **Suraj Vishwakarma** &bull; **Pulse Media Global**
