// Smooth scrolling
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      try {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      } catch (error) {
        console.error('Smooth scroll failed:', error);
        window.location.hash = href;
      }
    }
  });
});

// Scroll animations (Intersection Observer)
const sections = document.querySelectorAll('.page-section');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.18 });

sections.forEach(section => sectionObserver.observe(section));

// Parallax effect on hero header
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (!hero) return;
  const scrollY = window.scrollY;
  hero.style.backgroundPosition = `center ${scrollY * 0.3}px`;
});

// Initialize parallax
window.dispatchEvent(new Event('scroll'));
