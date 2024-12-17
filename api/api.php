<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite solicitudes desde cualquier dominio
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Incluir el archivo de conexión a la base de datos
include_once 'db.php';  // Asegúrate de que la ruta sea correcta

// Método GET: Obtener todos los artículos
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT codigo, descripcion, precio FROM articulos";
    $result = $conn->query($sql);

    $articulos = array();

    // Verificar si hay resultados
    if ($result->num_rows > 0) {
        // Extraer los datos y agregarlos a un array
        while ($row = $result->fetch_assoc()) {
            $articulos[] = $row;
        }
        // Devolver los datos en formato JSON
        echo json_encode($articulos);
    } else {
        // Si no hay resultados, devolver un array vacío
        echo json_encode([]);
    }
}

// Método POST: Agregar un nuevo artículo
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos del artículo desde el cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->descripcion) && isset($data->precio) && !empty($data->descripcion) && !empty($data->precio)) {
        $descripcion = $conn->real_escape_string($data->descripcion);
        $precio = $conn->real_escape_string($data->precio);

        // Preparar la consulta para insertar el nuevo artículo
        $sql = "INSERT INTO articulos (descripcion, precio) VALUES ('$descripcion', '$precio')";

        if ($conn->query($sql) === TRUE) {
            // Si la inserción fue exitosa, devolver un mensaje de éxito
            echo json_encode(["message" => "Artículo agregado con éxito"]);
        } else {
            // Si hubo un error en la inserción, devolver un mensaje de error
            echo json_encode(["error" => "Hubo un error al agregar el artículo: " . $conn->error]);
        }
    } else {
        // Si faltan datos o los datos son inválidos, devolver un error
        echo json_encode(["error" => "Datos inválidos o incompletos"]);
    }
}

// Método PUT: Actualizar un artículo
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // Obtener los datos enviados por PUT
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->codigo) && isset($data->descripcion) && isset($data->precio)) {
        $codigo = $conn->real_escape_string($data->codigo);
        $descripcion = $conn->real_escape_string($data->descripcion);
        $precio = $conn->real_escape_string($data->precio);

        // Preparar la consulta de actualización
        $sql = "UPDATE articulos SET descripcion='$descripcion', precio='$precio' WHERE codigo='$codigo'";

        if ($conn->query($sql) === TRUE) {
            // Si la actualización fue exitosa, devolver un mensaje de éxito
            echo json_encode(["message" => "Artículo actualizado con éxito"]);
        } else {
            // Si hubo un error en la actualización, devolver un mensaje de error
            echo json_encode(["error" => "Hubo un error al actualizar el artículo: " . $conn->error]);
        }
    } else {
        // Si faltan datos o los datos son inválidos, devolver un error
        echo json_encode(["error" => "Datos inválidos o incompletos"]);
    }
}

// Cerrar la conexión
$conn->close();
?>
