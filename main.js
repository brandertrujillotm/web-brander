/**
 * BRANDER TRUJILLO - Scripts Globales
 * Manejo de navegación, menú responsivo y utilidades interactivas
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Actualizar año en footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Control de Menú Móvil
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navToggleIcon = document.getElementById('navToggleIcon');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');

      // Animación de ícono hamburguesa / X
      if (navToggleIcon) {
        if (!isExpanded) {
          navToggleIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          `;
        } else {
          navToggleIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          `;
        }
      }
    });

    // Cerrar menú móvil al hacer clic en un enlace de navegación
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        navToggle.setAttribute('aria-expanded', 'false');
        if (navToggleIcon) {
          navToggleIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          `;
        }
      });
    });
  }

  // 3. Acordeones para el menú móvil
  const mobileAccordionTriggers = document.querySelectorAll('.mobile-accordion-btn');
  mobileAccordionTriggers.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const icon = button.querySelector('.accordion-chevron');

      if (content) {
        const isOpen = content.classList.contains('open');
        // Cerrar otros acordeones si se desea
        document.querySelectorAll('.accordion-content').forEach(c => {
          if (c !== content) c.classList.remove('open');
        });
        document.querySelectorAll('.accordion-chevron').forEach(i => {
          if (i !== icon) i.style.transform = 'rotate(0deg)';
        });

        if (isOpen) {
          content.classList.remove('open');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          content.classList.add('open');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      }
    });
  });

  // 4. Detección automática del enlace activo en Desktop & Mobile
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('header nav a, #mobileMenu a');

  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.classList.add('text-white');
      link.classList.remove('text-slate-300', 'text-slate-400');
    }
  });
});
