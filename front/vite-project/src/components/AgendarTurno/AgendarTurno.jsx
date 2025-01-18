import { useFormik } from "formik";
import { dateFormValidates } from "../../helpers/dateFormValidate";
import Styles from "./AgendarTurno.module.css";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../../context/UsersContext";

const AgendarTurno = () => {
  const { createdAppoinment } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    validate: dateFormValidates,
    onSubmit: async (values) => {
      try {
        await createdAppoinment(values);
        Swal.fire({
          icon: "success",
          title: "Turno agendado exitosamente",
        });
      } catch (error) {
        console.log(error); // Agrega esto para revisar el contenido del error
        Swal.fire({
          icon: "error",
          title: error.response?.data?.details || "Error al agendar el turno",
          text: "Intente nuevamente",
        });
      } finally {
        formik.resetForm();
      }
    },
  });

  return (
    <div className={Styles.container}>
      <h2 className={Styles.title}>Agendar Turno</h2>
      <form className={Styles.form} onSubmit={formik.handleSubmit}>
        <div className={Styles.formGroup}>
          <label className={Styles.label} htmlFor="date">
            Fecha
          </label>
          <input
            type="date"
            id="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            className={Styles.input}
            placeholder="Selecciona una fecha"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date && (
            <span className={Styles.error}>{formik.errors.date}</span>
          )}
        </div>
        <div className={Styles.formGroup}>
  <label className={Styles.label} htmlFor="time">
    Hora
  </label>
  <select
    id="time"
    name="time"
    className={Styles.input}
    onChange={formik.handleChange}
    value={formik.values.time}
  >
    <option value="">Selecciona una hora</option>
    {[
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00"
     
    ].map((hour) => (
      <option key={hour} value={hour}>
        {hour}
      </option>
    ))}
  </select>
  {formik.errors.time && (
    <span className={Styles.error}>{formik.errors.time}</span>
  )}
</div>


        <button
          type="submit"
          className={Styles.submitButton}
          disabled={Object.keys(formik.errors).length > 0}
        >
          Agendar
        </button>
      </form>
    </div>
  );
};

export default AgendarTurno;
