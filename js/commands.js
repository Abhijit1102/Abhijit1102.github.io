/* ============================================
   COMMANDS
   Each command returns an array of "line objects"
   that terminal.js knows how to render.

   Line object shapes:
   { type: "text",  content: "...", cls: "dim|accent|heading|error|link" }
   { type: "html",  content: "<div>...</div>" }   -- raw HTML block
   { type: "blank" }
   ============================================ */

const COMMANDS = {};

/* ---------- helpers ---------- */

function textLine(content, cls) {
  return { type: "text", content, cls: cls || "" };
}

function blank() {
  return { type: "blank" };
}

function htmlBlock(content) {
  return { type: "html", content };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ---------- help ---------- */

COMMANDS.help = function () {
  const rows = [
    ["help",        "show this list of commands"],
    ["about",       "who I am, in short"],
    ["projects",    "selected projects with details"],
    ["man <proj>",  "manual page with architecture diagram"],
    ["experience",  "work history"],
    ["skills",      "technical skills with proficiency bars"],
    ["education",   "academic background"],
    ["certs",       "certifications"],
    ["contact",     "how to reach me"],
    ["resume",      "download / view full resume"],
    ["whoami",      "quick identity check"],
    ["banner",      "redraw the name banner"],
    ["theme",       "switch color theme (matrix / amber / classic)"],
    ["matrix",      "✨ wake up, neo"],
    ["clear",       "clear the screen"],
    ["sudo ...",    "try it"],
  ];

  const out = [
    textLine("Available commands:", "heading"),
    blank(),
  ];

  let tableRows = "";
  rows.forEach(([cmd, desc]) => {
    tableRows += `<div class="help-cmd">${cmd}</div><div class="help-desc">${desc}</div>`;
  });
  out.push(htmlBlock(`<div class="help-table">${tableRows}</div>`));
  out.push(blank());
  out.push(textLine("Tip: use ↑ / ↓ to navigate command history, Tab to autocomplete.", "dim"));
  return out;
};

/* ---------- about ---------- */

COMMANDS.about = function () {
  const out = [
    textLine(`${PORTFOLIO_DATA.meta.name}`, "heading"),
    textLine(`${PORTFOLIO_DATA.meta.role}`, "accent"),
    blank(),
  ];
  PORTFOLIO_DATA.about.forEach((line) => out.push(textLine(line)));
  return out;
};

/* ---------- whoami ---------- */

COMMANDS.whoami = function () {
  return [
    textLine(`${PORTFOLIO_DATA.meta.name.toLowerCase().replace(/\s+/g, "")}`, "accent"),
    textLine("uid=1000(abhijit) groups=ai-ml,fullstack,genomics", "dim"),
  ];
};

/* ---------- projects ---------- */

COMMANDS.projects = function (args) {
  const data = PORTFOLIO_DATA.projects;

  if (args && args.length) {
    const query = args.join(" ").toLowerCase();
    const match = data.find((p) => p.name.toLowerCase().includes(query));
    if (!match) {
      return [textLine(`projects: no project matching "${args.join(" ")}"`, "error")];
    }
    return renderProject(match, true);
  }

  const out = [
    textLine(`Selected projects (${data.length}). Use "projects <name>" for full details.`, "heading"),
    blank(),
  ];
  data.forEach((p) => out.push(...renderProject(p, false)));
  return out;
};

function renderProject(p, expanded) {
  const tags = p.stack.map((s) => `<span class="tag">${escapeHtml(s)}</span>`).join("");
  let html = `<div class="entry">`;
  html += `<div class="entry-title">${escapeHtml(p.name)}</div>`;
  html += `<div class="entry-meta">${escapeHtml(p.tagline)}</div>`;
  html += `<div>${tags}</div>`;

  if (expanded) {
    html += `<ul>`;
    p.bullets.forEach((b) => (html += `<li>${escapeHtml(b)}</li>`));
    html += `</ul>`;
    html += `<div class="out-dim">github: <span class="out-link">${p.links.github}</span> · demo: <span class="out-link">${p.links.demo}</span></div>`;
  } else {
    html += `<ul><li>${escapeHtml(p.bullets[0])}</li></ul>`;
  }
  html += `</div>`;
  return [htmlBlock(html)];
}

/* ---------- man (project manual pages with ASCII diagrams) ---------- */

COMMANDS.man = function (args) {
  if (!args || !args.length) {
    return [
      textLine("What manual page do you want?", "error"),
      textLine("Usage: man <project>", "dim"),
      textLine(
        `Available: ${PORTFOLIO_DATA.projects.map((p) => p.slug).join(", ")}`,
        "dim"
      ),
    ];
  }

  const query = args.join(" ").toLowerCase();
  const project = PORTFOLIO_DATA.projects.find(
    (p) => p.slug === query || p.name.toLowerCase().includes(query)
  );

  if (!project) {
    return [
      textLine(`No manual entry for ${args.join(" ")}`, "error"),
      textLine(
        `Try: ${PORTFOLIO_DATA.projects.map((p) => p.slug).join(", ")}`,
        "dim"
      ),
    ];
  }

  const tags = project.stack
    .map((s) => `<span class="tag">${escapeHtml(s)}</span>`)
    .join("");

  let html = `<div class="man-page">`;
  html += `<div class="man-header">${escapeHtml(project.slug.toUpperCase())}(1)`
    + `<span class="man-header-section">Project Manual</span></div>`;

  html += `<div class="man-section-title">NAME</div>`;
  html += `<div class="man-body">${escapeHtml(project.name)} — ${escapeHtml(project.tagline)}</div>`;

  html += `<div class="man-section-title">SYNOPSIS</div>`;
  html += `<div class="man-body">${tags}</div>`;

  html += `<div class="man-section-title">DESCRIPTION</div>`;
  html += `<ul class="man-body">`;
  project.bullets.forEach((b) => (html += `<li>${escapeHtml(b)}</li>`));
  html += `</ul>`;

  if (project.diagram) {
    html += `<div class="man-section-title">ARCHITECTURE</div>`;
    html += `<pre class="man-diagram">${escapeHtml(project.diagram.trim())}</pre>`;
  }

  html += `<div class="man-section-title">SEE ALSO</div>`;
  html += `<div class="man-body out-dim">github: <span class="out-link">${project.links.github}</span> · demo: <span class="out-link">${project.links.demo}</span></div>`;

  html += `<div class="man-footer">END — press any key to continue</div>`;
  html += `</div>`;

  return [htmlBlock(html)];
};



COMMANDS.experience = function () {
  const out = [textLine("Work experience:", "heading"), blank()];
  PORTFOLIO_DATA.experience.forEach((job) => {
    let html = `<div class="entry">`;
    html += `<div class="entry-title">${escapeHtml(job.role)} — ${escapeHtml(job.org)}</div>`;
    html += `<div class="entry-meta">${escapeHtml(job.period)} · ${escapeHtml(job.location)}</div>`;
    html += `<ul>`;
    job.bullets.forEach((b) => (html += `<li>${escapeHtml(b)}</li>`));
    html += `</ul></div>`;
    out.push(htmlBlock(html));
  });
  return out;
};

/* ---------- skills ---------- */

COMMANDS.skills = function () {
  const out = [textLine("Technical skills:", "heading"), blank()];

  Object.entries(PORTFOLIO_DATA.skills).forEach(([category, items]) => {
    out.push(textLine(category, "accent"));
    let html = "";
    items.forEach((item, i) => {
      const id = `skillbar-${category.replace(/\W+/g, "")}-${i}`;
      html += `<div class="skill-row">
        <span class="skill-label">${escapeHtml(item.name)}</span>
        <span class="skill-bar-track"><span class="skill-bar-fill" id="${id}" data-level="${item.level}"></span></span>
        <span class="skill-pct">${item.level}%</span>
      </div>`;
    });
    out.push(htmlBlock(html));
    out.push(blank());
  });

  out.push(textLine("(bars animate in shortly after render)", "dim"));
  return out;
};

/* ---------- education ---------- */

COMMANDS.education = function () {
  const out = [textLine("Education:", "heading"), blank()];
  PORTFOLIO_DATA.education.forEach((ed) => {
    let html = `<div class="entry">`;
    html += `<div class="entry-title">${escapeHtml(ed.degree)}</div>`;
    html += `<div class="entry-meta">${escapeHtml(ed.school)} · ${escapeHtml(ed.period)}</div>`;
    html += `<ul>`;
    ed.bullets.forEach((b) => (html += `<li>${escapeHtml(b)}</li>`));
    html += `</ul></div>`;
    out.push(htmlBlock(html));
  });

  out.push(textLine("Scholastic achievements:", "accent"));
  let achHtml = `<div class="entry"><ul>`;
  PORTFOLIO_DATA.achievements.forEach((a) => (achHtml += `<li>${escapeHtml(a)}</li>`));
  achHtml += `</ul></div>`;
  out.push(htmlBlock(achHtml));

  return out;
};

/* ---------- certs ---------- */

COMMANDS.certs = function () {
  const out = [textLine("Certifications:", "heading"), blank()];
  PORTFOLIO_DATA.certifications.forEach((c) => {
    let html = `<div class="entry">`;
    html += `<div class="entry-title">${escapeHtml(c.title)}</div>`;
    html += `<div class="entry-meta">${escapeHtml(c.org)} · ${escapeHtml(c.period)}</div>`;
    html += `<ul>`;
    c.bullets.forEach((b) => (html += `<li>${escapeHtml(b)}</li>`));
    html += `</ul></div>`;
    out.push(htmlBlock(html));
  });
  return out;
};

/* ---------- contact ---------- */

COMMANDS.contact = function () {
  const m = PORTFOLIO_DATA.meta;
  return [
    textLine("Contact:", "heading"),
    blank(),
    textLine(`email     : ${m.email}`, "accent"),
    textLine(`phone     : ${m.phone}`),
    textLine(`linkedin  : ${m.links.linkedin}`, "link"),
    textLine(`portfolio : ${m.links.portfolio}`, "link"),
    textLine(`github    : ${m.links.github}`, "link"),
    blank(),
    textLine("Feel free to reach out about full-stack / AI-ML roles or collaborations.", "dim"),
  ];
};

/* ---------- resume ---------- */

COMMANDS.resume = function () {
  return [
    textLine("Opening resume...", "accent"),
    textLine("-> resume.pdf (placeholder link — replace with your hosted resume URL)", "link"),
    blank(),
    textLine("Or browse: about, experience, projects, skills, education, certs", "dim"),
  ];
};

/* ---------- clear ---------- */

COMMANDS.clear = function () {
  return { clear: true };
};

/* ---------- banner ---------- */

COMMANDS.banner = function () {
  return [
    htmlBlock(`<pre class="ascii-banner">${escapeHtml(PORTFOLIO_DATA.asciiName)}</pre>`),
    textLine(`${PORTFOLIO_DATA.meta.role}`, "accent"),
    textLine('Type "help" to get started.', "dim"),
  ];
};

/* ---------- theme ---------- */

COMMANDS.theme = function (args) {
  const choice = (args[0] || "").toLowerCase();
  const themes = {
    matrix: { "--accent": "#39ff14", "--accent-2": "#9eff00", "--accent-3": "#39ff14" },
    amber: { "--accent": "#ffb000", "--accent-2": "#ffd166", "--accent-3": "#ff8c00", "--fg": "#ffe7b3" },
    classic: { "--accent": "#5ef2a0", "--accent-2": "#ffd166", "--accent-3": "#7aa2ff", "--fg": "#c9f3d6" },
  };

  if (!choice || !themes[choice]) {
    return [
      textLine(`Usage: theme <matrix|amber|classic>`, "error"),
      textLine(`Current themes available: ${Object.keys(themes).join(", ")}`, "dim"),
    ];
  }

  const root = document.documentElement;
  Object.entries(themes[choice]).forEach(([k, v]) => root.style.setProperty(k, v));

  return [textLine(`Theme switched to "${choice}".`, "accent")];
};

/* ---------- easter eggs ---------- */

COMMANDS.sudo = function (args) {
  if (args.join(" ") === "rm -rf /") {
    return [
      textLine("Nice try. This terminal is read-only and emotionally resilient.", "error"),
    ];
  }
  return [
    textLine(`Permission denied: nice try, but ${PORTFOLIO_DATA.meta.name.split(" ")[0].toLowerCase()} is not in the sudoers file.`, "error"),
    textLine("This incident will not be reported.", "dim"),
  ];
};

COMMANDS.ls = function () {
  return [
    textLine("about.txt   contact.txt   experience/   projects/   skills.json   education.txt   certs/", "accent"),
  ];
};

COMMANDS.pwd = function () {
  return [textLine("/home/abhijit/portfolio")];
};

COMMANDS.date = function () {
  return [textLine(new Date().toString(), "dim")];
};

COMMANDS.echo = function (args) {
  return [textLine(args.join(" "))];
};

/* ---------- unknown ---------- */

function unknownCommand(cmd) {
  return [
    textLine(`command not found: ${cmd}`, "error"),
    textLine('Type "help" to see available commands.', "dim"),
  ];
}