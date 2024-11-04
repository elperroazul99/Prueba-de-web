<?php
$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "mi_base_de_datos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibir datos del formulario y proteger contra inyecciones SQL
$nombre = $conn->real_escape_string($_POST['nombre']);
$correo = $conn->real_escape_string($_POST['correo']);
$contraseña = $conn->real_escape_string($_POST['contraseña']);
$confirmar_contraseña = $conn->real_escape_string($_POST['confirmar_contraseña']);

// Verificar si las contraseñas coinciden
if ($contraseña !== $confirmar_contraseña) {
    echo "Las contraseñas no coinciden.";
    exit;
}

// Verificar si el nombre de usuario o correo ya existen
$sql = "SELECT * FROM usuarios WHERE nombre = '$nombre' OR correo = '$correo'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "El nombre de usuario o correo ya existen.";
    exit;
}

// Encriptar la contraseña
$contraseña_encriptada = password_hash($contraseña, PASSWORD_DEFAULT);

// Insertar datos en la base de datos
$sql = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES ('$nombre', '$correo', '$contraseña_encriptada')";

if ($conn->query($sql) === TRUE) {
    // Redirigir al usuario a la página de inicio
    header("Location: index.html");
    exit;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>