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
exports.cancelAppoinmentService = exports.registerAppoinmentService = exports.getAppoinmentByIdService = exports.getAppoinmentService = void 0;
const AppoinmentInterface_1 = require("../interfaces/AppoinmentInterface");
const Appoinment_Repository_1 = require("../repositories/Appoinment.Repository");
const customError_1 = require("../utils/customError");
const userService_1 = require("./userService");
const getAppoinmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appoinmentsFound = yield Appoinment_Repository_1.AppointmentRepository.find({ relations: ['user'] });
    if (appoinmentsFound.length === 0)
        throw new customError_1.CustomError(404, "No se encontraron citas");
    else
        return appoinmentsFound;
});
exports.getAppoinmentService = getAppoinmentService;
const getAppoinmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appoinmentFound = yield Appoinment_Repository_1.AppointmentRepository.findOne({
        where: {
            id: parseInt(id)
        }
    });
    if (!appoinmentFound) {
        throw new customError_1.CustomError(404, `La cita con el id ${id} no fue encontrada`);
    }
    return appoinmentFound;
});
exports.getAppoinmentByIdService = getAppoinmentByIdService;
const registerAppoinmentService = (appoinmentData) => __awaiter(void 0, void 0, void 0, function* () {
    // Validaciones previas de citas
    Appoinment_Repository_1.AppointmentRepository.validateAllowAppoinment(appoinmentData.date, appoinmentData.time);
    yield Appoinment_Repository_1.AppointmentRepository.validateExistingAppoinment(appoinmentData.userId, new Date(appoinmentData.date), appoinmentData.time);
    // Busca el usuario por su ID
    const user = yield (0, userService_1.getUserByIdService)(appoinmentData.userId);
    if (!user)
        throw new customError_1.CustomError(404, "Usuario no encontrado");
    // Crea la nueva cita asociando el usuario encontrado
    const newAppoinment = Appoinment_Repository_1.AppointmentRepository.create({
        date: appoinmentData.date,
        time: appoinmentData.time,
        user: user,
        status: AppoinmentInterface_1.Status.active,
    });
    return yield Appoinment_Repository_1.AppointmentRepository.save(newAppoinment);
});
exports.registerAppoinmentService = registerAppoinmentService;
const cancelAppoinmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appoinmentFound = yield Appoinment_Repository_1.AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10)
        }
    });
    if (!appoinmentFound) {
        throw new customError_1.CustomError(404, `La cita con el id ${id} no fue encontrada`);
    }
    appoinmentFound.status = AppoinmentInterface_1.Status.cancelled;
    yield Appoinment_Repository_1.AppointmentRepository.save(appoinmentFound);
    return appoinmentFound;
});
exports.cancelAppoinmentService = cancelAppoinmentService;
