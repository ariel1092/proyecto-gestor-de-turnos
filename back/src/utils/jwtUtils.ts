import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// Verifica que la clave JWT_SECRET exista
if (!JWT_SECRET) {
  throw new Error('Falta la clave secreta JWT_SECRET en las variables de entorno');
}

interface TokenPayload {
  userId: number;
}

export const generateToken = (userId: number): string => {
  const payload: TokenPayload = { userId };
  const options: SignOptions = { expiresIn: JWT_EXPIRATION };

  return jwt.sign(payload, JWT_SECRET, options);
};


