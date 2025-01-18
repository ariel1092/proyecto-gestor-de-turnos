// src/services/userValidation.ts
import { UserRegisterDto } from "../dto/userDto";
import { UserRepository } from "../repositories/User.Repository";

export const validateUserRegistration = async (user: UserRegisterDto): Promise<void> => {

  if (!user.password) {
    throw new Error("La contraseña es requerida.");
  }
  // Validar si ya existe un usuario con el mismo email o DNI
  const existingUser = await UserRepository.findOne({
    where: [
      { email: user.email },
      { nDni: user.nDni },
    ],
  });

  if (existingUser) {
    throw new Error("Ya existe un usuario con el mismo email o DNI.");
  }
};
