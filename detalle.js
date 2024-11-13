document.addEventListener('DOMContentLoaded', () => {
    const detallesContainer = document.getElementById('detalles-restaurante');
    const menuOpciones = document.getElementById('menu-opciones');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const params = new URLSearchParams(window.location.search);
    const restauranteId = params.get('id');

    // Función para alternar el menú lateral
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    fetch('restaurantes.json')
        .then(response => response.json())
        .then(data => {
            const restaurante = data.find(r => r.id === parseInt(restauranteId));
            if (restaurante) {
                // Llenar menú desplegable
                restaurante.menu.forEach(item => {
                    const menuItem = document.createElement('li');
                    menuItem.textContent = item;
                    menuOpciones.appendChild(menuItem);
                });

                // Detalles del restaurante
                const img = document.createElement('img');
                img.src = restaurante.imagen;
                img.alt = restaurante.nombre;

                const nombre = document.createElement('h2');
                nombre.textContent = restaurante.nombre;

                const direccion = document.createElement('p');
                direccion.textContent = `Dirección: ${restaurante.direccion}`;

                const descripcion = document.createElement('p');
                descripcion.textContent = restaurante.descripcion;

                const galeriaTitulo = document.createElement('h3');
                galeriaTitulo.textContent = 'Galería de Productos';

                const galeria = document.createElement('div');
                galeria.classList.add('galeria');

                restaurante.galeria.forEach(src => {
                    const galeriaImg = document.createElement('img');
                    galeriaImg.src = src;
                    galeriaImg.alt = 'Producto del restaurante';
                    galeriaImg.classList.add('galeria-img');
                    galeria.appendChild(galeriaImg);
                });

                detallesContainer.appendChild(img);
                detallesContainer.appendChild(nombre);
                detallesContainer.appendChild(direccion);
                detallesContainer.appendChild(descripcion);
                detallesContainer.appendChild(galeriaTitulo);
                detallesContainer.appendChild(galeria);
            } else {
                detallesContainer.textContent = 'Restaurante no encontrado';
            }
        })
        .catch(error => console.error('Error al cargar los detalles del restaurante:', error));
});