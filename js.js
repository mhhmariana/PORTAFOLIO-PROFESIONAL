document.addEventListener('DOMContentLoaded', function() {
    'use strict';


    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const backToTopButton = document.querySelector('.back-to-top');
    const contactForm = document.getElementById('contact-form');
    const addEducationBtn = document.getElementById('add-education-btn');
    const profilePic = document.getElementById('profile-pic');
    const skillsSection = document.getElementById('lenguajes');
    const skillBars = document.querySelectorAll('.progress-bar');
    
    
    window.addEventListener('scroll', function() {
        const isScrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', isScrolled);
        if (backToTopButton) {
            backToTopButton.classList.toggle('active', isScrolled);
        }
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });


    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 400);
        });
    }


    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(skillsSection);
    }

    // Dark Mode
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggleBtn.className = 'theme-toggle-btn';
    themeToggleBtn.title = 'Cambiar modo oscuro/claro';
    document.body.appendChild(themeToggleBtn);

    // Guardar preferencias
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Agregar CSS styles
    addStyles();

    updateFooterYear();

    initTypeEffect();

    // Helper functions
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle-btn {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background-color: var(--primary-color);
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                z-index: 999;
                border: none;
                cursor: pointer;
                box-shadow: none;
                transition: var(--transition);
            }
            .theme-toggle-btn:hover {
                background-color: #2a5298;
            }
            .dark-mode {
                background-color: #353230;
                color: #e8d9cb;
            }
            .dark-mode .navbar {
                background-color: #111 !important;
                border-color: #5a4f45;
            }
            .dark-mode .hero-section {
                background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
            }
            .dark-mode .info-card,
            .dark-mode .timeline-content,
            .dark-mode .project-card,
            .dark-mode .interest-card,
            .dark-mode .contact-info,
            .dark-mode .contact-form,
            .dark-mode .technologies-container {
                background-color: #403a34;
                border-color: #5a4f45;
                color: #e8d9cb;
            }
            .dark-mode .bg-light {
                background-color: #1a1a1a !important;
            }
            .dark-mode .text-light {
                color: #ccc !important;
            }
            .dark-mode .personal-info li {
                border-color: #444;
            }
            .dark-mode .project-links a {
                background-color: #444;
                color: #f0f0f0;
            }
            .dark-mode .project-tech span {
                background-color: #444;
                color: #ccc;
            }
            .dark-mode .interest-icon {
                background-color: #444;
            }
            .dark-mode .section-header h2,
            .dark-mode .info-card h3,
            .dark-mode .timeline-content h3,
            .dark-mode .contact-info h3 {
                color: var(--primary-color);
            }
            .dark-mode .form-control {
                background-color: #2a2a2a;
                color: #f0f0f0;
                border-color: #444;
            }
            .dark-mode .form-control:focus {
                background-color: #2a2a2a;
            }
            .dark-mode ::placeholder {
                color: #aaa;
            }
            .dark-mode .editable.editing {
                background-color: #333;
            }
        `;
        document.head.appendChild(style);
    }

    function updateFooterYear() {
        document.querySelectorAll('footer p').forEach(p => {
            if (p.textContent.includes('Todos los derechos reservados')) {
                p.innerHTML = p.innerHTML.replace(/\d{4}/, '<span id="current-year">' + new Date().getFullYear() + '</span>');
            }
        });
    }

    function initTypeEffect() {
        const heroSubtitle = document.querySelector('.hero-text h2');
        if (!heroSubtitle) return;
        
        const phrases = ['Ingeniera Informática'];
        let i = 0;
        let j = 0;
        let currentPhrase = [];
        let isDeleting = false;
        let isEnd = false;
        
        function loop() {
            isEnd = false;
            heroSubtitle.innerHTML = currentPhrase.join('');
            
            if (i < phrases.length) {

                if (isDeleting && currentPhrase.length === 0) {
                    i = (i + 1) % phrases.length;
                    isDeleting = false;
                    j = 0;
                }
                

                if (!isDeleting && j === phrases[i].length) {
                    isEnd = true;
                    isDeleting = true;
                }
                

                if (isDeleting) {
                    currentPhrase.pop();
                } else {
                    currentPhrase.push(phrases[i][j]);
                    j++;
                }
            }
            

            const time = isEnd ? 1500 : isDeleting ? 80 : 120;
            setTimeout(loop, time);
        }
        
        loop();
    }
});