// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1200);
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 150;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinkItems.forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
});

// ===== DARK MODE =====
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved preference
const savedTheme = localStorage.getItem('machaan-theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('machaan-theme', isDark ? 'dark' : 'light');
});

// ===== PARALLAX HERO =====
const heroParallax = document.getElementById('heroParallax');
window.addEventListener('scroll', () => {
    if (heroParallax) {
        const scrolled = window.pageYOffset;
        heroParallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animations for elements within the same section
            const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
            const idx = Array.from(siblings).indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 100);
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
});

// ===== MENU FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        menuCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== GALLERY LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentGalleryIndex = 0;
const galleryImages = [];

galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push(img.src);

    item.addEventListener('click', () => {
        currentGalleryIndex = index;
        openLightbox(img.src);
    });
});

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex];
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex];
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentGalleryIndex];
    }
    if (e.key === 'ArrowRight') {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentGalleryIndex];
    }
});

// ===== FLOATING BOOK BUTTON & BACK TO TOP =====
const floatingBook = document.getElementById('floatingBook');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    if (scrolled > 500) {
        floatingBook.classList.add('visible');
        backToTop.classList.add('visible');
    } else {
        floatingBook.classList.remove('visible');
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== BOOKING FORM =====
const bookForm = document.getElementById('bookForm');
const bookDate = document.getElementById('bookDate');

// Set min date to today
const today = new Date().toISOString().split('T')[0];
bookDate.setAttribute('min', today);
bookDate.value = today;

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('bookName').value,
        phone: document.getElementById('bookPhone').value,
        date: document.getElementById('bookDate').value,
        time: document.getElementById('bookTime').value,
        guests: document.getElementById('bookGuests').value,
        seating: document.getElementById('bookSeating').value,
        message: document.getElementById('bookMsg').value
    };

    // Simple validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Show success message
    showNotification('Reservation request sent! We\'ll call you shortly to confirm.', 'success');
    bookForm.reset();
    bookDate.value = today;
});

// ===== NOTIFICATION TOAST =====
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '100px',
        right: '24px',
        padding: '16px 24px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.95rem',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(120%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        maxWidth: '400px'
    });

    if (type === 'success') {
        toast.style.background = 'linear-gradient(135deg, #2d5016, #4a7c2e)';
        toast.style.color = '#fff';
    } else {
        toast.style.background = 'linear-gradient(135deg, #c0392b, #e74c3c)';
        toast.style.color = '#fff';
    }

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });

    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ===== SMOOTH REVEAL FOR COUNTER STATS =====
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// ===== TILT EFFECT ON CARDS (DESKTOP) =====
if (window.matchMedia('(min-width: 768px)').matches) {
    document.querySelectorAll('.menu-card, .review-card, .facility-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetEl.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
