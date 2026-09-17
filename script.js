(function () {
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

  // Contact form submission handling
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
