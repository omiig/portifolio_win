// Navegação suave
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            // Navegação mais rápida
            smoothScrollTo(targetPosition, 500);
        }
        
        // Fechar menu mobile se estiver aberto
        const navbar = document.querySelector('.navbar');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// Menu mobile toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbar = document.querySelector('.navbar');

mobileMenuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Fechar menu mobile ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        navbar.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Animação das barras de habilidade
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Observer para animações ao scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animar barras de habilidade quando a seção skills ficar visível
            if (entry.target.id === 'habilidades') {
                setTimeout(() => {
                    animateSkillBars();
                }, 300);
            }
        }
    });
}, observerOptions);

// Adicionar classe fade-in e observar seções
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Destacar link ativo na navegação
    const highlightActiveNavLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    // Listener para scroll
    window.addEventListener('scroll', highlightActiveNavLink);
    
    // Header background no scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(39, 40, 34, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(39, 40, 34, 0.95)';
        }
    });
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica para enviar o formulário
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        
        // Limpar formulário
        contactForm.reset();
    });
}

// Animação dos cards ao hover
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.skill-card, .experience-card, .timeline-content, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth scroll para todos os navegadores
if (!('scrollBehavior' in document.documentElement.style)) {
    // Fallback para navegadores que não suportam scroll-behavior: smooth
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                smoothScrollTo(targetPosition, 800);
            }
        });
    });
}

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        // Easing mais rápido e suave
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
    
    requestAnimationFrame(animation);
}