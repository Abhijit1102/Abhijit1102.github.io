# abhijit@portfolio:~ 🟢

> An interactive Linux terminal–style portfolio — built with plain HTML, CSS & JS. No frameworks, no build tools, zero dependencies.

**[🚀 Live Demo →](https://yourusername.github.io/portfolio)**

---

```
╔══════════════════════════════════════════════════════════════════════╗
║                     >> ABHIJIT RAJKUMAR <<                         ║
║                   Code • Build • Innovate • Repeat                 ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖥️ **Terminal UI** | Fully interactive terminal with command history (↑/↓), Tab autocomplete, blinking cursor |
| 🌈 **Rainbow Banner** | Per-character hue-shifted animated ASCII banner |
| 🎬 **Boot Sequence** | Fake BIOS-style boot on load, skippable |
| 🌧️ **Matrix Rain** | Full-screen canvas intro animation on every page visit |
| ⌨️ **Typewriter Output** | Command responses type out in real time; press Enter to fast-forward |
| 📄 **`man <project>`** | Manual-style pages with ASCII architecture diagrams for each project |
| 🕹️ **Konami Code** | `↑↑↓↓←→←→BA` triggers rainbow prompt easter egg |
| 🎨 **Theme Switcher** | `theme matrix` / `theme amber` / `theme classic` |
| ♿ **Accessible** | Screen-reader live region (announces per-command, not per-keystroke), reduced-motion support |
| 📱 **Responsive** | Works on mobile; font scales, diagrams scroll horizontally |
| 🌐 **Zero deps** | Pure HTML/CSS/JS — no npm, no bundler, no framework |

---

## 📂 Project Structure

```
portfolio/
├── index.html              # Shell — boot screen, terminal chrome, script order
├── assets/
│   └── resume.pdf          # Your resume — replace with latest version
├── css/
│   ├── reset.css           # Minimal baseline reset + accessibility helpers
│   ├── terminal.css        # Full theme: colours, layout, components, animations
│   ├── crt.css             # CRT scanline & flicker overlay
│   └── responsive.css      # Mobile/small-screen breakpoints
└── js/
    ├── data.js             # ★ All resume content lives here — edit to update
    ├── commands.js         # Command handlers (about, projects, skills, man, …)
    ├── terminal.js         # Core: input, typewriter, history, dispatch, clock
    └── boot.js             # Boot sequence + matrix rain intro orchestration
```

> **To update content, only edit `js/data.js`** — no logic or styling needs to change.

---

## 💻 Commands

```bash
help          # list all commands
about         # who I am
projects      # all projects  |  projects githawk  (filter by name)
man <proj>    # manual page with ASCII architecture diagram
experience    # work history
skills        # proficiency bars per category
education     # academic background
certs         # certifications
contact       # email, phone
social        # GitHub / LinkedIn / Portfolio cards
resume        # open + download resume.pdf
neofetch      # system info, terminal style
whoami        # quick identity check
banner        # redraw the rainbow name banner
theme <name>  # matrix | amber | classic
matrix        # 🌧️ full-screen matrix rain (click to exit)
clear         # clear the screen
ls / pwd / date / echo   # unix classics
sudo          # try it 😏
```

**Hidden:** Konami code `↑↑↓↓←→←→BA` — rainbow mode 🌈

---

## 🚀 Deploy to GitHub Pages

### 1. Create a repository

```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
```

### 2. Commit all files

```bash
git add .
git commit -m "🚀 initial portfolio deploy"
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repo on GitHub
2. **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Branch: `main` · Folder: `/ (root)`
5. Click **Save**

Your site will be live at:
```
https://abhijit1102.io/portfolio
```

> ⏱️ First deploy takes ~1–2 minutes. Subsequent pushes update within 30 seconds.

### 4. Update the live demo link

Edit this `README.md` — replace the demo URL at the top with your real GitHub Pages URL.

---

## ✏️ Customisation Guide

### Update personal info / links

Open `js/data.js` and edit the `meta` block:

```js
meta: {
  name: "Abhijit Rajkumar",
  role: "AI / ML Engineer · Full-Stack Developer",
  location: "India",
  email: "abhijitrajkumar2@gmail.com",
  phone: "+91 7005157909",
  links: {
    linkedin: "https://linkedin.com/in/YOUR_HANDLE",
    portfolio: "https://YOUR_PORTFOLIO.com",
    github: "https://github.com/YOUR_USERNAME"
  }
}
```

### Add a new project

In `js/data.js`, add an entry to the `projects` array:

```js
{
  name: "MyProject",
  slug: "myproject",          // used by: man myproject
  tagline: "One-line description",
  stack: ["Next.js", "FastAPI", "PostgreSQL"],
  links: { github: "https://...", demo: "https://..." },
  bullets: [
    "What it does.",
    "How it works.",
    "What makes it interesting."
  ],
  diagram: String.raw`
  User
    |
    v
  +----------+     +----------+
  | Frontend | --> | Backend  |
  +----------+     +----------+`
}
```

### Replace the resume

Drop a new `resume.pdf` into `assets/` — same filename, no other changes needed.

### Add a new command

In `js/commands.js`:

```js
COMMANDS.mycommand = function (args) {
  return [
    textLine("Heading text", "heading"),
    textLine("Normal text"),
    textLine("Dimmed text", "dim"),
    blank(),
  ];
};
```

Then add it to the `help` table in the same file.

---

## 🛠️ Local Development

No build step required — just open in a browser:

```bash
# Option A: Python (usually pre-installed)
python3 -m http.server 8080

# Option B: Node
npx serve .

# Option C: VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then visit `http://localhost:8080`.

> Opening `index.html` directly via `file://` works for most features, but `resume.pdf` will be blocked by browser CORS policy on some browsers. Use a local server to avoid this.

---

## 🎨 Colour Palette

| Variable | Hex | Role |
|---|---|---|
| `--bg` | `#0b0e0c` | Terminal background |
| `--fg` | `#c9f3d6` | Default text |
| `--accent` | `#5ef2a0` | Prompt, success, highlights |
| `--accent-2` | `#ffd166` | Headings, section titles |
| `--accent-3` | `#7aa2ff` | Links, file paths |
| `--muted` | `#5c7568` | Comments, timestamps, dim text |
| `--error` | `#ff6b6b` | Errors |

Override any variable in `css/terminal.css` under `:root` to retheme.

---

## 📄 License

MIT — fork it, customise it, make it yours.

---

<div align="center">
  <sub>Built with 🖤 and too much caffeine · No frameworks were harmed</sub>
</div>