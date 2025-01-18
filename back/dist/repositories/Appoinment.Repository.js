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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
// import { Repository } from "typeorm";
const moment_1 = __importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const AppoinmentsEntity_1 = require("../entities/AppoinmentsEntity");
const data_source_1 = require("../config/data-source");
exports.AppointmentRepository = data_source_1.AppDataSource.getRepository(AppoinmentsEntity_1.Appoinment).extend({
    // Validación para permitir solo un turno por usuario por día
    validateAllowAppoinment: function (date, time) {
        const appoinmentDateTime = (0, moment_1.default)(date).set({
            hour: parseInt(time.split(":")[0]),
            minute: parseInt(time.split(":")[1]),
            second: 0,
            millisecond: 0,
        }).local(); // Asegura que la fecha y hora se ajusten a la zona horaria local
        const now = (0, moment_1.default)().local();
        const appoinmentDateArg = (0, moment_1.default)(appoinmentDateTime);
        // Validar que no se permita agendar citas para fechas pasadas
        if (appoinmentDateArg.isBefore(now)) {
            throw new Error("No se pueden agendar citas para fechas pasadas");
        }
        // Validar que solo se agenden citas de lunes a viernes
        const dayOfWeek = appoinmentDateTime.day(); // 0: Domingo, 1: Lunes, ..., 6: Sábado
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new Error("No se puede agendar citas los fines de semana");
        }
        // Validar que la cita esté dentro del horario permitido (10:00 a 19:00)
        const hour = appoinmentDateTime.hour();
        if (hour < 10 || hour > 19) {
            throw new Error("Las citas deben agendarse entre las 10:00 y las 19:00");
        }
        // Validar que la cita se agende en horas exactas del horario de atención
        if (appoinmentDateTime.minute() !== 0) {
            throw new Error("Las citas solo se pueden agendar en horas exactas (ej. 10:00, 11:00)");
        }
    },
    // Validación para asegurarse de que un usuario no tenga más de un turno por día
    validateExistingAppoinment: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const appoinmentDateTime = (0, moment_1.default)(date).set({
                hour: parseInt(time.split(":")[0]),
                minute: parseInt(time.split(":")[1]),
                second: 0,
                millisecond: 0,
            }).local(); // Ajusta la zona horaria si es necesario
            // Obtener el inicio y fin del día de la fecha proporcionada
            const startOfDay = appoinmentDateTime.startOf('day').toDate();
            const endOfDay = appoinmentDateTime.endOf('day').toDate();
            // Buscar si ya existe una cita del usuario en ese día
            const existingAppoinment = yield this.findOne({
                where: {
                    user: { id: userId }, // Relación entre Appointment y User
                    date: (0, typeorm_1.Between)(startOfDay, endOfDay), // Rango de la fecha (todo el día)
                },
            });
            // Lanzar error si ya hay una cita para ese día
            if (existingAppoinment) {
                throw new Error("El usuario ya tiene una cita agendada para este día");
            }
        });
    }
});
