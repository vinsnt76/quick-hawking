# AEObility — Remotion 4.x Core Principles Carousel

A high-precision **Remotion 4.x (React + TypeScript)** motion graphics composition engineered from the **AEObility AEO Core Principles** design system.

---

## Technical Specifications

| Setting | Value |
|---|---|
| **Composition ID** | `AEObilityCorePrinciplesCarousel` |
| **Resolution** | `1080 x 1080` (1:1 Social Carousel) |
| **Frame Rate** | `30 fps` |
| **Duration** | `1350 frames` (45s total — 9 slides × 150 frames / 5s per slide) |
| **Physics** | Native Remotion `spring()` with mass/damping/stiffness tuning |

---

## Design System Tokens

- **Background:** `#030303` (Obsidian Deep)
- **Card Container:** `#0A0D12` (900×900 Dark Slate Surface, 1px border `#1E293B`, rounded-3xl)
- **Accent Primary:** `#00E5FF` (Electric Cyan)
- **High Contrast Text:** `#F8FAFC`
- **Secondary Text:** `#94A3B8`
- **Bullets:** `rgba(15, 23, 42, 0.55)` container with `#00E5FF` glowing dot
- **Grid Lines:** `rgba(255, 255, 255, 0.04)`

---

## Motion Mechanics

- **Entrance (Frames 0–15):** Card slide-up (`translateY: 60px → 0px`), scale (`0.97 → 1.0`), and opacity fade with `mass: 0.8, damping: 12, stiffness: 100`.
- **Dynamic Breathing (Frames 15–135):** Periodic cyan glow border `Math.sin(frame / 10)` breathing between `0.1` and `0.25` opacity.
- **Staggered Bullets:** Stagger delay `10 + idx * 8` with snappy `mass: 0.5, damping: 12, stiffness: 120`.
- **Exit Transitions (Frames 135–150):** Smooth exit slide and fade out (`mass: 0.4, damping: 15, stiffness: 120`).

---

## 9-Slide Deck Structure

1. **01** — `AEO ARCHITECTURE BREAKDOWN`: *7 Core Principles That Get Your Brand Cited in AI Search*
2. **02** — `01 / DIRECT RETRIEVAL`: *Front-Load 40–60 Word Direct Answers*
3. **03** — `02 / SYNTACTIC CLARITY`: *Write for Natural Language Queries*
4. **04** — `03 / MACHINE LEGIBILITY`: *Deploy JSON-LD Schema Graphs*
5. **05** — `04 / KNOWLEDGE GRAPH`: *Establish Clear Entity Salience*
6. **06** — `05 / ECOSYSTEM CONSENSUS`: *Unify External Brand Signals*
7. **07** — `06 / PROOF TRIPLES`: *Back Claims with Verifiable Data*
8. **08** — `07 / RECENTNESS BIAS`: *Maintain Active Entity Records*
9. **09** — `GET FOUND. GET CHOSEN.`: *Is Your Business Visible in AI Search?* (Diagnostic CTA)

---

## Execution Commands

In your terminal (Codespace or local):

```bash
# 1. Install dependencies
npm install

# 2. Interactive Preview in Remotion Studio
npm start

# 3. Render Master 45s Carousel (1080x1080 @ 30fps)
npm run render:carousel

# 4. Render Standalone Cover Slide Loop
npm run render:cover

# 5. Export Cover Slide as PNG Still
npm run render:cover:still
```
