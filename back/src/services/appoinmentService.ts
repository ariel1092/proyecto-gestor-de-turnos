import { AppoinmentRegisterDto } from "../dto/appoinmentDto";
import { Appoinment } from "../entities/AppoinmentsEntity";
import { Status } from "../interfaces/AppoinmentInterface";
import { AppointmentRepository } from "../repositories/Appoinment.Repository";
import { CustomError } from "../utils/customError";
import { getUserByIdService } from "./userService";

export const getAppoinmentService = async (): Promise<Appoinment[]> => {
const appoinmentsFound =  await AppointmentRepository.find( { relations:['user']})
  if(appoinmentsFound.length === 0) throw new CustomError(404,"No se encontraron citas")
    else return appoinmentsFound
}

export const getAppoinmentByIdService = async (
  id: string
): Promise<Appoinment | null> => {
  const appoinmentFound = await AppointmentRepository.findOne({
    where:{
      id:parseInt(id)
    }
  }
  );
  if (!appoinmentFound){
    throw new CustomError(404,`La cita con el id ${id} no fue encontrada`);
    
  }
   return  appoinmentFound;
 
};

export const registerAppoinmentService = async (appoinmentData: AppoinmentRegisterDto): Promise<Appoinment> => {
  // Validaciones previas de citas
  AppointmentRepository.validateAllowAppoinment(appoinmentData.date, appoinmentData.time);
  await AppointmentRepository.validateExistingAppoinment(
    appoinmentData.userId,
    new Date(appoinmentData.date),
    appoinmentData.time
  );

  // Busca el usuario por su ID
  const user = await getUserByIdService(appoinmentData.userId);
  if (!user) throw new CustomError(404, "Usuario no encontrado");

  // Crea la nueva cita asociando el usuario encontrado
  const newAppoinment = AppointmentRepository.create({
    date: appoinmentData.date,
    time: appoinmentData.time,
    user: user,  
    status: Status.active,  
  });

  return await AppointmentRepository.save(newAppoinment);
};



export const cancelAppoinmentService = async (
  id: string
): Promise<Appoinment> => {
  const appoinmentFound =await AppointmentRepository.findOne({
    where: {
      id: parseInt(id, 10)
    }
  }
  );
  if (!appoinmentFound){    
  throw new CustomError(404,`La cita con el id ${id} no fue encontrada`);
  }
  
  appoinmentFound.status = Status.cancelled;
  await AppointmentRepository.save(appoinmentFound)
  return appoinmentFound
}
