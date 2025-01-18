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
exports.validateUserRegistration = void 0;
const User_Repository_1 = require("../repositories/User.Repository");
const validateUserRegistration = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        throw new Error("La contraseña es requerida.");
    }
    // Validar si ya existe un usuario con el mismo email o DNI
    const existingUser = yield User_Repository_1.UserRepository.findOne({
        where: [
            { email: user.email },
            { nDni: user.nDni },
        ],
    });
    if (existingUser) {
        throw new Error("Ya existe un usuario con el mismo email o DNI.");
    }
});
exports.validateUserRegistration = validateUserRegistration;
