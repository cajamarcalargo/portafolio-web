/* ==========================================================================
   INTERACTIVIDAD DEL PORTAFOLIO WEB
   Autor: Alexis David Cajamarca Largo
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. TEMA CLARO / OSCURO (CON PERSISTENCIA EN LOCALSTORAGE)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlRoot = document.documentElement;

  // Cargar tema guardado o usar 'dark' por defecto
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // --------------------------------------------------------------------------
  // 2. MENÚ RESPONSIVE (HAMBURGUESA)
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar menú al hacer clic en un enlace de navegación
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. FILTRADO DINÁMICO DE PROYECTOS POR CATEGORÍA
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. BOTÓN FLOTANTE "VOLVER ARRIBA"
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. VALIDACIÓN DEL FORMULARIO DE CONTACTO EN TIEMPO REAL
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formFeedback = document.getElementById('formFeedback');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(input, isValid, errorSpanId) {
      const errorSpan = document.getElementById(errorSpanId);
      if (!isValid) {
        input.classList.add('is-invalid');
        if (errorSpan) errorSpan.classList.add('show');
        return false;
      } else {
        input.classList.remove('is-invalid');
        if (errorSpan) errorSpan.classList.remove('show');
        return true;
      }
    }

    nameInput?.addEventListener('input', () => {
      validateField(nameInput, nameInput.value.trim().length >= 3, 'nameError');
    });

    emailInput?.addEventListener('input', () => {
      validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'emailError');
    });

    subjectInput?.addEventListener('input', () => {
      validateField(subjectInput, subjectInput.value.trim().length >= 4, 'subjectError');
    });

    messageInput?.addEventListener('input', () => {
      validateField(messageInput, messageInput.value.trim().length >= 10, 'messageError');
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 3, 'nameError');
      const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'emailError');
      const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length >= 4, 'subjectError');
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10, 'messageError');

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        if (formFeedback) {
          formFeedback.textContent = '¡Mensaje validado con éxito! Gracias por ponerte en contacto.';
          formFeedback.className = 'form-feedback success';
          formFeedback.style.display = 'block';
        }
        contactForm.reset();

        setTimeout(() => {
          if (formFeedback) formFeedback.style.display = 'none';
        }, 5000);
      }
    });
  }

});