"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerUserService = exports.getUserByIdService = exports.getUserService = void 0;
const data_source_1 = require("../config/data-source");
const credentialService_1 = require("./credentialService");
const User_entity_1 = require("../entities/User.entity");
const userValidation_1 = require("./userValidation");
const User_Repository_1 = require("../repositories/User.Repository");
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_Repository_1.UserRepository.find();
        return users;
    }
    catch (error) {
        throw new Error(`Error al obtener usuarios: ${error instanceof Error ? error.message : error}`);
    }
});
exports.getUserService = getUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield User_Repository_1.UserRepository.findOne({
            where: { id },
            relations: ['appoinments']
        });
        if (!userFound) {
            throw new Error(`El usuario con id: ${id} no fue encontrado`);
        }
        return userFound;
    }
    catch (error) {
        throw new Error(`Error al obtener el usuario con id ${id}: ${error instanceof Error ? error.message : error}`);
    }
});
exports.getUserByIdService = getUserByIdService;
const registerUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Validación antes de la transacción
            yield (0, userValidation_1.validateUserRegistration)(user);
            // Crear credencial y usuario dentro de la transacción
            const idCredentialUser = yield (0, credentialService_1.getCredentialService)(user.username, user.password, transactionalEntityManager);
            const newUser = transactionalEntityManager.create(User_entity_1.User, {
                name: user.name,
                email: user.email,
                birthdate: new Date(user.birthdate),
                nDni: user.nDni,
                credentials: idCredentialUser,
            });
            // Guardar el usuario usando el transactionalEntityManager
            return yield transactionalEntityManager.save(newUser);
        }
        catch (error) {
            throw new Error(`Error al registrar el usuario: ${error instanceof Error ? error.message : error}`);
        }
    }));
});
exports.registerUserService = registerUserService;
const loginUserService = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener el ID de las credenciales si son válidas
    const credentialId = yield (0, credentialService_1.checkUserCredentials)(userCredentials.username, userCredentials.password);
    const userFound = yield User_Repository_1.UserRepository.findOne({
        where: {
            credentials: {
                id: credentialId,
            },
        },
    });
    if (!userFound) {
        throw new Error("Usuario no encontrado");
    }
    // Retornar los datos del usuario si fue encontrado
    return {
        login: true,
        user: Object.assign({}, userFound)
    };
});
exports.loginUserService = loginUserService;
