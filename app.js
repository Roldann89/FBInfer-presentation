/* -------------------------------------------------------------
   CONTROLADOR DE LA PRESENTACIÓN INTERACTIVA
   Navegación, Transiciones de Diapositivas, Pestañas e Interfaz
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // ---- SELECTORES DOM ----
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentNumSpan = document.getElementById('current-slide-num');
    const totalNumSpan = document.getElementById('total-slides-num');
    const progressBar = document.getElementById('progress-bar');
    const titleIndicator = document.getElementById('slide-title-indicator');
    
    // Controles Header
    const themeToggle = document.getElementById('theme-toggle');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    // Estado de la Presentación
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    // ---- INICIALIZACIÓN ----
    totalNumSpan.textContent = totalSlides;
    updateUI();

    // ---- FUNCIÓN DE CAMBIO DE DIAPOSITIVA (CON ANIMACIONES) ----
    function goToSlide(targetIndex, direction = 'next') {
        if (targetIndex < 0 || targetIndex >= totalSlides || targetIndex === currentSlideIndex) return;

        const currentSlide = slides[currentSlideIndex];
        const targetSlide = slides[targetIndex];

        // Remover clases previas de animación
        slides.forEach(slide => {
            slide.className = 'slide';
        });

        // Configurar dirección del efecto
        if (direction === 'next') {
            currentSlide.classList.add('exit-left');
            targetSlide.classList.add('active');
        } else {
            currentSlide.classList.add('exit-right');
            targetSlide.classList.add('active');
            // Como viene del lado izquierdo, podemos forzar un reflow para asegurar transiciones
            targetSlide.getBoundingClientRect();
        }

        // Actualizar índice actual
        currentSlideIndex = targetIndex;

        // Actualizar componentes UI
        updateUI();
    }

    // ---- ACTUALIZACIÓN DE INTERFAZ ----
    function updateUI() {
        // 1. Números del Contador
        currentNumSpan.textContent = currentSlideIndex + 1;

        // 2. Barra de Progreso
        const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // 3. Habilitar/Deshabilitar botones
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;

        // 4. Indicador del título de la diapositiva en el Header
        const currentSlide = slides[currentSlideIndex];
        const slideTitle = currentSlide.getAttribute('data-title') || 'Presentación';
        titleIndicator.textContent = slideTitle;

        // Micro-animación de aparición para elementos dentro de la diapositiva
        const content = currentSlide.querySelector('.slide-content');
        if (content) {
            content.style.animation = 'none';
            // Trigger reflow
            content.offsetHeight;
            content.style.animation = 'fadeInContent 0.8s ease forwards';
        }
    }

    // ---- HANDLERS DE EVENTOS DE NAVEGACIÓN ----
    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            goToSlide(currentSlideIndex + 1, 'next');
        }
    }

    function prevSlide() {
        if (currentSlideIndex > 0) {
            goToSlide(currentSlideIndex - 1, 'prev');
        }
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // ---- CONTROL POR TECLADO ----
    document.addEventListener('keydown', (e) => {
        // Impedir comportamiento por defecto en espacio para evitar saltos de pantalla
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
        }

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'Backspace':
            case 'PageUp':
                prevSlide();
                break;
            case 'Home':
                goToSlide(0, 'prev');
                break;
            case 'End':
                goToSlide(totalSlides - 1, 'next');
                break;
        }
    });

    // ---- TEMA OSCURO / CLARO ----
    // Comprobar preferencia previa guardada
    const savedTheme = localStorage.getItem('pref-theme');
    if (savedTheme === 'light') {
        document.body.className = 'light-theme';
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.className = 'light-theme';
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('pref-theme', 'light');
        } else {
            document.body.className = 'dark-theme';
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('pref-theme', 'dark');
        }
    });

    // ---- COMPORTAMIENTO PANTALLA COMPLETA ----
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .then(() => {
                    fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
                })
                .catch((err) => {
                    console.error(`Error al intentar pantalla completa: ${err.message}`);
                });
        } else {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
        }
    });

    // Escuchar cambios de pantalla completa iniciados por tecla ESC del navegador
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
        } else {
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        }
    });

    // ---- PESTAÑAS INTERACTIVAS (DEMO DE CÓDIGO - SLIDE 8) ----
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Quitar clase activa de botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Quitar clase activa de contenidos
            tabContents.forEach(content => content.classList.remove('active'));

            // Agregar clase activa al botón actual
            button.classList.add('active');
            // Activar el contenedor de la demo elegida
            document.getElementById(targetTab).classList.add('active');
        });
    });
});
