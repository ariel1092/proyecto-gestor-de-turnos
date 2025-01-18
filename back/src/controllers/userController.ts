import { NextFunction, Request, Response } from "express";
import {
  getUserByIdService,
  getUserService,
  loginUserService,
  registerUserService,
} from "../services/userService";
import { UserCredentialDto, UserDto, UserLoginDto, UserRegisterDto } from "../dto/userDto";
import { User } from "../entities/User.entity";
import { catchingError } from "../utils/catchinError";


// Controlador para obtener todos los usuarios
const getUserController = async (req: Request, res: Response): Promise<void> => {
  const serviceResponse: UserDto[] = await getUserService();
  res.status(200).json({
    message: "Obtener el listado de todos los usuarios",
    data: serviceResponse,
  });
};

// Controlador para obtener un usuario por ID
const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "El ID del usuario es requerido",
    });
    return;
  }

  const serviceResponse: UserDto = await getUserByIdService(parseInt(id));

  if (!serviceResponse) {
    res.status(404).json({
      message: `No se encontró el usuario con el ID: ${id}`,
    });
    return;
  }

  res.status(200).json({
    serviceResponse,
  });
};

// Controlador para registrar un nuevo usuario
const registerUserController = async (
  req: Request<unknown, unknown, UserRegisterDto>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "El cuerpo de la solicitud no puede estar vacío",
      });
      return;
    }

    const serviceResponse: User = await registerUserService(req.body);

    res.status(200).json({
      message: "Registro de un nuevo usuario con éxito",
      data: serviceResponse,
    });
  } catch (error) {
    next(error); 
  }
};

// Controlador para iniciar sesión
const loginUserController = async (
  req: Request<unknown, unknown, UserCredentialDto>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body || !req.body.username || !req.body.password) {
      res.status(400).json({
        message: "El usuario y la contraseña son obligatorios",
      });
      return;
    }

    const serviceResponse: UserLoginDto = await loginUserService(req.body);

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
  } catch (error) {
    next(error); // Manejo de errores usando el siguiente middleware
  }
};

// Exportar los controladores
const userControllers = {
  getUserController: catchingError(getUserController),
  getUserByIdController: catchingError(getUserByIdController),
  registerUserController: catchingError(registerUserController),
  loginUserController: catchingError(loginUserController),
};

export default userControllers;
