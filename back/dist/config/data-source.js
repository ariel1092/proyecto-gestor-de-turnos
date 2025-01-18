"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs"); // Importa las variables de entorno definidas en 'envs'
const User_entity_1 = require("../entities/User.entity"); // Entidad User para mapear la tabla de usuarios en la base de datos
const Credentials_1 = require("../entities/Credentials"); // Entidad Credential para mapear las credenciales de usuario
const AppoinmentsEntity_1 = require("../entities/AppoinmentsEntity"); // Entidad Appoinment para mapear las citas en la base de datos
exports.AppDataSource = new typeorm_1.DataSource({
    type: envs_1.env.DB_TYPE, // Tipo de base de datos (PostgreSQL en este caso)
    host: envs_1.env.DB_HOST, // Dirección del host de la base de datos
    port: envs_1.env.DB_PORT ? parseInt(envs_1.env.DB_PORT, 10) : 5432, // Puerto de conexión a la base de datos
    username: envs_1.env.DB_USERNAME, // Nombre de usuario para la conexión
    password: envs_1.env.DB_PASSWORD, // Contraseña para la conexión
    database: envs_1.env.DB_DATABASE, // Nombre de la base de datos a utilizar
    entities: [User_entity_1.User, Credentials_1.Credential, AppoinmentsEntity_1.Appoinment], // Entidades mapeadas a tablas de la base de datos
    logging: false, // Desactiva el registro de consultas SQL
    synchronize: true, // Sincroniza automáticamente la estructura de la base de datos 
    dropSchema: false, // Evita que se eliminen los esquemas existentes en la base de datos
});
