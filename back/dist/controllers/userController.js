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
const userService_1 = require("../services/userService");
const catchinError_1 = require("../utils/catchinError");
// Controlador para obtener todos los usuarios
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceResponse = yield (0, userService_1.getUserService)();
    res.status(200).json({
        message: "Obtener el listado de todos los usuarios",
        data: serviceResponse,
    });
});
// Controlador para obtener un usuario por ID
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message: "El ID del usuario es requerido",
        });
        return;
    }
    const serviceResponse = yield (0, userService_1.getUserByIdService)(parseInt(id));
    if (!serviceResponse) {
        res.status(404).json({
            message: `No se encontró el usuario con el ID: ${id}`,
        });
        return;
    }
    res.status(200).json({
        serviceResponse,
    });
});
// Controlador para registrar un nuevo usuario
const registerUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({
                message: "El cuerpo de la solicitud no puede estar vacío",
            });
            return;
        }
        const serviceResponse = yield (0, userService_1.registerUserService)(req.body);
        res.status(200).json({
            message: "Registro de un nuevo usuario con éxito",
            data: serviceResponse,
        });
    }
    catch (error) {
        next(error);
    }
});
// Controlador para iniciar sesión
const loginUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(400).json({
                message: "El usuario y la contraseña son obligatorios",
            });
            return;
        }
        const serviceResponse = yield (0, userService_1.loginUserService)(req.body);
        if (!serviceResponse || !serviceResponse.user || !serviceResponse.user.id) {
            res.status(401).json({
                login: false,
                message: "Nombre de usuario o contraseña incorrectos",
            });
            return;
        }
        res.status(200).json({
            login: true,
            user: serviceResponse.user,
        });
    }
    catch (error) {
        next(error); // Manejo de errores usando el siguiente middleware
    }
});
// Exportar los controladores
const userControllers = {
    getUserController: (0, catchinError_1.catchingError)(getUserController),
    getUserByIdController: (0, catchinError_1.catchingError)(getUserByIdController),
    registerUserController: (0, catchinError_1.catchingError)(registerUserController),
    loginUserController: (0, catchinError_1.catchingError)(loginUserController),
};
exports.default = userControllers;
