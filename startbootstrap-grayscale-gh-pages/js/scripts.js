/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // FIXED: Flashlight effect (including blended images)
    const flashlightContainers = document.querySelectorAll('.flashlight-container, .blended-image-container');
    flashlightContainers.forEach(container => {
        const img = container.querySelector('.img-fluid, .demo-image, .character-image');
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update CSS custom properties
            container.style.setProperty('--x', `${x}px`);
            container.style.setProperty('--y', `${y}px`);
            
            // Make image brighter in the flashlight area
            if (img) {
                if (container.classList.contains('blended-image-container')) {
                    // Para la imagen difuminada, quitamos el blur y aumentamos el brillo
                    img.style.filter = 'brightness(1.2) blur(0px)';
                } else {
                    img.style.filter = 'brightness(1)';
                }
            }
        });

        container.addEventListener('mouseleave', () => {
            // Reset position off-screen
            container.style.setProperty('--x', '-100px');
            container.style.setProperty('--y', '-100px');
            
            // Make image dark again
            if (img) {
                if (container.classList.contains('blended-image-container')) {
                    // Para la imagen difuminada, restauramos el estado inicial
                    img.style.filter = 'brightness(0.1) blur(2px)';
                } else {
                    img.style.filter = 'brightness(0.1)';
                }
            }
        });
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    });

// Ghost-catching game
    const startGameButton = document.querySelector('a.btn.btn-primary[href="#about"]');
    const gameContainer = document.getElementById('ghost-game-container');
    let ghostInterval;
    let gameActive = false; // Estado del juego

    function createGhost() {
        if (!gameContainer) return;
        const ghost = document.createElement('div');
        ghost.classList.add('ghost');

        const maxWidth = gameContainer.offsetWidth - 100; // 100 is the ghost width
        const maxHeight = gameContainer.offsetHeight - 100; // 100 is the ghost height

        ghost.style.left = `${Math.random() * maxWidth}px`;
        ghost.style.top = `${Math.random() * maxHeight}px`;

        ghost.addEventListener('mouseover', () => {
            ghost.remove();
        });

        gameContainer.appendChild(ghost);
    }

    function clearGhosts() {
        if (!gameContainer) return;
        gameContainer.innerHTML = '';
    }

    if (startGameButton) {
        startGameButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            if (gameActive) {
                // Detener el juego
                clearInterval(ghostInterval);
                clearGhosts();
                gameActive = false;
                startGameButton.textContent = "Start Ghost Game";
            } else {
                // Iniciar el juego
                ghostInterval = setInterval(createGhost, 1000); // A new ghost appears every second
                gameActive = true;
                startGameButton.textContent = "Stop Ghost Game";
                // Also scroll to the about section, as was the original behavior
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    
});