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
      // Aquí llamamos a la función que genera la lista en la izquierda
      mostrarListaCocteles(cocteles);
    })
    .catch(error => {
      console.error('Error al cargar el JSON de cocteles:', error);
    });
});

/****************************************************
 * FUNCIONES PARA MOSTRAR LISTA IZQUIERDA + DETALLE
 ****************************************************/

/**
 * Muestra la lista de cócteles en la columna izquierda (#cocteles-list).
 * Cada ítem, al hacer clic, llama a mostrarDetallesCoctel().
 */
function mostrarListaCocteles(cocteles) {
  const listaDiv = document.getElementById('cocteles-list');
  if (!listaDiv) return;  // Si no existe en el HTML, salimos

  cocteles.forEach(coctel => {
    const item = document.createElement('div');
    item.classList.add('coctel-item');
    item.textContent = coctel.nombre;  // Ej: “Margarita”

    // Al hacer clic, mostramos detalles en la columna derecha
    item.addEventListener('click', () => {
      mostrarDetallesCoctel(coctel);
    });

    listaDiv.appendChild(item);
  });
}

/**
 * Muestra la información del cóctel en la columna derecha (#coctel-detalles).
 */
function mostrarDetallesCoctel(coctel) {
  const detallesDiv = document.getElementById('coctel-detalles');
  if (!detallesDiv) return;

  detallesDiv.innerHTML = `
    <h3>${coctel.nombre}</h3>
    <img src="${coctel.imagen}" alt="${coctel.nombre}" style="max-width: 200px;" />
    <p><strong>Método:</strong> ${coctel.metodo}</p>
    <p>${coctel.descripcion}</p>
  `;
}

/****************************************************
 * FUNCIONES “submenú” y “subpages” (OPCIONALES, NO USADAS)
 ****************************************************/

/* 
// Si prefieres un enfoque de submenú + secciones ocultas, 
// puedes usar (pero ya no las llamas en el .then):

function generarSubmenuCocteles(cocteles) { ... }
function generarSeccionesCocteles(cocteles) { ... }
function activarLogicaSubmenu() { ... }
*/
