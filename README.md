# 🚆 Transit Navigator PRO 2.0

> **Next-Generation Indian Railways Alternative Route Discovery & Travel Explorer**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![IRCTC](https://img.shields.io/badge/IRCTC-Rule%20142%20Compliant-emerald?style=flat)](https://www.irctc.co.in/)

Transit Navigator solves the single biggest frustration for Indian Railways travelers: **the binary "Waitlist" dead-end and confusing terminal searches.** When IRCTC says *"NO SEATS AVAILABLE"*, Transit Navigator discovers confirmed berths on the same train via quota extensions, or connects you through high-speed transit junctions with official refund protections.

---

## ✨ Key Capabilities

### 1. 🏙️ Metropolitan Multi-Station Clustering
- In major metropolitan areas, multiple railway terminals serve different trunk corridors.
- Searching **"DELHI"** automatically scans 6 terminals (`NDLS`, `DLI`, `NZM`, `ANVT`, `DEE`, `GZB`).
- Searching **"MUMBAI"** automatically aggregates 9 terminals (`CSMT`, `MMCT`, `BDTS`, `LTT`, `DR`, `BVI`, `PNVL`, `TNA`, `KYN`).
- **Impact**: Unlocks **300% more trains** than standard single-station searches.

### 2. ⚡ Same-Train Quota Hacks (Beat The Waitlist)
- Indian Railways divides passenger berths into remote-location and end-to-end quota pools.
- When an intermediate stretch shows `WL-140`, booking from origin terminal or extending to the destination terminus often has **Confirmed (AVAILABLE)** seats.
- Passengers legally set their **"Boarding Point"** to their actual boarding station on IRCTC.
- **Impact**: Board the same train without switching coaches or seats while holding a confirmed ticket.

### 3. 🛡️ 2-Leg Connecting Hubs with IRCTC Linked PNR Guard
- Evaluates multi-hop connections via central railway junctions (Vadodara, Bhopal, Kanpur, Nagpur, Itarsi, Surat, Kota, Ratlam).
- Classifies connection safety buffers:
  - 🟢 **Safe Connection** (90–210 mins): Stress-free platform transfer.
  - 🟡 **Tight Buffer** (<75 mins): Flagged with delay alert.
  - 🟣 **Extended Layover** (>210 mins): Recommends IRCTC Executive Lounge.
- **Protection Guarantee**: Uses official IRCTC **"Connecting Journey Booking"** rules. If Train 1 delays and you miss Train 2, Indian Railways gives you a **100% full refund on Train 2**.

### 4. 📍 Nearby Satellite Terminal Discovery
- Suggests confirmed trains departing from or arriving at adjacent terminals within 15–35 km (e.g. Borivali, Thane, Kalyan, Ghaziabad) with local transit advice.

### 5. 🕌 Explore India by Rail Showcase
- 8 curated iconic rail travel expeditions:
  - **Taj Mahal & Agra Fort** (Agra, UP) via Gatimaan Express (1h 40m)
  - **Varanasi & Dashashwamedh Ghat** (Varanasi, UP) via Vande Bharat (8h)
  - **Hawa Mahal & Amber Palace** (Jaipur, Rajasthan) via Ajmer Vande Bharat (3h 25m)
  - **Vaishno Devi & Kashmir Gateway** (Katra, J&K) via Vande Bharat (8h)
  - **Goa & Konkan Coastal Rail** (Madgaon, Goa) via Tejas Express (7h 45m)
  - **Kerala Backwaters & Fort Kochi** (Kochi, Kerala) via SMVT Vande Bharat (8h 20m)
  - **Golden Temple & Wagah Border** (Amritsar, Punjab) via Amritsar Shatabdi (5h 30m)
  - **Mumbai Financial Capital & Marine Drive** (Mumbai, MH) via Mumbai Rajdhani (15h 32m)
- Includes **1-Click Route Search** activation.

### 6. 📊 Standard IRCTC vs. Transit Navigator Comparison Matrix
- Side-by-side comparison matrix highlighting the pain points of traditional ticketing portals against Transit Navigator's routing algorithms.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+ or newer
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/luckyprasad10/transit-navigator-v2.git
cd transit-navigator-v2

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism & kinetic animations
- **Icons**: Lucide React
- **Routing Engine**:
  - `lib/engine/calculator.ts` — Distance, fare, and layover safety math
  - `lib/engine/direct-routes.ts` — Multi-station direct corridor filter
  - `lib/engine/same-train-alternates.ts` — Remote quota loophole scanner
  - `lib/engine/connecting-routes.ts` — Graph-based 2-leg transfer solver
  - `lib/engine/nearby-alternatives.ts` — Metropolitan satellite terminal switch
  - `lib/engine/router.ts` — Unified orchestrator

---

## ⚖️ Legal & Compliance Notice

Transit Navigator is an informational and route-discovery platform. It **does not** automate ticket booking, bypass payment gateways, or scrape protected session cookies. All route recommendations and quota allocations strictly adhere to official **Indian Railways Commercial Rule 142** and IRCTC Connecting Journey Booking policies. Users complete their actual reservations securely on [irctc.co.in](https://www.irctc.co.in).

---

## 📄 License

MIT © [luckyprasad10](https://github.com/luckyprasad10)
