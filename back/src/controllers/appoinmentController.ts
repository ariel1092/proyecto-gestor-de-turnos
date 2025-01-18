import { Request, Response } from "express";
import { AppoinmentRegisterDto } from "../dto/appoinmentDto";
import {
  cancelAppoinmentService,
  getAppoinmentByIdService,
  getAppoinmentService,
  registerAppoinmentService,
} from "../services/appoinmentService";
import { Appoinment } from "../entities/AppoinmentsEntity";
import { catchingError } from "../utils/catchinError";


// Obtener todas las citas
const getAppoinmentController = async (req: Request, res: Response): Promise<void> => {
  const serviceResponse = await getAppoinmentService();

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
};

// ✅ Obtener una cita específica por ID
const getAppoinmentByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "El ID del turno es requerido",
    });
    return;
  }

  const serviceResponse = await getAppoinmentByIdService(id);

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
};

// ✅ Registrar una nueva cita
const registerAppoinmentController = async (
  req: Request<unknown, unknown, AppoinmentRegisterDto>,
  res: Response
): Promise<void> => {
  if (!req.body) {
    res.status(400).json({
      message: "Los datos para registrar el turno son requeridos",
    });
    return;
  }

  const serviceResponse: Appoinment = await registerAppoinmentService(req.body);

  res.status(201).json({
    message: "Turno registrado correctamente",
    data: serviceResponse,
  });
};

// ✅ Cancelar una cita
const cancelAppoinmentController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "El ID del turno es requerido para cancelarlo",
    });
    return;
  }

  const serviceResponse = await cancelAppoinmentService(id);

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
};

// ✅ Exportar los controladores con manejo de errores
const appoinmentController = {
  getAppoinmentController: catchingError(getAppoinmentController),
  getAppoinmentByIdController: catchingError(getAppoinmentByIdController),
  registerAppoinmentController: catchingError(registerAppoinmentController),
  cancelAppoinmentController: catchingError(cancelAppoinmentController),
};

export default appoinmentController;
