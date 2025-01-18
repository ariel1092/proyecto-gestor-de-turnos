"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: 'Token no proporcionado' });
        return; // Asegura que se detenga la ejecución después de enviar la respuesta
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("JWT_SECRET no está definido en el archivo .env");
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (typeof decoded === 'object' && 'userId' in decoded) {
            req.user = { userId: decoded.userId };
            next(); // Continua al siguiente middleware si el token es válido
        }
        else {
            res.status(401).json({ message: 'Token inválido o expirado' });
        }
    }
    catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
exports.authenticateJWT = authenticateJWT;
