// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  // Close on link click
  menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) menu.classList.remove('open');
  });
}

// Scrollspy (highlight active link)
const links = [...document.querySelectorAll('.nav-link')];
const sections = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

function setActive() {
  const y = window.scrollY + window.innerHeight * 0.35; // probe line
  let currentId = sections[0]?.id;
  for (const sec of sections) {
    if (sec.offsetTop <= y) currentId = sec.id;
  }
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`));
}
setActive();
window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('resize', setActive);
