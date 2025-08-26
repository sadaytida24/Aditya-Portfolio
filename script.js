// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) menu.classList.remove('open');
  });
}

// Scrollspy (highlight active link)
const links = [...document.querySelectorAll('.nav-link')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
function setActive() {
  const y = window.scrollY + window.innerHeight * 0.35;
  let currentId = sections[0]?.id;
  for (const sec of sections) if (sec.offsetTop <= y) currentId = sec.id;
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`));
}
setActive();
window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('resize', setActive);

// Subtle ring rotation
const ring = document.querySelector('.ring');
let deg = 0;
(function spin(){
  deg = (deg + 0.18) % 360;
  if (ring) {
    ring.style.background =
      `repeating-conic-gradient(from ${deg}deg, var(--blue) 0 14deg, transparent 14deg 25deg)`;
  }
  requestAnimationFrame(spin);
})();
