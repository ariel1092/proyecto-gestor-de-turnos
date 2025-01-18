// /* eslint-disable @typescript-eslint/no-unused-vars */
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config(); // Cargar las variables de entorno

// // Configuración del transporte
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Cambiar según el proveedor
//   auth: {
//     user: process.env.EMAIL_USER, // Tu email
//     pass: process.env.EMAIL_PASS, // Tu contraseña o token
//   },
// });

// // Verificar conexión con el servicio de correo
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error al conectar con el servicio de correo:', error);
//   } else {
//     console.log('Conexión con el servicio de correo establecida');
//   }
// });

// // Función para enviar correos
// export const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Gestor de Turnos" <${process.env.EMAIL_USER}>`, // Remitente
//       to, // Destinatario
//       subject, // Asunto
//       html, // Contenido en HTML
//     });
//     console.log('Correo enviado:', info.messageId);
//   } catch (error) {
//     console.error('Error al enviar el correo:', error);
//     throw new Error('No se pudo enviar el correo');
//   }
// };
