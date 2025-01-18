
# User Stories - Sistema de Gestión de Turnos para Consultorio Psicológico

## 1) Autenticación de Usuarios
- **Como** usuario, quiero poder registrarme e iniciar sesión en la plataforma para poder reservar un turno, de modo que mi identidad esté protegida.
### Criterios de aceptación:
- El usuario debe poder registrarse proporcionando un nombre de usuario y una contraseña.
- El sistema debe autenticar usuarios mediante el correo y contraseña.
- El usuario no podrá reservar un turno sin estar autenticado.

## 2) Reserva de turno
- **Como** usuario autenticado, quiero poder agendar un turno en una fecha y hora específica dentro del horario de atención de 10:00 AM a 19:00 PM, para poder recibir atención psicológica.
### Criterios de aceptación:
- El usuario solo puede seleccionar horarios entre 10:00 AM y 19:00 PM, excluyendo fines de semana.
- Si el usuario intenta agendar un turno fuera de estos días y horarios, se mostrará un mensaje de error.

## 3) Visualización de turnos reservados
- **Como** usuario autenticado, quiero ver un listado de mis turnos reservados, para poder gestionar mis citas psicológicas.
### Criterios de aceptación:
- El usuario debe poder ver una lista de turnos futuros y pasados.
- Cada turno debe mostrar la fecha, hora y la opción de cancelación si aún es posible.

## 4) Cancelación de turno
- **Como** usuario autenticado, quiero poder cancelar mi turno hasta un día antes de la fecha reservada, para liberar el espacio si no puedo asistir.
### Criterios de aceptación:
- El usuario debe poder cancelar un turno hasta el día anterior a la cita.

## 5) Restricción de agendamiento para fines de semana
- **Como** usuario, quiero que los días de fin de semana no estén disponibles para agendar turnos, para que solo se pueda reservar en días hábiles.
### Criterios de aceptación:
- Los sábados y domingos no deben aparecer como opciones en el calendario.




