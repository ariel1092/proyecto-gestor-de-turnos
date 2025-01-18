
import { AppDataSource} from "../config/data-source";
import { UserCredentialDto, UserDto, UserLoginDto, UserRegisterDto } from "../dto/userDto";
import { checkUserCredentials, getCredentialService } from "./credentialService";
import { User } from "../entities/User.entity";
import { validateUserRegistration } from "./userValidation";
import { UserRepository } from "../repositories/User.Repository";

export const getUserService = async (): Promise<UserDto[]> => {
  try {
    const users: User[] = await UserRepository.find();
    return users;
  } catch (error) {
    throw new Error(`Error al obtener usuarios: ${error instanceof Error ? error.message : error}`);
  }
};

export const getUserByIdService = async (id: number): Promise<UserDto> => {
  try {
    const userFound = await UserRepository.findOne({
      where: { id },
      relations:['appoinments']
    });
    if (!userFound) {
      throw new Error(`El usuario con id: ${id} no fue encontrado`);
    }
    return userFound;
  } catch (error) {
    throw new Error(`Error al obtener el usuario con id ${id}: ${error instanceof Error ? error.message : error}`);
  }
};

export const registerUserService = async (
  user: UserRegisterDto
): Promise<User> => {
  return await AppDataSource.transaction(async (transactionalEntityManager) => {
    try {
      // Validación antes de la transacción
      await validateUserRegistration(user);

      // Crear credencial y usuario dentro de la transacción
      const idCredentialUser = await getCredentialService(user.username, user.password,transactionalEntityManager);

      const newUser = transactionalEntityManager.create(User,{
        name: user.name,
        email: user.email,
        birthdate: new Date(user.birthdate),
        nDni: user.nDni,
        credentials: idCredentialUser,
      });

      // Guardar el usuario usando el transactionalEntityManager
      return await transactionalEntityManager.save(newUser);

    } catch (error) {
      throw new Error(`Error al registrar el usuario: ${error instanceof Error ? error.message : error}`);
    }
  });
};

export const loginUserService = async (
  userCredentials: UserCredentialDto
): Promise<UserLoginDto> => {
  // Obtener el ID de las credenciales si son válidas
  const credentialId: number | undefined = await checkUserCredentials(
    userCredentials.username,
    userCredentials.password
  );
 
  const userFound: User | null = await UserRepository.findOne({
    where: {
      credentials: {
        id: credentialId,
      },
    },
  });

  if (!userFound) {
    throw new Error("Usuario no encontrado");
  }
  

  // Retornar los datos del usuario si fue encontrado
  return {
    login: true,
    user:{
      ...userFound
    }
  };
};




