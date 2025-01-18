/* eslint-disable no-unused-vars */

import Swal from "sweetalert2";
import styles from "./Login.module.css";
import { loginFormValidate } from "../../helpers/loginFormValidate";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UsersContext";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginFormValidate,
    onSubmit: async (values) => {
      try {
        await loginUser(values);

        Swal.fire({
          icon: "success",
          title: "Usuario Logueado con Éxito",
        });
        navigate("/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Usuario o contraseña inválidos",
          text: "Intente nuevamente",
        });
      }
    },
  });

  return (
    <div className={styles.container}>
      {/* ✅ Bienvenida */}
      <div className={styles.welcomeMessage}>
        <h1>¡Bienvenidos al consultorio de la Lic. Fernanda Aballay!</h1>
        <p>
          Te invitamos a gestionar tus turnos de manera fácil y rápida. Inicia sesión para continuar.
        </p>
      </div>

      <h2>Iniciar Sesión</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Nombre de Usuario:
          </label>
          <input
            type="text"
            name="username"
            autoComplete="current-username"
            placeholder="Nombre de Usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Iniciar Sesión
        </button>
        <br />
        <label className={styles.label}>
          ¿Aún no tienes una cuenta?{" "}
          <Link to="/register">
            <span className={styles.span}>Regístrate</span>
          </Link>
        </label>
      </form>
    </div>
  );
};

export default Login;

