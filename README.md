# Healing — AI Chat UI

A modern, responsive AI chat interface built for the CampusPe Gen AI Assignment.
Inspired by Claude and ChatGPT — built with HTML, CSS, JavaScript, jQuery, and Bootstrap 5.

---

## How to Run

1. Unzip 
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge)
3. No server or installation required — runs entirely in the browser

---

## File Structure

```
YourName_ChatUI/
├── index.html          ← Main HTML file (semantic structure, all components)
├── css/
│   └── style.css       ← All custom styles (variables, layout, animations, responsive)
├── js/
│   └── chat.js         ← All JavaScript + jQuery functionality
├── screenshots/
│   ├── desktop.png
│   
└── README.md           ← This file
```

---

## Features Implemented

### Task 1 — HTML Structure (25 pts)
- Semantic HTML5 (`header`, `main`, `section`, `aside`, `footer`)
- Bootstrap 5, Font Awesome 6, and Google Fonts (Syne + DM Sans) linked via CDN
- Welcome screen with 4 clickable suggestion cards in a grid layout
- Input area with attach button, auto-resizing textarea, and send button
- Typing indicator with animated bouncing dots

### Task 2 — CSS Styling (35 pts)
- 20+ CSS custom properties for colors, spacing, radius, shadows, and transitions
- User messages: right-aligned with purple gradient bubble
- AI messages: left-aligned with soft background bubble
- Circular avatars with distinct gradient backgrounds per sender
- Focus state on input with accent border and glow ring
- Send button with enabled/disabled states and hover effects
- Four keyframe animations: `welcomeSlideIn`, `messageFadeIn`, `typingBounce`, `iconPulse`
- Custom scrollbar styling throughout

### Task 3 — JavaScript & jQuery (25 pts)
- `addMessage(text, sender)` — creates and appends message bubbles with live timestamp
- `sendMessage()` — full flow: validate → hide welcome screen → append user message → show typing → AI response
- `scrollToBottom()` — smooth auto-scroll whenever a new message appears
- Send button enabled only when textarea has content
- Enter key sends; Shift+Enter inserts a new line
- Input clears after sending; textarea auto-resizes as user types
- Empty message prevention
- 10 mock AI responses with random selection and 1–2.2s simulated delay

### Task 4 — Sidebar & Mobile (15 pts)
- Sidebar fixed at 260px with New Chat button, scrollable chat history, and user profile section
- Sidebar slides in from left on mobile via CSS transform
- Semi-transparent overlay with blur when sidebar is open on mobile
- Hamburger menu button visible only on mobile
- Suggestion cards stack vertically on small screens
- Message bubbles expand to 88–92% width on small screens
- Fully tested from 320px to 1920px

---

## Bonus Features

| Feature | Points |
|---|---|
| Dark mode toggle with smooth theme transition | 4 pts |
| Message formatting — bold, italic, inline code, code blocks | 3 pts |
| Typewriter animation — AI response types out letter by letter | 4 pts |
| Export chat as `.txt` file using Blob API (`Ctrl+Shift+E`) | 3 pts |
| Custom scrollbar styling | 2 pts |
| Copy button on each AI message | — |

**Total bonus eligible: 16 pts (assignment cap at 10)**

---

## Design Decisions

- **Font**: Syne (headings/logo) + DM Sans (body) — distinctive and modern pairing
- **Accent color**: `#6C63FF` — vibrant violet, accessible contrast on both themes
- **Theme**: Clean light mode by default; deep dark mode via sidebar toggle
- **Animations**: Subtle and purposeful — no overdone effects
- **Accessibility**: ARIA labels, roles, `aria-live` on message area, full keyboard navigation

---

## How to Take Screenshots

1. Open `index.html` in Chrome
2. **Desktop** — take a normal fullscreen screenshot → save as `screenshots/desktop.png`
3. Press `F12` → click the device toolbar icon
4. **Mobile** — set width to 375px → screenshot → save as `screenshots/mobile.png`
5. **Tablet** — set width to 768px → screenshot → save as `screenshots/tablet.png`

---

## Browser Support

Tested on: Chrome 124+,Edge 124+

---

## Libraries Used

| Library | Version | Purpose |
|---|---|---|
| Bootstrap 5 | 5.3.3 | Grid, utilities, responsive helpers |
| Font Awesome | 6.5.1 | Icon set throughout the UI |
| jQuery | 3.7.1 | DOM manipulation, events, animations |
| Google Fonts | — | Syne + DM Sans typography |

---
