document.addEventListener('DOMContentLoaded', () => {
  /***********************************************
   * A) Navegación de “páginas” (Home, Historia, etc.)
   ***********************************************/
  document.querySelectorAll('.show-page').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      
      // Ocultamos todas las .page
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });

      // Mostramos solo la .page requerida
      const pageToShow = document.getElementById(target);
      if (pageToShow) {
        pageToShow.classList.add('active');
      }
    });
  });

  // Opción B: Forzar recarga si se hace clic en la versión
  const versionText = document.getElementById('version-text');
  if (versionText) {
    versionText.addEventListener('click', () => {
      window.location.reload();
    });
  }

  /***********************************************
   * B) Cargar datos de cócteles (cocteles.json)
   ***********************************************/
  fetch('cocteles.json')
    .then(response => response.json())
    .then(data => {
      const cocteles = data.cocteles;
      generarSubmenuCocteles(cocteles);
      generarSeccionesCocteles(cocteles);
      activarLogicaSubmenu();
    })
    .catch(error => {
      console.error('Error al cargar el JSON de cocteles:', error);
    });
});

/****************************************************
 * FUNCIONES AUXILIARES PARA GENERAR LISTAS Y SECCIONES
 ****************************************************/

/**
 * Genera <li><a> en el <ul id="lista-cocteles">
 * para cada cóctel presente en el JSON
 */
function generarSubmenuCocteles(cocteles) {
  // Asegurarnos de que existe <ul id="lista-cocteles">
  const lista = document.getElementById('lista-cocteles');
  if (!lista) return; // Si no existe, salimos

  cocteles.forEach(coctel => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    a.href = '#'; 
    a.dataset.coctel = coctel.id;   // "margarita", "mojito", etc.
    a.textContent = coctel.nombre;  // El nombre del cóctel

    li.appendChild(a);
    lista.appendChild(li);
  });
}

/**
 * Genera un <div class="subpage hidden"> para
 * cada cóctel en el <div id="contenedor-cocteles">
 */
function generarSeccionesCocteles(cocteles) {
  // Asegurarnos de que existe <div id="contenedor-cocteles">
  const contenedor = document.getElementById('contenedor-cocteles');
  if (!contenedor) return;

  cocteles.forEach(coctel => {
    const subpage = document.createElement('div');
    subpage.classList.add('subpage', 'hidden'); 
    subpage.id = coctel.id; // "margarita", "mojito", "martini", etc.

    // Título
    const h3 = document.createElement('h3');
    h3.textContent = coctel.nombre;

    // Imagen
    const img = document.createElement('img');
    img.src = coctel.imagen;   // e.g. "img/margarita.jpg"
    img.alt = coctel.nombre;
    img.style.maxWidth = '200px';

    // Método
    const pMetodo = document.createElement('p');
    pMetodo.innerHTML = `<strong>Método:</strong> ${coctel.metodo}`;

    // Descripción
    const pDesc = document.createElement('p');
    pDesc.textContent = coctel.descripcion;

    // Armamos el subpage
    subpage.appendChild(h3);
    subpage.appendChild(img);
    subpage.appendChild(pMetodo);
    subpage.appendChild(pDesc);

    // Lo anexamos al contenedor principal
    contenedor.appendChild(subpage);
  });
}

/**
 * Asigna los listeners para mostrar/ocultar
 * la subpage correspondiente al hacer clic
 * en un enlace del submenú
 */
function activarLogicaSubmenu() {
  const links = document.querySelectorAll('#lista-cocteles a');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const coctelId = link.dataset.coctel;

      // Ocultamos todas las subpages
      document.querySelectorAll('.subpage').forEach(div => {
        div.classList.add('hidden');
      });
      // Mostramos la subpage de este cóctel
      const coctelDiv = document.getElementById(coctelId);
      if (coctelDiv) {
        coctelDiv.classList.remove('hidden');
      }
    });
  });
}
