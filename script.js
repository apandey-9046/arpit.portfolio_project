document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);

    updateToggleButton(currentTheme);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            updateToggleButton(newTheme);

            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }

    function updateToggleButton(theme) {
        const sunIcon = darkModeToggle.querySelector('.sun-icon');
        const moonIcon = darkModeToggle.querySelector('.moon-icon');

        if (theme === 'dark') {
            sunIcon.style.opacity = '0';
            sunIcon.style.transform = 'rotate(180deg)';
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'rotate(0deg)';
        } else {
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'rotate(0deg)';
            moonIcon.style.opacity = '0';
            moonIcon.style.transform = 'rotate(-180deg)';
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            closeMobileMenu();

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    });



    // Mobile menu toggle
    const navbarToggle = document.getElementById('navbarToggle');
    const mainNavbar = document.getElementById('mainNavbar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    function toggleMobileMenu() {
        if (mainNavbar) {
            mainNavbar.classList.toggle('active');
        }
        if (hamburgerMenu) {
            hamburgerMenu.classList.toggle('active');
        }
    }

    function closeMobileMenu() {
        if (mainNavbar && mainNavbar.classList.contains('active')) {
            mainNavbar.classList.remove('active');
        }
        if (hamburgerMenu && hamburgerMenu.classList.contains('active')) {
            hamburgerMenu.classList.remove('active');
        }
    }

    if (navbarToggle && mainNavbar) {
        navbarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNavbar.contains(event.target) || navbarToggle.contains(event.target);
            if (!isClickInsideNav && mainNavbar.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Simple contact form
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = contactForm.elements['name'].value.trim();
            const email = contactForm.elements['email'].value.trim();
            const message = contactForm.elements['message'].value.trim();

            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Submit form
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showFormMessage('Thank you! Your message has been sent.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(data.message || 'Submission failed.');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showFormMessage('Oops! Something went wrong. Please try again later.', 'error');
            });
        });

        function showFormMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = type;
            formMessage.style.display = 'block';

            if (type === 'success') {
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        }
    }

});