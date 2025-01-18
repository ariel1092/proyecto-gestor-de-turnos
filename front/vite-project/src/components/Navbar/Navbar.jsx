import Swal from "sweetalert2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UsersContext";

const Navbar = () => {
    const { logOutUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogOut = () => {
        Swal.fire({
            icon: "warning",
            title: "¿Estás seguro?",
            text: "¿Deseas cerrar la sesión?",
            showCancelButton: true,
            confirmButtonColor: "#c5a880",
            cancelButtonColor: "#2a2a2a",
            confirmButtonText: "Sí, cerrar sesión"
        }).then((result) => {
            if (result.isConfirmed) {
                logOutUser();
                Swal.fire({
                    icon: "success",
                    title: "Sesión cerrada",
                    text: "Tu sesión fue cerrada correctamente",
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate("/login");
            }
        });
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">Consultorio</Link>
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link to="/misturnos" className={`${styles.navLink} ${location.pathname === "/misturnos" ? styles.active : ""}`}>
                        Mis Turnos
                    </Link>
                </li>
                <li>
                    <Link to="/agendarturno" className={`${styles.navLink} ${location.pathname === "/agendarturno" ? styles.active : ""}`}>
                        Agendar Turno
                    </Link>
                </li>
                <li>
                    <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogOut}>
                        LogOut
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
