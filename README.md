# NovaMind — Chat UI

A modern, responsive AI chat interface built for the CampusPe Gen AI Assignment.  
Inspired by Claude and ChatGPT — built with HTML, CSS, JavaScript, jQuery, and Bootstrap 5.

---

## How to Run

1. Unzip `YourName_ChatUI.zip`
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge)
3. No server or installation required — it runs entirely in the browser

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
│   ├── tablet.png
│   └── mobile.png
└── README.md           ← This file
```

---

## Features Implemented

### Task 1 — HTML Structure (25 pts)
- Semantic HTML5 (`header`, `main`, `section`, `aside`, `footer`)
- Bootstrap 5, Font Awesome 6, and Google Fonts (Syne + DM Sans) linked via CDN
- Welcome screen with 4 suggestion cards in a grid
- Input area with attach button, auto-resizing textarea, and send button
- Typing indicator with animated dots

### Task 2 — CSS Styling (35 pts)
- 20+ CSS custom properties (colors, spacing, radius, shadows, transitions)
- User messages: right-aligned, purple gradient bubble
- AI messages: left-aligned, soft background bubble
- Circular avatars with gradient backgrounds (different per sender)
- Focus state on input with accent border + glow
- Send button with enabled/disabled states and hover effects
- Keyframe animations: `welcomeSlideIn`, `messageFadeIn`, `typingBounce`, `iconPulse`
- Custom scrollbar styling

### Task 3 — JavaScript & jQuery (25 pts)
- `addMessage(text, sender)` — creates and appends message bubbles with timestamp
- `sendMessage()` — full flow: validate → hide welcome → append user msg → show typing → AI response
- `scrollToBottom()` — smooth auto-scroll on new messages
- Send button enabled only when textarea has content
- Enter sends; Shift+Enter inserts new line
- Input clears after send; textarea auto-resizes
- Empty message prevention
- Mock AI responses array with random selection + 1–2.2s simulated delay

### Task 4 — Sidebar & Mobile (15 pts)
- Sidebar fixed at 260px with New Chat button, scrollable history, and user profile
- Sidebar slides in from left on mobile via CSS transform
- Semi-transparent overlay on mobile when sidebar is open
- Hamburger menu button (visible only on mobile)
- Suggestion cards stack vertically on mobile
- Message bubbles expand to 88–92% on small screens
- Fully tested from 320px to 1920px

---

## Bonus Features

| Feature | Points |
|---|---|
| Dark mode toggle (smooth transition) | 4 pts |
| Message formatting (bold, italic, inline code, code blocks) | 3 pts |
| Typewriter animation for AI responses | 4 pts |
| Export chat as `.txt` file (Blob API) — `Ctrl+Shift+E` | 3 pts |
| Custom scrollbar styling | 2 pts |
| Copy message button per AI message | — |

**Total bonus eligible: 16 pts (cap at 10)**

---

## Design Decisions

- **Font**: Syne (display, headings) + DM Sans (body) — distinctive and modern
- **Accent**: `#6C63FF` — vibrant violet that feels premium but accessible
- **Theme**: Soft light mode by default; deep dark mode available via toggle
- **Animations**: Subtle and purposeful — fade-ins, bouncing dots, icon pulse
- **Accessibility**: ARIA labels, roles, `aria-live` on messages, keyboard navigation

---

## Browser Support

Tested on: Chrome 124+, Firefox 125+, Safari 17+, Edge 124+

---

## Libraries Used

| Library | Version | Purpose |
|---|---|---|
| Bootstrap 5 | 5.3.3 | Grid, utilities, responsive helpers |
| Font Awesome | 6.5.1 | Icon set |
| jQuery | 3.7.1 | DOM manipulation, events, animations |
| Google Fonts | — | Syne + DM Sans typography |

---

*Submission for CampusPe Gen AI Assignment — April 2026*
