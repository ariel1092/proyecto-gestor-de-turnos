
// import { Repository } from "typeorm";
import moment from 'moment';
import { Between } from 'typeorm';
import { Appoinment } from '../entities/AppoinmentsEntity';
import { AppDataSource } from '../config/data-source';

export const AppointmentRepository = AppDataSource.getRepository(Appoinment).extend({

  // Validación para permitir solo un turno por usuario por día
  validateAllowAppoinment: function (date: Date, time: string): void {
    const appoinmentDateTime = moment(date).set({
      hour: parseInt(time.split(":")[0]),
      minute: parseInt(time.split(":")[1]),
      second: 0,
      millisecond: 0,
    }).local();  // Asegura que la fecha y hora se ajusten a la zona horaria local

    const now = moment().local();  
    const appoinmentDateArg = moment(appoinmentDateTime);

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
  validateExistingAppoinment: async function (userId: number, date: Date, time: string): Promise<void> {
    const appoinmentDateTime = moment(date).set({
      hour: parseInt(time.split(":")[0]),
      minute: parseInt(time.split(":")[1]),
      second: 0,
      millisecond: 0,
    }).local();  // Ajusta la zona horaria si es necesario

    // Obtener el inicio y fin del día de la fecha proporcionada
    const startOfDay = appoinmentDateTime.startOf('day').toDate();
    const endOfDay = appoinmentDateTime.endOf('day').toDate();

    // Buscar si ya existe una cita del usuario en ese día
    const existingAppoinment = await this.findOne({
      where: {
        user: { id: userId }, // Relación entre Appointment y User
        date: Between(startOfDay, endOfDay), // Rango de la fecha (todo el día)
      },
    });

    // Lanzar error si ya hay una cita para ese día
    if (existingAppoinment) {
      throw new Error("El usuario ya tiene una cita agendada para este día");
    }
  }
});
