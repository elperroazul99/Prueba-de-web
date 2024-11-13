document.addEventListener('DOMContentLoaded', () => {
    const restaurantesContainer = document.getElementById('restaurantes');

    fetch('restaurantes.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(restaurante => {
                const restauranteDiv = document.createElement('div');
                restauranteDiv.classList.add('restaurant-profile');
                restauranteDiv.addEventListener('click', () => {
                    window.location.href = `detalle.html?id=${restaurante.id}`;
                });

                const img = document.createElement('img');
                img.src = restaurante.imagen;
                img.alt = restaurante.nombre;

                const nombre = document.createElement('p');
                nombre.textContent = restaurante.nombre;

                restauranteDiv.appendChild(img);
                restauranteDiv.appendChild(nombre);
                restaurantesContainer.appendChild(restauranteDiv);
            });
        })
        .catch(error => console.error('Error al cargar los restaurantes:', error));
});