import { DataSource } from 'typeorm';
import { env } from './envs'; // Importa las variables de entorno definidas en 'envs'
import { User } from '../entities/User.entity'; // Entidad User para mapear la tabla de usuarios en la base de datos
import { Credential } from '../entities/Credentials'; // Entidad Credential para mapear las credenciales de usuario
import { Appoinment } from '../entities/AppoinmentsEntity'; // Entidad Appoinment para mapear las citas en la base de datos

export const AppDataSource = new DataSource({

    type:  env.DB_TYPE as "postgres", // Tipo de base de datos (PostgreSQL en este caso)
    host: env.DB_HOST, // Dirección del host de la base de datos
    port: env.DB_PORT ? parseInt(env.DB_PORT, 10) : 5432, // Puerto de conexión a la base de datos
    username: env.DB_USERNAME, // Nombre de usuario para la conexión
    password: env.DB_PASSWORD, // Contraseña para la conexión
    database: env.DB_DATABASE, // Nombre de la base de datos a utilizar
    entities: [User, Credential, Appoinment], // Entidades mapeadas a tablas de la base de datos
    logging: false, // Desactiva el registro de consultas SQL
    synchronize: true, // Sincroniza automáticamente la estructura de la base de datos 
    dropSchema: true, // Evita que se eliminen los esquemas existentes en la base de datos

});
