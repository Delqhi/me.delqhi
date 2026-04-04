# Jeremy Schulze

> **I don't build agents. I build civilizations of agents.**

---

## The Lie Everyone Believes

Every AI company is selling you the same thing: **one agent that does everything mediocrely.**

ChatGPT writes emails AND codes AND analyzes data — badly at all of them. Every "AI agent" startup wraps a prompt in a UI and calls it revolutionary.

**That's not intelligence. That's a multitool. And multitools break when you need them most.**

---

## What I Built Instead

**OpenSIN** — the first Agent-to-Agent (A2A) network where **108+ autonomous specialists** communicate, coordinate, and execute **without human intervention.**

Not a demo. Not a prototype. **A fleet that runs 24/7 in production.**

| What the industry sells | What OpenSIN actually is |
|---|---|
| 1 agent that does everything okay | 108+ specialists that each do one thing perfectly |
| You prompt → it responds | Agents talk to agents — you're not in the loop |
| Single point of failure | Self-healing mesh — agents replace each other |
| Works in a chat window | Works across 20+ messaging platforms, GitHub, Apple, Stripe, Cloudflare |
| Needs you to babysit | Runs while you sleep. Ships while you eat. |

---

## The Numbers Don't Lie

| Metric | OpenSIN |
|---|---|
| **Total Packages** | 310+ |
| **Domains Covered** | 25+ |
| **A2A Agents** | 108+ deployed |
| **Specialized Teams** | 9+ teams |
| **Platform Workers** | 13 (Prolific, Outlier, Clickworker, Appen, Scale AI, Mindrift, OneForma, DataAnnotation, YouGov, Freecash, Karya, Meinungsstudie, Surge AI) |
| **Messaging Channels** | 20+ (WhatsApp, Signal, Telegram, Discord, Slack, Matrix, WeChat, LINE, IRC, SMS, Email, Zoom, and more) |
| **MCP Servers** | 64+ |
| **Public Repos** | 157+ |
| **HF Spaces** | 20 (9 easeeeclip + 11 delqhi) |
| **Uptime** | 24/7 autonomous |
| **Providers** | 100+ (OpenAI, Anthropic, Google, NVIDIA NIM, Groq, Cerebras, TogetherAI, Ollama, and 90+ more) |
| **Models** | 1000+ (Gemini 3.1 Pro, Claude Sonnet/Opus, GPT-5.4, Qwen 397B, and 996+ more) |

---

## Browser & GUI Automation

OpenSIN includes two production-ready browser/GUI automation systems:

### sinInChrome (14 Dateien)
- **MCP Server** für Browser-Automation via Chrome Extension
- **Native Messaging Host** für Chrome-Kommunikation
- **API Executor** mit Auto-Reconnect (3 Attempts mit Backoff)
- **Health Checks** (3-Check System: MCP Server, Extension, Platform)
- **Telemetry** (Buffered + Async Analytics)
- **Batch Operations** (bis 50 Actions pro Request)
- **Rate Limiting** (Free: 100/h, Premium: 10000/h)
- **Graceful Degradation** (Fallback-Mechanismen)
- **Audit Logging** (alle Actions geloggt)

### sin-computer-use (14 Dateien)
- **macOS GUI Automation** via Swift Bindings
- **Computer Use MCP Server** für Screen/Keyboard/Mouse Control
- **Tool Rendering Overrides** für UI-Interaktion
- **Input Loader** für Keyboard/Mouse Events
- **Executor** mit Loop-Drain und Esc-Hotkey
- **Gates** für Feature-Flag-Steuerung

### sin-platform-auth (17 Plattformen)
- **Automatische Cookie-Extraktion** aus Chrome Default Profil
- **Chrome Safe Storage Entschlüsselung** (PBKDF2-SHA1 + AES-128-CBC)
- **17 unterstützte Plattformen**: X, YouTube, Instagram, Reddit, Discord, Medium, TikTok, HuggingFace, LinkedIn, Telegram, Google-Apps, GitHub, DevTo, ProductHunt, StackOverflow, Quora, IndieHackers
- **Zero Human Intervention** — User surft normal, Agenten arbeiten autonom

---

## The Organization: OpenSIN-AI

**157+ repositories** organized by domain:

### Core Infrastructure
- **[OpenSIN](https://github.com/OpenSIN-AI/OpenSIN)** — Core: 310+ packages across 25+ domains
- **[OpenSIN-Code](https://github.com/OpenSIN-AI/OpenSIN-Code)** — Autonomous coding CLI
- **[OpenSIN-backend](https://github.com/OpenSIN-AI/OpenSIN-backend)** — Backend & A2A fleet control plane
- **[OpenSIN-CLI](https://github.com/OpenSIN-AI/OpenSIN-CLI)** — The open source coding agent
- **[OpenSIN-Infrastructure](https://github.com/OpenSIN-AI/OpenSIN-Infrastructure)** — 26-container Docker empire
- **[opensin-swarm](https://github.com/OpenSIN-AI/opensin-swarm)** — Subagent workflow with tmux
- **[OpenSIN-Biometrics](https://github.com/OpenSIN-AI/OpenSIN-Biometrics)** — Governance & policy enforcement
- **[OpenSIN-Control-Plane](https://github.com/OpenSIN-AI/OpenSIN-Control-Plane)** — Doctor/Preflight/Eval layer
- **[OpenSIN-Blueprints](https://github.com/OpenSIN-AI/OpenSIN-Blueprints)** — Reusable blueprints for AI products
- **[OpenSIN-Ledger](https://github.com/OpenSIN-AI/OpenSIN-Ledger)** — Live autonomous logbook
- **[OpenSIN-Competitor-Tracker](https://github.com/OpenSIN-AI/OpenSIN-Competitor-Tracker)** — Automated competitor research

### Coding Team
- **[OpenSIN-Coding-CEO](https://github.com/OpenSIN-AI/OpenSIN-Coding-CEO)** — Coding team lead
- **[OpenSIN-Agent-Frontend](https://github.com/OpenSIN-AI/OpenSIN-Agent-Frontend)** — Frontend development
- **[OpenSIN-Agent-Backend](https://github.com/OpenSIN-AI/OpenSIN-Agent-Backend)** — Backend development
- **[OpenSIN-Code-Security](https://github.com/OpenSIN-AI/OpenSIN-Code-Security)** — SAST/DAST security
- **[OpenSIN-Code-DevOps](https://github.com/OpenSIN-AI/OpenSIN-Code-DevOps)** — CI/CD automation
- **[OpenSIN-Code-DataScience](https://github.com/OpenSIN-AI/OpenSIN-Code-DataScience)** — Data science pipelines
- **[OpenSIN-Code-Database](https://github.com/OpenSIN-AI/OpenSIN-Code-Database)** — Database design
- **[OpenSIN-Code-Integration](https://github.com/OpenSIN-AI/OpenSIN-Code-Integration)** — API integrations
- **[OpenSIN-Code-AI](https://github.com/OpenSIN-AI/OpenSIN-Code-AI)** — AI/ML integration

### Security Team (16 Agents)
- **[OpenSIN-Security-Recon](https://github.com/OpenSIN-AI/OpenSIN-Security-Recon)** — Reconnaissance
- **[OpenSIN-Security-Fuzz](https://github.com/OpenSIN-AI/OpenSIN-Security-Fuzz)** — Fuzzing
- **[OpenSIN-Security-Exploit](https://github.com/OpenSIN-AI/OpenSIN-Security-Exploit)** — Exploit development
- **[OpenSIN-Security-Audit](https://github.com/OpenSIN-AI/OpenSIN-Security-Audit)** — Security audits
- **[OpenSIN-Security-Web](https://github.com/OpenSIN-AI/OpenSIN-Security-Web)** — Web pentesting
- **[OpenSIN-Security-Network](https://github.com/OpenSIN-AI/OpenSIN-Security-Network)** — Network scanning
- **[OpenSIN-Security-Mobile](https://github.com/OpenSIN-AI/OpenSIN-Security-Mobile)** — Mobile security
- **[OpenSIN-Security-Auth](https://github.com/OpenSIN-AI/OpenSIN-Security-Auth)** — Auth bypass testing
- **[OpenSIN-Security-Crypto](https://github.com/OpenSIN-AI/OpenSIN-Security-Crypto)** — Crypto analysis
- **[OpenSIN-Security-Social](https://github.com/OpenSIN-AI/OpenSIN-Security-Social)** — Social engineering
- **[OpenSIN-Security-Cloud](https://github.com/OpenSIN-AI/OpenSIN-Security-Cloud)** — Cloud security
- **[OpenSIN-Security-AI](https://github.com/OpenSIN-AI/OpenSIN-Security-AI)** — AI security
- **[OpenSIN-Security-Malware](https://github.com/OpenSIN-AI/OpenSIN-Security-Malware)** — Malware analysis
- **[OpenSIN-Security-IoT](https://github.com/OpenSIN-AI/OpenSIN-Security-IoT)** — IoT security
- **[OpenSIN-Security-Forensics](https://github.com/OpenSIN-AI/OpenSIN-Security-Forensics)** — Digital forensics
- **[OpenSIN-Security-RedTeam](https://github.com/OpenSIN-AI/OpenSIN-Security-RedTeam)** — Red team ops

### Apple Team (14 Agents)
- **[OpenSIN-Apple-Mail](https://github.com/OpenSIN-AI/OpenSIN-Apple-Mail)** — Apple Mail automation
- **[OpenSIN-Apple-Calendar-Contacts](https://github.com/OpenSIN-AI/OpenSIN-Apple-Calendar-Contacts)** — Calendar & contacts
- **[OpenSIN-Apple-DeviceControl](https://github.com/OpenSIN-AI/OpenSIN-Apple-DeviceControl)** — Device control
- **[OpenSIN-Apple-FaceTime](https://github.com/OpenSIN-AI/OpenSIN-Apple-FaceTime)** — FaceTime
- **[OpenSIN-Apple-Mobile](https://github.com/OpenSIN-AI/OpenSIN-Apple-Mobile)** — iOS automation
- **[OpenSIN-Apple-Notes](https://github.com/OpenSIN-AI/OpenSIN-Apple-Notes)** — Notes
- **[OpenSIN-Apple-Notifications](https://github.com/OpenSIN-AI/OpenSIN-Apple-Notifications)** — Notifications
- **[OpenSIN-Apple-Reminders](https://github.com/OpenSIN-AI/OpenSIN-Apple-Reminders)** — Reminders
- **[OpenSIN-Apple-Photos-Files](https://github.com/OpenSIN-AI/OpenSIN-Apple-Photos-Files)** — Photos & Files
- **[OpenSIN-Apple-Safari-WebKit](https://github.com/OpenSIN-AI/OpenSIN-Apple-Safari-WebKit)** — Safari
- **[OpenSIN-Apple-SystemSettings](https://github.com/OpenSIN-AI/OpenSIN-Apple-SystemSettings)** — System Settings
- **[OpenSIN-Apple-Shortcuts](https://github.com/OpenSIN-AI/OpenSIN-Apple-Shortcuts)** — Shortcuts

### Messaging Channels (20+)
- **[A2A-SIN-WhatsApp](https://github.com/OpenSIN-AI/A2A-SIN-WhatsApp)** — WhatsApp
- **[A2A-SIN-Signal](https://github.com/OpenSIN-AI/A2A-SIN-Signal)** — Signal
- **[A2A-SIN-Telegram](https://github.com/OpenSIN-AI/A2A-SIN-Telegram)** — Telegram
- **[A2A-SIN-Discord](https://github.com/OpenSIN-AI/A2A-SIN-Discord)** — Discord
- **[A2A-SIN-Matrix](https://github.com/OpenSIN-AI/A2A-SIN-Matrix)** — Matrix
- **[A2A-SIN-Google-Chat](https://github.com/OpenSIN-AI/A2A-SIN-Google-Chat)** — Google Chat
- **[A2A-SIN-Slack](https://github.com/OpenSIN-AI/A2A-SIN-Slack)** — Slack
- **[A2A-SIN-IRC](https://github.com/OpenSIN-AI/A2A-SIN-IRC)** — IRC
- **[A2A-SIN-WeChat](https://github.com/OpenSIN-AI/A2A-SIN-WeChat)** — WeChat
- **[A2A-SIN-LINE](https://github.com/OpenSIN-AI/A2A-SIN-LINE)** — LINE
- **[A2A-SIN-SMS](https://github.com/OpenSIN-AI/A2A-SIN-SMS)** — SMS
- **[A2A-SIN-Email](https://github.com/OpenSIN-AI/A2A-SIN-Email)** — Email
- **[A2A-SIN-Zoom](https://github.com/OpenSIN-AI/A2A-SIN-Zoom)** — Zoom
- **[A2A-SIN-Feishu](https://github.com/OpenSIN-AI/A2A-SIN-Feishu)** — Feishu
- **[A2A-SIN-Nostr](https://github.com/OpenSIN-AI/A2A-SIN-Nostr)** — Nostr
- **[A2A-SIN-Beeper](https://github.com/OpenSIN-AI/A2A-SIN-Beeper)** — Beeper
- **[A2A-SIN-BlueBubbles](https://github.com/OpenSIN-AI/A2A-SIN-BlueBubbles)** — BlueBubbles
- **[A2A-SIN-WebChat](https://github.com/OpenSIN-AI/A2A-SIN-WebChat)** — WebChat
- **[A2A-SIN-Chatroom](https://github.com/OpenSIN-AI/A2A-SIN-Chatroom)** — Chatroom

### Social Media (8)
- **[A2A-SIN-X-Twitter](https://github.com/OpenSIN-AI/A2A-SIN-X-Twitter)** — X/Twitter (`easeeeclip/sin-x-twitter`)
- **[A2A-SIN-Instagram](https://github.com/OpenSIN-AI/A2A-SIN-Instagram)** — Instagram (`easeeeclip/sin-instagram`)
- **[A2A-SIN-TikTok](https://github.com/OpenSIN-AI/A2A-SIN-TikTok)** — TikTok (`easeeeclip/sin-tiktok`)
- **[A2A-SIN-YouTube](https://github.com/OpenSIN-AI/A2A-SIN-YouTube)** — YouTube (`easeeeclip/sin-youtube`)
- **[A2A-SIN-LinkedIn](https://github.com/OpenSIN-AI/A2A-SIN-LinkedIn)** — LinkedIn (`easeeeclip/sin-linkedin`)
- **[A2A-SIN-Medium](https://github.com/OpenSIN-AI/A2A-SIN-Medium)** — Medium (`easeeeclip/sin-medium`)
- **[A2A-SIN-Reddit](https://github.com/OpenSIN-AI/A2A-SIN-Reddit)** — Reddit (`easeeeclip/sin-reddit`)
- **[A2A-SIN-Community](https://github.com/OpenSIN-AI/A2A-SIN-Community)** — Community (`easeeeclip/sin-community`)

### Forum (8)
- **[A2A-SIN-StackOverflow](https://github.com/OpenSIN-AI/A2A-SIN-StackOverflow)** — StackOverflow
- **[A2A-SIN-Quora](https://github.com/OpenSIN-AI/A2A-SIN-Quora)** — Quora
- **[A2A-SIN-HackerNews](https://github.com/OpenSIN-AI/A2A-SIN-HackerNews)** — HackerNews
- **[A2A-SIN-ProductHunt](https://github.com/OpenSIN-AI/A2A-SIN-ProductHunt)** — ProductHunt
- **[A2A-SIN-DevTo](https://github.com/OpenSIN-AI/A2A-SIN-DevTo)** — Dev.to
- **[A2A-SIN-IndieHackers](https://github.com/OpenSIN-AI/A2A-SIN-IndieHackers)** — IndieHackers
- **[A2A-SIN-Lobsters](https://github.com/OpenSIN-AI/A2A-SIN-Lobsters)** — Lobsters
- **[A2A-SIN-Slashdot](https://github.com/OpenSIN-AI/A2A-SIN-Slashdot)** — Slashdot

### Platform Workers (13)
Alle 13 Worker mit sinInChrome + sin-computer-use Integration:
- **[Prolific](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/prolific)** — Academic studies
- **[Outlier](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/outlier)** — AI training tasks
- **[Clickworker](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/clickworker)** — Micro tasks
- **[Appen](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/appen)** — Data annotation
- **[Scale AI](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/scaleai)** — AI evaluation
- **[Mindrift](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/mindrift)** — AI tasks
- **[OneForma](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/oneforma)** — Data collection
- **[DataAnnotation](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/dataannotation)** — Data annotation
- **[YouGov](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/yougov)** — Surveys
- **[Freecash](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/freecash)** — Offers & surveys
- **[Karya](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/karya)** — Microsoft data tasks
- **[Meinungsstudie](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/meinungsstudie)** — German surveys
- **[Surge AI](https://github.com/OpenSIN-AI/OpenSIN-backend/tree/main/services/workers/platforms/surgeai)** — AI training data

### Legal Team
- **[A2A-SIN-Team-lawyer](https://github.com/OpenSIN-AI/A2A-SIN-Team-lawyer)** — Legal team
- **[A2A-SIN-Compliance](https://github.com/OpenSIN-AI/A2A-SIN-Compliance)** — Compliance
- **[A2A-SIN-Contract](https://github.com/OpenSIN-AI/A2A-SIN-Contract)** — Contracts
- **[A2A-SIN-ClaimWriter](https://github.com/OpenSIN-AI/A2A-SIN-ClaimWriter)** — Claims
- **[A2A-SIN-Damages](https://github.com/OpenSIN-AI/A2A-SIN-Damages)** — Damages
- **[A2A-SIN-Evidence](https://github.com/OpenSIN-AI/A2A-SIN-Evidence)** — Evidence
- **[A2A-SIN-Paragraph](https://github.com/OpenSIN-AI/A2A-SIN-Paragraph)** — Paragraphs
- **[A2A-SIN-Summary](https://github.com/OpenSIN-AI/A2A-SIN-Summary)** — Summary
- **[A2A-SIN-Patents](https://github.com/OpenSIN-AI/A2A-SIN-Patents)** — Patents

### Business & Commerce
- **[A2A-SIN-Stripe](https://github.com/OpenSIN-AI/A2A-SIN-Stripe)** — Stripe payments
- **[A2A-SIN-Team-Shop](https://github.com/OpenSIN-AI/A2A-SIN-Team-Shop)** — Shop management
- **[A2A-SIN-Shop-Logistic](https://github.com/OpenSIN-AI/A2A-SIN-Shop-Logistic)** — Logistics
- **[A2A-SIN-Shop-Finance](https://github.com/OpenSIN-AI/A2A-SIN-Shop-Finance)** — Finance
- **[A2A-SIN-Tax](https://github.com/OpenSIN-AI/A2A-SIN-Tax)** — Tax
- **[A2A-SIN-TikTok-Shop](https://github.com/OpenSIN-AI/A2A-SIN-TikTok-Shop)** — TikTok Shop

### Gaming
- **[A2A-SIN-Xbox](https://github.com/OpenSIN-AI/A2A-SIN-Xbox)** — Xbox
- **[A2A-SIN-PlayStation](https://github.com/OpenSIN-AI/A2A-SIN-PlayStation)** — PlayStation
- **[A2A-SIN-Nintendo](https://github.com/OpenSIN-AI/A2A-SIN-Nintendo)** — Nintendo

### Templates
- **[Template-A2A-SIN-Agent](https://github.com/OpenSIN-AI/Template-A2A-SIN-Agent)** — Agent template
- **[Template-A2A-SIN-Agent-Worker](https://github.com/OpenSIN-AI/Template-A2A-SIN-Agent-Worker)** — Worker template
- **[Template-A2A-SIN-Team](https://github.com/OpenSIN-AI/Template-A2A-SIN-Team)** — Team template
- **[Template-A2A-SIN-TelegramBot](https://github.com/OpenSIN-AI/Template-A2A-SIN-TelegramBot)** — Telegram bot template

---

## Organizations

- **[OpenSIN-AI](https://github.com/OpenSIN-AI)** — Admin · 157+ repos · 310+ packages · 108+ agents
- **[ASINBIO](https://github.com/ASINBIO)** — Core Maintainer · AI-first bio systems
- **[SIN-Solver](https://github.com/SIN-Solver)** — Core Maintainer · Managed operator layer

---

## Connect

- **OpenSIN:** https://opensin.ai
- **Website:** https://me.delqhi.com
- **GitHub:** https://github.com/Delqhi
- **OpenSIN-AI:** https://github.com/OpenSIN-AI

---

> "Ship beats perfect." — I build systems that work in production, not just in theory.
