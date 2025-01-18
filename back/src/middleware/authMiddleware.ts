/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Extiende el tipo Request para incluir la propiedad `user` con el tipo exacto de datos decodificados del JWT
interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Token no proporcionado' });
    return; // Asegura que se detenga la ejecución después de enviar la respuesta
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET no está definido en el archivo .env");

    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'object' && 'userId' in decoded) {
      req.user = { userId: (decoded as JwtPayload).userId as number };
      next(); // Continua al siguiente middleware si el token es válido
    } else {
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
