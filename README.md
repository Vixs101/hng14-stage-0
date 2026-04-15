# 📝 Testable Todo Item Card — HNG 14 Stage 0

A clean, modern, and fully accessible **Todo / Task Card** component built with vanilla HTML, CSS, and JavaScript. Designed with testability, accessibility, and responsiveness as first-class priorities.

![Todo Card Preview](https://img.shields.io/badge/Stage-0-blueviolet?style=for-the-badge) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🚀 Live Demo

🔗 **[View Live](https://vixs101.github.io/hng14-stage-0/)**

---

## ✨ Features

- **Semantic HTML** — Uses `<article>`, `<h2>`, `<p>`, `<time>`, `<ul>`, `<button>`, and `<label>` for proper document structure
- **Full Accessibility** — WCAG AA compliant contrast, visible focus rings, keyboard navigation, ARIA labels, and `aria-live` regions
- **Responsive Design** — Looks great from 320px to 1200px+ with no horizontal overflow
- **Dynamic Time Remaining** — Calculates and displays a human-friendly countdown (e.g., "Due in 3 days", "Due tomorrow") with auto-refresh every 60 seconds
- **Interactive Checkbox** — Real `<input type="checkbox">` that toggles the card to a "Done" state with title strike-through and status badge update
- **Premium Dark UI** — Glassmorphism card design with subtle gradients, smooth micro-animations, and modern typography via Google Fonts (Outfit)
- **Testable** — All key elements are tagged with exact `data-testid` attributes for automated testing

---

## 🧪 data-testid Reference

Every required test ID is present and visible in the DOM:

| `data-testid` | Element | Description |
|---|---|---|
| `test-todo-card` | `<article>` | Root card container |
| `test-todo-title` | `<h2>` | Task title |
| `test-todo-description` | `<p>` | Task description / notes |
| `test-todo-priority` | `<span>` | Priority badge — "High Priority" |
| `test-todo-status` | `<span>` | Status indicator — "In Progress" / "Done" |
| `test-todo-due-date` | `<time>` | Formatted due date with `datetime` attribute |
| `test-todo-time-remaining` | `<time>` | Dynamic countdown with `aria-live="polite"` |
| `test-todo-complete-toggle` | `<input type="checkbox">` | Completion toggle checkbox |
| `test-todo-tags` | `<ul role="list">` | Tags / categories container |
| `test-todo-tag-work` | `<li>` | "Personal" tag chip |
| `test-todo-tag-urgent` | `<li>` | "Urgent" tag chip |
| `test-todo-edit-button` | `<button>` | Edit action button |
| `test-todo-delete-button` | `<button>` | Delete action button |

---

## ♿ Accessibility

| Criterion | Implementation |
|---|---|
| Checkbox labeling | `<label for="...">` with visible text "Mark complete" |
| Button names | `aria-label="Edit task"` / `aria-label="Delete task"` |
| Icon decoration | All SVGs use `aria-hidden="true"` |
| Badge context | `aria-label="Priority: High"` / `aria-label="Status: In Progress"` |
| Live updates | Time remaining wrapped in `aria-live="polite"` |
| Focus indicators | Visible `:focus-visible` outlines on all interactive elements |
| Keyboard navigation | Full Tab navigation through all interactive elements |
| Color contrast | WCAG AA compliant — light text on dark backgrounds |

---

## 📱 Responsiveness

| Viewport | Behaviour |
|---|---|
| **320px** (Mobile) | Full-width card, stacked layout, no overflow |
| **480px** (Small tablet) | Card fills width with padding, tags flex-wrap |
| **768px+** (Tablet/Desktop) | Card centered with `max-width: 480px` |
| **1200px** (Large desktop) | Card centered on page with ambient background |

---

## 🔧 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, flexbox, glassmorphism, media queries
- **JavaScript (Vanilla)** — DOM manipulation, dynamic time calculation, event handling
- **Google Fonts** — [Outfit](https://fonts.google.com/specimen/Outfit) typeface

---

## 📂 Project Structure

```
hng14-stage-0/
├── index.html    # Main HTML — semantic card structure
├── style.css     # CSS entry point importing modular stylesheets
├── scripts/
│   ├── core.js   # DOM queries, state initialization, shared helpers
│   ├── render.js # UI rendering and timer lifecycle
│   └── app.js    # Event handlers and app bootstrap
└── README.md     # This file
```

---

## 🏃 Getting Started

No build tools required — this is a pure HTML/CSS/JS project.

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vixs101/hng14-stage-0.git
   cd hng14-stage-0
   ```

2. **Open in browser**
   ```bash
   # Option A: Open the file directly
   open index.html

   # Option B: Serve locally
   python3 -m http.server 8080
   # Then visit http://localhost:8080
   ```

---

## 🎯 Behaviour

### Checkbox Toggle
When the "Mark complete" checkbox is toggled **on**:
- Title text gets a strike-through
- Status badge updates from "In Progress" → "Done"
- Badge color changes from blue to green

Toggling **off** reverses all changes.

### Time Remaining
- Dynamically calculated from a target date set 3 days in the future
- Displays human-friendly text: "Due in 3 days", "Due tomorrow", "Due now!", "Overdue by X hours"
- Auto-refreshes every 60 seconds

### Edit & Delete Buttons
- **Edit** → Triggers `alert("Edit clicked")`
- **Delete** → Triggers `alert("Delete clicked")`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [HNG Internship](https://hng.tech) — Stage 0 Frontend Task
- [Google Fonts — Outfit](https://fonts.google.com/specimen/Outfit)
- [Lucide Icons](https://lucide.dev) — SVG icon inspiration
