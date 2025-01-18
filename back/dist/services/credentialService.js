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
exports.checkUserCredentials = exports.getCredentialService = void 0;
const Credentials_1 = require("../entities/Credentials");
const crypto_1 = require("crypto"); // Asegúrate de tener 'crypto' instalado o usar el built-in de Node.js.
const Credential_repository_1 = require("../repositories/Credential.repository");
// Función para hashear la contraseña
const cryPass = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        (0, crypto_1.scrypt)(pass, 'fixed_salt', 64, (err, derivedKey) => {
            if (err)
                reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
});
// Verificar si el usuario ya existe
const checkUserExist = (username_1, ...args_1) => __awaiter(void 0, [username_1, ...args_1], void 0, function* (username, entityManager = Credential_repository_1.CredentialRepository.manager) {
    const credentialFound = yield entityManager.findOne(Credentials_1.Credential, { where: { username } });
    if (credentialFound)
        throw new Error(`El usuario con username: ${username} ya existe, intente con un nuevo usuario`);
});
// Función para obtener y guardar la credencial
const getCredentialService = (username_1, password_1, ...args_1) => __awaiter(void 0, [username_1, password_1, ...args_1], void 0, function* (username, password, entityManager = Credential_repository_1.CredentialRepository.manager) {
    yield checkUserExist(username, entityManager);
    const passwordEncrypted = yield cryPass(password); // Hashear la contraseña sin salt
    const objetoCredencial = entityManager.create(Credentials_1.Credential, {
        username,
        password: passwordEncrypted,
        // Eliminar la línea del salt
    });
    return yield entityManager.save(objetoCredencial);
});
exports.getCredentialService = getCredentialService;
// Verificar las credenciales del usuario
const checkUserCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Buscar el usuario por username
    const credentialFound = yield Credential_repository_1.CredentialRepository.findOne({
        where: { username }
    });
    if (!credentialFound)
        throw new Error('Usuario o contraseña incorrectos');
    else {
        const passwordEncrypted = yield cryPass(password);
        if ((credentialFound === null || credentialFound === void 0 ? void 0 : credentialFound.password) != passwordEncrypted)
            throw new Error('Usuario o contraseña incorrectos');
        else
            return credentialFound.id;
    }
});
exports.checkUserCredentials = checkUserCredentials;
