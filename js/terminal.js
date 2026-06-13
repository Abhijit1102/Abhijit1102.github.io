/* ============================================
   TERMINAL CORE
   Handles input, command dispatch, rendering,
   history navigation, autocomplete, and clock.
   ============================================ */

(function () {
  const output = document.getElementById("output");
  const input = document.getElementById("cmd-input");
  const mirror = document.getElementById("input-mirror");
  const clock = document.getElementById("clock");

  const history = [];
  let historyIndex = -1;

  const COMMAND_NAMES = Object.keys(COMMANDS);

  /* ---------- rendering ---------- */

  function appendEcho(cmdText) {
    const div = document.createElement("div");
    div.className = "line echo";
    div.innerHTML = `<span class="echo-prompt">abhijit@portfolio:~$</span> ${escapeHtml(cmdText)}`;
    output.appendChild(div);
  }

  function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
  }

  /* ---------- typewriter effect ---------- */

  // Speed in ms per character for plain text lines.
  const TYPE_SPEED = 6;

  function typeText(el, text, speed) {
    return new Promise((resolve) => {
      if (!text) {
        resolve();
        return;
      }
      let i = 0;
      const step = () => {
        el.textContent += text.charAt(i);
        i++;
        if (i < text.length) {
          // Skip the wait if the user presses Enter to fast-forward
          setTimeout(step, speed);
        } else {
          resolve();
        }
      };
      step();
    });
  }

  async function appendLinesAnimated(lines) {
    for (const line of lines) {
      if (line.type === "blank") {
        const div = document.createElement("div");
        div.className = "line";
        div.innerHTML = "&nbsp;";
        output.appendChild(div);
        continue;
      }

      if (line.type === "html") {
        const div = document.createElement("div");
        div.className = "line out-block fade-in-block";
        div.innerHTML = line.content;
        output.appendChild(div);
        scrollToBottom();
        // small breathing pause between rich blocks
        await sleep(40);
        continue;
      }

      const div = document.createElement("div");
      div.className = `line ${line.cls || ""}`.trim();
      output.appendChild(div);
      scrollToBottom();
      await typeText(div, line.content, fastForward ? 0 : TYPE_SPEED);
    }
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  // Holds whether the user wants to skip animation for current output
  let fastForward = false;

  /* ---------- loading / thinking indicator ---------- */

  function showThinking() {
    const div = document.createElement("div");
    div.className = "line dim thinking-indicator";
    div.innerHTML = `<span class="thinking-dots"><span>.</span><span>.</span><span>.</span></span>`;
    output.appendChild(div);
    scrollToBottom();
    return div;
  }

  function removeThinking(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }


  function animateSkillBars() {
    const bars = output.querySelectorAll(".skill-bar-fill[data-level]");
    bars.forEach((bar) => {
      const level = bar.getAttribute("data-level");
      requestAnimationFrame(() => {
        setTimeout(() => {
          bar.style.width = level + "%";
        }, 60);
      });
    });
  }

  /* ---------- command dispatch ---------- */

  let isRunning = false;

  async function runCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    appendEcho(trimmed);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd === "clear") {
      output.innerHTML = "";
      return;
    }

    if (cmd === "matrix") {
      playMatrixRain();
      return;
    }

    const handler = COMMANDS[cmd];

    isRunning = true;
    fastForward = false;
    const thinkingEl = showThinking();
    await sleep(150 + Math.random() * 200);
    removeThinking(thinkingEl);

    if (!handler) {
      await appendLinesAnimated(unknownCommand(cmd));
    } else {
      const result = handler(args);
      if (result && result.clear) {
        output.innerHTML = "";
      } else {
        await appendLinesAnimated(result);
      }
    }

    isRunning = false;
    animateSkillBars();
    scrollToBottom();
  }


  /* ---------- matrix rain easter egg ---------- */

  function playMatrixRain(options) {
    options = options || {};
    const autoCloseMs = options.autoCloseMs ?? 8000;
    const showHint = options.showHint !== false;
    const onClose = options.onClose || function () {};

    const overlay = document.createElement("div");
    overlay.className = "matrix-overlay";
    const canvas = document.createElement("canvas");
    overlay.appendChild(canvas);

    let hint;
    if (showHint) {
      hint = document.createElement("div");
      hint.className = "matrix-hint";
      hint.textContent = "click anywhere to wake up";
      overlay.appendChild(hint);
    }

    document.body.appendChild(overlay);

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const chars = "01ABHIJITRAJKUMAR{}<>/_=$ABCDEF";
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = new Array(columns).fill(0);

    let raf;
    function draw() {
      ctx.fillStyle = "rgba(11, 14, 12, 0.12)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = "#5ef2a0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    let closed = false;
    function close() {
      if (closed) return;
      closed = true;
      cancelAnimationFrame(raf);
      overlay.remove();
      window.removeEventListener("resize", resize);
      input.focus();
      onClose();
    }

    overlay.addEventListener("click", close);
    window.addEventListener("resize", resize);

    // Auto-close after a while in case the user just watches
    if (autoCloseMs) {
      setTimeout(close, autoCloseMs);
    }

    return close;
  }



  function updateMirror() {
    mirror.textContent = input.value;
  }

  input.addEventListener("input", updateMirror);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (isRunning) {
        fastForward = true;
        return;
      }
      const value = input.value;
      runCommand(value);
      if (value.trim()) {
        history.push(value);
        historyIndex = history.length;
      }
      input.value = "";
      updateMirror();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || "";
      updateMirror();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || "";
      updateMirror();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const current = input.value.trim().toLowerCase();
      if (!current) return;
      const match = COMMAND_NAMES.find((c) => c.startsWith(current));
      if (match) {
        input.value = match + " ";
        updateMirror();
      }
      return;
    }
  });

  // Keep focus on input wherever the user clicks within the terminal
  document.getElementById("terminal").addEventListener("click", () => {
    input.focus();
  });

  /* ---------- clock ---------- */

  function tickClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    clock.textContent = `${hh}:${mm}:${ss}`;
  }

  tickClock();
  setInterval(tickClock, 1000);

  /* ---------- initial content ---------- */

  async function showWelcome() {
    const bannerDiv = document.createElement("div");
    bannerDiv.innerHTML = `<pre class="ascii-banner glitch-in">${escapeHtml(PORTFOLIO_DATA.asciiName)}</pre>`;
    output.appendChild(bannerDiv);

    await appendLinesAnimated([
      textLine(`${PORTFOLIO_DATA.meta.role}`, "accent"),
      textLine(`${PORTFOLIO_DATA.meta.location}`, "dim"),
      blank(),
      textLine('Type "help" to see available commands, or try: about, projects, skills, contact', "dim"),
    ]);
    scrollToBottom();

    // Auto-trigger "help" so visitors immediately see what's available
    await runCommand("help");
  }

  // Run welcome once boot finishes
  window.__bootComplete = showWelcome;

  // Expose matrix rain so boot.js can play it as an intro
  window.__playMatrixRain = playMatrixRain;
})();