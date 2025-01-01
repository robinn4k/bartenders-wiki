// wiki.js (type="module" si prefieres)
document.addEventListener('DOMContentLoaded', () => {
  // Al hacer clic en cualquier elemento con .show-page
  document.querySelectorAll('.show-page').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      
      // Ocultar todas las páginas
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });

      // Mostrar solo la página requerida
      document.getElementById(target).classList.add('active');
    });
  });

  // Opcional: Forzar recarga al hacer clic en #version-text
  const versionText = document.getElementById('version-text');
  if (versionText) {
    versionText.addEventListener('click', () => {
      // Forzar recarga (por si hay cambios)
      window.location.reload();
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  // Cargamos el archivo cocteles.json
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

// Genera <li> con <a> para cada cóctel en el submenú
function generarSubmenuCocteles(cocteles) {
  const lista = document.getElementById('lista-cocteles');
  cocteles.forEach(coctel => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';               // Evita saltar de página
    a.dataset.coctel = coctel.id; // Para identificar cuál mostrar
    a.textContent = coctel.nombre;

    li.appendChild(a);
    lista.appendChild(li);
  });
}

// Genera un <div> por cada cóctel (sección de receta), inicialmente oculto
function generarSeccionesCocteles(cocteles) {
  const contenedor = document.getElementById('contenedor-cocteles');
  cocteles.forEach(coctel => {
    const subpage = document.createElement('div');
    subpage.classList.add('subpage', 'hidden'); // .hidden => display:none
    subpage.id = coctel.id;

    // Título del cóctel
    const h3 = document.createElement('h3');
    h3.textContent = coctel.nombre;

    // Imagen
    const img = document.createElement('img');
    img.src = coctel.imagen;
    img.alt = coctel.nombre;
    img.style.maxWidth = '200px';

    // Método
    const pMetodo = document.createElement('p');
    pMetodo.innerHTML = `<strong>Método:</strong> ${coctel.metodo}`;

    // Descripción
    const pDesc = document.createElement('p');
    pDesc.textContent = coctel.descripcion;

    // Agregamos todo al div
    subpage.appendChild(h3);
    subpage.appendChild(img);
    subpage.appendChild(pMetodo);
    subpage.appendChild(pDesc);

    // Metemos el subpage en el contenedor
    contenedor.appendChild(subpage);
  });
}

// Lógica para mostrar/ocultar cada cóctel al hacer clic en el submenú
function activarLogicaSubmenu() {
  const links = document.querySelectorAll('#lista-cocteles a');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const coctelId = link.dataset.coctel; // Ej: "margarita", "mojito", etc.

      // Ocultamos todas las subpages
      document.querySelectorAll('.subpage').forEach(div => {
        div.classList.add('hidden');
      });

      // Mostramos solo el coctel correspondiente
      const coctelDiv = document.getElementById(coctelId);
      if (coctelDiv) {
        coctelDiv.classList.remove('hidden');
      }
    });
  });
}