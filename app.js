// Esperamos a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos todos los enlaces del menú que tengan data-section
    const menuLinks = document.querySelectorAll('nav a[data-section]');
    
    // Escuchamos el evento click en cada enlace
    menuLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        // Identificamos la sección que se desea mostrar
        const sectionId = link.getAttribute('data-section');
        
        // Ocultamos todas las secciones
        document.querySelectorAll('main section').forEach(sec => {
          sec.classList.add('hidden');
        });
        
        // Mostramos solo la sección correspondiente
        document.getElementById(sectionId).classList.remove('hidden');
      });
    });
  });
  