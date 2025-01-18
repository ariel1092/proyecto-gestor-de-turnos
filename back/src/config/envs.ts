//  Importa la librería dotenv, que permite cargar variables de entorno desde un archivo .env
import dotenv from 'dotenv';

//  Carga las variables de entorno desde el archivo .env en la raíz del proyecto
// El argumento { path: "./.env" } asegura que dotenv busque específicamente el archivo .env en esa ruta
dotenv.config({ path: "./.env" });

/*  Exporta un objeto 'env' que contiene las variables de entorno relacionadas con la base de datos
   - DB_TYPE: Tipo de base de datos (ej. MySQL, PostgreSQL, MongoDB)
   - DB_HOST: Dirección del servidor de la base de datos (ej. localhost, 127.0.0.1)
   - DB_PORT: Puerto en el que la base de datos está escuchando (ej. 3306 para MySQL)
   - DB_USERNAME: Nombre de usuario para conectarse a la base de datos
   - DB_PASSWORD: Contraseña del usuario
   - DB_DATABASE: Nombre de la base de datos específica que se usará
*/
export const env = {
    DB_TYPE: process.env.DB_TYPE || "postgres",         // Tipo de base de datos
    DB_HOST: process.env.DB_HOST,         // Host de la base de datos
    DB_PORT: process.env.DB_PORT || "5432",         // Puerto de conexión
    DB_USERNAME: process.env.DB_USERNAME, // Usuario de la base de datos
    DB_PASSWORD: process.env.DB_PASSWORD, // Contraseña del usuario
    DB_DATABASE: process.env.DB_DATABASE, // Nombre de la base de datos
};

/* Exporta la constante PORT
   - process.env.PORT: Lee el puerto desde las variables de entorno
   - parseInt(process.env.PORT, 10): Convierte el puerto (string) a un número entero
   - Si no hay un puerto definido en el .env, utiliza el valor por defecto 3002
*/
export const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;


