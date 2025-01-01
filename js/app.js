document.addEventListener('DOMContentLoaded', () => {
  console.debug('DEBUG: DOMContentLoaded - Iniciando script principal.');

  /***********************************************
   * A) Navegación de “páginas” (Home, Historia, etc.)
   ***********************************************/
  document.querySelectorAll('.show-page').forEach(button => {
    button.addEventListener('click', () => {
      console.debug('DEBUG: Botón de navegación pulsado.', {
        'data-target': button.getAttribute('data-target')
      });

      const target = button.getAttribute('data-target');
      
      // Ocultamos todas las .page
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });

      // Mostramos solo la .page requerida
      const pageToShow = document.getElementById(target);
      if (pageToShow) {
        pageToShow.classList.add('active');
        console.debug(`DEBUG: Mostrando página: #${target}`);
      } else {
        console.warn(`WARN: La página con id="${target}" no existe en el DOM.`);
      }
    });
  });

  // Opción B: Forzar recarga si se hace clic en la versión
  const versionText = document.getElementById('version-text');
  if (versionText) {
    versionText.addEventListener('click', () => {
      console.debug('DEBUG: Pulsado texto de versión. Recargando página...');
      window.location.reload();
    });
  }

  /***********************************************
   * B) Cargar datos de cócteles (cocteles.json)
   ***********************************************/
  console.debug('DEBUG: Iniciando fetch a cocteles.json...');
  fetch('cocteles.json')
      .then(response => {
          console.debug('DEBUG: Respuesta recibida del servidor:', response);
          if (!response.ok) { // Comprobar si la respuesta fue exitosa (código 200-299)
              throw new Error(`HTTP error! status: ${response.status}`); // Lanzar un error si no lo fue
          }
          return response.json();
      })
      .then(data => {
          console.debug('DEBUG: Datos parseados del JSON:', data);
          const cocteles = data.cocteles;
          if (!cocteles || !Array.isArray(cocteles)) {
              console.error('ERROR: El JSON no tiene la estructura esperada (cocteles debe ser un array).');
              return; // Importante: detener la ejecución si el formato es incorrecto
          }
          console.debug('DEBUG: Llamando a mostrarListaCocteles...');
          mostrarListaCocteles(cocteles);
      })
      .catch(error => {
          console.error('ERROR al cargar o procesar el JSON de cocteles:', error);
          // Mostrar un mensaje al usuario en la página en caso de error
          const detallesDiv = document.getElementById('coctel-detalles');
          if (detallesDiv) {
              detallesDiv.innerHTML = '<p style="color: red;">Error al cargar los cócteles. Por favor, inténtelo de nuevo más tarde.</p>';
          }
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
  console.debug('DEBUG: Ejecutando mostrarListaCocteles...', cocteles);
  const listaDiv = document.getElementById('cocteles-list');
  if (!listaDiv) {
    console.warn('WARN: No se encontró #cocteles-list en el DOM.');
    return;
  }

  cocteles.forEach(coctel => {
    const item = document.createElement('div');
    item.classList.add('coctel-item');
    item.textContent = coctel.nombre;  // Ej: “Margarita”

    // Al hacer clic, mostramos detalles en la columna derecha
    item.addEventListener('click', () => {
      console.debug('DEBUG: Clic en ítem de cóctel:', coctel.nombre);
      mostrarDetallesCoctel(coctel);
    });

    listaDiv.appendChild(item);
  });

  console.debug('DEBUG: Lista de cócteles generada correctamente.');
}

/**
 * Muestra la información del cóctel en la columna derecha (#coctel-detalles).
 */
function mostrarDetallesCoctel(coctel) {
  console.debug('DEBUG: Ejecutando mostrarDetallesCoctel...', coctel);
  const detallesDiv = document.getElementById('coctel-detalles');
  if (!detallesDiv) {
    console.warn('WARN: No se encontró #coctel-detalles en el DOM.');
    return;
  }

  detallesDiv.innerHTML = `
    <h3>${coctel.nombre}</h3>
    <img src="${coctel.imagen}" alt="${coctel.nombre}" style="max-width: 200px;" />
    <p><strong>Método:</strong> ${coctel.metodo}</p>
    <p>${coctel.descripcion}</p>
  `;

  console.debug(`DEBUG: Mostrados detalles del cóctel: ${coctel.nombre}`);
}

