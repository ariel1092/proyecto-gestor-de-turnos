const isValidTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const totalMinutes = hour * 60 + minute;
    const startTime = 9 * 60; // 9 AM
    const endTime = 19 * 60; // 8 PM

    // Verificar que los minutos sean cero y que esté dentro del rango permitido
    return minute === 0 && totalMinutes >= startTime && totalMinutes <= endTime;
};

export const dateFormValidates = (inputs) => {
    const errors = {};
    const { date, time } = inputs;

    if (!date) {
        errors.date = "La fecha es obligatoria.";
    } else {
        const selectDataTime = new Date(`${date}T${time || "00:00"}`); 
        const now = new Date();
        const twentyFourHours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        if (selectDataTime < twentyFourHours) {
            errors.date = "No se pueden agendar citas con menos de 24 horas de antelación.";
        } else if (selectDataTime.getDay() === 0 || selectDataTime.getDay() === 6) {
            errors.date = "No se pueden agendar citas los fines de semana.";
        }
    }

    if (!time) {
        errors.time = "La hora es obligatoria.";
    } else if (!isValidTime(time)) {
        errors.time = "La hora de la cita debe ser en punto (por ejemplo, 10:00) y debe estar entre las 9 AM y las 8 PM.";
    }

    return errors;
};
