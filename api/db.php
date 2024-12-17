<?php
// db.php - archivo para la conexión a la base de datos

$servername = "localhost";  // Cambia esto si es necesario
$username = "root";         // Cambia esto si es necesario
$password = "";             // Cambia esto si es necesario
$dbname = "bd2";            // El nombre de la base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>

