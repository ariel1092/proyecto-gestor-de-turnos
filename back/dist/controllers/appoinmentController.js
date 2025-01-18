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
const appoinmentService_1 = require("../services/appoinmentService");
const catchinError_1 = require("../utils/catchinError");
// Obtener todas las citas
const getAppoinmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceResponse = yield (0, appoinmentService_1.getAppoinmentService)();
    if (!serviceResponse || serviceResponse.length === 0) {
        res.status(404).json({
            message: "No se encontraron turnos disponibles",
        });
        return;
    }
    res.status(200).json({
        message: "Listado de todos los turnos obtenidos con éxito",
        data: serviceResponse,
    });
});
// ✅ Obtener una cita específica por ID
const getAppoinmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message: "El ID del turno es requerido",
        });
        return;
    }
    const serviceResponse = yield (0, appoinmentService_1.getAppoinmentByIdService)(id);
    if (!serviceResponse) {
        res.status(404).json({
            message: `No se encontró ningún turno con el ID: ${id}`,
        });
        return;
    }
    res.status(200).json({
        message: "Detalle del turno obtenido con éxito",
        data: serviceResponse,
    });
});
// ✅ Registrar una nueva cita
const registerAppoinmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).json({
            message: "Los datos para registrar el turno son requeridos",
        });
        return;
    }
    const serviceResponse = yield (0, appoinmentService_1.registerAppoinmentService)(req.body);
    res.status(201).json({
        message: "Turno registrado correctamente",
        data: serviceResponse,
    });
});
// ✅ Cancelar una cita
const cancelAppoinmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message: "El ID del turno es requerido para cancelarlo",
        });
        return;
    }
    const serviceResponse = yield (0, appoinmentService_1.cancelAppoinmentService)(id);
    if (!serviceResponse) {
        res.status(404).json({
            message: `No se encontró el turno con el ID: ${id} para cancelar`,
        });
        return;
    }
    res.status(200).json({
        message: "Turno cancelado exitosamente",
        data: serviceResponse,
    });
});
// ✅ Exportar los controladores con manejo de errores
const appoinmentController = {
    getAppoinmentController: (0, catchinError_1.catchingError)(getAppoinmentController),
    getAppoinmentByIdController: (0, catchinError_1.catchingError)(getAppoinmentByIdController),
    registerAppoinmentController: (0, catchinError_1.catchingError)(registerAppoinmentController),
    cancelAppoinmentController: (0, catchinError_1.catchingError)(cancelAppoinmentController),
};
exports.default = appoinmentController;
