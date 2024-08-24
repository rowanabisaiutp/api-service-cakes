CREATE DATABASE b6wgyasdaiel99focqri;
USE b6wgyasdaiel99focqri;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contrasena VARCHAR(255),
    telefono VARCHAR(20),
    direccion TEXT,
    rol_id INT,
    fecha_registro DATETIME,
    activo BOOLEAN,
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id)
);

ALTER TABLE Usuarios
ADD COLUMN foto_perfil VARCHAR(255);

-- Tabla Roles
CREATE TABLE Roles (
    rol_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    descripcion TEXT
);

-- Tabla Permisos
CREATE TABLE Permisos (
    permiso_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    descripcion TEXT
);

-- Tabla Roles_Permisos
CREATE TABLE Roles_Permisos (
    rol_id INT,
    permiso_id INT,
    PRIMARY KEY (rol_id, permiso_id),
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id),
    FOREIGN KEY (permiso_id) REFERENCES Permisos(permiso_id)
);

-- Tabla Categorias
CREATE TABLE Categorias (
    categoria_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    descripcion TEXT
);

-- Tabla Pasteles
CREATE TABLE Pasteles (
    pastel_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10,2),
    disponibilidad INT,
    vendedor_id INT,
    categoria_id INT,
    fecha_publicacion DATETIME,
    FOREIGN KEY (vendedor_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (categoria_id) REFERENCES Categorias(categoria_id)
);

-- Tabla Imagenes_Pasteles
CREATE TABLE Imagenes_Pasteles (
    imagen_id INT PRIMARY KEY AUTO_INCREMENT,
    pastel_id INT,
    url VARCHAR(255),
    descripcion TEXT,
    FOREIGN KEY (pastel_id) REFERENCES Pasteles(pastel_id)
);

-- Tabla Ingredientes
CREATE TABLE Ingredientes (
    ingrediente_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion TEXT
);

-- Tabla Pasteles_Ingredientes
CREATE TABLE Pasteles_Ingredientes (
    pastel_id INT,
    ingrediente_id INT,
    PRIMARY KEY (pastel_id, ingrediente_id),
    FOREIGN KEY (pastel_id) REFERENCES Pasteles(pastel_id),
    FOREIGN KEY (ingrediente_id) REFERENCES Ingredientes(ingrediente_id)
);

-- Tabla Pedidos
CREATE TABLE Pedidos (
    pedido_id INT PRIMARY KEY AUTO_INCREMENT,
    comprador_id INT,
    total DECIMAL(10,2),
    fecha_pedido DATETIME,
    estado ENUM('pendiente', 'procesando', 'completado', 'cancelado'),
    direccion_envio TEXT,
    metodo_envio ENUM('recojo en tienda', 'domicilio'),
    fecha_entrega DATETIME,
    FOREIGN KEY (comprador_id) REFERENCES Usuarios(usuario_id)
);

-- Tabla Detalles_Pedido
CREATE TABLE Detalles_Pedido (
    detalle_id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT,
    pastel_id INT,
    cantidad INT,
    precio DECIMAL(10,2),
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(pedido_id),
    FOREIGN KEY (pastel_id) REFERENCES Pasteles(pastel_id)
);

-- Tabla Comentarios
CREATE TABLE Comentarios (
    comentario_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    pastel_id INT,
    comentario TEXT,
    calificacion INT,
    fecha_comentario DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (pastel_id) REFERENCES Pasteles(pastel_id)
);

-- Tabla Pagos
CREATE TABLE Pagos (
    pago_id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT,
    monto DECIMAL(10,2),
    metodo_pago ENUM('tarjeta', 'paypal', 'transferencia'),
    estado ENUM('exitoso', 'fallido', 'pendiente'),
    fecha_pago DATETIME,
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(pedido_id)
);

-- Tabla Favoritos
CREATE TABLE Favoritos (
    favorito_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    pastel_id INT,
    fecha_agregado DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (pastel_id) REFERENCES Pasteles(pastel_id)
);

-- Tabla Carritos
CREATE TABLE Carritos (
    carrito_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    fecha_creacion DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabla Carritos_Pasteles
CREATE TABLE Carritos_Pasteles (
    carrito_id INT,
    pastel_id INT,
    cantidad INT,
    PRIMARY KEY (carrito_id, pastel_id),
    FOREIGN KEY (carrito_id) REFERENCES Carritos(carrito_id),
    FOREIGN KEY (pastel_id) REFERENCES Pasteles(pastel_id)
);

-- Tabla Descuentos
CREATE TABLE Descuentos (
    descuento_id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) UNIQUE,
    descripcion TEXT,
    descuento DECIMAL(5,2),
    fecha_inicio DATETIME,
    fecha_fin DATETIME
);

-- Tabla Pasteles_Descuentos
CREATE TABLE Pasteles_Descuentos (
    pastel_id INT,
    descuento_id INT,
    PRIMARY KEY (pastel_id, descuento_id),
    FOREIGN KEY (pastel_id) REFERENCES Pasteles(pastel_id),
    FOREIGN KEY (descuento_id) REFERENCES Descuentos(descuento_id)
);

-- Tabla Tokens
CREATE TABLE Tokens (
    token_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    token VARCHAR(255),
    fecha_creacion DATETIME,
    fecha_expiracion DATETIME,
    activo BOOLEAN,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabla Intentos_Login
CREATE TABLE Intentos_Login (
    intento_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    fecha_intento DATETIME,
    exitoso BOOLEAN,
    direccion_ip VARCHAR(45),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabla Historial_Acceso
CREATE TABLE Historial_Acceso (
    acceso_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    fecha_acceso DATETIME,
    direccion_ip VARCHAR(45),
    navegador VARCHAR(100),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabla Reset_Password_Tokens
CREATE TABLE Reset_Password_Tokens (
    reset_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    token VARCHAR(255),
    fecha_creacion DATETIME,
    fecha_expiracion DATETIME,
    usado BOOLEAN,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Insertando datos en la tabla Roles
INSERT INTO Roles (nombre, descripcion) VALUES
('comprador', 'Usuario que compra pasteles'),
('vendedor', 'Usuario que vende pasteles'),
('admin', 'Administrador del sistema');

-- Insertando datos en la tabla Permisos
INSERT INTO Permisos (nombre, descripcion) VALUES
('crear_pastel', 'Permiso para crear un pastel'),
('editar_pastel', 'Permiso para editar un pastel'),
('eliminar_pastel', 'Permiso para eliminar un pastel'),
('ver_pastel', 'Permiso para ver pasteles'),
('gestionar_usuarios', 'Permiso para gestionar usuarios');

-- Relacionando Roles con Permisos en la tabla Roles_Permisos
INSERT INTO Roles_Permisos (rol_id, permiso_id) VALUES
(2, 1), -- Vendedor puede crear pasteles
(2, 2), -- Vendedor puede editar pasteles
(2, 3), -- Vendedor puede eliminar pasteles
(2, 4), -- Vendedor puede ver pasteles
(1, 4), -- Comprador puede ver pasteles
(3, 5); -- Admin puede gestionar usuarios

-- Insertando datos en la tabla Usuarios
INSERT INTO Usuarios (nombre, email, contrasena, telefono, direccion, rol_id, fecha_registro, activo) VALUES
('Juan Perez', 'juan@example.com', 'hashedpassword1', '1234567890', 'Calle Falsa 123', 1, NOW(), TRUE),
('Maria Lopez', 'maria@example.com', 'hashedpassword2', '0987654321', 'Avenida Siempre Viva 456', 2, NOW(), TRUE),
('Admin', 'admin@example.com', 'hashedpassword3', '1112223333', 'Central', 3, NOW(), TRUE);

-- Insertando datos en la tabla Categorias
INSERT INTO Categorias (nombre, descripcion) VALUES
('Chocolate', 'Pasteles de chocolate'),
('Vainilla', 'Pasteles de vainilla'),
('Frutas', 'Pasteles con frutas');

-- Insertando datos en la tabla Ingredientes
INSERT INTO Ingredientes (nombre, descripcion) VALUES
('Harina', 'Harina de trigo'),
('Azúcar', 'Azúcar refinada'),
('Chocolate', 'Cacao puro'),
('Vainilla', 'Extracto de vainilla'),
('Fresas', 'Fresas frescas');

-- Insertando datos en la tabla Descuentos
INSERT INTO Descuentos (codigo, descripcion, descuento, fecha_inicio, fecha_fin) VALUES
('DESC10', 'Descuento del 10%', 10.00, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
('DESC15', 'Descuento del 15%', 15.00, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY));
