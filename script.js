(function () {
  /* =========================================================
     1. TEXT SCRAMBLE / DECODER ANIMATION EFFECT
  ========================================================= */
  class TextScramble {
    constructor(el, chars = '!<>-_\\/[]{}—=+*^?#________01') {
      this.el = el;
      this.chars = chars;
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 16);
        const end = start + Math.floor(Math.random() * 22);
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;

      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // Initialize scramble effect on load and hover
  function initScrambleEffects() {
    const scrambleElements = document.querySelectorAll('[data-scramble]');
    scrambleElements.forEach((el, index) => {
      const targetText = el.getAttribute('data-scramble') || el.innerText;
      const scrambler = new TextScramble(el);

      // Staggered reveal when landing page is opened
      setTimeout(() => {
        scrambler.setText(targetText);
      }, 120 + index * 160);

      // Re-scramble on hover for interactive tactile feel
      el.addEventListener('mouseenter', () => {
        scrambler.setText(targetText);
      });
    });
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrambleEffects);
  } else {
    initScrambleEffects();
  }

  /* =========================================================
     2. BOTTOM TABS & EXPANDING PANELS
  ========================================================= */
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  const body = document.body;

  function closeAll() {
    panels.forEach((p) => p.classList.remove('active'));
    tabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-expanded', 'false');
    });
    body.classList.remove('panel-open');
  }

  function openTab(tab) {
    const targetId = tab.getAttribute('data-target');
    const alreadyOpen = tab.classList.contains('active');

    closeAll();

    // if it wasn't already open, open it now (toggle-to-close behavior)
    if (!alreadyOpen) {
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active');
      }
      tab.classList.add('active');
      tab.setAttribute('aria-expanded', 'true');
      body.classList.add('panel-open');
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => openTab(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTab(tab);
      }
    });
  });

  // close open panel on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  /* =========================================================
     3. CONTACT FORM SUBMISSION HANDLER
  ========================================================= */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form && note) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      note.textContent = 'Thanks — message received! (Demo submission)';
      form.reset();
    });
  }
})();
