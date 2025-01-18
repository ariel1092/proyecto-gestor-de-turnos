export const registerFormValidate = (input) =>{
  const errors = {};
  
  // Validación de name
  if (!input.name) {
    errors.name = 'El nombre es obligatorio';
  } else if (input.name.length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  } else if (input.name.length > 20) {
    errors.name = 'El nombre no debe tener más de 20 caracteres';
  }else if (!/^[a-zA-Z\s]+$/.test(input.name)) {
    errors.name = "El nombre solo puede contener letras y espacios";
  }
  
  // Validación de email
  if (!input.email) {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = 'Correo electrónico no válido';
  }
  
// Validación de birthdate
if (!input.birthdate) {
  errors.birthdate = 'La fecha de nacimiento es obligatoria';
} else {
  const birthDate = new Date(input.birthdate);
  const today = new Date();

  // Verificar si la fecha es válida y no está en el futuro
  if (birthDate > today) {
    errors.birthdate = 'La fecha de nacimiento no puede ser en el futuro';
  } else {
    // Calcular la diferencia de años
    const age = today.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (age < 18 || (age === 18 && !isBirthdayPassed)) {
      errors.birthdate = 'Debes tener al menos 18 años';
    }
  }
}

  // Validación de nDni
  if (!input.nDni) {
    errors.nDni = 'El Dni es obligatorio';
  } else if (!/^\d+$/.test(input.nDni)) {
    errors.nDni = 'El Dni solo debe contener números';
  } else if (input.nDni.length !== 8) {
    errors.nDni = 'El Dni debe tener 8 dígitos';
  }


  // Validación de username
  if (!input.username) {
    errors.username = 'El nombre de usuario es obligatorio';
  } else if (input.username.length < 4) {
    errors.username = 'El nombre de usuario debe tener al menos 4 caracteres';
  } else if (input.username.length > 10) {
    errors.username = 'El nombre de usuario no debe tener más de 10 caracteres';
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


  return errors;
}
