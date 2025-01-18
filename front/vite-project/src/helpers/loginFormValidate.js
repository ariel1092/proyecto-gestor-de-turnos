
export const loginFormValidate = (input)=>{

    const errors = {}


    
  // Validación de username
  if (!input.username) {
    errors.username = 'El nombre de usuario es obligatorio';
  } else if (input.username.length < 4) {
    errors.username = 'El nombre de usuario debe tener al menos 4 caracteres';
  } else if (input.username.length > 20) {
    errors.username = 'El nombre de usuario no debe tener más de 20 caracteres';
  }

  // Validación de password
  if (!input.password) {
    errors.password = 'La contraseña es obligatoria';
  } else if (input.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres';
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = 'La contraseña debe contener al menos una letra mayúscula';
  } else if (!/[a-z]/.test(input.password)) {
    errors.password = 'La contraseña debe contener al menos una letra minúscula';
  } else if (!/\d/.test(input.password)) {
    errors.password = 'La contraseña debe contener al menos un número';
  } else if (!/[@$!%*?&#]/.test(input.password)) {
    errors.password = 'La contraseña debe tener al menos un carácter especial';
  }
  return errors
}
