CREATE DATABASE gestor_incidencias

CREATE TABLE incidentes(
    id_incidente SERIAL PRIMARY KEY,
    id_usuario INT  ,
    id_estado INT,
    asunto_incidente VARCHAR(50),
    detalle_incidente VARCHAR(255),
    tipo_incidente VARCHAR(50),
    piso_incidente VARCHAR(2),
    fecha_incidente DATE
);

ALTER TABLE incidentes
ADD CONSTRAINT fk_incidente_usuario
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

ALTER TABLE incidentes
ADD CONSTRAINT fk_incidente_estado
FOREIGN KEY (id_estado) REFERENCES estado_incidente(id_estado);


CREATE TABLE imagen_incidente(
    id_imagen SERIAL PRIMARY KEY,
    id_incidente INT,
    imagen_direccion VARCHAR(300),
);

ALTER TABLE imagen_incidente
ADD CONSTRAINT fk_incidente_imagen
FOREIGN KEY (id_incidente) REFERENCES incidentes(id_incidente);


CREATE TABLE estado_incidente(
    id_estado SERIAL PRIMARY KEY,
    tipo_estado BOOLEAN
);

CREATE TABLE usuario(
    id_usuario SERIAL PRIMARY KEY,
    id_tipo_usuario INT,
    nombre_usuario VARCHAR(10),
    contrasena_usuario VARCHAR(15),
    correo_usuario VARCHAR(50),
    piso_usuario VARCHAR (1),
    numero_habitacion_uuario VARCHAR(10)
);

ALTER TABLE usuario
ADD CONSTRAINT fk_usuario_tipo
FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario);

CREATE TABLE tipo_usuario(
    id_tipo_usuario SERIAL PRIMARY KEY,
    tipo_usuario VARCHAR
);

CREATE TABLE comentario_incidente(
    id_comentario SERIAL PRIMARY KEY,
    id_incidente INT,
    id_usuario INT,
    fecha_comentario DATE,
    comentario_incidente varchar(1000)
);

ALTER TABLE comentario_incidente
ADD CONSTRAINT fk_comentario_usuario
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

ALTER TABLE comentario_incidente
ADD CONSTRAINT fk_comentario_incidente
FOREIGN KEY (id_incidente) REFERENCES incidentes(id_incidente);
