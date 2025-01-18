import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credentials";
import { scrypt } from 'crypto'; // Asegúrate de tener 'crypto' instalado o usar el built-in de Node.js.
import { CredentialRepository } from "../repositories/Credential.repository";

// Función para hashear la contraseña
const cryPass = async (pass: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    scrypt(pass, 'fixed_salt', 64, (err, derivedKey) => { // Usar un 'fixed_salt' (No recomendado en producción)
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
};

// Verificar si el usuario ya existe
const checkUserExist = async (username: string, entityManager: EntityManager = CredentialRepository.manager): Promise<void> => {
  const credentialFound: Credential | null = await entityManager.findOne(Credential, { where: { username } });
  
  if (credentialFound) throw new Error(`El usuario con username: ${username} ya existe, intente con un nuevo usuario`);
};

// Función para obtener y guardar la credencial
export const getCredentialService = async (
  username: string,
  password: string,
  entityManager: EntityManager = CredentialRepository.manager
): Promise<Credential> => {
  await checkUserExist(username, entityManager);
  
  const passwordEncrypted = await cryPass(password); // Hashear la contraseña sin salt
  
  const objetoCredencial: Credential = entityManager.create(Credential, {
    username,
    password: passwordEncrypted,
    // Eliminar la línea del salt
  });

  return await entityManager.save(objetoCredencial);
};

// Verificar las credenciales del usuario
export const checkUserCredentials = async (
  username: string, 
  password: string
): Promise<number | undefined> => {
  // Buscar el usuario por username
  const credentialFound: Credential | null = await CredentialRepository.findOne({
    where: { username }
  });
  if(!credentialFound) throw new Error('Usuario o contraseña incorrectos')
    else{
  const passwordEncrypted = await cryPass(password)
  if(credentialFound?.password != passwordEncrypted) throw new Error('Usuario o contraseña incorrectos')
  else return credentialFound.id  
    }
};
