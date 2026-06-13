/* ============================================
   BOOT SEQUENCE
   Plays a short fake-BIOS / login sequence before
   revealing the terminal. Skippable via click/key.
   ============================================ */

(function () {
  const BOOT_LINES = [
    { text: "Booting portfolio-os v2.6.1 ...", cls: "boot-dim" },
    { text: "[  OK  ] Mounted /home/abhijit", cls: "boot-ok" },
    { text: "[  OK  ] Loaded projects.db (3 entries)", cls: "boot-ok" },
    { text: "[  OK  ] Loaded experience.log (3 entries)", cls: "boot-ok" },
    { text: "[  OK  ] Initialized skills.json", cls: "boot-ok" },
    { text: "[ WARN ] Coffee levels low", cls: "boot-warn" },
    { text: "[  OK  ] Starting terminal session for abhijit ...", cls: "boot-ok" },
    { text: "", cls: "" },
    { text: "Welcome.", cls: "" },
  ];

  const bootScreen = document.getElementById("boot-screen");
  const bootText = document.getElementById("boot-text");
  const terminal = document.getElementById("terminal");

  let finished = false;

  function finishBoot() {
    if (finished) return;
    finished = true;
    bootScreen.classList.add("hidden");
    terminal.classList.remove("hidden");
    requestAnimationFrame(() => {
      terminal.classList.add("visible");
      const input = document.getElementById("cmd-input");
      if (input) input.focus();
      window.__bootComplete && window.__bootComplete();
    });
  }

  function playBoot() {
    let delay = 0;
    BOOT_LINES.forEach((line, i) => {
      const lineDelay = 90 + Math.random() * 120;
      delay += lineDelay;
      setTimeout(() => {
        const span = document.createElement("span");
        span.className = `boot-line ${line.cls}`;
        span.textContent = line.text;
        bootText.appendChild(span);
      }, delay);
    });

    // small pause then reveal terminal
    setTimeout(finishBoot, delay + 500);
  }

  // Allow skipping the boot animation
  bootScreen.addEventListener("click", finishBoot);
  window.addEventListener("keydown", function skipHandler(e) {
    if (!finished) {
      finishBoot();
    }
    window.removeEventListener("keydown", skipHandler);
  });

  // Play a brief matrix rain intro, then start the boot sequence
  bootScreen.classList.add("hidden");
  if (window.__playMatrixRain) {
    window.__playMatrixRain({
      autoCloseMs: 1800,
      showHint: false,
      onClose: function () {
        bootScreen.classList.remove("hidden");
        playBoot();
      },
    });
  } else {
    playBoot();
  }
})();