document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    form.addEventListener('submit', function(event) {
        const contraseña = document.getElementById('contraseña').value;
        const confirmarContraseña = document.getElementById('confirmar_contraseña').value;
        const errorElement = document.getElementById('error');

        if (contraseña !== confirmarContraseña) {
            errorElement.textContent = 'Las contraseñas no coinciden';
            event.preventDefault();
        } else {
            errorElement.textContent = '';
        }
    });
});
