import Swal from 'sweetalert2';
import styles from './Register.module.css';
import { useFormik } from "formik";
import { registerFormValidate } from '../../helpers/registerFormValidate';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UsersContext';
import { useContext } from 'react';

const Register = () => {
    const { registerUser } = useContext(UserContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            birthdate: '',
            nDni: '',
            username: '',
            password: '',
        },
        validate: registerFormValidate,
        onSubmit: async (values) => {
            const errors = registerFormValidate(values);

            // 📌 Validaciones específicas con SweetAlert
            if (errors.email) {
                Swal.fire({
                    icon: 'error',
                    title: 'Correo Electrónico Inválido',
                    text: errors.email,
                });
                return;
            }

            if (errors.birthdate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fecha de Nacimiento Inválida',
                    text: errors.birthdate,
                });
                return;
            }


            // 📌 Validación general para otros errores
            if (Object.keys(errors).length > 0) {
                const errorList = Object.values(errors).map(err => `<li>${err}</li>`).join('');
                Swal.fire({
                    icon: 'error',
                    title: 'Errores en el formulario',
                    html: `<ul style="text-align: left;">${errorList}</ul>`,
                });
                return;
            }

            try {
                await registerUser(values);
                Swal.fire({
                    icon: "success",
                    title: "Usuario registrado correctamente"
                });
                navigate("/login");
            } catch (err) {
                if (err.response?.data?.details?.includes("email")) {
                    Swal.fire({
                        icon: "error",
                        title: `Ya existe un usuario con el email: ${formik.values.email} o con el Dni: ${formik.values.nDni}`,
                        text: "Intente con otro Email"
                    });
                } else if (err.response?.data?.details?.includes("username")) {
                    Swal.fire({
                        icon: "error",
                        title: `Ya existe un usuario: ${formik.values.username}`,
                    });
                } else if (err.response?.data?.details?.includes("nDni")) {
                    Swal.fire({
                        icon: "error",
                        title: `Ya existe un usuario con nDni: ${formik.values.nDni}`,
                    });
                }
            }
        }
    });

    return (
        <div className={styles.container}>
            <h2>Formulario de Registro</h2>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
            {formik.touched.name && formik.errors.name && (
                        <label className={styles.errorLabel}>{formik.errors.name}</label>
                    )}
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={styles.input}
                        maxLength={20}
                    />
                    
                </div>
                {formik.touched.email && formik.errors.email && (
                        <label className={styles.errorLabel}>{formik.errors.email}</label>
                    )}
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={styles.input}
                    />
                   
                </div>

                    {formik.touched.birthdate && formik.errors.birthdate && (
                      <label className={styles.errorLabel}>{formik.errors.birthdate}</label>
                  )}
                <div className={styles.formGroup}>
                    <label htmlFor="birthdate" className={styles.label}>Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={formik.values.birthdate}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={styles.input}
                    />
                </div>
                {formik.touched.nDni && formik.errors.nDni && (
                        <label className={styles.errorLabel}>{formik.errors.nDni}</label>
                    )}
                <div className={styles.formGroup}>
                    <label htmlFor="nDni" className={styles.label}>Número de DNI:</label>
                    <input
                        type="text"
                        name="nDni"
                        value={formik.values.nDni}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={styles.input}
                    />
                   
                </div>
                {formik.touched.username && formik.errors.username && (
                        <label className={styles.errorLabel}>{formik.errors.username}</label>
                    )}
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Nombre de Usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={styles.input}
                    />
                    
                </div>
                {formik.touched.password && formik.errors.password && (
        <label className={styles.errorLabel}>{formik.errors.password}</label>
    )}
                <div className={styles.formGroup}>
    <label htmlFor="password" className={styles.label}>Contraseña:</label>
    <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={styles.input}
    />
  
</div>

                <button type="submit" className={styles.submitButton}>
                    Registrar
                </button>
                <br />
                <label className={styles.label}>
                    ¿Ya tienes una cuenta? <Link to="/login"><span className={styles.span}>Login</span></Link>
                </label>
            </form>
        </div>
    );
};

export default Register;



