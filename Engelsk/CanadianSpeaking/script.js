// cool smooth scrolling
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// cool scroll animations
const sections = document.querySelectorAll('.page-section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.18 });
sections.forEach(section => {
    sectionObserver.observe(section);
});

// cool parallax
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (!hero) return;
    const scrollY = window.scrollY;
    hero.style.backgroundPosition = `center ${scrollY * 0.3}px`;
});

// i hate js too